import { useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { TemplateInfo } from '@/components/templates';
import { ResumeData, defaultResumeData } from '@/types/resume';

const sampleResumeData: ResumeData = {
  ...defaultResumeData,
  documentType: 'resume',
  fieldCategory: 'technology',
  personalInfo: {
    fullName: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    linkedIn: 'linkedin.com/in/alexjohnson',
    portfolio: 'alexjohnson.dev',
    summary: 'Results-driven professional with 8+ years of experience delivering impactful solutions. Proven track record of leading cross-functional teams and driving measurable business outcomes.',
  },
  experiences: [
    {
      id: '1',
      company: 'Innovate Corp',
      position: 'Senior Manager',
      location: 'San Francisco, CA',
      startDate: '2021-03',
      endDate: '',
      current: true,
      description: 'Lead a team of 12 professionals delivering strategic initiatives.',
      achievements: [
        'Increased revenue by 35% through process optimization',
        'Managed $2M annual budget with 98% utilization efficiency',
        'Launched 3 successful products reaching 50K+ users',
      ],
    },
    {
      id: '2',
      company: 'Growth Solutions Inc',
      position: 'Project Lead',
      location: 'New York, NY',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      description: 'Directed cross-functional projects from ideation to delivery.',
      achievements: [
        'Reduced operational costs by 22% through automation',
        'Led team of 8 across 15+ successful project deliveries',
      ],
    },
  ],
  education: [
    {
      id: '1',
      institution: 'Stanford University',
      degree: 'Master of Science',
      field: 'Business Analytics',
      location: 'Stanford, CA',
      startDate: '2016-09',
      endDate: '2018-05',
      gpa: '3.9',
      achievements: ['Dean\'s List', 'Research Fellowship'],
    },
    {
      id: '2',
      institution: 'UC Berkeley',
      degree: 'Bachelor of Arts',
      field: 'Economics',
      location: 'Berkeley, CA',
      startDate: '2012-09',
      endDate: '2016-05',
      achievements: ['Magna Cum Laude'],
    },
  ],
  skills: [
    { id: '1', name: 'Strategic Planning', level: 'expert' },
    { id: '2', name: 'Data Analysis', level: 'expert' },
    { id: '3', name: 'Project Management', level: 'advanced' },
    { id: '4', name: 'Team Leadership', level: 'expert' },
    { id: '5', name: 'Python', level: 'advanced' },
    { id: '6', name: 'SQL', level: 'advanced' },
  ],
  certifications: [
    { id: '1', name: 'PMP Certified', issuer: 'PMI', date: '2020-06' },
    { id: '2', name: 'AWS Solutions Architect', issuer: 'Amazon', date: '2021-09' },
  ],
  projects: [
    {
      id: '1',
      name: 'Analytics Dashboard',
      description: 'Built real-time analytics platform serving 10K+ daily users with interactive visualizations.',
      technologies: ['React', 'Python', 'PostgreSQL'],
      link: 'github.com/alex/dashboard',
      startDate: '2022-01',
      endDate: '2022-06',
    },
  ],
  publications: [],
  languages: [
    { id: '1', name: 'English', proficiency: 'Native' },
    { id: '2', name: 'Spanish', proficiency: 'Professional' },
  ],
  references: [],
  referencesAvailable: true,
};

interface TemplateHoverPreviewProps {
  template: TemplateInfo;
  children: React.ReactNode;
}

const TemplateHoverPreview = ({ template, children }: TemplateHoverPreviewProps) => {
  const TemplateComponent = template.component;

  return (
    <HoverCard openDelay={300} closeDelay={100}>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent
        side="right"
        sideOffset={12}
        align="start"
        className="w-[420px] p-2 bg-card border border-border shadow-xl rounded-xl"
      >
        <div className="mb-2 px-1">
          <p className="text-xs font-medium text-foreground">{template.name}</p>
          <p className="text-[10px] text-muted-foreground">Live preview with sample data</p>
        </div>
        <div className="relative w-full overflow-hidden rounded-lg border border-border bg-white" style={{ height: '480px' }}>
          <div
            className="origin-top-left absolute"
            style={{
              transform: 'scale(0.38)',
              width: '1100px',
              height: '1400px',
            }}
          >
            <TemplateComponent data={sampleResumeData} />
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default TemplateHoverPreview;
