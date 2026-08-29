import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Trophy } from 'lucide-react';
import { Award } from '@/types/resume';

const AwardsForm = () => {
  const { resumeData, addAward, removeAward } = useResume();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<Award, 'id'>>({
    title: '', issuer: '', date: '', description: '', url: '',
  });

  const resetForm = () => {
    setFormData({ title: '', issuer: '', date: '', description: '', url: '' });
    setShowForm(false);
  };

  const handleSave = () => {
    if (!formData.title || !formData.issuer) return;
    addAward({ ...formData, id: crypto.randomUUID() });
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Awards & Honors</h2>
        <p className="text-muted-foreground">Showcase your achievements and recognition</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-4">
        {(resumeData.awards || []).map((award) => (
          <Card key={award.id} className="p-4 group">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-warning" />{award.title}
                </h3>
                <p className="text-sm text-muted-foreground">{award.issuer} · {award.date}</p>
                {award.description && <p className="text-sm text-muted-foreground mt-1">{award.description}</p>}
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeAward(award.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </Card>
        ))}
        {showForm ? (
          <Card className="p-6 space-y-4 border-primary/50">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Award Title *</Label>
                <Input placeholder="Employee of the Year" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Issuing Organization *</Label>
                <Input placeholder="Google Inc." value={formData.issuer} onChange={(e) => setFormData({ ...formData, issuer: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="month" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>URL / Link</Label>
                <Input placeholder="https://..." value={formData.url || ''} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Brief description of the award..." value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
              <Button onClick={handleSave} disabled={!formData.title || !formData.issuer}>Save Award</Button>
            </div>
          </Card>
        ) : (
          <Button variant="outline" className="w-full border-dashed h-20" onClick={() => setShowForm(true)}>
            <Plus className="w-5 h-5 mr-2" />Add Award / Honor
          </Button>
        )}
      </div>
    </div>
  );
};

export default AwardsForm;
