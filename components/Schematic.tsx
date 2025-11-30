
import React from 'react';

// Simplified SVG content derived from the legacy files. 
// We use simple <img> or inline SVG. Since the paths are huge, 
// using the provided SVG content as data URIs or components is best.
// For clean code, I'll use the provided SVG markup from the prompt.

const BUCK_SVG = `
<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 101.67 43.93">
  <defs>
    <style>.cls-1,.cls-2,.cls-3,.cls-4,.cls-5,.cls-6{fill:none;}.cls-2{stroke-miterlimit:3;}.cls-2,.cls-3,.cls-4,.cls-5,.cls-6{stroke-width:.75px;}.cls-2,.cls-4,.cls-5{stroke:#000;}.cls-3{stroke:#010101;}.cls-3,.cls-5{stroke-linecap:round;stroke-linejoin:round;}.cls-6{stroke:#231f20;}.cls-22{fill-rule:evenodd;}</style>
    <symbol id="NMOS" viewBox="0 0 18.44 19.55"><g><path class="cls-5" d="M10.44,7.9"/><polyline class="cls-5" points="18.07 7.9 13.3 7.9 13.3 12.02"/><polyline class="cls-5" points=".38 7.93 5.14 7.93 5.14 12.04"/><line class="cls-5" x1="14.42" y1="12.1" x2="4.01" y2="12.1"/><line class="cls-5" x1="5.09" y1="7.91" x2="9.05" y2="7.91"/><line class="cls-5" x1="9.13" y1="10.16" x2="9.13" y2="7.96"/><line class="cls-5" x1="6.2" y1="13.8" x2="12.34" y2="13.8"/><line class="cls-5" x1="9.22" y1="14.09" x2="9.22" y2="19.18"/><line class="cls-5" x1="11.24" y1="5.3" x2="11.24" y2=".38"/><line class="cls-5" x1="15.65" y1="2.84" x2="2.79" y2="2.84"/><line class="cls-5" x1="15.65" y1="7.9" x2="15.65" y2="2.84"/><line class="cls-5" x1="2.79" y1="7.9" x2="2.79" y2="2.84"/><polyline class="cls-22" points="7.67 9.29 9.13 11.89 10.59 9.29 7.67 9.29"/><polyline class="cls-22" points="11.74 2.84 7.11 5.3 7.11 .38 11.74 2.84"/></g></symbol>
  </defs>
  <g id="Circuit">
    <path class="cls-22" d="M5.11,29.56h3.58v.79h-3.58v-.79ZM5.07,25.57v-.79h1.39v-1.38h.8v1.38h1.39v.79h-1.39v1.38h-.8v-1.38h-1.39Z"/>
    <line class="cls-2" x1="6.87" y1="36.9" x2="6.87" y2="33.36"/><line class="cls-2" x1="6.87" y1="20.76" x2="6.87" y2="17.21"/><path class="cls-2" d="M.5,27.06c0-3.48,2.85-6.3,6.36-6.3s6.36,2.82,6.36,6.3-2.85,6.3-6.36,6.3S.5,30.54.5,27.06"/><line class="cls-2" x1="6.88" y1="36.91" x2="6.88" y2="33.37"/><line class="cls-2" x1="6.88" y1="20.77" x2="6.88" y2="17.22"/><path class="cls-2" d="M.5,27.07c0-3.48,2.85-6.3,6.36-6.3s6.36,2.82,6.36,6.3-2.85,6.3-6.36,6.3S.5,30.55.5,27.07"/>
    <line class="cls-2" x1="5.82" y1="43.43" x2="7.91" y2="43.43"/><line class="cls-2" x1="4.25" y1="41.91" x2="9.48" y2="41.91"/><line class="cls-2" x1="3.21" y1="40.41" x2="10.52" y2="40.41"/>
    <use width="18.44" height="19.55" transform="translate(35.64) rotate(-180) scale(1 -1)" xlink:href="#NMOS"/>
    <use width="18.44" height="19.55" transform="translate(52.64 35.73) rotate(-90) scale(1 -1)" xlink:href="#NMOS"/>
    <path class="cls-5" d="M53.82,4.47c2.01,0,3.89,5.22,3.07,6.89-.38.8-1.37.8-1.88.21-1.32-1.55.57-7.1,2.58-7.1"/><path class="cls-5" d="M57.59,4.47c2.01,0,3.89,5.22,3.07,6.89-.38.8-1.37.8-1.88.21-1.32-1.55.57-7.1,2.58-7.1"/><path class="cls-5" d="M61.36,4.47c2.01,0,3.89,5.22,3.07,6.89-.38.8-1.37.8-1.88.21-1.32-1.55.57-7.1,2.58-7.1"/><path class="cls-5" d="M53.82,4.47c-1.32.05-1.77.97-2.19,1.87-.25.53-.48,1.04-.58,1.69"/><line class="cls-5" x1="51.05" y1="8.03" x2="49.61" y2="8.03"/><line class="cls-5" x1="67.9" y1="8.03" x2="69.34" y2="8.03"/><path class="cls-5" d="M65.13,4.46c1.32.05,1.77.97,2.19,1.87.25.53.48,1.04.58,1.69"/>
    <line class="cls-2" x1="68.08" y1="21.06" x2="79.77" y2="21.06"/><line class="cls-2" x1="68.08" y1="21.06" x2="79.77" y2="21.06"/><path class="cls-2" d="M79.77,26.9c-2.42-3.23-7-3.88-10.23-1.46-.56.42-1.05.91-1.46,1.46"/><path class="cls-2" d="M79.77,26.9c-2.42-3.23-7-3.88-10.23-1.46-.56.42-1.05.91-1.46,1.46"/>
    <line class="cls-2" x1="72.88" y1="43.43" x2="74.97" y2="43.43"/><line class="cls-2" x1="71.31" y1="41.91" x2="76.54" y2="41.91"/><line class="cls-2" x1="70.27" y1="40.41" x2="77.58" y2="40.41"/>
    <line class="cls-2" x1="43.64" y1="43.43" x2="45.73" y2="43.43"/><line class="cls-2" x1="42.07" y1="41.91" x2="47.3" y2="41.91"/><line class="cls-2" x1="41.03" y1="40.41" x2="48.34" y2="40.41"/>
    <line class="cls-2" x1="89.2" y1="43.43" x2="91.29" y2="43.43"/><line class="cls-2" x1="87.63" y1="41.91" x2="92.86" y2="41.91"/><line class="cls-2" x1="86.59" y1="40.41" x2="93.9" y2="40.41"/>
  </g>
  <g id="Wiring">
    <polyline class="cls-6" points="6.88 17.22 6.88 7.9 20.07 7.9"/><line class="cls-5" x1="6.86" y1="34.17" x2="6.88" y2="40.41"/><polyline class="cls-5" points="44.74 17.66 44.83 8.05 49.61 8.05"/><line class="cls-5" x1="69.32" y1="8.03" x2="90.41" y2="8.03"/><line class="cls-4" x1="73.93" y1="18.56" x2="73.93" y2="7.93"/><line class="cls-4" x1="73.93" y1="23.71" x2="73.93" y2="34.7"/><line class="cls-5" x1="35.26" y1="7.93" x2="45.08" y2="7.93"/><line class="cls-5" x1="44.72" y1="35.35" x2="44.72" y2="40.41"/><line class="cls-5" x1="73.93" y1="34.17" x2="73.93" y2="40.41"/><line class="cls-5" x1="90.24" y1="34.17" x2="90.24" y2="40.41"/>
  </g>
  <g id="Layer_1-2" data-name="Layer 1">
     <path class="cls-3" d="M90.24,28.61l-4.13-1.19"/><path class="cls-3" d="M86.11,27.42l4.13-1.19"/><path class="cls-3" d="M90.24,26.22l4.13-1.19"/><path class="cls-3" d="M90.24,19.08l4.13,1.19"/><path class="cls-3" d="M86.11,17.89l4.13,1.19"/><path class="cls-3" d="M86.11,17.89l4.13-1.19"/><path class="cls-3" d="M90.24,16.7l4.13-1.19"/><path class="cls-3" d="M90.28,14.32l4.08,1.19"/><path class="cls-3" d="M90.24,28.61v6.09"/><path class="cls-3" d="M90.29,14.32v-6.29"/><polygon class="cls-1" points="101.67 9.26 101.67 25.08 97.62 29.37 97.62 13.55 101.67 9.26"/><path class="cls-3" d="M90.24,23.84l4.13,1.19"/><path class="cls-3" d="M86.11,22.65l4.13,1.19"/><path class="cls-3" d="M86.11,22.65l4.13-1.19"/><path class="cls-3" d="M90.24,21.46l4.13-1.19"/><line class="cls-3" x1="73.93" y1="17.89" x2="73.93" y2="21.06"/>
  </g>
</svg>
`;

