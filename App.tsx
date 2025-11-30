import React, { useState, useMemo } from 'react';
import { Header } from './components/Header.tsx';
import { Schematic } from './components/Schematic.tsx';
import { ControlPanel } from './components/ControlPanel.tsx';
import { WaveformPlot } from './components/WaveformPlot.tsx';
import { SimulationParams, DEFAULT_PARAMS, computeWaveforms, Topology } from './utils/simulationEngine.ts';
import { RefreshCw, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [topology, setTopology] = useState<Topology>('buck');
  const [params, setParams] = useState<SimulationParams>(DEFAULT_PARAMS);
  const [voltageProbes, setVoltageProbes] = useState<string[]>(['v_o']);
  const [currentProbes, setCurrentProbes] = useState<string[]>(['i_l']);

  // Compute simulation data
  const data = useMemo(() => {
    return computeWaveforms(topology, params);
  }, [topology, params]);

  const handleReset = () => {
    setParams(DEFAULT_PARAMS);
    setVoltageProbes(['v_o']);
    setCurrentProbes(['i_l']);
  };

  const handleProbe = (key: string, type: 'voltage' | 'current') => {
    if (type === 'voltage') {
      setVoltageProbes(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
    } else {
      setCurrentProbes(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
    }
  };

  const toggleProbe = (key: string, type: 'voltage' | 'current') => {
    if (type === 'voltage') {
      setVoltageProbes(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
    } else {
      setCurrentProbes(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Header />
      
      {/* Topology Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex gap-6 overflow-x-auto">
            {['buck', 'boost'].map((t) => (
              <button
                key={t}
                onClick={() => setTopology(t as Topology)}
                className={`py-4 text-sm font-semibold border-b-2 transition-colors capitalize ${
                  topology === t 
                    ? 'border-primary-600 text-primary-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {t} Converter
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Visualization */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 capitalize flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary-500" />
                    {topology} Converter
                  </h2>
                  <div className="mt-1 text-sm text-slate-500 flex items-center gap-1">
                    <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-xs font-medium border border-blue-100">Hint</span>
                    Click component for Voltage. <kbd className="font-mono bg-slate-100 px-1 rounded border border-slate-200 text-xs">Cmd/Ctrl</kbd> + Click for Current.
                  </div>
                </div>
                <button 
                  onClick={handleReset}
                  className="text-sm text-slate-500 hover:text-primary-600 flex items-center gap-1.5 px-3 py-1.5 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>

              <Schematic topology={topology} onProbe={handleProbe} />
            </div>

            <WaveformPlot 
              title="Voltages" 
              type="voltage" 
              data={data} 
              selectedKeys={voltageProbes} 
              onChangeSelection={(k) => toggleProbe(k, 'voltage')}
            />
            
            <WaveformPlot 
              title="Currents" 
              type="current" 
              data={data} 
              selectedKeys={currentProbes} 
              onChangeSelection={(k) => toggleProbe(k, 'current')}
            />

          </div>

          {/* Right Column: Controls */}
          <div className="lg:col-span-4">
            <ControlPanel 
              params={params} 
              onChange={setParams} 
              topology={topology}
            />
          </div>

        </div>
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
          <p>Interactive Power Electronics Lab &bull; Ported to React</p>
        </div>
      </footer>
    </div>
  );
};

export default App;