# LegalLens - Contract Analysis & Risk Assessment Bot

![LegalLens Banner](https://img.shields.io/badge/LegalLens-AI%20Powered-blue)
![React](https://img.shields.io/badge/React-19.x-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8)

## 🎯 Problem Statement

A sophisticated GenAI-powered legal assistant that helps small and medium business owners understand complex contracts, identify potential legal risks, and receive actionable advice in plain language.

## ✨ Features

### Core Legal NLP Tasks
- ✅ Contract Type Classification
- ✅ Clause & Sub-Clause Extraction
- ✅ Named Entity Recognition (Parties, Dates, Jurisdiction, Liabilities, Amounts)
- ✅ Obligation vs. Right vs. Prohibition Identification
- ✅ Risk & Compliance Detection
- ✅ Ambiguity Detection & Flagging

### Risk Assessment
- ✅ Clause-level Risk Scores (Low/Medium/High)
- ✅ Contract-level Composite Risk Score
- ✅ Detection of Penalty, Indemnity, Termination clauses
- ✅ Auto-Renewal & Lock-in Period identification
- ✅ Non-compete & IP Transfer clause detection

### User-Facing Outputs
- ✅ Simplified contract summary
- ✅ Clause-by-clause plain-language explanation
- ✅ Unfavorable clause highlighting
- ✅ Suggested renegotiation alternatives
- ✅ SME-friendly contract templates
- ✅ Export options (TXT, JSON, Print)

### Multilingual Support
- ✅ English contract parsing
- ✅ Hindi contract parsing
- ✅ Automatic language detection

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite
- **Charts**: Recharts
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/legallens-contract-analyzer.git

# Navigate to project directory
cd legallens-contract-analyzer

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
