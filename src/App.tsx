import { useState, useCallback } from 'react';
import { 
  FileText, 
  Upload, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Download,
  FileSearch,
  Scale,
  BookOpen,
  History,
  AlertCircle,
  Lightbulb,
  BarChart3,
  Languages,
  Building2,
  Users,
  Briefcase,
  Home,
  FileSignature,
  Lock,
  Zap,
  Eye,
  Info,
  RefreshCw
} from 'lucide-react';
import { ContractAnalysis, RiskLevel, ContractType, AuditLogEntry } from './types';
import { analyzeContract } from './utils/analysisEngine';
import { contractTemplates } from './data/templates';
import { sampleContracts, sampleHindiContract } from './data/sampleContracts';
import { RiskGauge } from './components/RiskGauge';
import { ClauseCard } from './components/ClauseCard';
import { EntityBadge } from './components/EntityBadge';
import { TemplateCard } from './components/TemplateCard';
import { ExportModal } from './components/ExportModal';

type TabType = 'upload' | 'analysis' | 'templates' | 'history';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('upload');
  const [currentAnalysis, setCurrentAnalysis] = useState<ContractAnalysis | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<ContractAnalysis[]>([]);
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedText, setUploadedText] = useState('');
  const [fileName, setFileName] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const addAuditLog = useCallback((action: string, details: string, contractId?: string) => {
    const entry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date(),
      action,
      contractId,
      details
    };
    setAuditLog(prev => [entry, ...prev]);
  }, []);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    addAuditLog('FILE_UPLOAD', `Uploaded file: ${file.name}`);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setUploadedText(text);
    };
    reader.readAsText(file);
  }, [addAuditLog]);

  const handleTextPaste = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUploadedText(e.target.value);
    if (!fileName) setFileName('pasted-contract.txt');
  }, [fileName]);

  const loadSampleContract = useCallback((type: 'employment' | 'service' | 'lease' | 'hindi') => {
    if (type === 'hindi') {
      setUploadedText(sampleHindiContract);
      setFileName('sample-hindi-contract.txt');
    } else {
      setUploadedText(sampleContracts[type]);
      setFileName(`sample-${type}-contract.txt`);
    }
    addAuditLog('SAMPLE_LOADED', `Loaded sample ${type} contract`);
  }, [addAuditLog]);

  const runAnalysis = useCallback(async () => {
    if (!uploadedText.trim()) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    addAuditLog('ANALYSIS_STARTED', `Started analysis of ${fileName}`);

    // Simulate progressive analysis
    const progressSteps = [10, 25, 40, 55, 70, 85, 95, 100];
    for (const step of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setAnalysisProgress(step);
    }

    const analysis = analyzeContract(uploadedText, fileName);
    setCurrentAnalysis(analysis);
    setAnalysisHistory(prev => [analysis, ...prev]);
    setIsAnalyzing(false);
    setActiveTab('analysis');
    addAuditLog('ANALYSIS_COMPLETED', `Completed analysis with risk score: ${analysis.overallRiskScore}`, analysis.id);
  }, [uploadedText, fileName, addAuditLog]);

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    }
  };

  const getContractTypeIcon = (type: ContractType) => {
    switch (type) {
      case 'employment': return <Users className="w-5 h-5" />;
      case 'vendor': return <Briefcase className="w-5 h-5" />;
      case 'lease': return <Home className="w-5 h-5" />;
      case 'partnership': return <Users className="w-5 h-5" />;
      case 'service': return <FileSignature className="w-5 h-5" />;
      case 'nda': return <Lock className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getContractTypeName = (type: ContractType) => {
    const names: Record<ContractType, string> = {
      employment: 'Employment Agreement',
      vendor: 'Vendor Contract',
      lease: 'Lease Agreement',
      partnership: 'Partnership Deed',
      service: 'Service Agreement',
      nda: 'Non-Disclosure Agreement',
      unknown: 'General Contract'
    };
    return names[type];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-200">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">LegalLens</h1>
                <p className="text-xs text-slate-500">Contract Analysis & Risk Assessment</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full flex items-center gap-1">
                <Zap className="w-3 h-3" /> AI-Powered
              </span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full flex items-center gap-1">
                <Languages className="w-3 h-3" /> EN/HI
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {[
              { id: 'upload', label: 'Upload Contract', icon: Upload },
              { id: 'analysis', label: 'Analysis Results', icon: FileSearch, disabled: !currentAnalysis },
              { id: 'templates', label: 'Contract Templates', icon: BookOpen },
              { id: 'history', label: 'History & Audit', icon: History }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => !tab.disabled && setActiveTab(tab.id as TabType)}
                disabled={tab.disabled}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600 bg-indigo-50/50'
                    : tab.disabled
                    ? 'border-transparent text-slate-300 cursor-not-allowed'
                    : 'border-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                AI-Powered Contract Analysis for Indian SMEs
              </h2>
              <p className="text-slate-600 text-lg">
                Upload your contract and get instant risk assessment, clause-by-clause explanations, 
                and actionable recommendations in plain business language.
              </p>
            </div>

            {/* Upload Section */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* File Upload */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-indigo-500" />
                  Upload Contract
                </h3>
                
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer relative">
                  <input
                    type="file"
                    accept=".txt,.doc,.docx,.pdf"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-4 bg-indigo-100 rounded-full">
                      <FileText className="w-8 h-8 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-slate-700 font-medium">Drop your contract here</p>
                      <p className="text-slate-500 text-sm">or click to browse</p>
                    </div>
                    <p className="text-xs text-slate-400">Supports TXT, DOC, DOCX, PDF (text-based)</p>
                  </div>
                </div>

                {fileName && (
                  <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span className="text-emerald-700 text-sm font-medium">{fileName}</span>
                  </div>
                )}

                <div className="mt-6">
                  <p className="text-sm text-slate-600 mb-3">Or try with sample contracts:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { type: 'employment', label: 'Employment', icon: Users },
                      { type: 'service', label: 'Service', icon: Briefcase },
                      { type: 'lease', label: 'Lease', icon: Home },
                      { type: 'hindi', label: 'Hindi Contract', icon: Languages }
                    ].map(sample => (
                      <button
                        key={sample.type}
                        onClick={() => loadSampleContract(sample.type as 'employment' | 'service' | 'lease' | 'hindi')}
                        className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                      >
                        <sample.icon className="w-4 h-4" />
                        {sample.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Text Input */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <FileSignature className="w-5 h-5 text-indigo-500" />
                  Or Paste Contract Text
                </h3>
                <textarea
                  value={uploadedText}
                  onChange={handleTextPaste}
                  placeholder="Paste your contract text here...

Supports both English and Hindi contracts. The system will automatically detect the language and analyze the content."
                  className="w-full h-64 p-4 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                />
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    {uploadedText.length.toLocaleString()} characters
                  </span>
                  <button
                    onClick={runAnalysis}
                    disabled={!uploadedText.trim() || isAnalyzing}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Analyzing... {analysisProgress}%
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        Analyze Contract
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {[
                {
                  icon: Shield,
                  title: 'Risk Assessment',
                  description: 'Identify high-risk clauses, unfavorable terms, and potential legal pitfalls instantly.'
                },
                {
                  icon: Languages,
                  title: 'Multilingual Support',
                  description: 'Analyze contracts in English and Hindi with automatic language detection.'
                },
                {
                  icon: Lightbulb,
                  title: 'Plain Language Explanations',
                  description: 'Complex legal terms explained in simple business language you can understand.'
                },
                {
                  icon: Scale,
                  title: 'Compliance Checking',
                  description: 'Check compliance with Indian laws including Contract Act, Labor Laws, and more.'
                },
                {
                  icon: FileText,
                  title: 'SME-Friendly Templates',
                  description: 'Access standardized contract templates designed for Indian small businesses.'
                },
                {
                  icon: Download,
                  title: 'Export & Share',
                  description: 'Generate PDF reports for legal consultation and team collaboration.'
                }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="p-3 bg-indigo-100 rounded-lg w-fit mb-4">
                    <feature.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analysis Results Tab */}
        {activeTab === 'analysis' && currentAnalysis && (
          <div className="space-y-6">
            {/* Header with Actions */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  {getContractTypeIcon(currentAnalysis.contractType)}
                  <h2 className="text-2xl font-bold text-slate-800">
                    {getContractTypeName(currentAnalysis.contractType)}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(currentAnalysis.overallRiskLevel)}`}>
                    {currentAnalysis.overallRiskLevel.toUpperCase()} RISK
                  </span>
                </div>
                <p className="text-slate-600 flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {currentAnalysis.fileName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Languages className="w-4 h-4" />
                    {currentAnalysis.language === 'mixed' ? 'English + Hindi' : currentAnalysis.language.charAt(0).toUpperCase() + currentAnalysis.language.slice(1)}
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('upload')}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  New Analysis
                </button>
                <button
                  onClick={() => setShowExportModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
              </div>
            </div>

            {/* Overview Cards */}
            <div className="grid lg:grid-cols-4 gap-4">
              {/* Risk Gauge */}
              <div className="lg:col-span-1 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-sm font-medium text-slate-500 mb-4">Overall Risk Score</h3>
                <RiskGauge score={currentAnalysis.overallRiskScore} level={currentAnalysis.overallRiskLevel} />
              </div>

              {/* Summary Stats */}
              <div className="lg:col-span-3 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-sm font-medium text-slate-500 mb-4">Analysis Summary</h3>
                <p className="text-slate-700 mb-4">{currentAnalysis.summary}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-2xl font-bold text-slate-800">{currentAnalysis.clauses.length}</p>
                    <p className="text-xs text-slate-500">Total Clauses</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">
                      {currentAnalysis.clauses.filter(c => c.riskLevel === 'high').length}
                    </p>
                    <p className="text-xs text-red-600">High Risk</p>
                  </div>
                  <div className="text-center p-3 bg-amber-50 rounded-lg">
                    <p className="text-2xl font-bold text-amber-600">
                      {currentAnalysis.clauses.filter(c => c.isUnfavorable).length}
                    </p>
                    <p className="text-xs text-amber-600">Unfavorable</p>
                  </div>
                  <div className="text-center p-3 bg-emerald-50 rounded-lg">
                    <p className="text-2xl font-bold text-emerald-600">
                      {currentAnalysis.entities.length}
                    </p>
                    <p className="text-xs text-emerald-600">Entities Found</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Findings & Recommendations */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Key Findings */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  Key Findings
                </h3>
                <ul className="space-y-3">
                  {currentAnalysis.keyFindings.map((finding, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-xs font-medium">
                        {idx + 1}
                      </span>
                      <span className="text-slate-700 text-sm">{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-emerald-500" />
                  Recommendations
                </h3>
                <ul className="space-y-3">
                  {currentAnalysis.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Compliance Issues & Ambiguities */}
            {(currentAnalysis.complianceIssues.length > 0 || currentAnalysis.ambiguities.length > 0) && (
              <div className="grid lg:grid-cols-2 gap-6">
                {currentAnalysis.complianceIssues.length > 0 && (
                  <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                    <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Compliance Concerns
                    </h3>
                    <ul className="space-y-2">
                      {currentAnalysis.complianceIssues.map((issue, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-red-700 text-sm">
                          <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {currentAnalysis.ambiguities.length > 0 && (
                  <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                    <h3 className="text-lg font-semibold text-amber-800 mb-4 flex items-center gap-2">
                      <Info className="w-5 h-5" />
                      Ambiguous Language Detected
                    </h3>
                    <ul className="space-y-2">
                      {currentAnalysis.ambiguities.map((ambiguity, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-amber-700 text-sm">
                          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          {ambiguity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Extracted Entities */}
            {currentAnalysis.entities.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-indigo-500" />
                  Extracted Entities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentAnalysis.entities.map((entity, idx) => (
                    <EntityBadge key={idx} entity={entity} />
                  ))}
                </div>
              </div>
            )}

            {/* Clause-by-Clause Analysis */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-500" />
                  Clause-by-Clause Analysis
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  Detailed breakdown of each clause with risk assessment and recommendations
                </p>
              </div>
              <div className="divide-y divide-slate-100">
                {currentAnalysis.clauses.map((clause) => (
                  <ClauseCard key={clause.id} clause={clause} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                SME-Friendly Contract Templates
              </h2>
              <p className="text-slate-600">
                Balanced, fair contract templates designed specifically for Indian small and medium businesses. 
                These templates protect both parties and comply with Indian laws.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contractTemplates.map(template => (
                <TemplateCard 
                  key={template.id} 
                  template={template}
                  onUse={() => {
                    setUploadedText(template.content);
                    setFileName(`${template.name.toLowerCase().replace(/\s+/g, '-')}.txt`);
                    setActiveTab('upload');
                    addAuditLog('TEMPLATE_LOADED', `Loaded template: ${template.name}`);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Analysis History */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="p-6 border-b border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <History className="w-5 h-5 text-indigo-500" />
                    Analysis History
                  </h3>
                </div>
                <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
                  {analysisHistory.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">
                      <FileSearch className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No analyses yet. Upload a contract to get started.</p>
                    </div>
                  ) : (
                    analysisHistory.map(analysis => (
                      <div
                        key={analysis.id}
                        className="p-4 hover:bg-slate-50 cursor-pointer transition-colors"
                        onClick={() => {
                          setCurrentAnalysis(analysis);
                          setActiveTab('analysis');
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            {getContractTypeIcon(analysis.contractType)}
                            <div>
                              <p className="font-medium text-slate-800">{analysis.fileName}</p>
                              <p className="text-sm text-slate-500">
                                {getContractTypeName(analysis.contractType)}
                              </p>
                              <p className="text-xs text-slate-400 mt-1">
                                {analysis.uploadedAt.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(analysis.overallRiskLevel)}`}>
                            {analysis.overallRiskScore}%
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Audit Log */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="p-6 border-b border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-500" />
                    Audit Trail
                  </h3>
                </div>
                <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
                  {auditLog.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">
                      <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Audit log is empty. Actions will be recorded here.</p>
                    </div>
                  ) : (
                    auditLog.map(entry => (
                      <div key={entry.id} className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 mt-2 bg-indigo-500 rounded-full flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-slate-800">{entry.action.replace(/_/g, ' ')}</p>
                            <p className="text-sm text-slate-600">{entry.details}</p>
                            <p className="text-xs text-slate-400 mt-1">
                              {entry.timestamp.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Export Modal */}
      {showExportModal && currentAnalysis && (
        <ExportModal
          analysis={currentAnalysis}
          onClose={() => setShowExportModal(false)}
          onExport={() => {
            addAuditLog('REPORT_EXPORTED', `Exported PDF report for ${currentAnalysis.fileName}`, currentAnalysis.id);
          }}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">LegalLens</p>
                <p className="text-xs text-slate-500">Empowering SMEs with Legal Intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Confidential & Secure
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                Made for Indian SMEs
              </span>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
            <p>
              Disclaimer: This tool provides general guidance and is not a substitute for professional legal advice. 
              Always consult with a qualified legal professional for specific legal matters.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
