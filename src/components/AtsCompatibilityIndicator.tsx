import { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, ChevronDown, Info, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { scoreTemplateAts, AtsRiskLevel } from '@/lib/atsScore';
import { Badge } from '@/components/ui/badge';

interface AtsCompatibilityIndicatorProps {
  templateId: string;
  className?: string;
}

const ringColor = (score: number) => {
  if (score >= 90) return 'text-emerald-500';
  if (score >= 75) return 'text-green-500';
  if (score >= 55) return 'text-amber-500';
  return 'text-red-500';
};

const trackColor = (score: number) => {
  if (score >= 90) return 'stroke-emerald-500';
  if (score >= 75) return 'stroke-green-500';
  if (score >= 55) return 'stroke-amber-500';
  return 'stroke-red-500';
};

const riskBadge = (level: AtsRiskLevel) => {
  switch (level) {
    case 'high':
      return 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300 border-red-200 dark:border-red-900';
    case 'medium':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-900';
    case 'low':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200 dark:border-blue-900';
  }
};

const AtsCompatibilityIndicator = ({ templateId, className }: AtsCompatibilityIndicatorProps) => {
  const [expanded, setExpanded] = useState(false);
  const result = useMemo(() => scoreTemplateAts(templateId), [templateId]);

  // SVG circle math
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (result.score / 100) * circumference;

  return (
    <div className={cn('rounded-xl border border-border bg-card p-3', className)}>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 text-left"
        aria-expanded={expanded}
      >
        {/* Score ring */}
        <div className="relative w-14 h-14 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
            <circle
              cx="28"
              cy="28"
              r={radius}
              fill="none"
              className="stroke-muted"
              strokeWidth="5"
            />
            <circle
              cx="28"
              cy="28"
              r={radius}
              fill="none"
              className={cn('transition-all duration-500', trackColor(result.score))}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
            />
          </svg>
          <div className={cn('absolute inset-0 flex items-center justify-center font-semibold text-sm', ringColor(result.score))}>
            {result.score}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className={cn('w-4 h-4', ringColor(result.score))} />
            <span className="text-sm font-semibold">ATS Compatibility</span>
            <Badge variant="secondary" className={cn('text-[10px]', ringColor(result.score))}>
              {result.rating}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {result.findings.length === 0
              ? 'No parsing risks detected'
              : `${result.findings.length} potential ${result.findings.length === 1 ? 'risk' : 'risks'} — tap to view`}
          </p>
        </div>

        <ChevronDown
          className={cn('w-4 h-4 text-muted-foreground transition-transform flex-shrink-0', expanded && 'rotate-180')}
        />
      </button>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-border space-y-3 animate-fade-in">
          {result.positives.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                What's working
              </p>
              <ul className="space-y-1">
                {result.positives.map((p) => (
                  <li key={p} className="flex items-start gap-1.5 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/80">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.findings.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                Potential risks
              </p>
              <ul className="space-y-2">
                {result.findings.map((f) => (
                  <li key={f.id} className={cn('rounded-md border p-2', riskBadge(f.level))}>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="text-xs font-semibold">{f.label}</span>
                      <span className="text-[10px] uppercase ml-auto opacity-70">{f.level}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed opacity-90">{f.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.score < 75 && (
            <div className="flex items-start gap-2 rounded-md bg-muted/50 p-2">
              <Info className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                For roles screened by automated systems, consider the <span className="font-semibold text-foreground">ATS Optimized</span> template,
                then submit this design separately as a portfolio piece or for human review.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AtsCompatibilityIndicator;
