import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  delay?: number;
  glowColor?: 'cyan' | 'purple' | 'gold';
}

export default function StatCard({ title, value, icon: Icon, trend, delay = 0, glowColor }: StatCardProps) {
  const glowClass = glowColor ? `glow-${glowColor}` : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`glass-card p-6 ${glowClass}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[#b0bec5] text-sm font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-white mb-1">{value}</p>
          {trend && (
            <p className="text-sm text-[#00e676]">{trend}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${
          glowColor === 'cyan' ? 'bg-[#00d4ff] bg-opacity-20' :
          glowColor === 'purple' ? 'bg-[#b026ff] bg-opacity-20' :
          glowColor === 'gold' ? 'bg-[#ffd700] bg-opacity-20' :
          'bg-white bg-opacity-10'
        }`}>
          <Icon className={`w-6 h-6 ${
            glowColor === 'cyan' ? 'text-[#00d4ff]' :
            glowColor === 'purple' ? 'text-[#b026ff]' :
            glowColor === 'gold' ? 'text-[#ffd700]' :
            'text-white'
          }`} />
        </div>
      </div>
    </motion.div>
  );
}
