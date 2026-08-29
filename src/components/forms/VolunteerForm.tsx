import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Heart } from 'lucide-react';
import { VolunteerWork } from '@/types/resume';

const VolunteerForm = () => {
  const { resumeData, addVolunteerWork, removeVolunteerWork } = useResume();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<VolunteerWork, 'id'>>({
    organization: '', role: '', location: '', startDate: '', endDate: '',
    current: false, description: '', achievements: [''], cause: '',
  });

  const resetForm = () => {
    setFormData({ organization: '', role: '', location: '', startDate: '', endDate: '', current: false, description: '', achievements: [''], cause: '' });
    setShowForm(false);
  };

  const handleSave = () => {
    if (!formData.organization || !formData.role) return;
    addVolunteerWork({
      ...formData,
      id: crypto.randomUUID(),
      achievements: formData.achievements.filter(a => a.trim()),
    });
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Volunteer Work</h2>
        <p className="text-muted-foreground">Highlight your community contributions and causes</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-4">
        {(resumeData.volunteerWork || []).map((vol) => (
          <Card key={vol.id} className="p-4 group">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <Heart className="w-4 h-4 text-destructive" />{vol.role}
                </h3>
                <p className="text-sm text-muted-foreground">{vol.organization}{vol.location ? ` · ${vol.location}` : ''}</p>
                <p className="text-xs text-muted-foreground">{vol.startDate} – {vol.current ? 'Present' : vol.endDate}</p>
                {vol.cause && <p className="text-xs text-primary mt-1">Cause: {vol.cause}</p>}
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeVolunteerWork(vol.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </Card>
        ))}
        {showForm ? (
          <Card className="p-6 space-y-4 border-primary/50">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Organization *</Label>
                <Input placeholder="Red Cross" value={formData.organization} onChange={(e) => setFormData({ ...formData, organization: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Role *</Label>
                <Input placeholder="Volunteer Coordinator" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input placeholder="New York, NY" value={formData.location || ''} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Cause / Category</Label>
                <Input placeholder="Education, Environment, Health..." value={formData.cause || ''} onChange={(e) => setFormData({ ...formData, cause: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="month" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input type="month" value={formData.endDate || ''} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} disabled={formData.current} />
              </div>
              <div className="md:col-span-2 flex items-center gap-2">
                <Checkbox id="volCurrent" checked={formData.current} onCheckedChange={(v) => setFormData({ ...formData, current: v as boolean, endDate: '' })} />
                <Label htmlFor="volCurrent">Currently volunteering here</Label>
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Describe your volunteer work..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
              <Button onClick={handleSave} disabled={!formData.organization || !formData.role}>Save Volunteer Work</Button>
            </div>
          </Card>
        ) : (
          <Button variant="outline" className="w-full border-dashed h-20" onClick={() => setShowForm(true)}>
            <Plus className="w-5 h-5 mr-2" />Add Volunteer Work
          </Button>
        )}
      </div>
    </div>
  );
};

export default VolunteerForm;
