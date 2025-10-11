import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Play, Settings } from 'lucide-react';

export default function DataGenerator() {
  const [numEvents, setNumEvents] = useState(1000);
  const [wimpPercentage, setWimpPercentage] = useState(10);
  const [neutronRate, setNeutronRate] = useState(5);
  const [electronicRate, setElectronicRate] = useState(85);
  const [energyMin, setEnergyMin] = useState(1);
  const [energyMax, setEnergyMax] = useState(100);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    setGenerated(false);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setGenerating(false);
          setGenerated(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDownload = (format: 'csv' | 'json') => {
    const mockData = `Event_ID,S1,S2,S2_S1_Ratio,Recoil_Energy,X,Y,Z,Classification\nEV00001,25.3,456.7,18.05,15.2,-5.2,3.1,12.4,nuclear_recoil\n`;
    const blob = new Blob([mockData], { type: format === 'csv' ? 'text/csv' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dark_matter_events.${format}`;
    a.click();
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-2 flex items-center space-x-3">
            <Settings className="w-8 h-8 text-[#00d4ff]" />
            <span>Synthetic Event Generator</span>
          </h2>
          <p className="text-[#b0bec5]">
            Generate realistic dark matter detector events with customizable parameters
          </p>
        </motion.div>

        <div className="glass-card p-8 mb-6">
          <div className="space-y-6">
            <ParameterSlider
              label="Number of Events"
              value={numEvents}
              onChange={setNumEvents}
              min={100}
              max={10000}
              step={100}
              unit=""
            />

            <ParameterSlider
              label="WIMP Event Percentage"
              value={wimpPercentage}
              onChange={setWimpPercentage}
              min={0}
              max={50}
              step={1}
              unit="%"
            />

            <ParameterSlider
              label="Neutron Background Rate"
              value={neutronRate}
              onChange={setNeutronRate}
              min={0}
              max={20}
              step={1}
              unit="%"
            />

            <ParameterSlider
              label="Electronic Recoil Rate"
              value={electronicRate}
              onChange={setElectronicRate}
              min={50}
              max={100}
              step={1}
              unit="%"
            />

            <div className="grid grid-cols-2 gap-4">
              <ParameterSlider
                label="Min Energy"
                value={energyMin}
                onChange={setEnergyMin}
                min={0.1}
                max={50}
                step={0.1}
                unit="keV"
              />

              <ParameterSlider
                label="Max Energy"
                value={energyMax}
                onChange={setEnergyMax}
                min={50}
                max={200}
                step={1}
                unit="keV"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={generating}
            className={`w-full mt-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors ${
              generating
                ? 'bg-[#b0bec5] cursor-not-allowed'
                : 'bg-[#00d4ff] hover:bg-[#00b8e6] text-[#0a1929]'
            }`}
          >
            <Play className="w-5 h-5" />
            <span>{generating ? 'Generating...' : 'Generate Dataset'}</span>
          </motion.button>

          {generating && (
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#b0bec5]">Generation Progress</span>
                <span className="text-[#00d4ff] font-semibold">{progress}%</span>
              </div>
              <div className="h-2 bg-white bg-opacity-10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-[#00d4ff] to-[#b026ff]"
                />
              </div>
            </div>
          )}
        </div>

        {generated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8"
          >
            <h3 className="text-xl font-semibold mb-4 text-[#00e676]">
              Generation Complete!
            </h3>

            <div className="bg-white bg-opacity-5 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
              <div className="text-[#b0bec5]">Preview (first 3 rows):</div>
              <pre className="mt-2 text-xs">
{`Event_ID    S1      S2       S2/S1   Energy  Class
EV00001    25.3    456.7    18.05   15.2    nuclear_recoil
EV00002    45.1    3234.5   71.72   28.4    electronic_recoil
EV00003    18.7    298.4    15.96   9.8     nuclear_recoil`}
              </pre>
            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDownload('csv')}
                className="flex-1 py-3 glass-card hover:border-[#00d4ff] rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Download CSV</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDownload('json')}
                className="flex-1 py-3 glass-card hover:border-[#b026ff] rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Download JSON</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

interface ParameterSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
}

function ParameterSlider({ label, value, onChange, min, max, step, unit }: ParameterSliderProps) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-sm font-medium text-[#b0bec5]">{label}</label>
        <span className="text-sm font-semibold text-[#00d4ff]">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-white bg-opacity-10 rounded-lg appearance-none cursor-pointer slider"
        style={{
          background: `linear-gradient(to right, #00d4ff 0%, #00d4ff ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) 100%)`
        }}
      />
    </div>
  );
}
