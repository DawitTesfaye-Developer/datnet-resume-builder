import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ResumeData, defaultResumeData, Reference } from '@/types/resume';

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
  resetResumeData: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [currentStep, setCurrentStep] = useState(1);

  const setResumeDataSafe = (data: ResumeData) => {
    setResumeData(data);
  };

  const updateResumeData = (data: Partial<ResumeData>) => {
    setResumeData((prev) => ({ ...prev, ...data }));
  };

  const updatePersonalInfo = (info: Partial<ResumeData['personalInfo']>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const addExperience = (experience: ResumeData['experiences'][0]) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, experience],
    }));
  };

  const updateExperience = (id: string, experience: Partial<ResumeData['experiences'][0]>) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, ...experience } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  const addEducation = (education: ResumeData['education'][0]) => {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, education],
    }));
  };

  const updateEducation = (id: string, education: Partial<ResumeData['education'][0]>) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, ...education } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const addSkill = (skill: ResumeData['skills'][0]) => {
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }));
  };

  const addCertification = (cert: ResumeData['certifications'][0]) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, cert],
    }));
  };

  const removeCertification = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id),
    }));
  };

  const addProject = (project: ResumeData['projects'][0]) => {
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, project],
    }));
  };

  const removeProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
  };

  const addLanguage = (language: ResumeData['languages'][0]) => {
    setResumeData((prev) => ({
      ...prev,
      languages: [...prev.languages, language],
    }));
  };

  const removeLanguage = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l.id !== id),
    }));
  };

  const addReference = (ref: Reference) => {
    setResumeData((prev) => ({
      ...prev,
      references: [...prev.references, ref],
    }));
  };

  const removeReference = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      references: prev.references.filter((r) => r.id !== id),
    }));
  };

  const resetResumeData = () => {
    setResumeData(defaultResumeData);
    setCurrentStep(0);
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData: setResumeDataSafe,
        updateResumeData,
        updatePersonalInfo,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        removeSkill,
        addCertification,
        removeCertification,
        addProject,
        removeProject,
        addLanguage,
        removeLanguage,
        addReference,
        removeReference,
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
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
