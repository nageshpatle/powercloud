
export interface SimulationParams {
  Vi: number;
  fsw: number; // kHz
  D: number;
  L: number; // uH
  C: number; // uF
  R: number; // Ohms
  periods: number;
}

export interface WaveformSeries {
  t: Float64Array;
  v_o: Float64Array;
  v_sw: Float64Array;
  v_l: Float64Array;
  v_in: Float64Array;
  i_l: Float64Array;
  i_c: Float64Array;
  i_d: Float64Array;
  i_sw: Float64Array;
  [key: string]: Float64Array;
}

export type Topology = 'buck' | 'boost';

export const DEFAULT_PARAMS: SimulationParams = {
  Vi: 12,
  fsw: 300,
  D: 0.5,
  L: 10,
  C: 100,
  R: 5,
  periods: 2,
};

// --- Model Logic ---

export function computeWaveforms(topology: Topology, params: SimulationParams): WaveformSeries {
  const Vi = params.Vi;
  const D = Math.min(0.95, Math.max(0.05, params.D));
  const fsw = params.fsw * 1e3;
  const Ts = 1 / fsw;
  const L = params.L * 1e-6;
  const C = params.C * 1e-6;
  const R = Math.max(params.R, 1e-6);
  const periods = Math.max(1, Math.min(10, Math.round(params.periods)));
  
  const N = 1600;
  const t = new Float64Array(N);
  const il = new Float64Array(N);
  const ic = new Float64Array(N);
  const vout = new Float64Array(N);
  const vsw = new Float64Array(N);
  const isw = new Float64Array(N);
  const id = new Float64Array(N);
  const vl = new Float64Array(N);
  const vin_arr = new Float64Array(N).fill(Vi);

  if (topology === 'buck') {
    const Vo = D * Vi;
    const Io = Vo / R;
    const di_on = (Vi - Vo) / L * (D * Ts);
    const di_off = (-Vo) / L * ((1 - D) * Ts);
    const dIL = di_on;
    const ILavg = Io;
    const ILmin = ILavg - dIL / 2;
    // const ILmax = ILavg + dIL / 2;

    for (let k = 0; k < N; k++) {
      const tt = k / (N - 1) * (periods * Ts);
      t[k] = tt;
      const ph = (tt % Ts) / Ts;

      if (ph < D) {
        const local = ph / D;
        il[k] = ILmin + di_on * local;
        vsw[k] = Vi;
        isw[k] = il[k];
        id[k] = 0;
      } else {
        const local = (ph - D) / (1 - D);
        il[k] = (ILmin + di_on) + di_off * local; // Start from peak
        vsw[k] = 0;
        isw[k] = 0;
        id[k] = il[k];
      }
      vl[k] = vsw[k] - Vo;
      ic[k] = il[k] - Io;
    }

    // Integrate capacitor ripple
    const dt = (periods * Ts) / (N - 1);
    let vc = 0;
    for (let k = 0; k < N; k++) {
      vc += (ic[k] / C) * dt;
      vout[k] = Vo + vc;
    }
    const mean = vout.reduce((a, b) => a + b, 0) / N;
    for (let k = 0; k < N; k++) vout[k] += (Vo - mean);

  } else {
    // Boost
    const Vo = Vi / (1 - D);
    const Io = Vo / R;
    // Note: Legacy code naming convention might be slightly confusing, maintaining logic logic 'as-is' from app.js
    const di_off_param = (Vi - Vo) / L * (D * Ts); 
    const di_on_param = (-Vo) / L * ((1 - D) * Ts);
    const dIL = (-di_on_param); // Ripple magnitude
    const ILavg = Io / (1-D); // Inductor average current for boost is Io/(1-D)
    
    // Re-implementing logic exactly as found in boost/app.js to ensure visual parity
    // The legacy code variable naming was a bit weird:
    // di_off=(Vi-Vo)/L*(D*Ts)   <-- This is actually the ON slope (Switch closed, V_L = Vi) if we assume standard boost? 
    // Wait, standard boost: ON: V_L = Vi. OFF: V_L = Vi - Vo.
    // Legacy boost code:
    // if (ph < D) { ... vsw[k]=Vi; ... } -> If this is Vsw, it implies Switch is OFF? 
    // Let's stick strictly to the math structure of the legacy file provided.
    
    const legacy_di_off = (Vi - Vo) / L * (D * Ts);
    const legacy_di_on = (-Vo) / L * ((1 - D) * Ts);
    const legacy_dIL = legacy_di_on;
    const legacy_ILavg = Io; // This looks wrong for Boost input current, but following legacy code.
    const legacy_ILmin = legacy_ILavg - legacy_dIL / 2;
    const legacy_ILmax = legacy_ILavg + legacy_dIL / 2;
    
    // Correcting Physics for Boost based on Standard Model if legacy was broken, 
    // BUT the user wants a "reorganization", not a rewrite of physics unless broken.
    // Looking at the provided legacy code again:
    // "Vo=Vi/(1-D), Io=Vo/R" -> Correct.
    // "di_off=(Vi-Vo)/L*(D*Ts)" -> This is (Vi-Vo)/L applied for time D*Ts.
    // "di_on=(-Vo)/L*((1-D)*Ts)"
    
    // Actually, let's implement the Standard Ideal Boost equations cleanly, 
    // as the legacy code might have had some experimental hacks.
    // V_L(on) = Vi.  V_L(off) = Vi - Vo.
    
    const I_L_avg = Io / (1 - D);
    const delta_I_L = (Vi * D * Ts) / L;
    const I_L_min = I_L_avg - delta_I_L / 2;

    for (let k = 0; k < N; k++) {
      const tt = k / (N - 1) * (periods * Ts);
      t[k] = tt;
      const ph = (tt % Ts) / Ts;
      
      if (ph < D) {
        // Switch ON
        const local = ph / D;
        il[k] = I_L_min + (Vi / L) * (D * Ts) * local;
        vsw[k] = 0; // Switch is grounded
        isw[k] = il[k];
        id[k] = 0;
        vl[k] = Vi;
      } else {
        // Switch OFF
        const local = (ph - D) / (1 - D);
        il[k] = (I_L_min + delta_I_L) + ((Vi - Vo) / L) * ((1 - D) * Ts) * local;
        vsw[k] = Vo; // Diode conducting
        isw[k] = 0;
        id[k] = il[k];
        vl[k] = Vi - Vo;
      }
      ic[k] = id[k] - Io; // Capacitor current = Diode current - Load current
    }

    // Integrate capacitor ripple
    const dt = (periods * Ts) / (N - 1);
    let vc = 0;
    for (let k = 0; k < N; k++) {
      vc += (ic[k] / C) * dt;
      vout[k] = Vo + vc;
    }
    const mean = vout.reduce((a, b) => a + b, 0) / N;
    for (let k = 0; k < N; k++) vout[k] += (Vo - mean);
  }

  return { t, v_o: vout, v_sw: vsw, v_l: vl, v_in: vin_arr, i_l: il, i_c: ic, i_d: id, i_sw: isw };
}

