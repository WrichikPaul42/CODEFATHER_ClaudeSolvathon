import { motion } from 'framer-motion';
import { Atom, Lightbulb, Zap, Brain, ExternalLink } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#b026ff] flex items-center justify-center glow-cyan">
              <Atom className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-4">About Dark Matter Scribe</h2>
          <p className="text-xl text-[#b0bec5] max-w-2xl mx-auto">
            Advancing dark matter research through AI-powered particle detection analysis
          </p>
        </motion.div>

        <div className="space-y-6">
          <InfoSection
            title="What is Dark Matter?"
            icon={Atom}
            color="#00d4ff"
            delay={0.1}
          >
            <p className="text-[#b0bec5] leading-relaxed mb-4">
              Dark matter is one of the greatest mysteries in modern physics. It makes up approximately
              85% of the matter in the universe, yet it doesn't emit, absorb, or reflect light, making
              it invisible to conventional detection methods.
            </p>
            <p className="text-[#b0bec5] leading-relaxed">
              Scientists infer its existence through gravitational effects on visible matter, radiation,
              and the large-scale structure of the universe. Leading candidates for dark matter particles
              include WIMPs (Weakly Interacting Massive Particles), which could occasionally interact
              with ordinary matter in detectors deep underground.
            </p>
          </InfoSection>

          <InfoSection
            title="How Xenon Detectors Work"
            icon={Zap}
            color="#b026ff"
            delay={0.2}
          >
            <p className="text-[#b0bec5] leading-relaxed mb-4">
              Dual-phase xenon time projection chambers are among the most sensitive dark matter
              detectors. They use ultra-pure liquid xenon maintained at -95°C in a low-background
              environment deep underground to shield from cosmic rays.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <SignalCard
                title="S1 Signal (Primary Scintillation)"
                description="When a particle interacts with xenon, it produces prompt scintillation light (S1). This first signal indicates the energy deposited."
                color="#00d4ff"
              />
              <SignalCard
                title="S2 Signal (Electroluminescence)"
                description="Ionization electrons drift upward through an electric field, producing a delayed, amplified light signal (S2) that helps locate the interaction."
                color="#b026ff"
              />
            </div>

            <p className="text-[#b0bec5] leading-relaxed">
              The S2/S1 ratio is crucial for discrimination: nuclear recoils (potential WIMP interactions)
              produce low S2/S1 ratios, while electronic recoils (background radiation) produce high ratios.
            </p>
          </InfoSection>

          <InfoSection
            title="Signal Types Explained"
            icon={Lightbulb}
            color="#ffd700"
            delay={0.3}
          >
            <div className="space-y-4">
              <TypeCard
                title="Nuclear Recoil"
                description="Occurs when a particle collides with a xenon nucleus, transferring momentum. WIMPs would produce nuclear recoils with characteristic low S2/S1 ratios and energies typically below 50 keV."
                color="#00d4ff"
                isTarget
              />
              <TypeCard
                title="Electronic Recoil"
                description="Results from interactions with atomic electrons, primarily from background gamma rays and beta particles. These produce high S2/S1 ratios and must be carefully distinguished from signal events."
                color="#b026ff"
              />
            </div>
          </InfoSection>

          <InfoSection
            title="The Role of AI in Discovery"
            icon={Brain}
            color="#00d4ff"
            delay={0.4}
          >
            <p className="text-[#b0bec5] leading-relaxed mb-4">
              Dark Matter Scribe leverages Claude 3.5 Sonnet to analyze complex multi-dimensional
              event signatures that traditional algorithms might miss. The AI doesn't just classify
              events but provides detailed physics-based reasoning for each decision.
            </p>

            <div className="glass-card p-6 mb-4">
              <h4 className="font-semibold mb-3 text-[#00d4ff]">Key Advantages:</h4>
              <ul className="space-y-2 text-sm text-[#b0bec5]">
                <li className="flex items-start space-x-2">
                  <span className="text-[#00d4ff] mt-1">•</span>
                  <span>Pattern recognition across 7+ dimensional feature space</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#00d4ff] mt-1">•</span>
                  <span>Interpretable explanations grounded in particle physics principles</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#00d4ff] mt-1">•</span>
                  <span>Continuous learning from new data and edge cases</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#00d4ff] mt-1">•</span>
                  <span>Hypothesis generation for anomalous events</span>
                </li>
              </ul>
            </div>

            <p className="text-[#b0bec5] leading-relaxed">
              This fusion of cutting-edge AI and fundamental physics research represents a new
              paradigm in experimental particle physics, where machines don't replace human insight
              but amplify it.
            </p>
          </InfoSection>

          <InfoSection
            title="Research & References"
            icon={ExternalLink}
            color="#b026ff"
            delay={0.5}
          >
            <div className="space-y-3">
              <ReferenceLink
                title="The XENON Dark Matter Project"
                description="Leading xenon-based direct detection experiment"
                url="xenon.org"
              />
              <ReferenceLink
                title="LUX-ZEPLIN (LZ) Experiment"
                description="Next-generation dark matter detector using liquid xenon"
                url="lz.lbl.gov"
              />
              <ReferenceLink
                title="Particle Data Group - Dark Matter"
                description="Comprehensive review of dark matter physics"
                url="pdg.lbl.gov"
              />
            </div>
          </InfoSection>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="glass-card p-8">
            <p className="text-[#b0bec5] italic">
              "The universe is not only queerer than we suppose, but queerer than we can suppose."
            </p>
            <p className="text-sm text-[#b0bec5] mt-2">— J.B.S. Haldane</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function InfoSection({ title, icon: Icon, color, children, delay = 0 }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass-card p-8"
    >
      <h3 className="text-2xl font-bold mb-6 flex items-center space-x-3">
        <Icon className="w-6 h-6" style={{ color }} />
        <span>{title}</span>
      </h3>
      {children}
    </motion.div>
  );
}

function SignalCard({ title, description, color }: any) {
  return (
    <div className="bg-white bg-opacity-5 rounded-lg p-4 border-l-4" style={{ borderColor: color }}>
      <h4 className="font-semibold mb-2" style={{ color }}>{title}</h4>
      <p className="text-sm text-[#b0bec5]">{description}</p>
    </div>
  );
}

function TypeCard({ title, description, color, isTarget }: any) {
  return (
    <div className={`glass-card p-6 ${isTarget ? 'border-2' : ''}`} style={isTarget ? { borderColor: color } : {}}>
      <div className="flex items-start space-x-4">
        <div className="w-3 h-3 rounded-full mt-1" style={{ backgroundColor: color }}></div>
        <div className="flex-1">
          <h4 className="font-semibold mb-2">{title}</h4>
          <p className="text-sm text-[#b0bec5]">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ReferenceLink({ title, description, url }: any) {
  return (
    <a
      href={`https://${url}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block glass-card p-4 hover:border-[#00d4ff] transition-colors group"
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold mb-1 group-hover:text-[#00d4ff] transition-colors">{title}</h4>
          <p className="text-sm text-[#b0bec5]">{description}</p>
        </div>
        <ExternalLink className="w-5 h-5 text-[#b0bec5] group-hover:text-[#00d4ff] transition-colors" />
      </div>
    </a>
  );
}
