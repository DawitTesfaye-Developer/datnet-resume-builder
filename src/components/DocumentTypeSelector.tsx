import { FileText, BookOpen, Check } from 'lucide-react';
import { DocumentType } from '@/types/resume';
import { cn } from '@/lib/utils';

interface DocumentTypeSelectorProps {
  selected: DocumentType;
  onSelect: (type: DocumentType) => void;
}

const documentTypes = [
  {
    type: 'resume' as DocumentType,
    title: 'Resume',
    description: 'Concise 1-2 page document highlighting key skills and recent experience. Best for job applications.',
    icon: FileText,
    features: ['1-2 pages', 'Recent experience focus', 'Skills highlighted', 'ATS optimized'],
  },
  {
    type: 'cv' as DocumentType,
    title: 'Curriculum Vitae (CV)',
    description: 'Comprehensive document including full career history, publications, and achievements. Ideal for academia or research.',
    icon: BookOpen,
    features: ['No page limit', 'Complete history', 'Publications included', 'Academic focus'],
  },
];

const DocumentTypeSelector = ({ selected, onSelect }: DocumentTypeSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">What would you like to create?</h2>
        <p className="text-muted-foreground">Choose the document type that fits your needs</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {documentTypes.map(({ type, title, description, icon: Icon, features }) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={cn(
              "relative p-6 rounded-2xl border-2 text-left transition-all duration-300 group",
              selected === type
                ? "border-primary bg-primary/5 shadow-lg"
                : "border-border bg-card hover:border-primary/50 hover:shadow-md"
            )}
          >
            {selected === type && (
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
            
            <div className={cn(
              "w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors",
              selected === type ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
            )}>
              <Icon className="w-7 h-7" />
            </div>
            
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
            
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DocumentTypeSelector;