const BOOST_SVG = `
<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 101.67 43.93">
  <defs>
    <style>.cls-1,.cls-2,.cls-3,.cls-4,.cls-5,.cls-6{fill:none;}.cls-5,.cls-6,.cls-7,.cls-8,.cls-9,.cls-10{stroke-width:.75px;}.cls-5,.cls-9,.cls-10{stroke:#000;}.cls-6{stroke:#010101;}.cls-5,.cls-6{stroke-linecap:round;stroke-linejoin:round;}.cls-8{stroke:#231f20;}.cls-20{fill-rule:evenodd;}.cls-10{stroke-miterlimit:3;}</style>
    <symbol id="NMOS" viewBox="0 0 18.44 19.55"><g><path class="cls-5" d="M10.44,7.9"/><polyline class="cls-5" points="18.07 7.9 13.3 7.9 13.3 12.02"/><polyline class="cls-5" points=".38 7.93 5.14 7.93 5.14 12.04"/><line class="cls-5" x1="14.42" y1="12.1" x2="4.01" y2="12.1"/><line class="cls-5" x1="5.09" y1="7.91" x2="9.05" y2="7.91"/><line class="cls-5" x1="9.13" y1="10.16" x2="9.13" y2="7.96"/><line class="cls-5" x1="6.2" y1="13.8" x2="12.34" y2="13.8"/><line class="cls-5" x1="9.22" y1="14.09" x2="9.22" y2="19.18"/><line class="cls-5" x1="11.24" y1="5.3" x2="11.24" y2=".38"/><line class="cls-5" x1="15.65" y1="2.84" x2="2.79" y2="2.84"/><line class="cls-5" x1="15.65" y1="7.9" x2="15.65" y2="2.84"/><line class="cls-5" x1="2.79" y1="7.9" x2="2.79" y2="2.84"/><polyline class="cls-20" points="7.67 9.29 9.13 11.89 10.59 9.29 7.67 9.29"/><polyline class="cls-20" points="11.74 2.84 7.11 5.3 7.11 .38 11.74 2.84"/></g></symbol>
  </defs>
  <g id="Circuit">
    <path class="cls-20" d="M5.11,29.46h3.58v.79h-3.58v-.79ZM5.07,25.47v-.79h1.39v-1.38h.8v1.38h1.39v.79h-1.39v1.38h-.8v-1.38h-1.39Z"/>
    <line class="cls-10" x1="6.87" y1="36.81" x2="6.87" y2="33.27"/><polyline class="cls-10" points="6.87 20.67 6.87 17.12 6.87 7.96 11.24 7.96"/><path class="cls-10" d="M.5,26.97c0-3.48,2.85-6.3,6.36-6.3s6.36,2.82,6.36,6.3-2.85,6.3-6.36,6.3S.5,30.45.5,26.97"/><line class="cls-10" x1="6.88" y1="36.81" x2="6.88" y2="33.27"/><line class="cls-10" x1="6.88" y1="20.67" x2="6.88" y2="17.12"/><path class="cls-10" d="M.5,26.97c0-3.48,2.85-6.3,6.36-6.3s6.36,2.82,6.36,6.3-2.85,6.3-6.36,6.3S.5,30.45.5,26.97"/>
    <line class="cls-10" x1="5.82" y1="43.33" x2="7.91" y2="43.33"/><line class="cls-10" x1="4.25" y1="41.81" x2="9.48" y2="41.81"/><line class="cls-10" x1="3.21" y1="40.31" x2="10.52" y2="40.31"/>
    <use width="18.44" height="19.55" transform="translate(44.94)" xlink:href="#NMOS"/>
    <use width="18.44" height="19.55" transform="translate(27.94 35.73) rotate(-90)" xlink:href="#NMOS"/>
    <path class="cls-5" d="M26.76,4.47c-2.01,0-3.89,5.22-3.07,6.89.38.8,1.37.8,1.88.21,1.32-1.55-.57-7.1-2.58-7.1"/>
    <path class="cls-5" d="M22.99,4.47c-2.01,0-3.89,5.22-3.07,6.89.38.8,1.37.8,1.88.21,1.32-1.55-.57-7.1-2.58-7.1"/>
    <path class="cls-5" d="M19.22,4.47c-2.01,0-3.89,5.22-3.07,6.89.38.8,1.37.8,1.88.21,1.32-1.55-.57-7.1-2.58-7.1"/>
    <path class="cls-5" d="M26.76,4.47c1.32.05,1.77.97,2.19,1.87.25.53.48,1.04.58,1.69"/>
    <line class="cls-5" x1="29.54" y1="8.03" x2="30.98" y2="8.03"/>
    <path class="cls-5" d="M15.45,4.46c-1.32.05-1.77.97-2.19,1.87-.25.53-.48,1.04-.58,1.69"/>
    <line class="cls-10" x1="68.08" y1="20.97" x2="79.77" y2="20.97"/><line class="cls-10" x1="68.08" y1="20.97" x2="79.77" y2="20.97"/><path class="cls-10" d="M79.77,26.81c-2.42-3.23-7-3.88-10.23-1.46-.56.42-1.05.91-1.46,1.46"/><path class="cls-10" d="M79.77,26.81c-2.42-3.23-7-3.88-10.23-1.46-.56.42-1.05.91-1.46,1.46"/>
    <line class="cls-10" x1="72.88" y1="43.33" x2="74.97" y2="43.33"/><line class="cls-10" x1="71.31" y1="41.81" x2="76.54" y2="41.81"/><line class="cls-10" x1="70.27" y1="40.31" x2="77.58" y2="40.31"/>
    <line class="cls-10" x1="36.94" y1="43.43" x2="34.85" y2="43.43"/><line class="cls-10" x1="38.51" y1="41.91" x2="33.28" y2="41.91"/><line class="cls-10" x1="39.55" y1="40.41" x2="32.24" y2="40.41"/>
    <line class="cls-10" x1="89.2" y1="43.33" x2="91.29" y2="43.33"/><line class="cls-10" x1="87.63" y1="41.81" x2="92.86" y2="41.81"/><line class="cls-10" x1="86.59" y1="40.31" x2="93.9" y2="40.31"/>
    <polyline class="cls-5" points="6.87 17.12 6.87 8.03 12.69 8.03"/>
  </g>
  <g id="Wiring">
    <polyline class="cls-8" points="73.71 7.94 73.71 7.9 60.52 7.9"/><line class="cls-5" x1="6.86" y1="34.08" x2="6.88" y2="40.31"/><polyline class="cls-5" points="35.84 17.66 35.75 8.05 30.98 8.05"/><line class="cls-5" x1="69.32" y1="7.94" x2="90.41" y2="7.94"/><line class="cls-9" x1="73.93" y1="18.47" x2="73.93" y2="7.83"/><line class="cls-9" x1="73.93" y1="23.62" x2="73.93" y2="34.61"/><line class="cls-5" x1="45.32" y1="7.93" x2="35.5" y2="7.93"/><line class="cls-5" x1="35.86" y1="35.35" x2="35.86" y2="40.41"/><line class="cls-5" x1="73.93" y1="34.08" x2="73.93" y2="40.31"/><line class="cls-5" x1="90.24" y1="34.08" x2="90.24" y2="40.31"/>
  </g>
  <g id="Layer_1-2" data-name="Layer 1">
     <path class="cls-6" d="M90.24,28.51l-4.13-1.19"/><path class="cls-6" d="M86.11,27.33l4.13-1.19"/><path class="cls-6" d="M90.24,26.13l4.13-1.19"/><path class="cls-6" d="M90.24,18.99l4.13,1.19"/><path class="cls-6" d="M86.11,17.8l4.13,1.19"/><path class="cls-6" d="M86.11,17.8l4.13-1.19"/><path class="cls-6" d="M90.24,16.61l4.13-1.19"/><path class="cls-6" d="M90.28,14.23l4.08,1.19"/><path class="cls-6" d="M90.24,28.51v6.09"/><path class="cls-6" d="M90.29,14.23v-6.29"/><polygon class="cls-7" points="101.67 9.16 101.67 24.98 97.62 29.28 97.62 13.45 101.67 9.16"/><path class="cls-6" d="M90.24,23.75l4.13,1.19"/><path class="cls-6" d="M86.11,22.56l4.13,1.19"/><path class="cls-6" d="M86.11,22.56l4.13-1.19"/><path class="cls-6" d="M90.24,21.37l4.13-1.19"/><line class="cls-6" x1="73.93" y1="17.8" x2="73.93" y2="20.97"/>
  </g>
</svg>
`;

