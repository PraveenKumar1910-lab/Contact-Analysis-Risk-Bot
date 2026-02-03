// Common contract issues faced by Indian SMEs

export const commonIssues = [
  {
    category: 'Employment Contracts',
    issues: [
      {
        title: 'Non-Compete Clause Enforceability',
        description: 'Non-compete clauses are generally not enforceable in India under Section 27 of the Indian Contract Act, 1872, which treats agreements in restraint of trade as void. However, reasonable restrictions during employment are usually valid.',
        recommendation: 'Focus on confidentiality and non-solicitation clauses instead of broad non-compete restrictions.'
      },
      {
        title: 'Missing PF/Gratuity Provisions',
        description: 'Many SME employment contracts omit mandatory benefits like Provident Fund (for establishments with 20+ employees) and Gratuity (for employees with 5+ years of service).',
        recommendation: 'Include clear provisions for statutory benefits to ensure compliance with EPF Act and Payment of Gratuity Act.'
      },
      {
        title: 'Unclear Notice Period Terms',
        description: 'Ambiguous notice periods can lead to disputes during resignation or termination.',
        recommendation: 'Specify exact notice periods for different scenarios (during probation, after confirmation) and alternatives like payment in lieu of notice.'
      }
    ]
  },
  {
    category: 'Service Agreements',
    issues: [
      {
        title: 'Unlimited Liability Exposure',
        description: 'Many service contracts lack proper liability caps, exposing SMEs to potentially unlimited financial risk.',
        recommendation: 'Negotiate liability caps (typically 12 months of fees paid) and exclude indirect/consequential damages.'
      },
      {
        title: 'Vague Scope of Work',
        description: 'Undefined or broad service descriptions lead to scope creep and disputes.',
        recommendation: 'Include detailed scope of work, specific deliverables, timelines, and a clear change request process.'
      },
      {
        title: 'One-sided Termination Rights',
        description: 'Contracts often favor one party with liberal termination rights while restricting the other.',
        recommendation: 'Ensure mutual termination rights with equal notice periods and fair termination-for-convenience clauses.'
      }
    ]
  },
  {
    category: 'Vendor Contracts',
    issues: [
      {
        title: 'Missing Quality Standards',
        description: 'Lack of defined quality standards makes it difficult to reject substandard goods or services.',
        recommendation: 'Include specific quality benchmarks, testing procedures, and acceptance criteria with clear rejection and replacement mechanisms.'
      },
      {
        title: 'Unclear GST Responsibilities',
        description: 'Ambiguity about GST inclusion/exclusion leads to disputes and unexpected costs.',
        recommendation: 'Explicitly state whether prices are inclusive or exclusive of GST and specify which party is responsible for GST compliance.'
      },
      {
        title: 'Inadequate Warranty Terms',
        description: 'Short or absent warranty periods leave buyers without recourse for defective products.',
        recommendation: 'Negotiate adequate warranty periods (minimum 12 months) with clear warranty scope and service level commitments.'
      }
    ]
  },
  {
    category: 'Lease Agreements',
    issues: [
      {
        title: 'Lock-in Period Penalties',
        description: 'Harsh lock-in penalties can trap SMEs in unsuitable premises during business downturns.',
        recommendation: 'Negotiate shorter lock-in periods, include business hardship clauses, and cap early termination penalties.'
      },
      {
        title: 'Excessive Rent Escalation',
        description: 'Annual escalation rates of 15% or higher quickly make premises unaffordable.',
        recommendation: 'Negotiate escalation rates aligned with inflation (5-7%) or link to market rates with caps.'
      },
      {
        title: 'Security Deposit Terms',
        description: 'Large interest-free deposits and delayed refund terms affect SME cash flow.',
        recommendation: 'Negotiate smaller deposits (3 months instead of 6-12), interest provisions, and quick refund timelines (30 days).'
      }
    ]
  },
  {
    category: 'Partnership Deeds',
    issues: [
      {
        title: 'Unclear Exit Mechanisms',
        description: 'Absence of clear partner exit provisions leads to prolonged disputes.',
        recommendation: 'Include detailed valuation methods, buy-out procedures, and settlement timelines for partner exits.'
      },
      {
        title: 'Unequal Decision Rights',
        description: 'Disproportionate control rights regardless of capital contribution create conflicts.',
        recommendation: 'Align voting rights with capital contribution and specify which decisions require unanimous consent.'
      },
      {
        title: 'Missing Dispute Resolution',
        description: 'Court litigation is costly and time-consuming for partnership disputes.',
        recommendation: 'Include stepped dispute resolution with mediation before arbitration, and specify arbitrator selection process.'
      }
    ]
  }
];

export const indianLegalCompliance = {
  contractAct: {
    title: 'Indian Contract Act, 1872',
    keyProvisions: [
      'Section 10: All agreements are contracts if made by free consent of parties competent to contract',
      'Section 27: Agreements in restraint of trade are void',
      'Section 28: Agreements in restraint of legal proceedings are void',
      'Section 73-74: Compensation for breach and liquidated damages provisions'
    ]
  },
  laborLaws: {
    title: 'Key Labor Laws for SMEs',
    requirements: [
      'Shops and Establishments Act: Registration, working hours, leave provisions',
      'EPF Act: Provident Fund contribution for establishments with 20+ employees',
      'ESI Act: Health insurance for establishments with 10+ employees',
      'Payment of Gratuity Act: Gratuity for employees with 5+ years service',
      'Minimum Wages Act: Compliance with state-specific minimum wages'
    ]
  },
  stampDuty: {
    title: 'Stamp Duty Requirements',
    note: 'Stamp duty varies by state and contract type. Unstamped agreements may not be admissible as evidence.',
    commonRates: [
      'Employment Contracts: Usually nominal (Rs. 100-500)',
      'Lease Agreements: 1-5% of annual rent depending on state',
      'Partnership Deeds: 1-2% of capital depending on state',
      'Service Agreements: Usually 0.5-1% of contract value'
    ]
  }
};

export const negotiationTips = [
  {
    scenario: 'When facing unlimited liability clauses',
    tips: [
      'Propose liability cap equal to 12 months of fees or contract value',
      'Request exclusion of consequential and indirect damages',
      'Suggest mutual liability limitations',
      'Include carve-outs for gross negligence and willful misconduct only'
    ]
  },
  {
    scenario: 'When facing harsh termination clauses',
    tips: [
      'Request symmetrical termination rights',
      'Negotiate termination for convenience with reasonable notice',
      'Include cure periods for material breaches',
      'Limit termination penalties to actual losses'
    ]
  },
  {
    scenario: 'When facing strict confidentiality requirements',
    tips: [
      'Ensure mutual confidentiality obligations',
      'Include standard exceptions (publicly available information, etc.)',
      'Set reasonable time limits (2-3 years post-termination)',
      'Define "confidential information" clearly to avoid over-broad interpretation'
    ]
  },
  {
    scenario: 'When facing IP assignment clauses',
    tips: [
      'Retain rights to pre-existing IP',
      'Negotiate license-back for improvements to pre-existing IP',
      'Clarify ownership of work done outside project scope',
      'Consider shared ownership for jointly developed innovations'
    ]
  }
];
