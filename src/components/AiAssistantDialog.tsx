import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useResume } from '@/context/ResumeContext';
import { useAiAssistant } from '@/hooks/useAiAssistant';
import { Sparkles, Loader2, FileText, Wand2, List, Briefcase, Copy, Check } from 'lucide-react';

const AiAssistantDialog = () => {
  const { resumeData, updatePersonalInfo, updateResumeData } = useResume();
  const { invoke, isLoading } = useAiAssistant();
  const [jobDescription, setJobDescription] = useState('');
  const [improveInput, setImproveInput] = useState('');
  const [bulletContext, setBulletContext] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const buildResumeContext = () => {
    const { personalInfo, experiences, skills, fieldCategory } = resumeData;
    return `Field: ${fieldCategory}\nName: ${personalInfo.fullName}\nCurrent summary: ${personalInfo.summary}\nSkills: ${skills.map(s => s.name).join(', ')}\nExperience: ${experiences.map(e => `${e.position} at ${e.company} - ${e.description}`).join('; ')}`;
  };

  const handleGenerateSummary = async () => {
    const res = await invoke('generate_summary', buildResumeContext());
    if (res) setResult(res);
  };

  const handleImproveText = async () => {
    if (!improveInput.trim()) return;
    const res = await invoke('improve_text', improveInput);
    if (res) setResult(res);
  };

  const handleGenerateBullets = async () => {
    if (!bulletContext.trim()) return;
    const res = await invoke('generate_bullets', `Field: ${resumeData.fieldCategory}\nRole details: ${bulletContext}`);
    if (res) setResult(res);
  };

  const handleGenerateFromJob = async () => {
    if (!jobDescription.trim()) return;
    const context = `${buildResumeContext()}\n\nJob Description:\n${jobDescription}`;
    const res = await invoke('generate_from_job', context);
    if (res) setResult(res);
  };

  const handleApplySummary = () => {
    updatePersonalInfo({ summary: result });
    setResult('');
  };

  const handleApplyFromJob = () => {
    try {
      const parsed = JSON.parse(result);
      if (parsed.summary) updatePersonalInfo({ summary: parsed.summary });
      if (parsed.skills?.length) {
        const newSkills = parsed.skills.map((name: string) => ({
          id: crypto.randomUUID(),
          name,
          level: 'intermediate' as const,
        }));
        updateResumeData({ skills: [...resumeData.skills, ...newSkills] });
      }
      setResult('');
    } catch {
      // result wasn't valid JSON, just show it
    }
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
          <Sparkles className="w-4 h-4" />
          AI Assist
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Resume Assistant
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="summary" className="mt-2">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summary" className="text-xs gap-1">
              <FileText className="w-3.5 h-3.5" />
              Summary
            </TabsTrigger>
            <TabsTrigger value="improve" className="text-xs gap-1">
              <Wand2 className="w-3.5 h-3.5" />
              Improve
            </TabsTrigger>
            <TabsTrigger value="bullets" className="text-xs gap-1">
              <List className="w-3.5 h-3.5" />
              Bullets
            </TabsTrigger>
            <TabsTrigger value="job" className="text-xs gap-1">
              <Briefcase className="w-3.5 h-3.5" />
              Job Match
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground">
              Generate a professional summary based on your resume data. Fill in your experience and skills first for best results.
            </p>
            <Button onClick={handleGenerateSummary} disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
              Generate Summary
            </Button>
          </TabsContent>

          <TabsContent value="improve" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Paste text to improve</Label>
              <Textarea
                placeholder="Paste a bullet point, description, or summary you'd like to enhance…"
                value={improveInput}
                onChange={(e) => setImproveInput(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <Button onClick={handleImproveText} disabled={isLoading || !improveInput.trim()} className="w-full">
              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
              Improve Text
            </Button>
          </TabsContent>

          <TabsContent value="bullets" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Describe the role</Label>
              <Textarea
                placeholder="e.g. Senior Frontend Engineer at a fintech startup, worked on payment dashboard, led team of 4…"
                value={bulletContext}
                onChange={(e) => setBulletContext(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <Button onClick={handleGenerateBullets} disabled={isLoading || !bulletContext.trim()} className="w-full">
              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <List className="w-4 h-4 mr-2" />}
              Generate Bullet Points
            </Button>
          </TabsContent>

          <TabsContent value="job" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Paste the job description</Label>
              <Textarea
                placeholder="Paste the full job posting here and AI will tailor your resume content…"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
            <Button onClick={handleGenerateFromJob} disabled={isLoading || !jobDescription.trim()} className="w-full">
              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Briefcase className="w-4 h-4 mr-2" />}
              Generate Tailored Content
            </Button>
          </TabsContent>
        </Tabs>

        {/* Result */}
        {result && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="w-3 h-3" />
                AI Result
              </Badge>
              <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-1.5 text-xs">
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/50 p-4 text-sm whitespace-pre-wrap leading-relaxed">
              {result}
            </div>
            <div className="flex gap-2">
              {result && !result.startsWith('{') && (
                <Button size="sm" onClick={handleApplySummary} variant="default">
                  Apply as Summary
                </Button>
              )}
              {result.startsWith('{') && (
                <Button size="sm" onClick={handleApplyFromJob} variant="default">
                  Apply Suggestions
                </Button>
              )}
              <Button size="sm" variant="outline" onClick={() => setResult('')}>
                Dismiss
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AiAssistantDialog;
