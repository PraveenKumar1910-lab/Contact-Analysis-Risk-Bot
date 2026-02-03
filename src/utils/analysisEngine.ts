import { 
  ContractAnalysis, 
  ContractType, 
  Clause, 
  ClauseType, 
  RiskLevel, 
  ExtractedEntity 
} from '../types';

// Simulated NLP analysis engine
// In production, this would connect to a Python backend with spaCy/NLTK

const clausePatterns: Record<ClauseType, RegExp[]> = {
  penalty: [/penalty|penalt|fine|forfeit|liquidated damages/gi],
  indemnity: [/indemnif|indemnity|hold harmless|defend and indemnify/gi],
  termination: [/terminat|cancel|end.*agreement|discontinue/gi],
  arbitration: [/arbitrat|mediat|dispute resolution/gi],
  jurisdiction: [/jurisdiction|governing law|venue|court.*shall/gi],
  'auto-renewal': [/auto.*renew|automatic.*renewal|renew.*unless/gi],
  'lock-in': [/lock.*in|minimum.*period|commit.*period|binding.*period/gi],
  'non-compete': [/non.*compet|not.*compete|restrict.*competition/gi],
  'ip-transfer': [/intellectual property|ip.*transfer|patent|copyright.*assign|trademark/gi],
  confidentiality: [/confidential|non.*disclosure|nda|proprietary.*information/gi],
  payment: [/payment|fee|compensation|remuneration|salary|amount.*payable/gi],
  liability: [/liabilit|liable|responsible|damages/gi],
  general: [/.*/gi]
};

const riskIndicators = {
  high: [
    'unlimited liability',
    'waive all rights',
    'sole discretion',
    'without notice',
    'irrevocable',
    'perpetual',
    'exclusive jurisdiction',
    'personal guarantee',
    'automatic renewal',
    'unilateral termination',
    'non-refundable',
    'entire risk'
  ],
  medium: [
    'reasonable efforts',
    'material breach',
    'prior written consent',
    'commercially reasonable',
    'may terminate',
    'subject to change',
    'at its option',
    'binding arbitration'
  ],
  low: [
    'mutual agreement',
    'good faith',
    'proportionate',
    'reasonable notice',
    'pro-rata',
    'negotiated',
    'limited to'
  ]
};

function detectLanguage(text: string): 'english' | 'hindi' | 'mixed' {
  const hindiPattern = /[\u0900-\u097F]/;
  const hasHindi = hindiPattern.test(text);
  const englishWords = text.match(/[a-zA-Z]+/g)?.length || 0;
  
  if (hasHindi && englishWords > 50) return 'mixed';
  if (hasHindi) return 'hindi';
  return 'english';
}

function classifyContractType(text: string): ContractType {
  const lowerText = text.toLowerCase();
  
  if (/employment|employee|employer|salary|designation|probation/i.test(lowerText)) return 'employment';
  if (/vendor|supplier|purchase order|supply agreement/i.test(lowerText)) return 'vendor';
  if (/lease|rent|landlord|tenant|premises|property/i.test(lowerText)) return 'lease';
  if (/partnership|partner|profit sharing|capital contribution/i.test(lowerText)) return 'partnership';
  if (/service|consultant|consulting|deliverable|scope of work/i.test(lowerText)) return 'service';
  if (/non-disclosure|nda|confidential information|proprietary/i.test(lowerText)) return 'nda';
  
  return 'unknown';
}

function extractEntities(text: string): ExtractedEntity[] {
  const entities: ExtractedEntity[] = [];
  
  // Extract parties
  const partyPatterns = [
    /(?:between|by and between)\s+([A-Z][A-Za-z\s]+(?:Ltd|Pvt|Inc|LLC|LLP)?\.?)/gi,
    /(?:party of the first part|first party)[:\s]+([A-Za-z\s]+)/gi,
    /(?:party of the second part|second party)[:\s]+([A-Za-z\s]+)/gi
  ];
  
  partyPatterns.forEach(pattern => {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      if (match[1]) {
        entities.push({ type: 'party', value: match[1].trim(), confidence: 0.85 });
      }
    }
  });
  
  // Extract dates
  const datePattern = /(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}|\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4})/gi;
  const dateMatches = text.matchAll(datePattern);
  for (const match of dateMatches) {
    entities.push({ type: 'date', value: match[1], confidence: 0.9 });
  }
  
  // Extract amounts
  const amountPattern = /(Rs\.?\s*[\d,]+|INR\s*[\d,]+|\$\s*[\d,]+|₹\s*[\d,]+)/gi;
  const amountMatches = text.matchAll(amountPattern);
  for (const match of amountMatches) {
    entities.push({ type: 'amount', value: match[1], confidence: 0.88 });
  }
  
  // Extract duration
  const durationPattern = /(\d+\s*(?:year|month|week|day)s?)/gi;
  const durationMatches = text.matchAll(durationPattern);
  for (const match of durationMatches) {
    entities.push({ type: 'duration', value: match[1], confidence: 0.85 });
  }
  
  // Extract jurisdiction
  const jurisdictionPattern = /(?:courts? of|jurisdiction of)\s+([A-Za-z\s]+)/gi;
  const jurisdictionMatches = text.matchAll(jurisdictionPattern);
  for (const match of jurisdictionMatches) {
    entities.push({ type: 'jurisdiction', value: match[1].trim(), confidence: 0.82 });
  }
  
  return entities;
}

