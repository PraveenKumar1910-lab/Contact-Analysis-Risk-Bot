import { 
  Users, 
  Briefcase, 
  Home, 
  FileSignature, 
  Lock, 
  FileText,
  Download,
  Eye,
  ArrowRight
} from 'lucide-react';
import { ContractTemplate, ContractType } from '../types';
import { useState } from 'react';

interface TemplateCardProps {
  template: ContractTemplate;
  onUse: () => void;
}

export function TemplateCard({ template, onUse }: TemplateCardProps) {
  const [showPreview, setShowPreview] = useState(false);

  const getTypeIcon = (type: ContractType) => {
    const icons: Record<ContractType, React.ReactNode> = {
      employment: <Users className="w-6 h-6" />,
      vendor: <Briefcase className="w-6 h-6" />,
      lease: <Home className="w-6 h-6" />,
      partnership: <Users className="w-6 h-6" />,
      service: <FileSignature className="w-6 h-6" />,
      nda: <Lock className="w-6 h-6" />,
      unknown: <FileText className="w-6 h-6" />
    };
    return icons[type];
  };

  const getTypeColor = (type: ContractType) => {
    const colors: Record<ContractType, string> = {
      employment: 'bg-blue-100 text-blue-600',
      vendor: 'bg-amber-100 text-amber-600',
      lease: 'bg-green-100 text-green-600',
      partnership: 'bg-purple-100 text-purple-600',
      service: 'bg-indigo-100 text-indigo-600',
      nda: 'bg-red-100 text-red-600',
      unknown: 'bg-slate-100 text-slate-600'
    };
    return colors[type];
  };

  const handleDownload = () => {
    const blob = new Blob([template.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="p-6">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${getTypeColor(template.type)}`}>
            {getTypeIcon(template.type)}
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">{template.name}</h3>
          <p className="text-sm text-slate-600 mb-4">{template.description}</p>
          <div className="flex flex-wrap gap-1 mb-4">
            {template.suitableFor.map((tag, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-2">
          <button
            onClick={() => setShowPreview(true)}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <button
            onClick={onUse}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            Use
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-800">{template.name}</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <pre className="text-sm text-slate-700 whitespace-pre-wrap font-mono leading-relaxed">
                {template.content}
              </pre>
            </div>
            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onUse();
                  setShowPreview(false);
                }}
                className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-2"
              >
                Use This Template
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
