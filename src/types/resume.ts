export type DocumentType = 'resume' | 'cv';

export type FieldCategory = 
  | 'technology'
  | 'healthcare'
  | 'finance'
  | 'education'
  | 'course_development'
  | 'marketing'
  | 'engineering'
  | 'design'
  | 'legal'
  | 'sales'
  | 'human_resources'
  | 'hospitality'
  | 'media'
  | 'science'
  | 'government'
  | 'construction'
  | 'logistics'
  | 'international_org'
  | 'other';

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn?: string;
  github?: string;
  portfolio?: string;
  summary: string;
  photoUrl?: string;
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

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone?: string;
  relationship: string;
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
  references: Reference[];
  referencesAvailable: boolean;
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
    github: '',
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
  references: [],
  referencesAvailable: true,
};

export const fieldCategories: { value: FieldCategory; label: string; icon: string; description: string }[] = [
  { value: 'technology', label: 'Technology', icon: '💻', description: 'Software, IT, Data Science' },
  { value: 'healthcare', label: 'Healthcare', icon: '🏥', description: 'Medical, Nursing, Pharmacy' },
  { value: 'finance', label: 'Finance', icon: '💰', description: 'Banking, Accounting, Investment' },
  { value: 'education', label: 'Education', icon: '📚', description: 'Teaching, Research, Academia' },
  { value: 'course_development', label: 'Course Developer', icon: '🎓', description: 'E-Learning, Instructional Design' },
  { value: 'marketing', label: 'Marketing', icon: '📢', description: 'Digital, Content, Brand' },
  { value: 'engineering', label: 'Engineering', icon: '⚙️', description: 'Mechanical, Civil, Electrical' },
  { value: 'design', label: 'Design', icon: '🎨', description: 'UX/UI, Graphic, Product' },
  { value: 'legal', label: 'Legal', icon: '⚖️', description: 'Law, Compliance, Paralegal' },
  { value: 'sales', label: 'Sales', icon: '🤝', description: 'B2B, Retail, Account Management' },
  { value: 'human_resources', label: 'Human Resources', icon: '👥', description: 'Recruiting, Training, People Ops' },
  { value: 'hospitality', label: 'Hospitality', icon: '🏨', description: 'Hotels, Tourism, Food Service' },
  { value: 'media', label: 'Media & Journalism', icon: '📰', description: 'Writing, Broadcasting, PR' },
  { value: 'science', label: 'Science & Research', icon: '🔬', description: 'Biology, Chemistry, Physics' },
  { value: 'government', label: 'Government', icon: '🏛️', description: 'Public Service, Policy, Admin' },
  { value: 'construction', label: 'Construction', icon: '🏗️', description: 'Architecture, Building, Trades' },
  { value: 'logistics', label: 'Logistics', icon: '🚛', description: 'Supply Chain, Shipping, Ops' },
  { value: 'other', label: 'Other', icon: '📋', description: 'General purpose template' },
];
