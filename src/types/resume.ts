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
  | 'other'
  | 'agriculture'
  | 'automotive'
  | 'aviation'
  | 'beauty_wellness'
  | 'childcare'
  | 'cleaning_facilities'
  | 'creative_arts'
  | 'customer_service'
  | 'data_analytics'
  | 'defense_military'
  | 'energy_utilities'
  | 'environmental'
  | 'event_management'
  | 'fashion'
  | 'food_beverage'
  | 'insurance'
  | 'manufacturing'
  | 'mining'
  | 'nonprofit'
  | 'nursing'
  | 'pharmacy'
  | 'physical_therapy'
  | 'plumbing_trades'
  | 'printing_publishing'
  | 'property_real_estate'
  | 'psychology_counseling'
  | 'public_relations'
  | 'retail'
  | 'security'
  | 'social_work'
  | 'sports_fitness'
  | 'telecommunications'
  | 'transportation'
  | 'veterinary'
  | 'warehouse'
  | 'writing_editing';

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
  // Extended fields
  dateOfBirth?: string;
  nationality?: string;
  gender?: string;
  maritalStatus?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  website?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  behance?: string;
  dribbble?: string;
  stackoverflow?: string;
  medium?: string;
  jobTitle?: string;
  yearsOfExperience?: string;
  availableFrom?: string;
  workAuthorization?: string;
  willingToRelocate?: boolean;
  remoteWork?: boolean;
  salaryExpectation?: string;
  noticePeriod?: string;
  drivingLicense?: string;
  whatsapp?: string;
  skype?: string;
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
  // Extended fields
  employmentType?: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship' | 'volunteer' | 'apprenticeship';
  industry?: string;
  companySize?: string;
  salary?: string;
  reasonForLeaving?: string;
  supervisorName?: string;
  supervisorContact?: string;
  responsibilities?: string[];
  toolsUsed?: string[];
  teamSize?: string;
  remote?: boolean;
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
  // Extended fields
  educationType?: 'bachelor' | 'master' | 'phd' | 'associate' | 'diploma' | 'certificate' | 'high_school' | 'vocational' | 'online' | 'bootcamp' | 'other';
  honors?: string;
  thesis?: string;
  relevantCourses?: string[];
  activities?: string[];
  studyMode?: 'full-time' | 'part-time' | 'distance' | 'online';
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category?: string;
  yearsOfExperience?: number;
  lastUsed?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  githubLink?: string;
  startDate: string;
  endDate?: string;
  // Extended fields
  role?: string;
  teamSize?: string;
  status?: 'completed' | 'in-progress' | 'on-hold' | 'planned';
  category?: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'edtech' | 'data' | 'design' | 'other';
  problem?: string;
  solution?: string;
  result?: string;
  imageUrl?: string;
  videoUrl?: string;
  featured?: boolean;
  client?: string;
  impact?: string;
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  date: string;
  link?: string;
  description: string;
  // Extended fields
  authors?: string;
  doi?: string;
  type?: 'journal' | 'conference' | 'book' | 'article' | 'blog' | 'thesis' | 'other';
  citations?: number;
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone?: string;
  relationship: string;
  // Extended fields
  linkedIn?: string;
  yearsKnown?: string;
  canContact?: boolean;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  url?: string;
}

export interface VolunteerWork {
  id: string;
  organization: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  cause?: string;
}

export interface Course {
  id: string;
  name: string;
  provider: string;
  completionDate: string;
  credentialId?: string;
  url?: string;
  description?: string;
  hoursCompleted?: string;
}

export interface Patent {
  id: string;
  title: string;
  patentNumber: string;
  date: string;
  status: 'granted' | 'pending' | 'filed';
  description?: string;
  inventors?: string;
  url?: string;
}

export interface SocialMedia {
  id: string;
  platform: string;
  url: string;
  username?: string;
  followers?: string;
}

export interface TestScore {
  id: string;
  name: string;
  score: string;
  maxScore?: string;
  date: string;
  description?: string;
}

