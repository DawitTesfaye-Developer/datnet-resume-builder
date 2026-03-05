import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Plus, X, Languages } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const proficiencyLevels = [
  { value: 'native', label: 'Native / Bilingual' },
  { value: 'fluent', label: 'Fluent' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'basic', label: 'Basic' },
];

const commonLanguages = [
  'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese',
  'Arabic', 'Hindi', 'Portuguese', 'Russian', 'Korean', 'Italian',
  'Amharic', 'Somali', 'Swahili', 'Turkish', 'Dutch',
];

const getProficiencyColor = (p: string) => {
  switch (p) {
    case 'native': return 'bg-success/20 text-success';
    case 'fluent': return 'bg-primary/20 text-primary';
    case 'advanced': return 'bg-accent/20 text-accent';
    case 'intermediate': return 'bg-warning/20 text-warning';
    default: return 'bg-muted text-muted-foreground';
  }
};

const LanguagesForm = () => {
  const { resumeData, addLanguage, removeLanguage } = useResume();
  const [name, setName] = useState('');
  const [proficiency, setProficiency] = useState('intermediate');

  const existingNames = resumeData.languages.map((l) => l.name.toLowerCase());

  const handleAdd = (langName: string = name) => {
    if (langName.trim() && !existingNames.includes(langName.toLowerCase())) {
      addLanguage({ id: crypto.randomUUID(), name: langName.trim(), proficiency });
      setName('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Languages</h2>
        <p className="text-muted-foreground">Add languages you speak and your proficiency level</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="p-6">
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Type a language..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } }}
              />
            </div>
            <Select value={proficiency} onValueChange={setProficiency}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {proficiencyLevels.map((l) => (
                  <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={() => handleAdd()} disabled={!name.trim()}>
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Languages className="w-5 h-5 text-primary" />
            <h3 className="font-medium">Common Languages</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {commonLanguages
              .filter((l) => !existingNames.includes(l.toLowerCase()))
              .map((lang) => (
                <Button
                  key={lang}
                  variant="outline"
                  size="sm"
                  onClick={() => handleAdd(lang)}
                  className="rounded-full"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {lang}
                </Button>
              ))}
          </div>
        </Card>

        {resumeData.languages.length > 0 && (
          <Card className="p-6">
            <h3 className="font-medium mb-4">Your Languages ({resumeData.languages.length})</h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.languages.map((lang) => (
                <Badge
                  key={lang.id}
                  variant="secondary"
                  className={`${getProficiencyColor(lang.proficiency)} py-1.5 px-3 text-sm group`}
                >
                  {lang.name}
                  <span className="text-xs ml-1 opacity-60">
                    ({proficiencyLevels.find((p) => p.value === lang.proficiency)?.label || lang.proficiency})
                  </span>
                  <button
                    onClick={() => removeLanguage(lang.id)}
                    className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LanguagesForm;