function extractClauses(text: string): Clause[] {
  const clauses: Clause[] = [];
  
  // Split by common clause headers
  const clausePattern = /(?:^|\n)\s*(\d+[\.\)]\s*|[A-Z]+[\.\)]\s*|CLAUSE\s*\d+|ARTICLE\s*\d+|Section\s*\d+)[:\s]*([A-Z][A-Za-z\s&]+)\n([\s\S]*?)(?=(?:\n\s*(?:\d+[\.\)]\s*|[A-Z]+[\.\)]\s*|CLAUSE|ARTICLE|Section)\s*[A-Z])|$)/gmi;
  
  const matches = text.matchAll(clausePattern);
  let index = 0;
  
  for (const match of matches) {
    const title = match[2]?.trim() || `Clause ${index + 1}`;
    const content = match[3]?.trim() || '';
    
    if (content.length > 20) {
      const clauseType = identifyClauseType(title, content);
      const riskAnalysis = analyzeClauseRisk(content);
      
      clauses.push({
        id: `clause-${index}`,
        title,
        content,
        type: clauseType,
        riskLevel: riskAnalysis.level,
        riskScore: riskAnalysis.score,
        explanation: generateClauseExplanation(title, content, clauseType),
        concerns: riskAnalysis.concerns,
        suggestions: generateSuggestions(clauseType, riskAnalysis.concerns),
        isUnfavorable: riskAnalysis.score > 60,
        category: identifyCategory(content)
      });
      index++;
    }
  }
  
  // If no clauses found with pattern, split by paragraphs
  if (clauses.length === 0) {
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 50);
    paragraphs.slice(0, 15).forEach((para, idx) => {
      const clauseType = identifyClauseType('', para);
      const riskAnalysis = analyzeClauseRisk(para);
      
      clauses.push({
        id: `clause-${idx}`,
        title: `Section ${idx + 1}`,
        content: para.trim(),
        type: clauseType,
        riskLevel: riskAnalysis.level,
        riskScore: riskAnalysis.score,
        explanation: generateClauseExplanation(`Section ${idx + 1}`, para, clauseType),
        concerns: riskAnalysis.concerns,
        suggestions: generateSuggestions(clauseType, riskAnalysis.concerns),
        isUnfavorable: riskAnalysis.score > 60,
        category: identifyCategory(para)
      });
    });
  }
  
  return clauses;
}

function identifyClauseType(title: string, content: string): ClauseType {
  const combined = `${title} ${content}`.toLowerCase();
  
  for (const [type, patterns] of Object.entries(clausePatterns)) {
    if (type === 'general') continue;
    for (const pattern of patterns) {
      if (pattern.test(combined)) {
        return type as ClauseType;
      }
    }
  }
  
  return 'general';
}

function analyzeClauseRisk(content: string): { level: RiskLevel; score: number; concerns: string[] } {
  const lowerContent = content.toLowerCase();
  const concerns: string[] = [];
  let score = 25; // Base score
  
  // Check for high risk indicators
  riskIndicators.high.forEach(indicator => {
    if (lowerContent.includes(indicator)) {
      score += 15;
      concerns.push(`Contains high-risk term: "${indicator}"`);
    }
  });
  
  // Check for medium risk indicators
  riskIndicators.medium.forEach(indicator => {
    if (lowerContent.includes(indicator)) {
      score += 8;
    }
  });
  
  // Check for low risk indicators (reduce score)
  riskIndicators.low.forEach(indicator => {
    if (lowerContent.includes(indicator)) {
      score -= 5;
    }
  });
  
  // Specific risk patterns
  if (/shall not|must not|prohibited|forbidden/i.test(content)) {
    concerns.push('Contains prohibitions that may restrict your operations');
    score += 10;
  }
  
  if (/exclusive|sole|only/i.test(content)) {
    concerns.push('Contains exclusivity requirements');
    score += 12;
  }
  
  if (/perpetual|forever|unlimited|indefinite/i.test(content)) {
    concerns.push('Contains indefinite or perpetual terms');
    score += 15;
  }
  
  if (/waive|forfeit|surrender|relinquish/i.test(content)) {
    concerns.push('May require waiver of important rights');
    score += 18;
  }
  
  score = Math.max(0, Math.min(100, score));
  
  const level: RiskLevel = score > 65 ? 'high' : score > 35 ? 'medium' : 'low';
  
  return { level, score, concerns };
}

