
import React, { useRef, useEffect, useState } from 'react';
import { drawPlot, WaveformSeries, COLORS } from '../utils/simulationEngine';

interface WaveformPlotProps {
  title: string;
  type: 'voltage' | 'current';
  data: WaveformSeries;
  selectedKeys: string[];
  onChangeSelection: (key: string) => void;
}

export const WaveformPlot: React.FC<WaveformPlotProps> = ({ title, type, data, selectedKeys, onChangeSelection }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoverKey, setHoverKey] = useState<string | null>(null);

  // Map user readable keys to internal data keys
  const availableKeys = type === 'voltage' 
    ? ['v_o', 'v_sw', 'v_l', 'v_in'] 
    : ['i_l', 'i_c', 'i_d', 'i_sw'];

  const labels: Record<string, React.ReactNode> = {
    v_o: <span>v<sub>o</sub></span>,
    v_sw: <span>v<sub>sw</sub></span>,
    v_l: <span>v<sub>L</sub></span>,
    v_in: <span>v<sub>in</sub></span>,
    i_l: <span>i<sub>L</sub></span>,
    i_c: <span>i<sub>C</sub></span>,
    i_d: <span>i<sub>D</sub></span>,
    i_sw: <span>i<sub>sw</sub></span>,
  };

  useEffect(() => {
    if (canvasRef.current) {
      // Prepare series object for the drawer
      const seriesToDraw: any = {};
      selectedKeys.forEach(k => {
        if (data[k]) seriesToDraw[k] = data[k];
      });
      drawPlot(canvasRef.current, seriesToDraw, data.t, hoverKey);
    }
  }, [data, selectedKeys, hoverKey]);

  // Handle Canvas Hover
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Simple hit testing logic (approximate, since we don't want to re-calculate everything here)
    // For now, we just pass the mouse move to redraw to show cursor, 
    // but the full hover logic requires inverting the plot transform which is inside drawPlot.
    // To keep it simple for this port, we will rely on legend hover mostly, 
    // but the drawPlot function in utils/simulationEngine actually supports mouse interaction if we bind it.
    
    // For this React implementation, let's keep it clean: Hovering legend highlights line.
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
        <h4 className="font-semibold text-slate-700">{title}</h4>
        <div className="flex flex-wrap gap-3">
          {availableKeys.map(key => (
            <label 
              key={key} 
              className={`flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer transition-colors border ${
                selectedKeys.includes(key) ? 'bg-slate-50 border-slate-300' : 'border-transparent hover:bg-slate-50'
              }`}
              onMouseEnter={() => setHoverKey(key)}
              onMouseLeave={() => setHoverKey(null)}
            >
              <input 
                type="checkbox" 
                checked={selectedKeys.includes(key)} 
                onChange={() => onChangeSelection(key)}
                className="rounded text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm font-medium" style={{ color: (COLORS as any)[key] }}>
                {labels[key]}
              </span>
            </label>
          ))}
        </div>
      </div>
      
      <canvas 
        ref={canvasRef} 
        width={1100} 
        height={240} 
        className="w-full h-[240px] border border-slate-100 rounded-lg bg-white cursor-crosshair"
        onMouseMove={handleMouseMove}
      />
    </div>
  );
};
