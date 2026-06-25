import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, BookOpen } from 'lucide-react';
import { Course } from '@/types/resume';

const CoursesForm = () => {
  const { resumeData, addCourse, removeCourse } = useResume();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<Course, 'id'>>({
    name: '', provider: '', completionDate: '', credentialId: '', url: '', description: '', hoursCompleted: '',
  });

  const resetForm = () => {
    setFormData({ name: '', provider: '', completionDate: '', credentialId: '', url: '', description: '', hoursCompleted: '' });
    setShowForm(false);
  };

  const handleSave = () => {
    if (!formData.name || !formData.provider) return;
    addCourse({ ...formData, id: crypto.randomUUID() });
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Courses & Training</h2>
        <p className="text-muted-foreground">Add online courses, workshops, and training programs</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-4">
        {(resumeData.courses || []).map((course) => (
          <Card key={course.id} className="p-4 group">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />{course.name}
                </h3>
                <p className="text-sm text-muted-foreground">{course.provider} · {course.completionDate}</p>
                {course.hoursCompleted && <p className="text-xs text-muted-foreground">{course.hoursCompleted} hours</p>}
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeCourse(course.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </Card>
        ))}
        {showForm ? (
          <Card className="p-6 space-y-4 border-primary/50">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Course Name *</Label>
                <Input placeholder="React - The Complete Guide" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Provider / Platform *</Label>
                <Input placeholder="Udemy, Coursera, LinkedIn Learning..." value={formData.provider} onChange={(e) => setFormData({ ...formData, provider: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Completion Date</Label>
                <Input type="month" value={formData.completionDate} onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Hours Completed</Label>
                <Input placeholder="40" value={formData.hoursCompleted || ''} onChange={(e) => setFormData({ ...formData, hoursCompleted: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Credential ID</Label>
                <Input placeholder="UC-XXXXXXXX" value={formData.credentialId || ''} onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Certificate URL</Label>
                <Input placeholder="https://..." value={formData.url || ''} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="What you learned..." value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
              <Button onClick={handleSave} disabled={!formData.name || !formData.provider}>Save Course</Button>
            </div>
          </Card>
        ) : (
          <Button variant="outline" className="w-full border-dashed h-20" onClick={() => setShowForm(true)}>
            <Plus className="w-5 h-5 mr-2" />Add Course / Training
          </Button>
        )}
      </div>
    </div>
  );
};

export default CoursesForm;
</parameter>