function identifyCategory(content: string): 'obligation' | 'right' | 'prohibition' | 'general' {
  const lowerContent = content.toLowerCase();
  
  if (/shall not|must not|may not|prohibited|forbidden|restricted/i.test(lowerContent)) {
    return 'prohibition';
  }
  if (/shall|must|required|obligated|responsible for/i.test(lowerContent)) {
    return 'obligation';
  }
  if (/entitled|may|right to|option to|privilege/i.test(lowerContent)) {
    return 'right';
  }
  
  return 'general';
}

function generateClauseExplanation(_title: string, _content: string, type: ClauseType): string {
  const explanations: Record<ClauseType, string> = {
    penalty: 'This clause specifies financial penalties or charges that may apply if certain conditions are not met. Make sure you understand all triggers for these penalties.',
    indemnity: 'This indemnification clause requires one party to compensate the other for losses or damages. Review carefully who bears this responsibility and under what circumstances.',
    termination: 'This section outlines how and when the agreement can be ended. Pay attention to notice periods, conditions for termination, and any consequences.',
    arbitration: 'This establishes how disputes will be resolved - typically through arbitration rather than courts. Note the location, rules, and costs involved.',
    jurisdiction: 'This determines which courts and laws will govern the agreement. Consider the practical implications of the chosen jurisdiction.',
    'auto-renewal': 'This clause automatically extends the agreement unless specific action is taken. Mark your calendar for the cancellation deadline.',
    'lock-in': 'This commits you to a minimum period before you can exit. Understand the financial implications of early termination.',
    'non-compete': 'This restricts your ability to engage in competing activities. Review the scope, duration, and geographic limitations carefully.',
    'ip-transfer': 'This relates to ownership of intellectual property. Clarify what IP is being transferred and what rights you retain.',
    confidentiality: 'This outlines obligations to keep certain information private. Understand what information is covered and for how long.',
    payment: 'This specifies payment terms including amounts, timing, and conditions. Ensure all financial terms are clear and acceptable.',
    liability: 'This addresses responsibility for damages or losses. Check for any caps on liability and exclusions.',
    general: 'This is a general contractual provision. Review it in the context of the overall agreement.'
  };
  
  return explanations[type] || explanations.general;
}

function generateSuggestions(type: ClauseType, concerns: string[]): string[] {
  const suggestions: string[] = [];
  void concerns; // Used in conditional logic below
  
  const typeSuggestions: Record<ClauseType, string[]> = {
    penalty: [
      'Negotiate a cap on maximum penalties',
      'Request a cure period before penalties apply',
      'Ensure penalties are proportionate to actual damages'
    ],
    indemnity: [
      'Seek mutual indemnification rather than one-sided',
      'Cap indemnity obligations at a reasonable amount',
      'Exclude indirect and consequential damages'
    ],
    termination: [
      'Ensure both parties have equal termination rights',
      'Negotiate for termination for convenience clause',
      'Request longer notice period if needed'
    ],
    arbitration: [
      'Consider if arbitration in your city is possible',
      'Clarify who bears arbitration costs',
      'Request option for expedited proceedings'
    ],
    jurisdiction: [
      'Negotiate for jurisdiction in your state/city',
      'Consider practical aspects of distant jurisdiction',
      'Specify governing law explicitly'
    ],
    'auto-renewal': [
      'Request removal of auto-renewal clause',
      'Negotiate for advance renewal notice requirement',
      'Add option to renegotiate terms before renewal'
    ],
    'lock-in': [
      'Negotiate shorter lock-in period',
      'Request pro-rata refund for early termination',
      'Add performance-based exit provisions'
    ],
    'non-compete': [
      'Limit geographic scope of restriction',
      'Reduce duration of non-compete period',
      'Define competing activities more narrowly'
    ],
    'ip-transfer': [
      'Retain rights to pre-existing IP',
      'Negotiate license-back for transferred IP',
      'Clarify ownership of jointly developed IP'
    ],
    confidentiality: [
      'Define confidential information clearly',
      'Set reasonable time limits on confidentiality',
      'Include standard exceptions for public information'
    ],
    payment: [
      'Negotiate milestone-based payments',
      'Include late payment interest provisions',
      'Clarify currency and payment method'
    ],
    liability: [
      'Negotiate mutual limitation of liability',
      'Cap liability at contract value',
      'Exclude consequential damages for both parties'
    ],
    general: [
      'Review this clause with legal counsel',
      'Ensure consistency with other contract terms',
      'Clarify any ambiguous language'
    ]
  };
  
  suggestions.push(...(typeSuggestions[type] || typeSuggestions.general));
  
  if (concerns.some(c => c.includes('perpetual'))) {
    suggestions.push('Replace indefinite terms with specific durations');
  }
  
  if (concerns.some(c => c.includes('exclusivity'))) {
    suggestions.push('Negotiate carve-outs from exclusivity requirements');
  }
  
  return suggestions.slice(0, 4);
}

