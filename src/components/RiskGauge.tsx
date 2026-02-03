import { RiskLevel } from '../types';

interface RiskGaugeProps {
  score: number;
  level: RiskLevel;
}

export function RiskGauge({ score, level }: RiskGaugeProps) {
  const getColor = () => {
    switch (level) {
      case 'high': return { primary: '#dc2626', secondary: '#fecaca', text: 'text-red-600' };
      case 'medium': return { primary: '#d97706', secondary: '#fef3c7', text: 'text-amber-600' };
      case 'low': return { primary: '#059669', secondary: '#d1fae5', text: 'text-emerald-600' };
    }
  };

  const color = getColor();
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke={color.secondary}
            strokeWidth="10"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke={color.primary}
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${color.text}`}>{score}</span>
          <span className="text-xs text-slate-500">/ 100</span>
        </div>
      </div>
      <div className={`mt-3 px-4 py-1.5 rounded-full text-sm font-semibold ${
        level === 'high' ? 'bg-red-100 text-red-700' :
        level === 'medium' ? 'bg-amber-100 text-amber-700' :
        'bg-emerald-100 text-emerald-700'
      }`}>
        {level.toUpperCase()} RISK
      </div>
    </div>
  );
}
