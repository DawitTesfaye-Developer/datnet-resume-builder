import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Award } from 'lucide-react';
import { Certification } from '@/types/resume';

const CertificationsForm = () => {
  const { resumeData, addCertification, removeCertification } = useResume();
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<Omit<Certification, 'id'>>({
    name: '',
    issuer: '',
    date: '',
    expiryDate: '',
    credentialId: '',
  });

  const resetForm = () => {
    setFormData({ name: '', issuer: '', date: '', expiryDate: '', credentialId: '' });
    setShowForm(false);
  };

  const handleSave = () => {
    addCertification({ ...formData, id: crypto.randomUUID() });
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Certifications</h2>
        <p className="text-muted-foreground">Add your professional certifications and credentials</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {resumeData.certifications.map((cert) => (
          <Card key={cert.id} className="p-4 group">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  {cert.name}
                </h3>
                <p className="text-sm text-muted-foreground">{cert.issuer} · {cert.date}</p>
                {cert.credentialId && (
                  <p className="text-xs text-muted-foreground mt-1">ID: {cert.credentialId}</p>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeCertification(cert.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </Card>
        ))}

        {showForm ? (
          <Card className="p-6 space-y-4 border-primary/50">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label>Certification Name *</Label>
                <Input
                  placeholder="AWS Solutions Architect"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Issuing Organization *</Label>
                <Input
                  placeholder="Amazon Web Services"
                  value={formData.issuer}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Date Earned</Label>
                <Input
                  type="month"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Expiry Date</Label>
                <Input
                  type="month"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Credential ID</Label>
                <Input
                  placeholder="ABC-123-XYZ"
                  value={formData.credentialId}
                  onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
              <Button onClick={handleSave} disabled={!formData.name || !formData.issuer}>
                Save Certification
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
            Add Certification
          </Button>
        )}
      </div>
    </div>
  );
};

export default CertificationsForm;
