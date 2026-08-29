import type { ResumeData } from '@/types/resume';

export interface AtsCheck {
  id: string;
  label: string;
  passed: boolean;
  weight: number;
  hint: string;
}

export interface AtsReport {
  score: number;
  grade: string;
  checks: AtsCheck[];
}

const ACTION_VERBS = [
  'led', 'built', 'designed', 'developed', 'managed', 'implemented', 'launched',
  'improved', 'increased', 'reduced', 'created', 'delivered', 'coordinated',
  'analyzed', 'optimized', 'automated', 'trained', 'negotiated', 'streamlined',
];

const ATS_UNSAFE_TEMPLATES = ['creative', 'media', 'marketing'];

export function computeAtsScore(data: ResumeData, templateId?: string): AtsReport {
  const { personalInfo, experiences, education, skills, certifications, projects } = data;

  const allText = [
    personalInfo.summary ?? '',
    ...experiences.map((e) => `${e.description ?? ''} ${(e.achievements ?? []).join(' ')}`),
  ]
    .join(' ')
    .toLowerCase();

  const hasNumbers = /\d+\s*(%|percent|k\b|m\b|\+|users|clients|hours|projects)/.test(allText) || /\b\d{2,}\b/.test(allText);
  const verbCount = ACTION_VERBS.filter((v) => allText.includes(v)).length;
  const wordCount = allText.split(/\s+/).filter(Boolean).length;

  const checks: AtsCheck[] = [
    {
      id: 'contact',
      label: 'Complete contact details (email, phone, location)',
      passed: !!personalInfo.email && !!personalInfo.phone && !!personalInfo.location,
      weight: 10,
      hint: 'ATS parsers need email, phone and location in the header. Add the missing ones in Step 4.',
    },
    {
      id: 'name',
      label: 'Full name present',
      passed: !!personalInfo.fullName?.trim(),
      weight: 5,
      hint: 'Add your full name — it is the first field every parser reads.',
    },
    {
      id: 'summary',
      label: 'Professional summary (min. 30 words)',
      passed: (personalInfo.summary ?? '').split(/\s+/).filter(Boolean).length >= 30,
      weight: 10,
      hint: 'Write a 2–4 sentence summary with your title and top keywords. Use AI Assist → Summary.',
    },
    {
      id: 'experience',
      label: 'At least 2 work experience entries',
      passed: experiences.length >= 2,
      weight: 15,
      hint: 'Add more roles with dates, company and location so the parser can build your work history.',
    },
    {
      id: 'descriptions',
      label: 'Every experience has a description or achievements',
      passed:
        experiences.length > 0 &&
        experiences.every((e) => !!e.description?.trim() || (e.achievements ?? []).length > 0),
      weight: 10,
      hint: 'Empty roles score poorly. Add 3–5 bullet points per role.',
    },
    {
      id: 'dates',
      label: 'All experiences have start and end dates',
      passed:
        experiences.length > 0 &&
        experiences.every((e) => !!e.startDate && (!!e.endDate || e.current)),
      weight: 8,
      hint: 'Missing dates break the chronology ATS systems reconstruct. Use YYYY-MM format.',
    },
    {
      id: 'metrics',
      label: 'Quantified achievements (numbers, %, results)',
      passed: hasNumbers,
      weight: 12,
      hint: 'Add measurable impact: "Reduced processing time by 35%", "Managed a $200K budget".',
    },
    {
      id: 'verbs',
      label: 'Strong action verbs used (3+)',
      passed: verbCount >= 3,
      weight: 8,
      hint: 'Start bullets with verbs like Led, Built, Delivered, Optimized instead of "Responsible for".',
    },
    {
      id: 'skills',
      label: 'At least 8 skills / keywords listed',
      passed: skills.length >= 8,
      weight: 12,
      hint: 'Keyword matching drives ATS ranking. Mirror the wording used in the job posting.',
    },
    {
      id: 'education',
      label: 'Education section filled',
      passed: education.length > 0,
      weight: 5,
      hint: 'Add at least your highest qualification with institution and dates.',
    },
    {
      id: 'extras',
      label: 'Certifications or projects included',
      passed: certifications.length > 0 || projects.length > 0,
      weight: 5,
      hint: 'Certifications and projects add extra keyword surface for the parser.',
    },
    {
      id: 'length',
      label: 'Enough content (150+ words of experience text)',
      passed: wordCount >= 150,
      weight: 5,
      hint: 'Thin resumes are filtered out. Expand your role descriptions.',
    },
    {
      id: 'template',
      label: 'ATS-friendly template selected',
      passed: !templateId || !ATS_UNSAFE_TEMPLATES.includes(templateId),
      weight: 10,
      hint: 'Highly graphical templates can confuse parsers. Choose "ATS Optimized", Professional or Minimal in Step 3.',
    },
  ];

  const total = checks.reduce((sum, c) => sum + c.weight, 0);
  const earned = checks.reduce((sum, c) => (c.passed ? sum + c.weight : sum), 0);
  const score = Math.round((earned / total) * 100);

  const grade =
    score >= 95 ? 'A+' : score >= 88 ? 'A' : score >= 80 ? 'B+' : score >= 70 ? 'B'
      : score >= 62 ? 'C+' : score >= 55 ? 'C' : score >= 45 ? 'D' : 'F';

  return { score, grade, checks };
}
