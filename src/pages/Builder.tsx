import { useEffect, useMemo, useState } from 'react';
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
import { templates, getTemplatesForField, getRecommendedTemplate } from '@/components/templates';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Eye, EyeOff, Download, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Link, useSearchParams } from 'react-router-dom';

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
  const { resumeData, updateResumeData, setResumeData, currentStep, setCurrentStep } = useResume();
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  // Get templates for the selected field
  const availableTemplates = useMemo(() => 
    getTemplatesForField(resumeData.fieldCategory),
    [resumeData.fieldCategory]
  );

  // Get current template - default to recommended for field
  const currentTemplate = useMemo(() => {
    if (selectedTemplateId) {
      return templates.find(t => t.id === selectedTemplateId) || getRecommendedTemplate(resumeData.fieldCategory);
    }
    return getRecommendedTemplate(resumeData.fieldCategory);
  }, [selectedTemplateId, resumeData.fieldCategory]);

  // Load an existing saved resume (if opened from "My Resumes")
  useEffect(() => {
    const resumeId = searchParams.get('resumeId');
    if (!resumeId || resumeId === activeResumeId) return;

    const run = async () => {
      const { data, error } = await supabase
        .from('resumes')
        .select('id,data,template_id')
        .eq('id', resumeId)
        .single();
      if (error) {
        toast({ title: 'Failed to load resume', description: error.message, variant: 'destructive' });
        return;
      }
      setActiveResumeId(data.id);
      setResumeData(data.data as unknown as any);
      if (data.template_id) setSelectedTemplateId(data.template_id);
      setCurrentStep(3);
    };

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeResumeId, searchParams, setCurrentStep, setResumeData, toast]);

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

  const handleSaveToCloud = async () => {
    if (!user) return;

    const title = window.prompt('Name this resume:', resumeData.personalInfo.fullName ? `${resumeData.personalInfo.fullName} Resume` : 'Untitled');
    if (!title) return;

    const payload = {
      user_id: user.id,
      title,
      document_type: resumeData.documentType,
      field_category: resumeData.fieldCategory,
      template_id: currentTemplate.id,
      data: resumeData as unknown as any,
    };

    try {
      if (activeResumeId) {
        const { error } = await supabase.from('resumes').update(payload as any).eq('id', activeResumeId);
        if (error) throw error;
        toast({ title: 'Saved', description: 'Your resume was updated.' });
      } else {
        const { data, error } = await supabase
          .from('resumes')
          .insert([payload as any])
          .select('id')
          .single();
        if (error) throw error;
        setActiveResumeId(data.id);
        toast({ title: 'Saved', description: 'Your resume is now available on all devices.' });
      }
    } catch (e: any) {
      toast({ title: 'Save failed', description: e?.message ?? 'Please try again', variant: 'destructive' });
    }
  };

  const TemplateComponent = currentTemplate.component;

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
            onSelect={(field) => {
              updateResumeData({ fieldCategory: field });
              // Auto-select recommended template for field
              const recommended = getRecommendedTemplate(field);
              setSelectedTemplateId(recommended.id);
            }}
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
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Preview & Export</h2>
              <p className="text-muted-foreground">Choose your template and download when ready</p>
            </div>

            {/* Template Selector */}
            <div className="max-w-4xl mx-auto">
              <h3 className="font-medium mb-4">Choose Template Style</h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-8">
                {availableTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplateId(template.id)}
                    className={cn(
                      "relative p-3 rounded-xl border-2 text-center transition-all",
                      selectedTemplateId === template.id || (!selectedTemplateId && template.id === currentTemplate.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    {(selectedTemplateId === template.id || (!selectedTemplateId && template.id === currentTemplate.id)) && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                    <div className={`h-8 w-full rounded ${template.preview.headerColor} mb-2`}></div>
                    <span className="text-xs font-medium">{template.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button variant="gradient" size="lg" onClick={handlePrint}>
                <Download className="w-5 h-5 mr-2" />
                Download PDF
              </Button>

              {user ? (
                <>
                  <Button variant="success" size="lg" onClick={handleSaveToCloud}>
                    Save to Cloud
                  </Button>
                  <Link to="/my-resumes">
                    <Button variant="outline" size="lg">My Resumes</Button>
                  </Link>
                </>
              ) : (
                <Link to="/auth" state={{ from: '/builder' }}>
                  <Button variant="outline" size="lg">Sign in to Save</Button>
                </Link>
              )}
            </div>

            {/* Resume Preview */}
            <div className="print:block">
              <TemplateComponent data={resumeData} />
            </div>
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
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Live Preview</h3>
                    <Badge variant="secondary">{currentTemplate.name}</Badge>
                  </div>
                  <div className="transform scale-[0.6] origin-top-left" style={{ width: '166.67%' }}>
                    <TemplateComponent data={resumeData} />
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
          .print\\:block, .print\\:block * {
            visibility: visible;
          }
          .print\\:block {
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
