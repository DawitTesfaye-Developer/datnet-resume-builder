import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import Header from '@/components/Header';
import StepIndicator from '@/components/StepIndicator';
import DocumentTypeSelector from '@/components/DocumentTypeSelector';
import FieldSelector from '@/components/FieldSelector';
import PersonalInfoForm from '@/components/forms/PersonalInfoForm';
import ExperienceForm from '@/components/forms/ExperienceForm';
import EducationForm from '@/components/forms/EducationForm';
import SkillsForm from '@/components/forms/SkillsForm';
import ProjectsForm from '@/components/forms/ProjectsForm';
import ResumePreview from '@/components/ResumePreview';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Eye, EyeOff, Download } from 'lucide-react';

const steps = [
  { id: 1, name: 'Document Type', shortName: 'Type' },
  { id: 2, name: 'Select Field', shortName: 'Field' },
  { id: 3, name: 'Personal Info', shortName: 'Personal' },
  { id: 4, name: 'Experience', shortName: 'Experience' },
  { id: 5, name: 'Education', shortName: 'Education' },
  { id: 6, name: 'Skills', shortName: 'Skills' },
  { id: 7, name: 'Projects', shortName: 'Projects' },
  { id: 8, name: 'Preview & Export', shortName: 'Preview' },
];

const Builder = () => {
  const { resumeData, updateResumeData, currentStep, setCurrentStep } = useResume();
  const [showPreview, setShowPreview] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <DocumentTypeSelector
            selected={resumeData.documentType}
            onSelect={(type) => updateResumeData({ documentType: type })}
          />
        );
      case 2:
        return (
          <FieldSelector
            selected={resumeData.fieldCategory}
            onSelect={(field) => updateResumeData({ fieldCategory: field })}
          />
        );
      case 3:
        return <PersonalInfoForm />;
      case 4:
        return <ExperienceForm />;
      case 5:
        return <EducationForm />;
      case 6:
        return <SkillsForm />;
      case 7:
        return <ProjectsForm />;
      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Preview & Export</h2>
              <p className="text-muted-foreground">Review your resume and download when ready</p>
            </div>
            <div className="flex justify-center gap-4">
              <Button variant="gradient" size="lg" onClick={handlePrint}>
                <Download className="w-5 h-5 mr-2" />
                Download PDF
              </Button>
            </div>
            <ResumePreview />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-32">
        <div className="section-container">
          {/* Step Indicator */}
          <div className="mb-12 max-w-4xl mx-auto">
            <StepIndicator
              steps={steps}
              currentStep={currentStep}
              onStepClick={(step) => step <= currentStep && setCurrentStep(step)}
            />
          </div>

          {/* Main Content */}
          <div className="flex gap-8">
            <div className={`flex-1 transition-all duration-300 ${showPreview && currentStep !== 8 ? 'lg:w-1/2' : 'w-full'}`}>
              <div className="animate-fade-in">
                {renderStepContent()}
              </div>
            </div>

            {/* Side Preview */}
            {showPreview && currentStep !== 8 && (
              <div className="hidden lg:block w-1/2 animate-slide-up">
                <div className="sticky top-24">
                  <h3 className="text-lg font-medium mb-4">Live Preview</h3>
                  <div className="transform scale-75 origin-top-left">
                    <ResumePreview />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border py-4 print:hidden">
        <div className="section-container flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>

          <div className="flex items-center gap-4">
            {currentStep > 2 && currentStep < 8 && (
              <Button
                variant="ghost"
                onClick={() => setShowPreview(!showPreview)}
                className="hidden lg:flex"
              >
                {showPreview ? (
                  <>
                    <EyeOff className="w-4 h-4 mr-1" />
                    Hide Preview
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-1" />
                    Show Preview
                  </>
                )}
              </Button>
            )}

            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </span>
          </div>

          <Button
            variant={currentStep === steps.length ? 'gradient' : 'default'}
            onClick={handleNext}
            disabled={currentStep === steps.length}
          >
            {currentStep === steps.length - 1 ? 'Preview' : 'Next'}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .bg-white, .bg-white * {
            visibility: visible;
          }
          .bg-white {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Builder;
