import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useResume } from '@/context/ResumeContext';
import { useAiAssistant } from '@/hooks/useAiAssistant';
import { Upload, Loader2, Sparkles, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AiAutoFillDialog = () => {
  const { updatePersonalInfo, updateResumeData, resumeData } = useResume();
  const { invoke, isLoading } = useAiAssistant();
  const { toast } = useToast();
  const [rawText, setRawText] = useState('');
  const [open, setOpen] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleParse = async () => {
    if (!rawText.trim()) return;
    const res = await invoke('parse_resume_text', rawText);
    if (!res) return;

    try {
      const parsed = JSON.parse(res);
      
      // Apply personal info
      if (parsed.personalInfo) {
        const pi: any = {};
        for (const [k, v] of Object.entries(parsed.personalInfo)) {
          if (v) pi[k] = v;
        }
        if (Object.keys(pi).length) updatePersonalInfo(pi);
      }

      // Apply experiences
      if (parsed.experiences?.length) {
        const exps = parsed.experiences.map((e: any) => ({
          id: crypto.randomUUID(),
          company: e.company || '',
          position: e.position || '',
          location: e.location || '',
          startDate: e.startDate || '',
          endDate: e.endDate || '',
          current: e.current || false,
          description: e.description || '',
          achievements: e.achievements || [],
        }));
        updateResumeData({ experiences: [...resumeData.experiences, ...exps] });
      }

      // Apply education
      if (parsed.education?.length) {
        const edus = parsed.education.map((e: any) => ({
          id: crypto.randomUUID(),
          institution: e.institution || '',
          degree: e.degree || '',
          field: e.field || '',
          location: e.location || '',
          startDate: e.startDate || '',
          endDate: e.endDate || '',
          gpa: e.gpa || '',
          achievements: e.achievements || [],
        }));
        updateResumeData({ education: [...resumeData.education, ...edus] });
      }

      // Apply skills
      if (parsed.skills?.length) {
        const newSkills = parsed.skills.map((s: any) => ({
          id: crypto.randomUUID(),
          name: typeof s === 'string' ? s : s.name,
          level: (typeof s === 'string' ? 'intermediate' : s.level || 'intermediate') as any,
        }));
        updateResumeData({ skills: [...resumeData.skills, ...newSkills] });
      }

      // Apply certifications
      if (parsed.certifications?.length) {
        const certs = parsed.certifications.map((c: any) => ({
          id: crypto.randomUUID(),
          name: c.name || '',
          issuer: c.issuer || '',
          date: c.date || '',
          expiryDate: c.expiryDate || '',
          credentialId: c.credentialId || '',
        }));
        updateResumeData({ certifications: [...resumeData.certifications, ...certs] });
      }

      // Apply languages
      if (parsed.languages?.length) {
        const langs = parsed.languages.map((l: any) => ({
          id: crypto.randomUUID(),
          name: l.name || '',
          proficiency: l.proficiency || 'Conversational',
        }));
        updateResumeData({ languages: [...resumeData.languages, ...langs] });
      }

      setApplied(true);
      toast({ title: 'Auto-fill complete', description: 'Resume data has been populated from your text.' });
    } catch {
      toast({ title: 'Parse error', description: 'Could not parse the AI response. Try again.', variant: 'destructive' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) { setApplied(false); } }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Upload className="w-4 h-4" />
          Auto-Fill
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            AI Auto-Fill Resume
          </DialogTitle>
        </DialogHeader>

        {applied ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold">Resume Data Applied!</h3>
            <p className="text-sm text-muted-foreground">
              Your resume has been populated. Review each section to verify and fine-tune the extracted data.
            </p>
            <Button variant="outline" onClick={() => { setOpen(false); setApplied(false); setRawText(''); }}>
              Close
            </Button>
          </div>
        ) : (
          <div className="space-y-4 mt-2">
            <p className="text-sm text-muted-foreground">
              Paste your existing resume text, LinkedIn profile content, or any career-related text. AI will extract and populate all resume fields automatically.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">📄 Resume text</Badge>
              <Badge variant="outline">🔗 LinkedIn profile</Badge>
              <Badge variant="outline">📋 Job history</Badge>
            </div>
            <Textarea
              placeholder="Paste your resume or career text here…

Example:
John Doe
Software Engineer at Google
San Francisco, CA
john@email.com | linkedin.com/in/johndoe

Experience:
Senior Software Engineer at Google (2020 - Present)
- Led team of 5 engineers building scalable APIs
- Reduced latency by 40% through optimization…"
              value={rawText}
              onChange={e => setRawText(e.target.value)}
              className="min-h-[250px] font-mono text-xs"
            />
            <Button onClick={handleParse} disabled={isLoading || !rawText.trim()} className="w-full">
              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
              Extract & Fill Resume
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AiAutoFillDialog;
