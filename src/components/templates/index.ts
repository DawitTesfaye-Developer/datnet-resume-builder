import ProfessionalTemplate from './ProfessionalTemplate';
import ModernTemplate from './ModernTemplate';
import MinimalTemplate from './MinimalTemplate';
import CreativeTemplate from './CreativeTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';
import TechTemplate from './TechTemplate';
import HealthcareTemplate from './HealthcareTemplate';
import FinanceTemplate from './FinanceTemplate';
import AcademicTemplate from './AcademicTemplate';
import { FieldCategory, ResumeData } from '@/types/resume';
import { ComponentType } from 'react';

export interface TemplateInfo {
  id: string;
  name: string;
  description: string;
  component: ComponentType<{ data: ResumeData }>;
  fields: FieldCategory[];
  popular?: boolean;
  preview: {
    headerColor: string;
    accentColor: string;
  };
}

export const templates: TemplateInfo[] = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and traditional design perfect for corporate roles',
    component: ProfessionalTemplate,
    fields: ['finance', 'legal', 'sales', 'other'],
    popular: true,
    preview: { headerColor: 'bg-gray-800', accentColor: 'bg-gray-300' },
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary layout with a creative touch',
    component: ModernTemplate,
    fields: ['marketing', 'design', 'technology', 'course_development', 'other'],
    popular: true,
    preview: { headerColor: 'bg-blue-600', accentColor: 'bg-blue-100' },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant for maximum readability',
    component: MinimalTemplate,
    fields: ['other', 'education', 'engineering'],
    preview: { headerColor: 'bg-gray-100', accentColor: 'bg-gray-200' },
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold design for creative professionals',
    component: CreativeTemplate,
    fields: ['design', 'marketing', 'other'],
    preview: { headerColor: 'bg-gradient-to-r from-purple-600 to-pink-500', accentColor: 'bg-purple-100' },
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Sophisticated design for senior leadership roles',
    component: ExecutiveTemplate,
    fields: ['finance', 'legal', 'sales', 'other'],
    preview: { headerColor: 'bg-slate-900', accentColor: 'bg-slate-200' },
  },
  {
    id: 'tech',
    name: 'Developer',
    description: 'Terminal-inspired design for tech professionals',
    component: TechTemplate,
    fields: ['technology', 'engineering'],
    popular: true,
    preview: { headerColor: 'bg-slate-900', accentColor: 'bg-green-500' },
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Clean medical-focused template for healthcare roles',
    component: HealthcareTemplate,
    fields: ['healthcare'],
    preview: { headerColor: 'bg-teal-600', accentColor: 'bg-teal-100' },
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Formal template for banking and finance professionals',
    component: FinanceTemplate,
    fields: ['finance'],
    preview: { headerColor: 'bg-emerald-800', accentColor: 'bg-emerald-100' },
  },
  {
    id: 'academic',
    name: 'Academic CV',
    description: 'Comprehensive format for research and academia',
    component: AcademicTemplate,
    fields: ['education', 'course_development'],
    preview: { headerColor: 'bg-gray-900', accentColor: 'bg-gray-100' },
  },
];

export const getTemplateById = (id: string) => templates.find(t => t.id === id);

export const getTemplatesForField = (field: FieldCategory) => 
  templates.filter(t => t.fields.includes(field) || t.fields.includes('other'));

export const getRecommendedTemplate = (field: FieldCategory): TemplateInfo => {
  const fieldTemplates = templates.filter(t => t.fields[0] === field);
  return fieldTemplates[0] || templates[0];
};

export {
  ProfessionalTemplate,
  ModernTemplate,
  MinimalTemplate,
  CreativeTemplate,
  ExecutiveTemplate,
  TechTemplate,
  HealthcareTemplate,
  FinanceTemplate,
  AcademicTemplate,
};
