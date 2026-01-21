import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star } from 'lucide-react';

const templates = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and traditional design perfect for corporate roles',
    fields: ['Finance', 'Legal', 'Business'],
    popular: true,
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary layout with a creative touch',
    fields: ['Technology', 'Marketing', 'Design'],
    popular: true,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant for maximum readability',
    fields: ['All Industries'],
    popular: false,
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Sophisticated design for senior leadership roles',
    fields: ['C-Suite', 'Director', 'VP'],
    popular: false,
  },
  {
    id: 'academic',
    name: 'Academic CV',
    description: 'Comprehensive format for research and academia',
    fields: ['Education', 'Research', 'Science'],
    popular: false,
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold design for creative professionals',
    fields: ['Design', 'Art', 'Media'],
    popular: false,
  },
];

const Templates = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Resume Templates</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Choose from our collection of ATS-friendly templates designed for every industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="group overflow-hidden hover:shadow-xl transition-all">
                <div className="aspect-[3/4] bg-secondary/50 relative">
                  {/* Template Preview Placeholder */}
                  <div className="absolute inset-4 bg-white rounded-lg shadow-sm p-4">
                    <div className="h-3 w-20 bg-gray-800 rounded mb-3" />
                    <div className="h-2 w-16 bg-gray-300 rounded mb-4" />
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-gray-200 rounded" />
                      <div className="h-2 w-4/5 bg-gray-200 rounded" />
                      <div className="h-2 w-3/4 bg-gray-200 rounded" />
                    </div>
                    <div className="h-2 w-12 bg-gray-700 rounded mt-4 mb-2" />
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-gray-200 rounded" />
                      <div className="h-2 w-5/6 bg-gray-200 rounded" />
                    </div>
                  </div>
                  
                  {template.popular && (
                    <Badge className="absolute top-4 right-4 bg-warning text-warning-foreground">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Popular
                    </Badge>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link to="/builder">
                      <Button variant="secondary" size="lg">
                        Use This Template
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {template.fields.map((field) => (
                      <Badge key={field} variant="secondary" className="text-xs">
                        {field}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              All templates are ATS-optimized and customizable
            </p>
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