function generateSummary(contractType: ContractType, clauses: Clause[], entities: ExtractedEntity[]): string {
  const typeNames: Record<ContractType, string> = {
    employment: 'Employment Agreement',
    vendor: 'Vendor/Supplier Contract',
    lease: 'Lease/Rental Agreement',
    partnership: 'Partnership Deed',
    service: 'Service Agreement',
    nda: 'Non-Disclosure Agreement',
    unknown: 'Contract'
  };
  
  const highRiskCount = clauses.filter(c => c.riskLevel === 'high').length;
  const parties = entities.filter(e => e.type === 'party').map(e => e.value);
  const amounts = entities.filter(e => e.type === 'amount').map(e => e.value);
  const durations = entities.filter(e => e.type === 'duration').map(e => e.value);
  
  let summary = `This is a ${typeNames[contractType]}`;
  
  if (parties.length > 0) {
    summary += ` involving ${parties.slice(0, 2).join(' and ')}`;
  }
  
  if (durations.length > 0) {
    summary += ` for a period of ${durations[0]}`;
  }
  
  if (amounts.length > 0) {
    summary += `. The contract involves financial terms including ${amounts[0]}`;
  }
  
  summary += `. The document contains ${clauses.length} key clauses, of which ${highRiskCount} require careful attention due to elevated risk levels.`;
  
  return summary;
}

function generateKeyFindings(clauses: Clause[], entities: ExtractedEntity[]): string[] {
  const findings: string[] = [];
  
  const highRiskClauses = clauses.filter(c => c.riskLevel === 'high');
  if (highRiskClauses.length > 0) {
    findings.push(`${highRiskClauses.length} high-risk clauses identified that require immediate attention`);
  }
  
  const unfavorableClauses = clauses.filter(c => c.isUnfavorable);
  if (unfavorableClauses.length > 0) {
    findings.push(`${unfavorableClauses.length} potentially unfavorable terms detected`);
  }
  
  const obligations = clauses.filter(c => c.category === 'obligation');
  const prohibitions = clauses.filter(c => c.category === 'prohibition');
  
  if (obligations.length > 0) {
    findings.push(`${obligations.length} binding obligations identified`);
  }
  
  if (prohibitions.length > 0) {
    findings.push(`${prohibitions.length} restrictions/prohibitions found`);
  }
  
  const jurisdictions = entities.filter(e => e.type === 'jurisdiction');
  if (jurisdictions.length > 0) {
    findings.push(`Jurisdiction: ${jurisdictions[0].value}`);
  }
  
  // Check for specific clause types
  const hasAutoRenewal = clauses.some(c => c.type === 'auto-renewal');
  if (hasAutoRenewal) {
    findings.push('Contains auto-renewal provisions - mark renewal deadline');
  }
  
  const hasNonCompete = clauses.some(c => c.type === 'non-compete');
  if (hasNonCompete) {
    findings.push('Non-compete restrictions apply - review scope carefully');
  }
  
  return findings;
}

function generateRecommendations(clauses: Clause[]): string[] {
  const recommendations: string[] = [];
  
  const highRiskClauses = clauses.filter(c => c.riskLevel === 'high');
  if (highRiskClauses.length > 0) {
    recommendations.push('Consult with a legal professional before signing - multiple high-risk clauses detected');
    highRiskClauses.slice(0, 2).forEach(c => {
      recommendations.push(`Renegotiate the ${c.title} clause to reduce risk exposure`);
    });
  }
  
  const hasIndemnity = clauses.some(c => c.type === 'indemnity');
  if (hasIndemnity) {
    recommendations.push('Request mutual indemnification and cap on liability amounts');
  }
  
  const hasLockIn = clauses.some(c => c.type === 'lock-in');
  if (hasLockIn) {
    recommendations.push('Negotiate exit provisions or shorter lock-in period');
  }
  
  recommendations.push('Keep a signed copy for your records');
  recommendations.push('Set calendar reminders for key dates and deadlines');
  
  return recommendations.slice(0, 6);
}

