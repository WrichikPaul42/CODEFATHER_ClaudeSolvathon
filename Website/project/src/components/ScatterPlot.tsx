import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Event } from '../types';

interface ScatterPlotProps {
  events: Event[];
  onEventClick: (event: Event) => void;
  selectedEventId?: string;
}

export default function ScatterPlot({ events, onEventClick, selectedEventId }: ScatterPlotProps) {
  const nuclearData = events
    .filter(e => e.classification === 'nuclear_recoil')
    .map(e => ({ ...e, s1Log: Math.log10(e.s1) }));

  const electronicData = events
    .filter(e => e.classification === 'electronic_recoil')
    .map(e => ({ ...e, s1Log: Math.log10(e.s1) }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const event = payload[0].payload;
      return (
        <div className="glass-card p-4 text-sm">
          <p className="font-semibold mb-2">Event #{event.id}</p>
          <p>S1: {event.s1.toFixed(1)} ph</p>
          <p>S2/S1: {event.s2_s1_ratio.toFixed(2)}</p>
          <p>Energy: {event.recoil_energy.toFixed(2)} keV</p>
          <p className="mt-2 text-xs">
            <span className={event.classification === 'nuclear_recoil' ? 'text-[#00d4ff]' : 'text-[#b026ff]'}>
              {event.classification === 'nuclear_recoil' ? 'Nuclear Recoil' : 'Electronic Recoil'}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">S2/S1 vs S1 Distribution</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#00d4ff]"></div>
            <span className="text-[#b0bec5]">Nuclear ({nuclearData.length})</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#b026ff]"></div>
            <span className="text-[#b0bec5]">Electronic ({electronicData.length})</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={500}>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis
            type="number"
            dataKey="s1Log"
            name="S1"
            label={{ value: 'log₁₀(S1) [photons]', position: 'insideBottom', offset: -10, fill: '#b0bec5' }}
            stroke="#b0bec5"
            tick={{ fill: '#b0bec5' }}
          />
          <YAxis
            type="number"
            dataKey="s2_s1_ratio"
            name="S2/S1"
            label={{ value: 'S2/S1 Ratio', angle: -90, position: 'insideLeft', fill: '#b0bec5' }}
            stroke="#b0bec5"
            tick={{ fill: '#b0bec5' }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter
            name="Nuclear Recoil"
            data={nuclearData}
            fill="#00d4ff"
            opacity={0.7}
            onClick={(data) => onEventClick(data)}
            shape="circle"
          />
          <Scatter
            name="Electronic Recoil"
            data={electronicData}
            fill="#b026ff"
            opacity={0.7}
            onClick={(data) => onEventClick(data)}
            shape="circle"
          />
        </ScatterChart>
      </ResponsiveContainer>

      <div className="mt-4 text-xs text-[#b0bec5] text-center">
        Click on any point to inspect event details
      </div>
    </div>
  );
}
