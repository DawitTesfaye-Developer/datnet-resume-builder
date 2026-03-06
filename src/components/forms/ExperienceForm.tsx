import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Briefcase, Building, MapPin, Calendar } from 'lucide-react';
import { Experience } from '@/types/resume';
import InlineAiButton from '@/components/InlineAiButton';

const ExperienceForm = () => {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResume();
  const [showForm, setShowForm] = useState(resumeData.experiences.length === 0);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<Experience, 'id'>>({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    achievements: [''],
  });

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [''],
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (editingId) {
      updateExperience(editingId, formData);
    } else {
      addExperience({
        ...formData,
        id: crypto.randomUUID(),
        achievements: formData.achievements.filter((a) => a.trim() !== ''),
      });
    }
    resetForm();
  };

  const handleEdit = (exp: Experience) => {
    setFormData({
      company: exp.company,
      position: exp.position,
      location: exp.location,
      startDate: exp.startDate,
      endDate: exp.endDate,
      current: exp.current,
      description: exp.description,
      achievements: exp.achievements.length > 0 ? exp.achievements : [''],
    });
    setEditingId(exp.id);
    setShowForm(true);
  };

  const addAchievement = () => {
    setFormData({ ...formData, achievements: [...formData.achievements, ''] });
  };

  const updateAchievement = (index: number, value: string) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = value;
    setFormData({ ...formData, achievements: newAchievements });
  };

  const removeAchievement = (index: number) => {
    if (formData.achievements.length > 1) {
      setFormData({
        ...formData,
        achievements: formData.achievements.filter((_, i) => i !== index),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Work Experience</h2>
        <p className="text-muted-foreground">Add your relevant work history</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {/* Existing Experiences */}
        {resumeData.experiences.map((exp) => (
          <Card key={exp.id} className="p-4 group">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{exp.position}</h3>
                <p className="text-sm text-muted-foreground">{exp.company} • {exp.location}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </p>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(exp)}>
                  Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => removeExperience(exp.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {/* Add/Edit Form */}
        {showForm ? (
          <Card className="p-6 space-y-6 border-primary/50">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Job Title *
                </Label>
                <Input
                  placeholder="Software Engineer"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Company *
                </Label>
                <Input
                  placeholder="Google"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </Label>
                <Input
                  placeholder="San Francisco, CA"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="flex items-end gap-4">
                <div className="flex-1 space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Start Date
                  </Label>
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
                    disabled={formData.current}
                  />
                </div>
              </div>

              <div className="md:col-span-2 flex items-center gap-2">
                <Checkbox
                  id="current"
                  checked={formData.current}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, current: checked as boolean, endDate: '' })
                  }
                />
                <Label htmlFor="current" className="text-sm cursor-pointer">
                  I currently work here
                </Label>
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label>Job Description</Label>
                <Textarea
                  placeholder="Brief description of your role and responsibilities..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[80px]"
                />
              </div>

              <div className="md:col-span-2 space-y-3">
                <Label>Key Achievements (use action verbs)</Label>
                {formData.achievements.map((achievement, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Increased sales by 25% through implementing new CRM strategies"
                      value={achievement}
                      onChange={(e) => updateAchievement(index, e.target.value)}
                    />
                    {formData.achievements.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAchievement(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addAchievement}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Achievement
                </Button>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
              <Button onClick={handleSave} disabled={!formData.position || !formData.company}>
                {editingId ? 'Update' : 'Save'} Experience
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
            Add Work Experience
          </Button>
        )}
      </div>
    </div>
  );
};

export default ExperienceForm;
