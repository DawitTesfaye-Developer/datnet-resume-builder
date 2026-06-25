import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Users } from 'lucide-react';
import { Membership } from '@/types/resume';

const MembershipsForm = () => {
  const { resumeData, addMembership, removeMembership } = useResume();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<Membership, 'id'>>({
    organization: '', role: '', startDate: '', endDate: '', current: false, description: '',
  });

  const resetForm = () => {
    setFormData({ organization: '', role: '', startDate: '', endDate: '', current: false, description: '' });
    setShowForm(false);
  };

  const handleSave = () => {
    if (!formData.organization) return;
    addMembership({ ...formData, id: crypto.randomUUID() });
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Professional Memberships</h2>
        <p className="text-muted-foreground">Add professional associations and organizations you belong to</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-4">
        {(resumeData.memberships || []).map((m) => (
          <Card key={m.id} className="p-4 group">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />{m.organization}
                </h3>
                {m.role && <p className="text-sm text-muted-foreground">{m.role}</p>}
                <p className="text-xs text-muted-foreground">{m.startDate} – {m.current ? 'Present' : m.endDate}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeMembership(m.id)}>
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
                <Input placeholder="IEEE, ACM, AMA..." value={formData.organization} onChange={(e) => setFormData({ ...formData, organization: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Role / Position</Label>
                <Input placeholder="Member, Board Member, Chair..." value={formData.role || ''} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
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
                <Checkbox id="memCurrent" checked={formData.current} onCheckedChange={(v) => setFormData({ ...formData, current: v as boolean, endDate: '' })} />
                <Label htmlFor="memCurrent">Currently a member</Label>
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Describe your involvement..." value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
              <Button onClick={handleSave} disabled={!formData.organization}>Save Membership</Button>
            </div>
          </Card>
        ) : (
          <Button variant="outline" className="w-full border-dashed h-20" onClick={() => setShowForm(true)}>
            <Plus className="w-5 h-5 mr-2" />Add Membership
          </Button>
        )}
      </div>
    </div>
  );
};

export default MembershipsForm;
</parameter>