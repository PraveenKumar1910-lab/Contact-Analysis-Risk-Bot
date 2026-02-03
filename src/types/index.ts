export type RiskLevel = 'low' | 'medium' | 'high';

export type ContractType = 
  | 'employment'
  | 'vendor'
  | 'lease'
  | 'partnership'
  | 'service'
  | 'nda'
  | 'unknown';

export type ClauseType = 
  | 'penalty'
  | 'indemnity'
  | 'termination'
  | 'arbitration'
  | 'jurisdiction'
  | 'auto-renewal'
  | 'lock-in'
  | 'non-compete'
  | 'ip-transfer'
  | 'confidentiality'
  | 'payment'
  | 'liability'
  | 'general';

export type EntityType = 
  | 'party'
  | 'date'
  | 'amount'
  | 'duration'
  | 'jurisdiction'
  | 'deliverable';

export interface ExtractedEntity {
  type: EntityType;
  value: string;
  confidence: number;
}

export interface Clause {
  id: string;
  title: string;
  content: string;
  type: ClauseType;
  riskLevel: RiskLevel;
  riskScore: number;
  explanation: string;
  concerns: string[];
  suggestions: string[];
  isUnfavorable: boolean;
  category: 'obligation' | 'right' | 'prohibition' | 'general';
}

export interface ContractAnalysis {
  id: string;
  fileName: string;
  contractType: ContractType;
  language: 'english' | 'hindi' | 'mixed';
  uploadedAt: Date;
  overallRiskScore: number;
  overallRiskLevel: RiskLevel;
  clauses: Clause[];
  entities: ExtractedEntity[];
  summary: string;
  keyFindings: string[];
  recommendations: string[];
  complianceIssues: string[];
  ambiguities: string[];
}

export interface ContractTemplate {
  id: string;
  name: string;
  type: ContractType;
  description: string;
  content: string;
  suitableFor: string[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  action: string;
  contractId?: string;
  details: string;
}

export interface AppState {
  currentAnalysis: ContractAnalysis | null;
  analysisHistory: ContractAnalysis[];
  auditLog: AuditLogEntry[];
  isAnalyzing: boolean;
  activeTab: 'upload' | 'analysis' | 'templates' | 'history';
}
