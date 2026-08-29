import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  ResumeData, defaultResumeData, Reference,
  Award, VolunteerWork, Course, Patent, TestScore,
  Membership, Portfolio, BlogPost, CustomSection, CustomSectionItem
} from '@/types/resume';

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
  updateResumeData: (data: Partial<ResumeData>) => void;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  addExperience: (experience: ResumeData['experiences'][0]) => void;
  updateExperience: (id: string, experience: Partial<ResumeData['experiences'][0]>) => void;
  removeExperience: (id: string) => void;
  addEducation: (education: ResumeData['education'][0]) => void;
  updateEducation: (id: string, education: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: ResumeData['skills'][0]) => void;
  removeSkill: (id: string) => void;
  addCertification: (cert: ResumeData['certifications'][0]) => void;
  removeCertification: (id: string) => void;
  addProject: (project: ResumeData['projects'][0]) => void;
  removeProject: (id: string) => void;
  addLanguage: (language: ResumeData['languages'][0]) => void;
  removeLanguage: (id: string) => void;
  addReference: (ref: Reference) => void;
  removeReference: (id: string) => void;
  // New section handlers
  addAward: (award: Award) => void;
  removeAward: (id: string) => void;
  addVolunteerWork: (vol: VolunteerWork) => void;
  removeVolunteerWork: (id: string) => void;
  addCourse: (course: Course) => void;
  removeCourse: (id: string) => void;
  addPatent: (patent: Patent) => void;
  removePatent: (id: string) => void;
  addTestScore: (score: TestScore) => void;
  removeTestScore: (id: string) => void;
  addMembership: (membership: Membership) => void;
  removeMembership: (id: string) => void;
  addPortfolioItem: (item: Portfolio) => void;
  removePortfolioItem: (id: string) => void;
  addBlogPost: (post: BlogPost) => void;
  removeBlogPost: (id: string) => void;
  addCustomSection: (section: CustomSection) => void;
  removeCustomSection: (id: string) => void;
  updateResumeSettings: (settings: Partial<ResumeData['resumeSettings']>) => void;
  resetResumeData: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [currentStep, setCurrentStep] = useState(1);

  const updateResumeData = (data: Partial<ResumeData>) => {
    setResumeData((prev) => ({ ...prev, ...data }));
  };

  const updatePersonalInfo = (info: Partial<ResumeData['personalInfo']>) => {
    setResumeData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, ...info } }));
  };

  const addExperience = (experience: ResumeData['experiences'][0]) => {
    setResumeData((prev) => ({ ...prev, experiences: [...prev.experiences, experience] }));
  };
  const updateExperience = (id: string, experience: Partial<ResumeData['experiences'][0]>) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => exp.id === id ? { ...exp, ...experience } : exp),
    }));
  };
  const removeExperience = (id: string) => {
    setResumeData((prev) => ({ ...prev, experiences: prev.experiences.filter((exp) => exp.id !== id) }));
  };

  const addEducation = (education: ResumeData['education'][0]) => {
    setResumeData((prev) => ({ ...prev, education: [...prev.education, education] }));
  };
  const updateEducation = (id: string, education: Partial<ResumeData['education'][0]>) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => edu.id === id ? { ...edu, ...education } : edu),
    }));
  };
  const removeEducation = (id: string) => {
    setResumeData((prev) => ({ ...prev, education: prev.education.filter((edu) => edu.id !== id) }));
  };

  const addSkill = (skill: ResumeData['skills'][0]) => {
    setResumeData((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
  };
  const removeSkill = (id: string) => {
    setResumeData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s.id !== id) }));
  };

  const addCertification = (cert: ResumeData['certifications'][0]) => {
    setResumeData((prev) => ({ ...prev, certifications: [...prev.certifications, cert] }));
  };
  const removeCertification = (id: string) => {
    setResumeData((prev) => ({ ...prev, certifications: prev.certifications.filter((c) => c.id !== id) }));
  };

  const addProject = (project: ResumeData['projects'][0]) => {
    setResumeData((prev) => ({ ...prev, projects: [...prev.projects, project] }));
  };
  const removeProject = (id: string) => {
    setResumeData((prev) => ({ ...prev, projects: prev.projects.filter((p) => p.id !== id) }));
  };

  const addLanguage = (language: ResumeData['languages'][0]) => {
    setResumeData((prev) => ({ ...prev, languages: [...prev.languages, language] }));
  };
  const removeLanguage = (id: string) => {
    setResumeData((prev) => ({ ...prev, languages: prev.languages.filter((l) => l.id !== id) }));
  };

  const addReference = (ref: Reference) => {
    setResumeData((prev) => ({ ...prev, references: [...prev.references, ref] }));
  };
  const removeReference = (id: string) => {
    setResumeData((prev) => ({ ...prev, references: prev.references.filter((r) => r.id !== id) }));
  };

  // New sections
  const addAward = (award: Award) => {
    setResumeData((prev) => ({ ...prev, awards: [...(prev.awards || []), award] }));
  };
  const removeAward = (id: string) => {
    setResumeData((prev) => ({ ...prev, awards: (prev.awards || []).filter((a) => a.id !== id) }));
  };

  const addVolunteerWork = (vol: VolunteerWork) => {
    setResumeData((prev) => ({ ...prev, volunteerWork: [...(prev.volunteerWork || []), vol] }));
  };
  const removeVolunteerWork = (id: string) => {
    setResumeData((prev) => ({ ...prev, volunteerWork: (prev.volunteerWork || []).filter((v) => v.id !== id) }));
  };

  const addCourse = (course: Course) => {
    setResumeData((prev) => ({ ...prev, courses: [...(prev.courses || []), course] }));
  };
  const removeCourse = (id: string) => {
    setResumeData((prev) => ({ ...prev, courses: (prev.courses || []).filter((c) => c.id !== id) }));
  };

  const addPatent = (patent: Patent) => {
    setResumeData((prev) => ({ ...prev, patents: [...(prev.patents || []), patent] }));
  };
  const removePatent = (id: string) => {
    setResumeData((prev) => ({ ...prev, patents: (prev.patents || []).filter((p) => p.id !== id) }));
  };

  const addTestScore = (score: TestScore) => {
    setResumeData((prev) => ({ ...prev, testScores: [...(prev.testScores || []), score] }));
  };
  const removeTestScore = (id: string) => {
    setResumeData((prev) => ({ ...prev, testScores: (prev.testScores || []).filter((s) => s.id !== id) }));
  };

  const addMembership = (membership: Membership) => {
    setResumeData((prev) => ({ ...prev, memberships: [...(prev.memberships || []), membership] }));
  };
  const removeMembership = (id: string) => {
    setResumeData((prev) => ({ ...prev, memberships: (prev.memberships || []).filter((m) => m.id !== id) }));
  };

  const addPortfolioItem = (item: Portfolio) => {
    setResumeData((prev) => ({ ...prev, portfolioItems: [...(prev.portfolioItems || []), item] }));
  };
  const removePortfolioItem = (id: string) => {
    setResumeData((prev) => ({ ...prev, portfolioItems: (prev.portfolioItems || []).filter((p) => p.id !== id) }));
  };

  const addBlogPost = (post: BlogPost) => {
    setResumeData((prev) => ({ ...prev, blogPosts: [...(prev.blogPosts || []), post] }));
  };
  const removeBlogPost = (id: string) => {
    setResumeData((prev) => ({ ...prev, blogPosts: (prev.blogPosts || []).filter((b) => b.id !== id) }));
  };

  const addCustomSection = (section: CustomSection) => {
    setResumeData((prev) => ({ ...prev, customSections: [...(prev.customSections || []), section] }));
  };
  const removeCustomSection = (id: string) => {
    setResumeData((prev) => ({ ...prev, customSections: (prev.customSections || []).filter((s) => s.id !== id) }));
  };

  const updateResumeSettings = (settings: Partial<ResumeData['resumeSettings']>) => {
    setResumeData((prev) => ({
      ...prev,
      resumeSettings: { ...prev.resumeSettings, ...settings },
    }));
  };

  const resetResumeData = () => {
    setResumeData(defaultResumeData);
    setCurrentStep(1);
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        updateResumeData,
        updatePersonalInfo,
        addExperience, updateExperience, removeExperience,
        addEducation, updateEducation, removeEducation,
        addSkill, removeSkill,
        addCertification, removeCertification,
        addProject, removeProject,
        addLanguage, removeLanguage,
        addReference, removeReference,
        addAward, removeAward,
        addVolunteerWork, removeVolunteerWork,
        addCourse, removeCourse,
        addPatent, removePatent,
        addTestScore, removeTestScore,
        addMembership, removeMembership,
        addPortfolioItem, removePortfolioItem,
        addBlogPost, removeBlogPost,
        addCustomSection, removeCustomSection,
        updateResumeSettings,
        resetResumeData,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) throw new Error('useResume must be used within a ResumeProvider');
  return context;
};
