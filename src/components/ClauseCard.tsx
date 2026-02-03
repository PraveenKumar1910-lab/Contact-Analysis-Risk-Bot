import { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  CheckCircle, 
  AlertCircle,
  Lightbulb,
  Shield,
  Scale,
  FileText,
  Lock,
  DollarSign,
  Clock,
  Users,
  Gavel
} from 'lucide-react';
import { Clause, ClauseType } from '../types';

interface ClauseCardProps {
  clause: Clause;
}

export function ClauseCard({ clause }: ClauseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getClauseTypeIcon = (type: ClauseType) => {
    const icons: Record<ClauseType, React.ReactNode> = {
      penalty: <DollarSign className="w-4 h-4" />,
      indemnity: <Shield className="w-4 h-4" />,
      termination: <AlertTriangle className="w-4 h-4" />,
      arbitration: <Gavel className="w-4 h-4" />,
      jurisdiction: <Scale className="w-4 h-4" />,
      'auto-renewal': <Clock className="w-4 h-4" />,
      'lock-in': <Lock className="w-4 h-4" />,
      'non-compete': <Users className="w-4 h-4" />,
      'ip-transfer': <FileText className="w-4 h-4" />,
      confidentiality: <Lock className="w-4 h-4" />,
      payment: <DollarSign className="w-4 h-4" />,
      liability: <AlertCircle className="w-4 h-4" />,
      general: <FileText className="w-4 h-4" />
    };
    return icons[type];
  };

  const getClauseTypeName = (type: ClauseType) => {
    const names: Record<ClauseType, string> = {
      penalty: 'Penalty Clause',
      indemnity: 'Indemnification',
      termination: 'Termination',
      arbitration: 'Arbitration',
      jurisdiction: 'Jurisdiction',
      'auto-renewal': 'Auto-Renewal',
      'lock-in': 'Lock-in Period',
      'non-compete': 'Non-Compete',
      'ip-transfer': 'IP Transfer',
      confidentiality: 'Confidentiality',
      payment: 'Payment Terms',
      liability: 'Liability',
      general: 'General Terms'
    };
    return names[type];
  };

  const getRiskStyles = () => {
    switch (clause.riskLevel) {
      case 'high':
        return {
          border: 'border-l-red-500',
          bg: 'bg-red-50/50',
          badge: 'bg-red-100 text-red-700',
          icon: <AlertTriangle className="w-4 h-4 text-red-500" />
        };
      case 'medium':
        return {
          border: 'border-l-amber-500',
          bg: 'bg-amber-50/50',
          badge: 'bg-amber-100 text-amber-700',
          icon: <AlertCircle className="w-4 h-4 text-amber-500" />
        };
      case 'low':
        return {
          border: 'border-l-emerald-500',
          bg: 'bg-emerald-50/50',
          badge: 'bg-emerald-100 text-emerald-700',
          icon: <CheckCircle className="w-4 h-4 text-emerald-500" />
        };
    }
  };

  const getCategoryBadge = () => {
    switch (clause.category) {
      case 'obligation':
        return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">Obligation</span>;
      case 'right':
        return <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Right</span>;
      case 'prohibition':
        return <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">Prohibition</span>;
      default:
        return null;
    }
  };

  const styles = getRiskStyles();

  return (
    <div className={`border-l-4 ${styles.border} ${isExpanded ? styles.bg : 'hover:bg-slate-50'} transition-colors`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0 mt-0.5">
              {styles.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-semibold text-slate-800">{clause.title}</h4>
                {clause.isUnfavorable && (
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                    Unfavorable
                  </span>
                )}
                {getCategoryBadge()}
              </div>
              <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  {getClauseTypeIcon(clause.type)}
                  {getClauseTypeName(clause.type)}
                </span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles.badge}`}>
                  Risk: {clause.riskScore}%
                </span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-4">
          {/* Original Content */}
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h5 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Original Text</h5>
            <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
              {clause.content.length > 500 ? clause.content.slice(0, 500) + '...' : clause.content}
            </p>
          </div>

          {/* Plain Language Explanation */}
          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
            <h5 className="text-xs font-medium text-indigo-600 uppercase tracking-wide mb-2 flex items-center gap-1">
              <Lightbulb className="w-3 h-3" />
              Plain Language Explanation
            </h5>
            <p className="text-sm text-indigo-900">{clause.explanation}</p>
          </div>

          {/* Concerns */}
          {clause.concerns.length > 0 && (
            <div className="bg-red-50 rounded-lg p-4 border border-red-100">
              <h5 className="text-xs font-medium text-red-600 uppercase tracking-wide mb-2 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Concerns
              </h5>
              <ul className="space-y-1">
                {clause.concerns.map((concern, idx) => (
                  <li key={idx} className="text-sm text-red-800 flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    {concern}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggestions */}
          {clause.suggestions.length > 0 && (
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <h5 className="text-xs font-medium text-emerald-600 uppercase tracking-wide mb-2 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Negotiation Suggestions
              </h5>
              <ul className="space-y-1">
                {clause.suggestions.map((suggestion, idx) => (
                  <li key={idx} className="text-sm text-emerald-800 flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">→</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
