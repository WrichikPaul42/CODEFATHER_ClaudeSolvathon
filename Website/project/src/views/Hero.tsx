import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Database, FileText } from 'lucide-react';
import StatCard from '../components/StatCard';

interface HeroProps {
  onNavigate: (view: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#b026ff] flex items-center justify-center glow-cyan">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Dark Matter Scribe
          </h1>
          <p className="text-2xl md:text-3xl gradient-text font-semibold mb-4">
            AI-Powered Universe Decoder
          </p>
          <p className="text-xl text-[#b0bec5] max-w-2xl mx-auto mb-12">
            Detecting the invisible. One photon at a time.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('dashboard')}
              className="px-8 py-4 bg-[#00d4ff] text-[#0a1929] rounded-lg font-semibold flex items-center space-x-2 hover:bg-[#00b8e6] transition-colors shadow-lg"
            >
              <span>Explore Events</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('generate')}
              className="px-8 py-4 glass-card text-white rounded-lg font-semibold flex items-center space-x-2 hover:border-[#b026ff] transition-colors"
            >
              <Database className="w-5 h-5" />
              <span>Generate Data</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('report')}
              className="px-8 py-4 glass-card text-white rounded-lg font-semibold flex items-center space-x-2 hover:border-[#ffd700] transition-colors"
            >
              <FileText className="w-5 h-5" />
              <span>View Report</span>
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total Events Analyzed"
            value="15,847"
            icon={Sparkles}
            trend="+1,234 this week"
            delay={0.3}
            glowColor="cyan"
          />
          <StatCard
            title="Classification Accuracy"
            value="94.2%"
            icon={Sparkles}
            trend="+2.1% improvement"
            delay={0.4}
            glowColor="purple"
          />
          <StatCard
            title="Dark Matter Candidates"
            value="127"
            icon={Sparkles}
            trend="High confidence"
            delay={0.5}
            glowColor="gold"
          />
          <StatCard
            title="AI Confidence"
            value="89.7%"
            icon={Sparkles}
            trend="Excellent"
            delay={0.6}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="glass-card p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <p className="text-[#b0bec5] max-w-3xl mx-auto leading-relaxed">
            Dark Matter Scribe uses advanced AI to analyze signals from xenon detectors,
            distinguishing between nuclear recoils (potential dark matter interactions) and
            electronic recoils (background noise). Our Claude-powered system provides detailed
            physics-based reasoning for each classification, helping researchers identify
            promising dark matter candidates with unprecedented accuracy.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
