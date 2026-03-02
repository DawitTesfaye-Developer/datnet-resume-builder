import { useEffect, useRef, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ResumeData } from '@/types/resume';

interface UseAutosaveOptions {
  resumeData: ResumeData;
  activeResumeId: string | null;
  userId: string | undefined;
  templateId: string;
  debounceMs?: number;
}

export const useAutosave = ({
  resumeData,
  activeResumeId,
  userId,
  templateId,
  debounceMs = 3000,
}: UseAutosaveOptions) => {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dataSnapshotRef = useRef<string>('');

  const save = useCallback(async () => {
    if (!activeResumeId || !userId) return;

    const snapshot = JSON.stringify(resumeData);
    // Skip if nothing changed since last save
    if (snapshot === dataSnapshotRef.current) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('resumes')
        .update({
          data: resumeData as unknown as any,
          template_id: templateId,
          document_type: resumeData.documentType,
          field_category: resumeData.fieldCategory,
        } as any)
        .eq('id', activeResumeId);

      if (!error) {
        dataSnapshotRef.current = snapshot;
        setLastSaved(new Date());
      }
    } finally {
      setIsSaving(false);
    }
  }, [activeResumeId, userId, resumeData, templateId]);

  // Debounced autosave whenever resumeData changes
  useEffect(() => {
    if (!activeResumeId || !userId) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      save();
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resumeData, save, debounceMs, activeResumeId, userId]);

  // Set initial snapshot when a resume is loaded
  useEffect(() => {
    if (activeResumeId) {
      dataSnapshotRef.current = JSON.stringify(resumeData);
      setLastSaved(new Date());
    }
  // Only on id change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeResumeId]);

  return { lastSaved, isSaving };
};
