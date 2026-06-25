import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  Shield, 
  Zap, 
  ArrowRight,
  Building2,
  GraduationCap,
  Code,
  Briefcase
} from 'lucide-react';

const features = [
  {
    icon: CheckCircle2,
    title: 'ATS-Optimized',
    description: 'Our templates are designed to pass Applicant Tracking Systems with proper formatting and keywords.',
  },
  {
    icon: Sparkles,
    title: 'Industry Templates',
    description: 'Choose from 10+ field-specific templates tailored for your profession.',
  },
  {
    icon: Zap,
    title: 'Quick & Easy',
    description: 'Build your professional resume in minutes with our intuitive step-by-step wizard.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data stays on your device. No account required to create your resume.',
  },
];

const fields = [
  { icon: Code, name: 'Technology', color: 'bg-blue-500' },
  { icon: Building2, name: 'Finance', color: 'bg-green-500' },
  { icon: GraduationCap, name: 'Education', color: 'bg-purple-500' },
  { icon: Briefcase, name: 'Business', color: 'bg-orange-500' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              ATS-Friendly Templates
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              Build Your{' '}
              <span className="gradient-text">Professional Resume</span>
              {' '}in Minutes
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Create ATS-optimized resumes and CVs tailored to your industry. 
              Simple data entry, professional results.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/builder">
                <Button variant="gradient" size="xl">
                  Create Your Resume
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="xl">
                View Templates
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span>No Account Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span>Download as PDF</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Preview Mockup */}
      <section className="py-16 bg-secondary/30">
        <div className="section-container">
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl opacity-50" />
            <Card className="relative p-8 bg-card shadow-2xl rounded-2xl overflow-hidden">
              <div className="flex gap-8 items-center">
                <div className="hidden md:block w-1/2">
                  <div className="bg-white rounded-lg shadow-lg p-6 transform rotate-1">
                    <div className="h-4 w-32 bg-gray-800 rounded mb-4" />
                    <div className="flex gap-4 mb-6">
                      <div className="h-3 w-24 bg-gray-300 rounded" />
                      <div className="h-3 w-20 bg-gray-300 rounded" />
                    </div>
                    <div className="h-3 w-full bg-gray-200 rounded mb-2" />
                    <div className="h-3 w-4/5 bg-gray-200 rounded mb-6" />
                    <div className="h-4 w-24 bg-gray-700 rounded mb-3" />
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-gray-200 rounded" />
                      <div className="h-3 w-3/4 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 space-y-6">
                  <h2 className="text-2xl font-bold">Choose Your Path</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                      <FileText className="w-8 h-8 text-primary mb-2" />
                      <h3 className="font-semibold">Resume</h3>
                      <p className="text-sm text-muted-foreground">1-2 pages, focused</p>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary border border-border">
                      <FileText className="w-8 h-8 mb-2" />
                      <h3 className="font-semibold">CV</h3>
                      <p className="text-sm text-muted-foreground">Comprehensive</p>
                    </div>
                  </div>
                  <Link to="/builder">
                    <Button variant="gradient" className="w-full">
                      Start Building
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Industry Fields */}
      <section className="py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tailored for Your Industry</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select your field and get industry-specific templates, keywords, and formatting
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {fields.map((field) => (
              <Link key={field.name} to="/builder">
                <Card className="p-6 flex items-center gap-4 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl ${field.color} flex items-center justify-center`}>
                    <field.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium">{field.name}</span>
                </Card>
              </Link>
            ))}
            <Link to="/builder">
              <Card className="p-6 flex items-center gap-4 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-dashed">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <span className="text-2xl">+</span>
                </div>
                <span className="font-medium text-muted-foreground">More Fields</span>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-secondary/30">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose ResumeForge?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to create a winning resume
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="p-6 hover:shadow-lg transition-all animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="section-container">
          <Card className="p-12 text-center hero-gradient text-white rounded-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
              Create your professional resume in minutes and stand out from the competition.
            </p>
            <Link to="/builder">
              <Button size="xl" className="bg-white text-foreground hover:bg-white/90">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="section-container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">ResumeForge</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 ResumeForge. Build professional resumes for free.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
