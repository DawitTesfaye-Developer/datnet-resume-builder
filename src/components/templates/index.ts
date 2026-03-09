import ProfessionalTemplate from './ProfessionalTemplate';
import ModernTemplate from './ModernTemplate';
import MinimalTemplate from './MinimalTemplate';
import CreativeTemplate from './CreativeTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';
import TechTemplate from './TechTemplate';
import HealthcareTemplate from './HealthcareTemplate';
import FinanceTemplate from './FinanceTemplate';
import AcademicTemplate from './AcademicTemplate';
import CourseDeveloperTemplate from './CourseDeveloperTemplate';
import HRTemplate from './HRTemplate';
import HospitalityTemplate from './HospitalityTemplate';
import MediaTemplate from './MediaTemplate';
import ScienceTemplate from './ScienceTemplate';
import GovernmentTemplate from './GovernmentTemplate';
import ConstructionTemplate from './ConstructionTemplate';
import LogisticsTemplate from './LogisticsTemplate';
import MarketingTemplate from './MarketingTemplate';
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
    fields: ['finance', 'legal', 'sales', 'human_resources', 'other'],
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
    fields: ['design', 'marketing', 'media', 'other'],
    preview: { headerColor: 'bg-gradient-to-r from-purple-600 to-pink-500', accentColor: 'bg-purple-100' },
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Sophisticated design for senior leadership roles',
    component: ExecutiveTemplate,
    fields: ['finance', 'legal', 'sales', 'government', 'other'],
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
    fields: ['education', 'science'],
    preview: { headerColor: 'bg-gray-900', accentColor: 'bg-gray-100' },
  },
  {
    id: 'course-developer',
    name: 'Course Developer',
    description: 'Designed for instructional designers and e-learning professionals',
    component: CourseDeveloperTemplate,
    fields: ['course_development', 'education'],
    popular: true,
    preview: { headerColor: 'bg-gradient-to-r from-indigo-600 to-purple-600', accentColor: 'bg-indigo-100' },
  },
  {
    id: 'hr',
    name: 'Human Resources',
    description: 'Warm, professional template for HR and people operations',
    component: HRTemplate,
    fields: ['human_resources', 'sales'],
    preview: { headerColor: 'bg-gray-700', accentColor: 'bg-yellow-200' },
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    description: 'Elegant template for hotels, tourism, and food service',
    component: HospitalityTemplate,
    fields: ['hospitality'],
    popular: true,
    preview: { headerColor: 'bg-gradient-to-r from-yellow-800 to-yellow-600', accentColor: 'bg-yellow-100' },
  },
  {
    id: 'media',
    name: 'Media & Journalism',
    description: 'Editorial-style layout for writers, journalists, and PR',
    component: MediaTemplate,
    fields: ['media', 'marketing'],
    preview: { headerColor: 'bg-black', accentColor: 'bg-gray-100' },
  },
  {
    id: 'science',
    name: 'Science & Research',
    description: 'Academic format optimized for researchers and scientists',
    component: ScienceTemplate,
    fields: ['science', 'education'],
    preview: { headerColor: 'bg-blue-900', accentColor: 'bg-blue-50' },
  },
  {
    id: 'government',
    name: 'Government',
    description: 'Formal template for public service and policy roles',
    component: GovernmentTemplate,
    fields: ['government', 'legal'],
    preview: { headerColor: 'bg-blue-900', accentColor: 'bg-red-100' },
  },
  {
    id: 'construction',
    name: 'Construction',
    description: 'Bold template for architecture, building, and trades',
    component: ConstructionTemplate,
    fields: ['construction', 'engineering'],
    preview: { headerColor: 'bg-orange-700', accentColor: 'bg-orange-100' },
  },
  {
    id: 'logistics',
    name: 'Logistics',
    description: 'Structured template for supply chain and operations',
    component: LogisticsTemplate,
    fields: ['logistics', 'engineering'],
    preview: { headerColor: 'bg-blue-800', accentColor: 'bg-blue-100' },
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
  CourseDeveloperTemplate,
  HRTemplate,
  HospitalityTemplate,
  MediaTemplate,
  ScienceTemplate,
  GovernmentTemplate,
  ConstructionTemplate,
  LogisticsTemplate,
};
