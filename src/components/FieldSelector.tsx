import { Check } from 'lucide-react';
import { FieldCategory, fieldCategories } from '@/types/resume';
import { cn } from '@/lib/utils';

interface FieldSelectorProps {
  selected: FieldCategory;
  onSelect: (field: FieldCategory) => void;
}

const FieldSelector = ({ selected, onSelect }: FieldSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Select Your Field</h2>
        <p className="text-muted-foreground">We'll optimize your template for your industry</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
        {fieldCategories.map(({ value, label, icon, description }) => (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className={cn(
              "relative p-4 rounded-xl border-2 text-center transition-all duration-300 group",
              selected === value
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border bg-card hover:border-primary/50 hover:shadow-sm"
            )}
          >
            {selected === value && (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-3 h-3 text-primary-foreground" />
              </div>
            )}
            
            <div className="text-3xl mb-2">{icon}</div>
            <h3 className="font-medium text-sm mb-1">{label}</h3>
            <p className="text-xs text-muted-foreground line-clamp-1">{description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FieldSelector;
