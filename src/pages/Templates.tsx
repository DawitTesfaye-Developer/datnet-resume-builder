import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Check } from 'lucide-react';
import { templates, TemplateInfo } from '@/components/templates';
import { fieldCategories } from '@/types/resume';

const TemplatePreview = ({ template }: { template: TemplateInfo }) => (
  <div className="aspect-[3/4] bg-secondary/50 relative overflow-hidden">
    <div className="absolute inset-3 bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header preview */}
      <div className={`h-12 ${template.preview.headerColor}`}></div>
      <div className="p-3">
        <div className="h-2 w-16 bg-gray-800 rounded mb-2" />
        <div className="h-1.5 w-12 bg-gray-300 rounded mb-3" />
        <div className="space-y-1.5">
          <div className="h-1.5 w-full bg-gray-200 rounded" />
          <div className="h-1.5 w-4/5 bg-gray-200 rounded" />
          <div className="h-1.5 w-3/4 bg-gray-200 rounded" />
        </div>
        <div className="h-1.5 w-10 bg-gray-700 rounded mt-3 mb-1.5" />
        <div className="space-y-1">
          <div className="h-1.5 w-full bg-gray-200 rounded" />
          <div className="h-1.5 w-5/6 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
    
    {template.popular && (
      <Badge className="absolute top-3 right-3 bg-warning text-warning-foreground">
        <Star className="w-3 h-3 mr-1 fill-current" />
        Popular
      </Badge>
    )}
  </div>
);

const Templates = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Resume Templates</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {templates.length} ATS-optimized templates designed for every industry
            </p>
          </div>

          {/* Template Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {templates.map((template) => (
              <Card key={template.id} className="group overflow-hidden hover:shadow-xl transition-all">
                <TemplatePreview template={template} />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link to="/builder" state={{ templateId: template.id }}>
                    <Button variant="secondary" size="lg">
                      Use This Template
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {template.fields.slice(0, 3).map((fieldValue) => {
                      const field = fieldCategories.find(f => f.value === fieldValue);
                      return field ? (
                        <Badge key={fieldValue} variant="secondary" className="text-xs">
                          {field.icon} {field.label}
                        </Badge>
                      ) : null;
                    })}
                    {template.fields.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{template.fields.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Industry Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">Templates by Industry</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {fieldCategories.map((field) => {
                const fieldTemplates = templates.filter(t => t.fields.includes(field.value));
                return (
                  <Card key={field.value} className="p-4 text-center hover:shadow-md transition-shadow">
                    <span className="text-3xl">{field.icon}</span>
                    <h3 className="font-semibold mt-2">{field.label}</h3>
                    <p className="text-sm text-muted-foreground">{fieldTemplates.length} templates</p>
                    <Link to="/builder" state={{ field: field.value }}>
                      <Button variant="ghost" size="sm" className="mt-2">
                        View All <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Features */}
          <section className="bg-secondary/30 rounded-2xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-center mb-6">All Templates Include</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                'ATS-Optimized Format',
                'Easy Customization',
                'Professional Typography',
                'PDF Export',
                'Section Reordering',
                'Color Customization',
                'Mobile Responsive',
                'Print Ready',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-success" />
                  {feature}
                </div>
              ))}
            </div>
          </section>

          <div className="text-center">
            <Link to="/builder">
              <Button variant="gradient" size="lg">
                Start Building Your Resume
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Templates;
