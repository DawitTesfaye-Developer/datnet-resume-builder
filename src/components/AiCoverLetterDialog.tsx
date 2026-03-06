import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useResume } from '@/context/ResumeContext';
import { useAiAssistant } from '@/hooks/useAiAssistant';
import { FileText, Loader2, Copy, Check } from 'lucide-react';

const AiCoverLetterDialog = () => {
  const { resumeData } = useResume();
  const { invoke, isLoading } = useAiAssistant();
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const handleGenerate = async () => {
    if (!jobDescription.trim()) return;
    const { personalInfo, experiences, skills } = resumeData;
    const context = `Resume data:
Name: ${personalInfo.fullName}
Summary: ${personalInfo.summary}
Skills: ${skills.map(s => s.name).join(', ')}
Experience: ${experiences.map(e => `${e.position} at ${e.company}: ${e.description}. Achievements: ${e.achievements.join('; ')}`).join('\n')}

Company: ${companyName || 'the company'}
Job Description:
${jobDescription}`;
    const res = await invoke('generate_cover_letter', context);
    if (res) setResult(res);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <FileText className="w-4 h-4" />
          Cover Letter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            AI Cover Letter Generator
          </DialogTitle>
        </DialogHeader>

        {!result ? (
          <div className="space-y-4 mt-2">
            <p className="text-sm text-muted-foreground">
              Generate a personalized cover letter based on your resume and a job description.
            </p>
            <div className="space-y-2">
              <Label>Company Name (optional)</Label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="e.g. Google"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Job Description *</Label>
              <Textarea
                placeholder="Paste the full job posting here…"
                value={jobDescription}
                onChange={e => setJobDescription(e.target.value)}
                className="min-h-[150px]"
              />
            </div>
            <Button onClick={handleGenerate} disabled={isLoading || !jobDescription.trim()} className="w-full">
              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileText className="w-4 h-4 mr-2" />}
              Generate Cover Letter
            </Button>
          </div>
        ) : (
          <div className="space-y-4 mt-2">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="gap-1">
                <FileText className="w-3 h-3" /> Cover Letter
              </Badge>
              <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-1.5 text-xs">
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/50 p-6 text-sm whitespace-pre-wrap leading-relaxed">
              {result}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setResult('')}>Generate Another</Button>
              <Button variant="ghost" onClick={() => { setResult(''); setJobDescription(''); setCompanyName(''); }}>
                Start Over
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AiCoverLetterDialog;