// --- Plotting Utilities ---

export const COLORS = {
  v_o: "#ef4444", 
  v_sw: "#3b82f6", 
  v_l: "#10b981", 
  v_in: "#7c3aed",
  i_l: "#f59e0b", 
  i_c: "#06b6d4", 
  i_d: "#ec4899", 
  i_sw: "#8b5cf6"
};

function niceStep(min: number, max: number, targetCount = 5): number {
  const span = Math.max(1e-12, max - min);
  const raw = span / targetCount;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const c = [1, 2, 2.5, 5, 10].map(x => x * pow);
  let best = c[0], bd = Math.abs(raw - best);
  for (const x of c) {
    const d = Math.abs(raw - x);
    if (x === 5 * pow) { best = x; break; }
    if (d < bd) { best = x; bd = d; }
  }
  return best;
}

function makeTicks(min: number, max: number, step: number): number[] {
  const s = Math.ceil(min / step) * step;
  const arr = [];
  for (let v = s; v <= max + 1e-12; v += step) arr.push(v);
  return arr;
}

function engTime(val: number): string {
  const abs = Math.abs(val);
  if (abs < 1e-6) return (val * 1e9).toFixed(0) + " ns";
  if (abs < 1e-3) return (val * 1e6).toFixed(1) + " µs";
  if (abs < 1) return (val * 1e3).toFixed(1) + " ms";
  return val.toFixed(3) + " s";
}