function detectComplianceIssues(text: string, contractType: ContractType): string[] {
  const issues: string[] = [];
  const lowerText = text.toLowerCase();
  
  // Indian law compliance checks
  if (contractType === 'employment') {
    if (!/notice period|termination notice/i.test(text)) {
      issues.push('Employment contract should specify notice period as per Indian labor laws');
    }
    if (!/provident fund|pf|gratuity/i.test(text) && /salary|compensation/i.test(text)) {
      issues.push('Consider including PF and Gratuity provisions as required under Indian law');
    }
    if (/non-compete/i.test(text)) {
      issues.push('Note: Non-compete clauses may have limited enforceability under Indian Contract Act');
    }
  }
  
  if (contractType === 'lease') {
    if (!/stamp duty|registration/i.test(text)) {
      issues.push('Lease agreements require proper stamp duty and registration under Indian Registration Act');
    }
    if (!/security deposit/i.test(text)) {
      issues.push('Security deposit terms should be clearly specified');
    }
  }
  
  if (/foreign jurisdiction|laws of usa|laws of uk|delaware|california/i.test(lowerText)) {
    issues.push('Contract specifies foreign jurisdiction - may complicate dispute resolution for Indian SMEs');
  }
  
  if (!/gst|goods and services tax/i.test(text) && /payment|fee|amount/i.test(text)) {
    issues.push('Consider clarifying GST applicability and responsibility');
  }
  
  if (/personal guarantee/i.test(lowerText)) {
    issues.push('Personal guarantee clause detected - understand personal liability implications');
  }
  
  return issues;
}

function detectAmbiguities(clauses: Clause[]): string[] {
  const ambiguities: string[] = [];
  
  clauses.forEach(clause => {
    const content = clause.content.toLowerCase();
    
    if (/reasonable|appropriate|adequate|sufficient/i.test(content) && !/defined as|means/i.test(content)) {
      ambiguities.push(`"${clause.title}" uses subjective terms like "reasonable" without clear definition`);
    }
    
    if (/may|might|could/i.test(content) && /shall|must/i.test(content)) {
      ambiguities.push(`"${clause.title}" mixes mandatory and permissive language - clarify obligations`);
    }
    
    if (/etc\.|and so on|and similar|or other/i.test(content)) {
      ambiguities.push(`"${clause.title}" contains open-ended language that may be interpreted broadly`);
    }
    
    if (/material|significant|substantial/i.test(content) && !/defined|means|refers to/i.test(content)) {
      ambiguities.push(`"${clause.title}" uses undefined materiality thresholds`);
    }
  });
  
  return ambiguities.slice(0, 5);
}

function calculateOverallRisk(clauses: Clause[]): { score: number; level: RiskLevel } {
  if (clauses.length === 0) return { score: 50, level: 'medium' };
  
  const weights = { high: 3, medium: 2, low: 1 };
  let totalWeight = 0;
  let weightedSum = 0;
  
  clauses.forEach(clause => {
    const weight = weights[clause.riskLevel];
    totalWeight += weight;
    weightedSum += clause.riskScore * weight;
  });
  
  const score = Math.round(weightedSum / totalWeight);
  const level: RiskLevel = score > 60 ? 'high' : score > 35 ? 'medium' : 'low';
  
  return { score, level };
}

export function analyzeContract(text: string, fileName: string): ContractAnalysis {
  const language = detectLanguage(text);
  const contractType = classifyContractType(text);
  const entities = extractEntities(text);
  const clauses = extractClauses(text);
  const overallRisk = calculateOverallRisk(clauses);
  
  return {
    id: `analysis-${Date.now()}`,
    fileName,
    contractType,
    language,
    uploadedAt: new Date(),
    overallRiskScore: overallRisk.score,
    overallRiskLevel: overallRisk.level,
    clauses,
    entities,
    summary: generateSummary(contractType, clauses, entities),
    keyFindings: generateKeyFindings(clauses, entities),
    recommendations: generateRecommendations(clauses),
    complianceIssues: detectComplianceIssues(text, contractType),
    ambiguities: detectAmbiguities(clauses)
  };
}

export function translateHindiToEnglish(text: string): string {
  // Simulated translation - in production would use translation API
  // This maintains the structure while indicating translation occurred
  return text.replace(/[\u0900-\u097F]+/g, '[Translated from Hindi]');
}