export interface Membership {
  id: string;
  organization: string;
  role?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Portfolio {
  id: string;
  title: string;
  type: 'image' | 'video' | 'document' | 'link' | 'embed';
  url: string;
  thumbnailUrl?: string;
  description?: string;
  category?: string;
  tools?: string[];
  date?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  url?: string;
  publishDate: string;
  tags?: string[];
  platform?: string;
  readTime?: string;
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
  languages: { id: string; name: string; proficiency: string; level?: string }[];
  references: Reference[];
  referencesAvailable: boolean;
  // New sections
  awards: Award[];
  volunteerWork: VolunteerWork[];
  courses: Course[];
  patents: Patent[];
  testScores: TestScore[];
  memberships: Membership[];
  portfolioItems: Portfolio[];
  blogPosts: BlogPost[];
  // Meta
  customSections: CustomSection[];
  resumeSettings: ResumeSettings;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
  bullets?: string[];
}

export interface ResumeSettings {
  primaryColor?: string;
  fontFamily?: string;
  fontSize?: 'small' | 'medium' | 'large';
  spacing?: 'compact' | 'normal' | 'spacious';
  showPhoto?: boolean;
  showQRCode?: boolean;
  pageSize?: 'a4' | 'letter';
  sectionOrder?: string[];
  hiddenSections?: string[];
  accentColor?: string;
  headerStyle?: 'classic' | 'modern' | 'minimal';
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
    willingToRelocate: false,
    remoteWork: false,
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
  awards: [],
  volunteerWork: [],
  courses: [],
  patents: [],
  testScores: [],
  memberships: [],
  portfolioItems: [],
  blogPosts: [],
  customSections: [],
  resumeSettings: {
    primaryColor: '#008000',
    fontFamily: 'Inter',
    fontSize: 'medium',
    spacing: 'normal',
    showPhoto: true,
    showQRCode: false,
    pageSize: 'a4',
    sectionOrder: [],
    hiddenSections: [],
  },
};

export const fieldCategories: { value: FieldCategory; label: string; icon: string; description: string; group: string }[] = [
  // Technology & Digital
  { value: 'technology', label: 'Technology / IT', icon: '💻', description: 'Software, IT, Data Science', group: 'Technology & Digital' },
  { value: 'data_analytics', label: 'Data & Analytics', icon: '📊', description: 'Data Science, BI, Analytics', group: 'Technology & Digital' },
  { value: 'telecommunications', label: 'Telecommunications', icon: '📡', description: 'Telecom, Networks, ISP', group: 'Technology & Digital' },

  // Healthcare & Medical
  { value: 'healthcare', label: 'Healthcare', icon: '🏥', description: 'Medical, Nursing, Pharmacy', group: 'Healthcare & Medical' },
  { value: 'nursing', label: 'Nursing', icon: '👩‍⚕️', description: 'RN, LPN, Nurse Practitioner', group: 'Healthcare & Medical' },
  { value: 'pharmacy', label: 'Pharmacy', icon: '💊', description: 'Pharmacist, Pharmacy Tech', group: 'Healthcare & Medical' },
  { value: 'physical_therapy', label: 'Physical Therapy', icon: '🦴', description: 'PT, OT, Rehabilitation', group: 'Healthcare & Medical' },
  { value: 'psychology_counseling', label: 'Psychology & Counseling', icon: '🧠', description: 'Therapist, Counselor, Psychologist', group: 'Healthcare & Medical' },
  { value: 'veterinary', label: 'Veterinary', icon: '🐾', description: 'Vet, Vet Tech, Animal Care', group: 'Healthcare & Medical' },

  // Business & Finance
  { value: 'finance', label: 'Finance & Banking', icon: '💰', description: 'Banking, Accounting, Investment', group: 'Business & Finance' },
  { value: 'insurance', label: 'Insurance', icon: '🛡️', description: 'Underwriting, Claims, Actuarial', group: 'Business & Finance' },
  { value: 'property_real_estate', label: 'Real Estate', icon: '🏠', description: 'Agent, Broker, Property Mgmt', group: 'Business & Finance' },
  { value: 'sales', label: 'Sales', icon: '🤝', description: 'B2B, Retail, Account Management', group: 'Business & Finance' },

  // Education & Training
  { value: 'education', label: 'Education', icon: '📚', description: 'Teaching, Research, Academia', group: 'Education & Training' },
  { value: 'course_development', label: 'Course Developer', icon: '🎓', description: 'E-Learning, Instructional Design', group: 'Education & Training' },
  { value: 'childcare', label: 'Childcare & Early Ed', icon: '👶', description: 'Daycare, Preschool, Nanny', group: 'Education & Training' },

  // Creative & Media
  { value: 'design', label: 'Design', icon: '🎨', description: 'UX/UI, Graphic, Product', group: 'Creative & Media' },
  { value: 'media', label: 'Media & Journalism', icon: '📰', description: 'Writing, Broadcasting, PR', group: 'Creative & Media' },
  { value: 'marketing', label: 'Marketing', icon: '📢', description: 'Digital, Content, Brand', group: 'Creative & Media' },
  { value: 'public_relations', label: 'Public Relations', icon: '📣', description: 'PR, Communications, Branding', group: 'Creative & Media' },
  { value: 'creative_arts', label: 'Creative Arts', icon: '🎭', description: 'Music, Film, Photography, Art', group: 'Creative & Media' },
  { value: 'fashion', label: 'Fashion & Apparel', icon: '👗', description: 'Design, Styling, Retail', group: 'Creative & Media' },
  { value: 'writing_editing', label: 'Writing & Editing', icon: '✍️', description: 'Copywriter, Editor, Content', group: 'Creative & Media' },
  { value: 'printing_publishing', label: 'Printing & Publishing', icon: '🖨️', description: 'Print, Publishing, Typesetting', group: 'Creative & Media' },

  // Engineering & Trades
  { value: 'engineering', label: 'Engineering', icon: '⚙️', description: 'Mechanical, Civil, Electrical', group: 'Engineering & Trades' },
  { value: 'construction', label: 'Construction', icon: '🏗️', description: 'Architecture, Building, Trades', group: 'Engineering & Trades' },
  { value: 'plumbing_trades', label: 'Plumbing & Trades', icon: '🔧', description: 'Plumber, Electrician, HVAC', group: 'Engineering & Trades' },
  { value: 'automotive', label: 'Automotive', icon: '🚗', description: 'Mechanic, Technician, Sales', group: 'Engineering & Trades' },
  { value: 'aviation', label: 'Aviation', icon: '✈️', description: 'Pilot, ATC, Aircraft Maintenance', group: 'Engineering & Trades' },
  { value: 'energy_utilities', label: 'Energy & Utilities', icon: '⚡', description: 'Oil, Gas, Renewable Energy', group: 'Engineering & Trades' },
  { value: 'mining', label: 'Mining & Resources', icon: '⛏️', description: 'Mining, Geology, Resources', group: 'Engineering & Trades' },

  // Services & Operations
  { value: 'human_resources', label: 'Human Resources', icon: '👥', description: 'Recruiting, Training, People Ops', group: 'Services & Operations' },
  { value: 'legal', label: 'Legal', icon: '⚖️', description: 'Law, Compliance, Paralegal', group: 'Services & Operations' },
  { value: 'logistics', label: 'Logistics & Supply Chain', icon: '🚛', description: 'Supply Chain, Shipping, Ops', group: 'Services & Operations' },
  { value: 'transportation', label: 'Transportation', icon: '🚌', description: 'Driver, Dispatcher, Fleet Mgmt', group: 'Services & Operations' },
  { value: 'warehouse', label: 'Warehouse & Inventory', icon: '📦', description: 'Warehouse, Forklift, Inventory', group: 'Services & Operations' },
  { value: 'manufacturing', label: 'Manufacturing', icon: '🏭', description: 'Production, Assembly, Quality', group: 'Services & Operations' },
  { value: 'customer_service', label: 'Customer Service', icon: '🎧', description: 'Support, Call Center, CX', group: 'Services & Operations' },
  { value: 'security', label: 'Security', icon: '🔒', description: 'Guard, Cybersecurity, Investigator', group: 'Services & Operations' },
  { value: 'cleaning_facilities', label: 'Cleaning & Facilities', icon: '🧹', description: 'Janitorial, Facilities, Maintenance', group: 'Services & Operations' },

  // Hospitality & Food
  { value: 'hospitality', label: 'Hospitality & Tourism', icon: '🏨', description: 'Hotels, Tourism, Food Service', group: 'Hospitality & Food' },
  { value: 'food_beverage', label: 'Food & Beverage', icon: '🍽️', description: 'Chef, Bartender, Restaurant', group: 'Hospitality & Food' },
  { value: 'retail', label: 'Retail', icon: '🛒', description: 'Store, Cashier, Merchandising', group: 'Hospitality & Food' },

  // Social & Community
  { value: 'social_work', label: 'Social Work', icon: '🤲', description: 'Social Worker, Case Manager', group: 'Social & Community' },
  { value: 'nonprofit', label: 'Nonprofit & NGO', icon: '🌍', description: 'Charity, NGO, Community Org', group: 'Social & Community' },
  { value: 'government', label: 'Government & Public Sector', icon: '🏛️', description: 'Public Service, Policy, Admin', group: 'Social & Community' },
  { value: 'defense_military', label: 'Defense & Military', icon: '🎖️', description: 'Military, Defense, Veterans', group: 'Social & Community' },
  { value: 'event_management', label: 'Event Management', icon: '🎪', description: 'Events, Conferences, Weddings', group: 'Social & Community' },

  // Science & Environment
  { value: 'science', label: 'Science & Research', icon: '🔬', description: 'Biology, Chemistry, Physics', group: 'Science & Environment' },
  { value: 'environmental', label: 'Environmental', icon: '🌿', description: 'Ecology, Conservation, Sustainability', group: 'Science & Environment' },
  { value: 'agriculture', label: 'Agriculture & Farming', icon: '🌾', description: 'Farming, Agronomy, Livestock', group: 'Science & Environment' },

  // Lifestyle
  { value: 'beauty_wellness', label: 'Beauty & Wellness', icon: '💅', description: 'Salon, Spa, Cosmetology', group: 'Lifestyle' },
  { value: 'sports_fitness', label: 'Sports & Fitness', icon: '🏋️', description: 'Coach, Trainer, Athlete', group: 'Lifestyle' },

  { value: 'other', label: 'Other / General', icon: '📋', description: 'General purpose template', group: 'Other' },
];
