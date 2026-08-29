import { useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useResume } from '@/context/ResumeContext';
import { computeAtsScore } from '@/lib/atsScore';
import { ShieldCheck, CheckCircle2, Circle, Copy, Check } from 'lucide-react';

const AtsScoreDialog = () => {
  const { resumeData } = useResume();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const report = useMemo(() => computeAtsScore(resumeData), [resumeData]);
  const failed = report.checks.filter((c) => !c.passed);
  const passed = report.checks.filter((c) => c.passed);

  const scoreColor =
    report.score >= 80 ? 'text-primary' : report.score >= 60 ? 'text-yellow-500' : 'text-destructive';

  const handleCopy = () => {
    const text = [
      `ATS Score: ${report.score}/100 (${report.grade})`,
      '',
      'Improvements:',
      ...failed.map((c) => `- ${c.label}: ${c.hint}`),
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <ShieldCheck className="w-4 h-4" />
          ATS Score
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            ATS Compliance Score
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="text-center space-y-2">
            <div className={`text-5xl font-bold ${scoreColor}`}>{report.score}</div>
            <Badge variant="secondary" className="text-lg px-4 py-1">{report.grade}</Badge>
            <Progress value={report.score} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground">
              {passed.length} of {report.checks.length} checks passed
            </p>
          </div>

          {failed.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Improvement checklist</h4>
              <ul className="space-y-2">
                {failed.map((c) => (
                  <li key={c.id} className="rounded-lg border p-3">
                    <div className="flex gap-2 items-start">
                      <Circle className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{c.label}</p>
                        <p className="text-xs text-muted-foreground">{c.hint}</p>
                      </div>
                      <Badge variant="outline" className="ml-auto text-[10px] shrink-0">+{c.weight}</Badge>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Passing checks</h4>
            <ul className="space-y-1">
              {passed.map((c) => (
                <li key={c.id} className="text-sm text-muted-foreground flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                  {c.label}
                </li>
              ))}
              {passed.length === 0 && (
                <li className="text-sm text-muted-foreground">Nothing passing yet — start with the checklist above.</li>
              )}
            </ul>
          </div>

          <Button variant="outline" onClick={handleCopy} className="w-full gap-1.5">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy report'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AtsScoreDialog;
