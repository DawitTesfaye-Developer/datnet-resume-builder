import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, UserCheck } from 'lucide-react';
import { Reference } from '@/types/resume';

const ReferencesForm = () => {
  const { resumeData, updateResumeData, addReference, removeReference } = useResume();
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<Omit<Reference, 'id'>>({
    name: '',
    position: '',
    company: '',
    email: '',
    phone: '',
    relationship: '',
  });

  const resetForm = () => {
    setFormData({ name: '', position: '', company: '', email: '', phone: '', relationship: '' });
    setShowForm(false);
  };

  const handleSave = () => {
    addReference({ ...formData, id: crypto.randomUUID() });
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">References</h2>
        <p className="text-muted-foreground">Add professional references or mark as available upon request</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Available Upon Request</h3>
              <p className="text-sm text-muted-foreground">
                Display "References available upon request" instead of listing them
              </p>
            </div>
            <Switch
              checked={resumeData.referencesAvailable}
              onCheckedChange={(val) => updateResumeData({ referencesAvailable: val })}
            />
          </div>
        </Card>

        {!resumeData.referencesAvailable && (
          <div className="space-y-4">
            {resumeData.references.map((ref) => (
              <Card key={ref.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-primary" />
                      {ref.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {ref.position} at {ref.company}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {ref.email} {ref.phone && `· ${ref.phone}`}
                    </p>
                    {ref.relationship && (
                      <p className="text-xs text-muted-foreground italic">{ref.relationship}</p>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeReference(ref.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </Card>
            ))}

            {showForm ? (
              <Card className="p-6 space-y-4 border-primary/50">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name *</Label>
                    <Input
                      placeholder="Jane Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Position *</Label>
                    <Input
                      placeholder="Senior Manager"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Company *</Label>
                    <Input
                      placeholder="Acme Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      placeholder="+1 (555) 987-6543"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Relationship</Label>
                    <Input
                      placeholder="Former supervisor"
                      value={formData.relationship}
                      onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <Button variant="outline" onClick={resetForm}>Cancel</Button>
                  <Button onClick={handleSave} disabled={!formData.name || !formData.position || !formData.company || !formData.email}>
                    Save Reference
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
                Add Reference
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferencesForm;
