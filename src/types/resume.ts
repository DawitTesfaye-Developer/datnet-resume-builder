export type DocumentType = 'resume' | 'cv';

export type FieldCategory = 
  | 'technology'
  | 'healthcare'
  | 'finance'
  | 'education'
  | 'marketing'
  | 'engineering'
  | 'design'
  | 'legal'
  | 'sales'
  | 'other';

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn?: string;
  portfolio?: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate: string;
  endDate?: string;
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  date: string;
  link?: string;
  description: string;
}

export interface ResumeData {
  documentType: DocumentType;
  fieldCategory: FieldCategory;
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  projects: Project[];
  publications: Publication[];
  languages: { id: string; name: string; proficiency: string }[];
}

export const defaultResumeData: ResumeData = {
  documentType: 'resume',
  fieldCategory: 'technology',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    portfolio: '',
    summary: '',
  },
  experiences: [],
  education: [],
  skills: [],
  certifications: [],
  projects: [],
  publications: [],
  languages: [],
};

export const fieldCategories: { value: FieldCategory; label: string; icon: string; description: string }[] = [
  { value: 'technology', label: 'Technology', icon: '💻', description: 'Software, IT, Data Science' },
  { value: 'healthcare', label: 'Healthcare', icon: '🏥', description: 'Medical, Nursing, Pharmacy' },
  { value: 'finance', label: 'Finance', icon: '💰', description: 'Banking, Accounting, Investment' },
  { value: 'education', label: 'Education', icon: '📚', description: 'Teaching, Research, Academia' },
  { value: 'marketing', label: 'Marketing', icon: '📢', description: 'Digital, Content, Brand' },
  { value: 'engineering', label: 'Engineering', icon: '⚙️', description: 'Mechanical, Civil, Electrical' },
  { value: 'design', label: 'Design', icon: '🎨', description: 'UX/UI, Graphic, Product' },
  { value: 'legal', label: 'Legal', icon: '⚖️', description: 'Law, Compliance, Paralegal' },
  { value: 'sales', label: 'Sales', icon: '🤝', description: 'B2B, Retail, Account Management' },
  { value: 'other', label: 'Other', icon: '📋', description: 'General purpose template' },
];
