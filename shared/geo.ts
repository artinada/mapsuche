export interface GeoInput {
  business: string;
  website: string;
  city: string;
  service: string;
  consent: true;
  language?: 'en' | 'de';
}

export interface GeoCitation {
  url: string;
  title: string;
  start: number;
  end: number;
}

export interface GeoAnswer {
  question: string;
  status: 'completed' | 'failed';
  text: string;
  citations: GeoCitation[];
  mentioned: boolean;
  cited: boolean;
  responseId?: string;
  model?: string;
  checkedAt: string;
  inputTokens?: number;
  outputTokens?: number;
  error?: string;
}

export interface GeoReport {
  id: string;
  input: GeoInput;
  status: 'queued' | 'running' | 'completed' | 'partial' | 'failed';
  createdAt: string;
  updatedAt: string;
  expiresAt: number;
  model: string;
  promptVersion: string;
  answers: GeoAnswer[];
  metrics: { successful: number; total: number; mentions: number; citations: number; mentionRate: number | null; citationRate: number | null };
  competitors: { name: string; evidence: string; questionIndex: number }[];
  recommendations: string[];
  analysisStatus: 'pending' | 'completed' | 'failed' | 'unavailable';
  error?: string;
}

export interface GeoTicket { id: string; token: string; createdAt: string }
