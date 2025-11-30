import React from 'react';
import { SimulationParams } from '../utils/simulationEngine.ts';

interface ControlPanelProps {
  params: SimulationParams;
  onChange: (newParams: SimulationParams) => void;
  topology: 'buck' | 'boost';
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ params, onChange, topology }) => {
  const handleChange = (key: keyof SimulationParams, value: number) => {
    onChange({ ...params, [key]: value });
  };

  const sliders = [
    { label: 'Input Voltage Vi (V)', key: 'Vi', min: 3, max: 48, step: 0.1 },
    { label: 'Switching Freq fsw (kHz)', key: 'fsw', min: 10, max: 1000, step: 1 },
    { label: 'Duty Cycle D (0-1)', key: 'D', min: 0.05, max: 0.95, step: 0.01 },
    { label: 'Inductance L (µH)', key: 'L', min: 0.1, max: 200, step: 0.1 },
    { label: 'Capacitance C (µF)', key: 'C', min: 1, max: 10000, step: 1 },
    { label: 'Load R (Ω)', key: 'R', min: 0.1, max: 200, step: 0.1 },
    { label: 'Periods', key: 'periods', min: 1, max: 10, step: 1 },
  ] as const;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm sticky top-20">
      <h3 className="font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">Parameters</h3>
      <div className="space-y-4">
        {sliders.map((s) => (
          <div key={s.key} className="space-y-1">
            <div className="flex justify-between items-center text-sm">
              <label htmlFor={s.key} className="font-medium text-slate-700">{s.label}</label>
              <input
                type="number"
                value={params[s.key]}
                onChange={(e) => handleChange(s.key, parseFloat(e.target.value))}
                className="w-20 px-2 py-1 text-right text-slate-600 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                step={s.step}
              />
            </div>
            <input
              type="range"
              id={s.key}
              min={s.min}
              max={s.max}
              step={s.step}
              value={params[s.key]}
              onChange={(e) => handleChange(s.key, parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600 hover:accent-primary-500"
            />
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-500 leading-relaxed">
        <p className="font-semibold mb-1">Model Notes:</p>
        <p>
          {topology === 'buck' 
            ? "Ideal Buck CCM. Vo = D·Vi. Inductor ripple is derived from (Vi-Vo)/L during ON time." 
            : "Ideal Boost CCM. Vo = Vi/(1-D). Inductor ripple is derived from Vi/L during ON time."}
        </p>
      </div>
    </div>
  );
};