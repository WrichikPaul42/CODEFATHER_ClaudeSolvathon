import { motion } from 'framer-motion';
import { Zap, Activity, Crosshair, Gauge } from 'lucide-react';
import { Event } from '../types';

interface EventInspectorProps {
  event: Event | null;
}

export default function EventInspector({ event }: EventInspectorProps) {
  if (!event) {
    return (
      <div className="glass-card p-8 text-center">
        <Activity className="w-16 h-16 text-[#b0bec5] mx-auto mb-4 opacity-50" />
        <p className="text-[#b0bec5]">Select an event from the plot to inspect</p>
      </div>
    );
  }

  const isNuclear = event.classification === 'nuclear_recoil';
  const confidencePercent = Math.round(event.confidence * 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div className={`glass-card p-6 ${isNuclear ? 'glow-cyan' : 'glow-purple'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Event #{event.id}</h3>
          <div className={`px-4 py-2 rounded-full text-sm font-bold ${
            isNuclear ? 'bg-[#00d4ff] text-[#0a1929]' : 'bg-[#b026ff] text-white'
          }`}>
            {isNuclear ? 'NUCLEAR RECOIL' : 'ELECTRONIC RECOIL'}
          </div>
        </div>

        <div className="flex items-center justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="transform -rotate-90 w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke={isNuclear ? '#00d4ff' : '#b026ff'}
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - event.confidence)}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold">{confidencePercent}%</div>
                <div className="text-xs text-[#b0bec5]">Confidence</div>
              </div>
            </div>
          </div>
        </div>

        {event.true_label && (
          <div className="text-center mb-4">
            <span className="text-sm text-[#b0bec5]">True Label: </span>
            <span className="text-sm font-semibold">{event.true_label}</span>
          </div>
        )}
      </div>

      <div className="glass-card p-6">
        <h4 className="font-semibold mb-4 flex items-center space-x-2">
          <Gauge className="w-5 h-5 text-[#00d4ff]" />
          <span>Signal Metrics</span>
        </h4>

        <div className="grid grid-cols-2 gap-4">
          <MetricItem
            label="S1 Signal"
            value={`${event.s1.toFixed(1)} ph`}
            icon={Zap}
          />
          <MetricItem
            label="S2 Signal"
            value={`${event.s2.toFixed(1)} ph`}
            icon={Zap}
          />
          <MetricItem
            label="S2/S1 Ratio"
            value={event.s2_s1_ratio.toFixed(2)}
            icon={Activity}
          />
          <MetricItem
            label="Recoil Energy"
            value={`${event.recoil_energy.toFixed(2)} keV`}
            icon={Gauge}
          />
        </div>
      </div>

      <div className="glass-card p-6">
        <h4 className="font-semibold mb-4 flex items-center space-x-2">
          <Crosshair className="w-5 h-5 text-[#b026ff]" />
          <span>Position</span>
        </h4>

        <div className="grid grid-cols-3 gap-4">
          <MetricItem label="X" value={`${event.x.toFixed(2)} cm`} />
          <MetricItem label="Y" value={`${event.y.toFixed(2)} cm`} />
          <MetricItem label="Z" value={`${event.z.toFixed(2)} cm`} />
        </div>
      </div>

      {event.reasoning && (
        <div className="glass-card p-6">
          <h4 className="font-semibold mb-3">AI Reasoning</h4>
          <p className="text-sm text-[#b0bec5] leading-relaxed">
            {event.reasoning}
          </p>
        </div>
      )}
    </motion.div>
  );
}

function MetricItem({ label, value, icon: Icon }: { label: string; value: string; icon?: any }) {
  return (
    <div className="bg-white bg-opacity-5 rounded-lg p-3">
      <div className="flex items-center space-x-2 mb-1">
        {Icon && <Icon className="w-4 h-4 text-[#00d4ff]" />}
        <span className="text-xs text-[#b0bec5]">{label}</span>
      </div>
      <div className="text-lg font-semibold font-mono">{value}</div>
    </div>
  );
}
