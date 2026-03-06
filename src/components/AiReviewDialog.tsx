import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useResume } from '@/context/ResumeContext';
import { useAiAssistant } from '@/hooks/useAiAssistant';
import { ClipboardCheck, Loader2, CheckCircle2, AlertTriangle, Lightbulb, XCircle } from 'lucide-react';

interface ReviewResult {
  score: number;
  grade: string;
  strengths: string[];
  improvements: string[];
  missingSecions: string[];
  tips: string[];
}

const AiReviewDialog = () => {
  const { resumeData } = useResume();
  const { invoke, isLoading } = useAiAssistant();
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [open, setOpen] = useState(false);

  const buildContext = () => {
    const { personalInfo, experiences, education, skills, certifications, projects, languages, references } = resumeData;
    return JSON.stringify({
      field: resumeData.fieldCategory,
      personalInfo,
      experienceCount: experiences.length,
      experiences: experiences.map(e => ({ position: e.position, company: e.company, description: e.description, achievements: e.achievements })),
      educationCount: education.length,
      education: education.map(e => ({ degree: e.degree, field: e.field, institution: e.institution })),
      skillsCount: skills.length,
      skills: skills.map(s => s.name),
      certificationsCount: certifications.length,
      projectsCount: projects.length,
      languagesCount: languages.length,
      referencesCount: references.length,
      hasSummary: !!personalInfo.summary,
      hasLinkedIn: !!personalInfo.linkedIn,
      hasGithub: !!personalInfo.github,
    });
  };

  const handleReview = async () => {
    const res = await invoke('review_resume', buildContext());
    if (res) {
      try { setResult(JSON.parse(res)); } catch { /* ignore parse errors */ }
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <ClipboardCheck className="w-4 h-4" />
          AI Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-primary" />
            AI Resume Review
          </DialogTitle>
        </DialogHeader>

        {!result ? (
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              AI will analyze your resume for completeness, impact, and professionalism, then give you a score and actionable feedback.
            </p>
            <Button onClick={handleReview} disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ClipboardCheck className="w-4 h-4 mr-2" />}
              Analyze My Resume
            </Button>
          </div>
        ) : (
          <div className="space-y-5 py-2">
            {/* Score */}
            <div className="text-center space-y-2">
              <div className={`text-5xl font-bold ${getScoreColor(result.score)}`}>{result.score}</div>
              <Badge variant="secondary" className="text-lg px-4 py-1">{result.grade}</Badge>
              <Progress value={result.score} className="h-2 mt-2" />
            </div>

            {/* Strengths */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> Strengths
              </h4>
              <ul className="space-y-1">
                {result.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-green-500 mt-0.5">✓</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-yellow-500" /> Improvements
              </h4>
              <ul className="space-y-1">
                {result.improvements.map((s, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-yellow-500 mt-0.5">→</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Missing */}
            {result.missingSecions?.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-500" /> Missing Sections
                </h4>
                <ul className="space-y-1">
                  {result.missingSecions.map((s, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-red-500 mt-0.5">✗</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tips */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-primary" /> Pro Tips
              </h4>
              <ul className="space-y-1">
                {result.tips.map((s, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary mt-0.5">💡</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            <Button variant="outline" onClick={() => setResult(null)} className="w-full">
              Review Again
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AiReviewDialog;
