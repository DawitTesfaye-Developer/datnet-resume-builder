import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, FolderKanban, Link, X } from 'lucide-react';
import { Project } from '@/types/resume';

const ProjectsForm = () => {
  const { resumeData, addProject, removeProject } = useResume();
  const [showForm, setShowForm] = useState(false);
  const [techInput, setTechInput] = useState('');

  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    name: '',
    description: '',
    technologies: [],
    link: '',
    startDate: '',
    endDate: '',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      technologies: [],
      link: '',
      startDate: '',
      endDate: '',
    });
    setTechInput('');
    setShowForm(false);
  };

  const handleSave = () => {
    addProject({
      ...formData,
      id: crypto.randomUUID(),
    });
    resetForm();
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({ ...formData, technologies: [...formData.technologies, techInput.trim()] });
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };

  const handleTechKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechnology();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Projects</h2>
        <p className="text-muted-foreground">Showcase your notable projects and achievements</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {/* Existing Projects */}
        {resumeData.projects.map((project) => (
          <Card key={project.id} className="p-4 group">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <FolderKanban className="w-4 h-4" />
                  {project.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeProject(project.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </Card>
        ))}

        {/* Add Form */}
        {showForm ? (
          <Card className="p-6 space-y-6 border-primary/50">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label className="flex items-center gap-2">
                  <FolderKanban className="w-4 h-4" />
                  Project Name *
                </Label>
                <Input
                  placeholder="E-commerce Platform"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label>Description *</Label>
                <Textarea
                  placeholder="Brief description of the project, your role, and key outcomes..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[80px]"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label>Technologies Used</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="React, Node.js, etc."
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={handleTechKeyPress}
                  />
                  <Button type="button" variant="outline" onClick={addTechnology}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {formData.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="py-1">
                        {tech}
                        <button onClick={() => removeTechnology(tech)} className="ml-1">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Link className="w-4 h-4" />
                  Project Link
                </Label>
                <Input
                  placeholder="github.com/yourproject"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
              <Button onClick={handleSave} disabled={!formData.name || !formData.description}>
                Save Project
              </Button>
            </div>
          </Card>
        ) : (
          <Button
            variant="outline"
            className="w-full border-dashed h-20"
            onClick={() => setShowForm(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Project
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProjectsForm;