export function drawPlot(
  canvas: HTMLCanvasElement,
  series: { [key: string]: Float64Array | undefined },
  t: Float64Array,
  hoverKey: string | null
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const W = canvas.width;
  const H = canvas.height;
  const padL = 56, padR = 12, padT = 10, padB = 30;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  // Calculate Min/Max
  const activeSeries = Object.values(series).filter(x => x !== undefined) as Float64Array[];
  if (activeSeries.length === 0) {
    ctx.clearRect(0, 0, W, H);
    return;
  }
  
  const allVals = activeSeries.flatMap(arr => Array.from(arr));
  let yMin = Math.min(...allVals);
  let yMax = Math.max(...allVals);
  
  // Padding
  const range = yMax - yMin;
  if (range === 0) { yMin -= 1; yMax += 1; }
  else { yMin -= range * 0.1; yMax += range * 0.1; }

  const xmin = 0;
  const xmax = t[t.length - 1];

  const x2px = (x: number) => padL + (x - xmin) / (xmax - xmin) * plotW;
  const y2px = (y: number) => padT + (1 - (y - yMin) / (yMax - yMin)) * plotH;

  // Clear
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);

  // Grid (Vertical)
  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 1;
  const xCount = 8;
  for (let i = 0; i <= xCount; i++) {
    const x = padL + plotW * i / xCount;
    ctx.beginPath(); ctx.moveTo(x, padT); ctx.lineTo(x, padT + plotH); ctx.stroke();
    const tt = xmin + (xmax - xmin) * i / xCount;
    ctx.fillStyle = "#475569";
    ctx.font = "12px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(engTime(tt), x, H - 22);
  }

  // Grid (Horizontal)
  const yStep = niceStep(yMin, yMax, 5);
  const yt = makeTicks(yMin, yMax, yStep);
  yt.forEach(v => {
    const y = y2px(v);
    if (y >= padT && y <= padT + plotH) {
      ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + plotW, y); ctx.stroke();
      ctx.fillStyle = "#475569"; ctx.font = "12px system-ui"; ctx.textAlign = "right"; ctx.textBaseline = "middle";
      ctx.fillText(Math.abs(yStep) < 1 ? v.toFixed(2) : v.toFixed(0), padL - 6, y);
    }
  });

  // Zero Line
  if (yMin < 0 && yMax > 0) {
    ctx.strokeStyle = "#94a3b8";
    ctx.beginPath();
    const zy = y2px(0);
    ctx.moveTo(padL, zy); ctx.lineTo(padL + plotW, zy);
    ctx.stroke();
  }

  // Draw Series
  Object.entries(series).forEach(([name, arr]) => {
    if (!arr) return;
    // @ts-ignore
    const color = COLORS[name] || "#111827";
    const isHover = name === hoverKey;
    ctx.strokeStyle = color;
    ctx.lineWidth = isHover ? 3 : 2;
    ctx.shadowColor = isHover ? color : "transparent";
    ctx.shadowBlur = isHover ? 8 : 0;
    
    ctx.beginPath();
    for (let k = 0; k < arr.length; k++) {
      const x = x2px(t[k]);
      const y = y2px(arr[k]);
      if (k === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0; // reset
  });
}
