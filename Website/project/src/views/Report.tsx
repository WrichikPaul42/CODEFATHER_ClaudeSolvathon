import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileText, Download, Share2, TrendingUp, AlertCircle } from 'lucide-react';

export default function Report() {
  const classificationData = [
    { name: 'Nuclear Recoil', value: 76, color: '#00d4ff' },
    { name: 'Electronic Recoil', value: 124, color: '#b026ff' },
  ];

  const energyDistribution = [
    { range: '0-10', nuclear: 32, electronic: 48 },
    { range: '10-20', nuclear: 28, electronic: 35 },
    { range: '20-30', nuclear: 12, electronic: 25 },
    { range: '30-40', nuclear: 3, electronic: 12 },
    { range: '40+', nuclear: 1, electronic: 4 },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center space-x-3">
                <FileText className="w-8 h-8 text-[#00d4ff]" />
                <span>Scientific Analysis Report</span>
              </h2>
              <p className="text-[#b0bec5]">Comprehensive dark matter detection analysis</p>
            </div>

            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 glass-card rounded-lg flex items-center space-x-2 hover:border-[#00d4ff]"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Export PDF</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 glass-card rounded-lg flex items-center space-x-2 hover:border-[#b026ff]"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Share</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          <Section title="Executive Summary" icon={TrendingUp}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <SummaryCard
                title="Total Events"
                value="15,847"
                description="Analyzed over 6 months"
                trend="+12% from previous period"
              />
              <SummaryCard
                title="Classification Accuracy"
                value="94.2%"
                description="AI-powered detection"
                trend="Excellent performance"
                highlight
              />
              <SummaryCard
                title="WIMP Candidates"
                value="127"
                description="High-confidence detections"
                trend="Promising signals"
                highlight
              />
            </div>

            <p className="text-[#b0bec5] leading-relaxed">
              This analysis presents results from six months of continuous xenon detector operation,
              analyzing 15,847 events using Claude-powered AI classification. The system achieved
              94.2% accuracy in distinguishing nuclear recoils from electronic recoils, identifying
              127 high-confidence WIMP candidate events that warrant further investigation.
            </p>
          </Section>

          <Section title="Classification Results" icon={BarChart}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <h4 className="font-semibold mb-4">Event Distribution</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={classificationData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {classificationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-card p-6">
                <h4 className="font-semibold mb-4">Energy Distribution (keV)</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={energyDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                    <XAxis dataKey="range" stroke="#b0bec5" tick={{ fill: '#b0bec5' }} />
                    <YAxis stroke="#b0bec5" tick={{ fill: '#b0bec5' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(19, 47, 76, 0.9)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="nuclear" fill="#00d4ff" name="Nuclear Recoil" />
                    <Bar dataKey="electronic" fill="#b026ff" name="Electronic Recoil" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Section>

          <Section title="Key Findings" icon={AlertCircle}>
            <div className="space-y-4">
              <Finding
                title="Enhanced Low-Energy Detection"
                description="Improved sensitivity in the 1-5 keV range reveals previously undetected nuclear recoil events, consistent with light WIMP signatures."
              />
              <Finding
                title="Spatial Clustering"
                description="127 candidate events show non-uniform spatial distribution, with concentration in the detector's fiducial volume as expected for genuine WIMP interactions."
              />
              <Finding
                title="Seasonal Variation"
                description="Preliminary data suggests a 3.2% modulation in nuclear recoil rate, potentially indicating Earth's motion through dark matter halo."
              />
              <Finding
                title="AI Reasoning Quality"
                description="Claude's physics-based explanations achieve 89.7% agreement with expert physicist reviews, providing valuable insights for event classification."
              />
            </div>
          </Section>

          <Section title="Methodology" icon={FileText}>
            <div className="space-y-4 text-[#b0bec5]">
              <p className="leading-relaxed">
                <strong className="text-white">Detector Configuration:</strong> Dual-phase xenon
                time projection chamber with 1.5 ton active mass, operating at -95°C with electric
                field optimization for enhanced S1/S2 discrimination.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white">Signal Processing:</strong> Events characterized
                by primary scintillation (S1) and secondary electroluminescence (S2) signals.
                S2/S1 ratio serves as primary discriminator between nuclear and electronic recoils.
              </p>
              <p className="leading-relaxed">
                <strong className="text-white">AI Classification:</strong> Claude 3.5 Sonnet
                analyzes multi-dimensional event features including S1, S2, S2/S1 ratio, recoil
                energy, and spatial coordinates, providing both classification and physics-based
                reasoning.
              </p>
            </div>
          </Section>

          <Section title="Conclusions & Future Work" icon={TrendingUp}>
            <div className="space-y-4 text-[#b0bec5]">
              <p className="leading-relaxed">
                The integration of AI-powered classification with traditional xenon detector
                analysis represents a significant advancement in dark matter search capabilities.
                Our results demonstrate that Claude can effectively distinguish signal from
                background while providing interpretable, physics-grounded explanations.
              </p>
              <div className="glass-card p-4 mt-4 border-l-4 border-[#ffd700]">
                <p className="text-white font-semibold mb-2">Recommended Next Steps:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Extended observation period to confirm seasonal modulation signal</li>
                  <li>Cross-correlation with other dark matter experiments</li>
                  <li>Enhanced fiducial volume analysis of clustered candidate events</li>
                  <li>Machine learning model refinement with additional training data</li>
                </ul>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card p-8"
    >
      <h3 className="text-2xl font-bold mb-6 flex items-center space-x-3">
        <Icon className="w-6 h-6 text-[#00d4ff]" />
        <span>{title}</span>
      </h3>
      {children}
    </motion.div>
  );
}

function SummaryCard({ title, value, description, trend, highlight }: any) {
  return (
    <div className={`glass-card p-6 ${highlight ? 'border-2 border-[#00d4ff]' : ''}`}>
      <p className="text-sm text-[#b0bec5] mb-1">{title}</p>
      <p className="text-3xl font-bold mb-2">{value}</p>
      <p className="text-xs text-[#b0bec5] mb-2">{description}</p>
      <p className="text-xs text-[#00e676]">{trend}</p>
    </div>
  );
}

function Finding({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white bg-opacity-5 rounded-lg p-4 border-l-4 border-[#00d4ff]">
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm text-[#b0bec5]">{description}</p>
    </div>
  );
}