interface SchematicProps {
  topology: 'buck' | 'boost';
  onProbe: (key: string, type: 'voltage' | 'current') => void;
}

export const Schematic: React.FC<SchematicProps> = ({ topology, onProbe }) => {
  const handleClick = (e: React.MouseEvent, key: string) => {
    // If Meta (Cmd) or Ctrl key is pressed, toggle current, else toggle voltage
    const type = (e.metaKey || e.ctrlKey) ? 'current' : 'voltage';
    // Mapping: v_in -> i_in, v_sw -> i_sw, etc.
    const mappedKey = type === 'current' 
      ? (key === 'v_in' ? 'v_in' : key === 'v_sw' ? 'i_sw' : key === 'v_d' ? 'i_d' : key === 'v_l' ? 'i_l' : key === 'v_o' ? 'i_c' : 'i_o')
      : key;
      
    // The legacy app had distinct data-voltage and data-current attributes.
    // "data-voltage=v_sw data-current=i_sw"
    
    let targetProbe = '';
    if (key === 'vin') targetProbe = type === 'voltage' ? 'v_in' : 'i_in'; // i_in not plotted usually
    if (key === 'sw') targetProbe = type === 'voltage' ? 'v_sw' : 'i_sw';
    if (key === 'd') targetProbe = type === 'voltage' ? 'v_d' : 'i_d';
    if (key === 'l') targetProbe = type === 'voltage' ? 'v_l' : 'i_l';
    if (key === 'c') targetProbe = type === 'voltage' ? 'v_o' : 'i_c';
    if (key === 'r') targetProbe = type === 'voltage' ? 'v_o' : 'i_o'; // i_o not plotted usually

    // Based on legacy plotting code:
    // Voltages: v_o, v_sw, v_l, v_in
    // Currents: i_l, i_c, i_d, i_sw
    
    // We filter out invalid probes
    const validProbes = ['v_o', 'v_sw', 'v_l', 'v_in', 'i_l', 'i_c', 'i_d', 'i_sw'];
    if (validProbes.includes(targetProbe)) {
      onProbe(targetProbe, type);
    }
  };

  const Hotspot = ({ top, left, width, height, id, label }: any) => (
    <button
      className="absolute border-2 border-transparent hover:border-green-500 hover:shadow-[0_0_10px_rgba(22,163,74,0.5)] rounded-lg cursor-pointer transition-all"
      style={{ top, left, width, height }}
      onClick={(e) => handleClick(e, id)}
      title={label}
    />
  );

  return (
    <div className="relative w-full border border-dashed border-slate-300 rounded-xl bg-white p-4">
      <div 
        className="w-full h-auto"
        dangerouslySetInnerHTML={{ __html: topology === 'buck' ? BUCK_SVG : BOOST_SVG }}
      />
      
      {/* Hotspots - Using exact percentages from legacy HTML */}
      <Hotspot id="vin" label="VIN" top="55%" left="7%" width="9%" height="28%" />
      <Hotspot id="sw" label="Switch S" top="34%" left="22%" width="9%" height="22%" />
      <Hotspot id="d" label="Diode D" top="35%" left="30%" width="8%" height="22%" />
      <Hotspot id="l" label="Inductor L" top="30%" left="46%" width="12%" height="28%" />
      <Hotspot id="c" label="Capacitor C" top="26%" left="60%" width="8%" height="45%" />
      <Hotspot id="r" label="Load R" top="28%" left="86%" width="8%" height="42%" />
    </div>
  );
};
