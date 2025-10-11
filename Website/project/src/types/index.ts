export interface Event {
  id: string;
  s1: number;
  s2: number;
  s2_s1_ratio: number;
  recoil_energy: number;
  x: number;
  y: number;
  z: number;
  classification: 'nuclear_recoil' | 'electronic_recoil';
  true_label?: string;
  confidence: number;
  reasoning?: string;
}

export interface Statistics {
  totalEvents: number;
  accuracy: number;
  darkMatterCandidates: number;
  avgConfidence: number;
}
