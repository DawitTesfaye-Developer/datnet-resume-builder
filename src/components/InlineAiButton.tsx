import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, Check, X } from 'lucide-react';
import { useAiAssistant } from '@/hooks/useAiAssistant';

interface InlineAiButtonProps {
  action: 'inline_improve' | 'inline_bullets' | 'suggest_skills';
  context: string;
  onApply: (result: string) => void;
  label?: string;
  size?: 'sm' | 'default';
}

const InlineAiButton = ({ action, context, onApply, label = 'AI', size = 'sm' }: InlineAiButtonProps) => {
  const { invoke, isLoading } = useAiAssistant();
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = async () => {
    const res = await invoke(action, context);
    if (res) setResult(res);
  };

  const handleApply = () => {
    if (result) {
      onApply(result);
      setResult(null);
    }
  };

  if (result) {
    return (
      <div className="mt-2 rounded-lg border border-primary/30 bg-primary/5 p-3 space-y-2 animate-fade-in">
        <div className="text-xs font-medium text-primary flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> AI Suggestion
        </div>
        <div className="text-sm whitespace-pre-wrap leading-relaxed">{result}</div>
        <div className="flex gap-2">
          <Button size="sm" variant="default" onClick={handleApply} className="gap-1 h-7 text-xs">
            <Check className="w-3 h-3" /> Apply
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setResult(null)} className="gap-1 h-7 text-xs">
            <X className="w-3 h-3" /> Dismiss
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size={size}
      onClick={handleGenerate}
      disabled={isLoading || !context.trim()}
      className="gap-1.5 text-primary hover:text-primary hover:bg-primary/10"
    >
      {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
      {label}
    </Button>
  );
};

export default InlineAiButton;
