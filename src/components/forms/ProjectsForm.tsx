import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, FolderKanban, Link, X, Github, Star } from 'lucide-react';
import { Project } from '@/types/resume';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

const ProjectsForm = () => {
  const { resumeData, addProject, removeProject } = useResume();
  const [showForm, setShowForm] = useState(false);
  const [techInput, setTechInput] = useState('');

  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    name: '', description: '', technologies: [], link: '', githubLink: '',
    startDate: '', endDate: '', role: '', teamSize: '', status: 'completed',
    category: 'other', problem: '', solution: '', result: '', imageUrl: '',
    videoUrl: '', featured: false, client: '', impact: '',
  });

  const resetForm = () => {
    setFormData({
      name: '', description: '', technologies: [], link: '', githubLink: '',
      startDate: '', endDate: '', role: '', teamSize: '', status: 'completed',
      category: 'other', problem: '', solution: '', result: '', imageUrl: '',
      videoUrl: '', featured: false, client: '', impact: '',
    });
    setTechInput('');
    setShowForm(false);
  };

  const handleSave = () => {
    if (!formData.name || !formData.description) return;
    addProject({ ...formData, id: crypto.randomUUID() });
    resetForm();
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({ ...formData, technologies: [...formData.technologies, techInput.trim()] });
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({ ...formData, technologies: formData.technologies.filter((t) => t !== tech) });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Projects</h2>
        <p className="text-muted-foreground">Showcase your notable projects with Problem → Solution → Result</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {resumeData.projects.map((project) => (
          <Card key={project.id} className="p-4 group">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold flex items-center gap-2">
                  <FolderKanban className="w-4 h-4 shrink-0" />
                  {project.name}
                  {project.featured && <Star className="w-3.5 h-3.5 text-warning fill-warning" />}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                  ))}
                  {project.technologies.length > 4 && <Badge variant="outline" className="text-xs">+{project.technologies.length - 4}</Badge>}
                </div>
                {project.category && <Badge variant="outline" className="text-xs mt-1">{project.category}</Badge>}
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeProject(project.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </Card>
        ))}

        {showForm ? (
          <Card className="p-6 space-y-6 border-primary/50">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label className="flex items-center gap-2"><FolderKanban className="w-4 h-4" />Project Name *</Label>
                <Input placeholder="E-commerce Platform" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={formData.category || 'other'} onValueChange={(v: any) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="fullstack">Full-Stack</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="edtech">EdTech</SelectItem>
                    <SelectItem value="data">Data / AI</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={formData.status || 'completed'} onValueChange={(v: any) => setFormData({ ...formData, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                    <SelectItem value="planned">Planned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Your Role</Label>
                <Input placeholder="Lead Developer, Designer..." value={formData.role || ''} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Team Size</Label>
                <Input placeholder="Solo, 3 people, 10+" value={formData.teamSize || ''} onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Client / Organization</Label>
                <Input placeholder="Client name or personal project" value={formData.client || ''} onChange={(e) => setFormData({ ...formData, client: e.target.value })} />
              </div>
              <div className="flex items-center gap-3 pt-6">
                <Switch checked={formData.featured || false} onCheckedChange={(v) => setFormData({ ...formData, featured: v })} />
                <Label>Featured Project</Label>
              </div>
            </div>

            {/* Problem → Solution → Result */}
            <div className="space-y-4 border rounded-xl p-4 bg-muted/20">
              <h4 className="font-medium text-sm text-primary">Problem → Solution → Result Framework</h4>
              <div className="space-y-2">
                <Label>🔴 Problem</Label>
                <Textarea placeholder="What problem did this project solve?" value={formData.problem || ''} onChange={(e) => setFormData({ ...formData, problem: e.target.value })} className="min-h-[60px]" />
              </div>
              <div className="space-y-2">
                <Label>🟡 Solution</Label>
                <Textarea placeholder="How did you solve it?" value={formData.solution || ''} onChange={(e) => setFormData({ ...formData, solution: e.target.value })} className="min-h-[60px]" />
              </div>
              <div className="space-y-2">
                <Label>🟢 Result / Impact</Label>
                <Textarea placeholder="What was the measurable outcome?" value={formData.result || ''} onChange={(e) => setFormData({ ...formData, result: e.target.value })} className="min-h-[60px]" />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>General Description *</Label>
              <Textarea placeholder="Brief description of the project..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="min-h-[80px]" />
            </div>

            {/* Technologies */}
            <div className="space-y-2">
              <Label>Technologies Used</Label>
              <div className="flex gap-2">
                <Input placeholder="React, Node.js, etc." value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTechnology(); } }} />
                <Button type="button" variant="outline" onClick={addTechnology}><Plus className="w-4 h-4" /></Button>
              </div>
              {formData.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="py-1">
                      {tech}
                      <button onClick={() => removeTechnology(tech)} className="ml-1"><X className="w-3 h-3" /></button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Links & Media */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Link className="w-4 h-4" />Live Demo URL</Label>
                <Input placeholder="https://myproject.com" value={formData.link || ''} onChange={(e) => setFormData({ ...formData, link: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Github className="w-4 h-4" />GitHub URL</Label>
                <Input placeholder="github.com/user/repo" value={formData.githubLink || ''} onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input placeholder="https://..." value={formData.imageUrl || ''} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Video URL</Label>
                <Input placeholder="https://youtube.com/..." value={formData.videoUrl || ''} onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="month" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input type="month" value={formData.endDate || ''} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
              <Button onClick={handleSave} disabled={!formData.name || !formData.description}>Save Project</Button>
            </div>
          </Card>
        ) : (
          <Button variant="outline" className="w-full border-dashed h-20" onClick={() => setShowForm(true)}>
            <Plus className="w-5 h-5 mr-2" />Add Project
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProjectsForm;