// ATS (Applicant Tracking System) compatibility scoring for resume templates.
// Score is a heuristic based on layout/typography characteristics that affect
// how well ATS parsers extract text from a rendered resume.

export type AtsRiskLevel = 'low' | 'medium' | 'high';

export interface AtsFinding {
  id: string;
  level: AtsRiskLevel;
  label: string;
  detail: string;
  // Negative score impact (0-100 scale)
  penalty: number;
}

export interface AtsScoreResult {
  score: number; // 0–100
  rating: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  findings: AtsFinding[];
  positives: string[];
}

// Per-template ATS profile. Keep this list in sync with templates/index.ts ids.
// Each profile lists known risks; the absence of a risk implies it's safe.
interface TemplateAtsProfile {
  hasIcons: boolean;
  hasTwoColumnLayout: boolean;
  hasGraphics: boolean; // gradients, decorative shapes
  hasPhotoArea: boolean;
  hasNonStandardFont: boolean;
  hasColorBackground: boolean; // colored sidebars / large color blocks
  usesProgressBars: boolean; // graphical skill bars
}

const DEFAULT_PROFILE: TemplateAtsProfile = {
  hasIcons: true,
  hasTwoColumnLayout: false,
  hasGraphics: true,
  hasPhotoArea: false,
  hasNonStandardFont: false,
  hasColorBackground: true,
  usesProgressBars: false,
};

const TEMPLATE_PROFILES: Record<string, Partial<TemplateAtsProfile>> = {
  'ats-optimized': {
    hasIcons: false,
    hasTwoColumnLayout: false,
    hasGraphics: false,
    hasPhotoArea: false,
    hasNonStandardFont: false,
    hasColorBackground: false,
    usesProgressBars: false,
  },
  professional: {
    hasIcons: false,
    hasTwoColumnLayout: false,
    hasGraphics: false,
    hasColorBackground: true,
  },
  modern: {
    hasIcons: true,
    hasTwoColumnLayout: false,
    hasGraphics: true,
    hasColorBackground: true,
  },
  minimal: {
    hasIcons: false,
    hasTwoColumnLayout: false,
    hasGraphics: false,
    hasColorBackground: false,
  },
  creative: {
    hasIcons: true,
    hasTwoColumnLayout: true,
    hasGraphics: true,
    hasPhotoArea: true,
    hasColorBackground: true,
    usesProgressBars: true,
  },
  executive: {
    hasIcons: false,
    hasTwoColumnLayout: false,
    hasGraphics: false,
    hasColorBackground: true,
  },
  tech: {
    hasIcons: true,
    hasTwoColumnLayout: false,
    hasGraphics: true,
    hasNonStandardFont: true, // monospace / terminal styling
    hasColorBackground: true,
  },
  marketing: {
    hasIcons: true,
    hasTwoColumnLayout: true,
    hasGraphics: true,
    hasColorBackground: true,
    usesProgressBars: true,
  },
  'course-developer': {
    hasIcons: true,
    hasTwoColumnLayout: true,
    hasGraphics: true,
    hasColorBackground: true,
  },
  healthcare: {
    hasIcons: true,
    hasTwoColumnLayout: false,
    hasGraphics: false,
    hasColorBackground: true,
  },
  finance: {
    hasIcons: false,
    hasTwoColumnLayout: false,
    hasGraphics: false,
    hasColorBackground: true,
  },
  academic: {
    hasIcons: false,
    hasTwoColumnLayout: false,
    hasGraphics: false,
    hasColorBackground: false,
  },
  hr: {
    hasIcons: true,
    hasTwoColumnLayout: false,
    hasGraphics: false,
    hasColorBackground: true,
  },
  hospitality: {
    hasIcons: true,
    hasTwoColumnLayout: true,
    hasGraphics: true,
    hasColorBackground: true,
  },
  media: {
    hasIcons: false,
    hasTwoColumnLayout: false,
    hasGraphics: false,
    hasColorBackground: true,
  },
  science: {
    hasIcons: false,
    hasTwoColumnLayout: false,
    hasGraphics: false,
    hasColorBackground: true,
  },
  government: {
    hasIcons: false,
    hasTwoColumnLayout: false,
    hasGraphics: false,
    hasColorBackground: true,
  },
  construction: {
    hasIcons: true,
    hasTwoColumnLayout: false,
    hasGraphics: true,
    hasColorBackground: true,
  },
  logistics: {
    hasIcons: true,
    hasTwoColumnLayout: false,
    hasGraphics: false,
    hasColorBackground: true,
  },
  'african-union': {
    hasIcons: false,
    hasTwoColumnLayout: true,
    hasGraphics: false,
    hasPhotoArea: true,
    hasColorBackground: true,
  },
  'united-nations': {
    hasIcons: false,
    hasTwoColumnLayout: false,
    hasGraphics: false,
    hasPhotoArea: true,
    hasColorBackground: true,
  },
  'international-ngo': {
    hasIcons: false,
    hasTwoColumnLayout: true,
    hasGraphics: false,
    hasColorBackground: true,
  },
  'national-ngo': {
    hasIcons: true,
    hasTwoColumnLayout: false,
    hasGraphics: false,
    hasColorBackground: true,
  },
};

