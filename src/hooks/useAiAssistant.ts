import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type AiAction = 'generate_summary' | 'improve_text' | 'generate_bullets' | 'generate_from_job';

export function useAiAssistant() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const invoke = async (action: AiAction, context: string): Promise<string | null> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-resume', {
        body: { action, context },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      return data.result as string;
    } catch (e: any) {
      toast({
        title: 'AI Error',
        description: e?.message ?? 'Something went wrong',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { invoke, isLoading };
}
