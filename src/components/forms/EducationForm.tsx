import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, GraduationCap, Building, Calendar, Award } from 'lucide-react';
import { Education } from '@/types/resume';

const EducationForm = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  const [showForm, setShowForm] = useState(resumeData.education.length === 0);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<Education, 'id'>>({
    institution: '',
    degree: '',
    field: '',
    location: '',
    startDate: '',
    endDate: '',
    gpa: '',
    achievements: [''],
  });

  const resetForm = () => {
    setFormData({
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      achievements: [''],
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (editingId) {
      updateEducation(editingId, formData);
    } else {
      addEducation({
        ...formData,
        id: crypto.randomUUID(),
        achievements: formData.achievements.filter((a) => a.trim() !== ''),
      });
    }
    resetForm();
  };

  const handleEdit = (edu: Education) => {
    setFormData({
      institution: edu.institution,
      degree: edu.degree,
      field: edu.field,
      location: edu.location,
      startDate: edu.startDate,
      endDate: edu.endDate,
      gpa: edu.gpa || '',
      achievements: edu.achievements.length > 0 ? edu.achievements : [''],
    });
    setEditingId(edu.id);
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
    setFormData({
      ...formData,
      achievements: formData.achievements.filter((_, i) => i !== index)
    })
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Education</h2>
        <p className="text-muted-foreground">Add your educational background</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {/* Existing Education */}
        {resumeData.education.map((edu) => (
          <Card key={edu.id} className="p-4 group">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
                <p className="text-sm text-muted-foreground">{edu.institution}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {edu.startDate} - {edu.endDate}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(edu)}>
                  Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => removeEducation(edu.id)}>
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
                  <Building className="w-4 h-4" />
                  Institution *
                </Label>
                <Input
                  placeholder="Harvard University"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Degree *
                </Label>
                <Input
                  placeholder="Bachelor of Science"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Field of Study *</Label>
                <Input
                  placeholder="Computer Science"
                  value={formData.field}
                  onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="Cambridge, MA"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="space-y-2">
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

              <div className="space-y-2">
                <Label>End Date (or Expected)</Label>
                <Input
                  type="month"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  GPA (Optional)
                </Label>
                <Input
                  placeholder="3.8/4.0"
                  value={formData.gpa}
                  onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                />
              </div>

              <div className="md:col-span-2 space-y-3">
                <Label>Honors & Activities (Optional)</Label>
                {formData.achievements.map((achievement, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Dean's List, Honors Society, Research Assistant"
                      value={achievement}
                      onChange={(e) => updateAchievement(index, e.target.value)}
                    />
                    {formData.achievements.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setFormData({
                          ...formData,
                          achievements: formData.achievements.filter((_, i) => i !== index)
                        })}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addAchievement}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Honor/Activity
                </Button>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
              <Button onClick={handleSave} disabled={!formData.institution || !formData.degree || !formData.field}>
                {editingId ? 'Update' : 'Save'} Education
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
            Add Education
          </Button>
        )}
      </div>
    </div>
  );
};

export default EducationForm;