function getProfile(templateId: string): TemplateAtsProfile {
  return { ...DEFAULT_PROFILE, ...(TEMPLATE_PROFILES[templateId] ?? {}) };
}

export function scoreTemplateAts(templateId: string): AtsScoreResult {
  const profile = getProfile(templateId);
  const findings: AtsFinding[] = [];
  const positives: string[] = [];

  if (profile.hasTwoColumnLayout) {
    findings.push({
      id: 'two-column',
      level: 'high',
      label: 'Multi-column layout',
      detail: 'Many ATS parsers read columns left-to-right as one stream, which can scramble experience and skills.',
      penalty: 25,
    });
  } else {
    positives.push('Single-column flow — parses cleanly');
  }

  if (profile.hasIcons) {
    findings.push({
      id: 'icons',
      level: 'medium',
      label: 'Decorative icons',
      detail: 'Icons next to contact info or section headers may be ignored or misread by some parsers.',
      penalty: 8,
    });
  } else {
    positives.push('No decorative icons');
  }

  if (profile.hasGraphics) {
    findings.push({
      id: 'graphics',
      level: 'medium',
      label: 'Graphic elements',
      detail: 'Gradients, shapes, or background art are invisible to ATS but can shift text positioning unexpectedly.',
      penalty: 6,
    });
  }

  if (profile.usesProgressBars) {
    findings.push({
      id: 'progress-bars',
      level: 'high',
      label: 'Skill progress bars',
      detail: 'Bars convey level visually but contain no text — the actual skill level is lost to the ATS.',
      penalty: 12,
    });
  } else {
    positives.push('Skills listed as plain text');
  }

  if (profile.hasPhotoArea) {
    findings.push({
      id: 'photo',
      level: 'medium',
      label: 'Profile photo',
      detail: 'Photos are required in some regions (EU/AU/UN) but flagged or stripped by US/UK ATS to avoid bias.',
      penalty: 5,
    });
  }

  if (profile.hasNonStandardFont) {
    findings.push({
      id: 'font',
      level: 'medium',
      label: 'Non-standard font',
      detail: 'Decorative or monospace fonts may not embed in PDFs and can cause character substitution in ATS.',
      penalty: 7,
    });
  } else {
    positives.push('Standard typography');
  }

  if (profile.hasColorBackground) {
    findings.push({
      id: 'color',
      level: 'low',
      label: 'Colored backgrounds',
      detail: 'Color is mostly ignored by ATS, but very dark backgrounds with light text can fail OCR-based parsers.',
      penalty: 3,
    });
  }

  const totalPenalty = findings.reduce((sum, f) => sum + f.penalty, 0);
  const score = Math.max(0, Math.min(100, 100 - totalPenalty));

  let rating: AtsScoreResult['rating'];
  if (score >= 90) rating = 'Excellent';
  else if (score >= 75) rating = 'Good';
  else if (score >= 55) rating = 'Fair';
  else rating = 'Poor';

  return { score, rating, findings, positives };
}
