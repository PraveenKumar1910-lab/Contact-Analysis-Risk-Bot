import { 
  User, 
  Calendar, 
  DollarSign, 
  Clock, 
  MapPin, 
  Package 
} from 'lucide-react';
import { ExtractedEntity, EntityType } from '../types';

interface EntityBadgeProps {
  entity: ExtractedEntity;
}

export function EntityBadge({ entity }: EntityBadgeProps) {
  const getEntityStyle = (type: EntityType) => {
    const styles: Record<EntityType, { bg: string; text: string; icon: React.ReactNode }> = {
      party: { 
        bg: 'bg-blue-100', 
        text: 'text-blue-800', 
        icon: <User className="w-3 h-3" /> 
      },
      date: { 
        bg: 'bg-purple-100', 
        text: 'text-purple-800', 
        icon: <Calendar className="w-3 h-3" /> 
      },
      amount: { 
        bg: 'bg-green-100', 
        text: 'text-green-800', 
        icon: <DollarSign className="w-3 h-3" /> 
      },
      duration: { 
        bg: 'bg-amber-100', 
        text: 'text-amber-800', 
        icon: <Clock className="w-3 h-3" /> 
      },
      jurisdiction: { 
        bg: 'bg-red-100', 
        text: 'text-red-800', 
        icon: <MapPin className="w-3 h-3" /> 
      },
      deliverable: { 
        bg: 'bg-teal-100', 
        text: 'text-teal-800', 
        icon: <Package className="w-3 h-3" /> 
      }
    };
    return styles[type];
  };

  const getTypeName = (type: EntityType) => {
    const names: Record<EntityType, string> = {
      party: 'Party',
      date: 'Date',
      amount: 'Amount',
      duration: 'Duration',
      jurisdiction: 'Jurisdiction',
      deliverable: 'Deliverable'
    };
    return names[type];
  };

  const style = getEntityStyle(entity.type);

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${style.bg} ${style.text}`}>
      {style.icon}
      <span className="font-medium">{entity.value}</span>
      <span className="text-xs opacity-70">({getTypeName(entity.type)})</span>
    </div>
  );
}
