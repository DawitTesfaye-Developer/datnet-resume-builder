import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, ClipboardList } from 'lucide-react';
import { TestScore } from '@/types/resume';

const TestScoresForm = () => {
  const { resumeData, addTestScore, removeTestScore } = useResume();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<TestScore, 'id'>>({
    name: '', score: '', maxScore: '', date: '', description: '',
  });

  const resetForm = () => {
    setFormData({ name: '', score: '', maxScore: '', date: '', description: '' });
    setShowForm(false);
  };

  const handleSave = () => {
    if (!formData.name || !formData.score) return;
    addTestScore({ ...formData, id: crypto.randomUUID() });
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Test Scores</h2>
        <p className="text-muted-foreground">Add standardized test scores (TOEFL, IELTS, GRE, SAT, etc.)</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-4">
        {(resumeData.testScores || []).map((score) => (
          <Card key={score.id} className="p-4 group">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-primary" />{score.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Score: <span className="font-bold text-foreground">{score.score}</span>
                  {score.maxScore && ` / ${score.maxScore}`} · {score.date}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeTestScore(score.id)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </Card>
        ))}
        {showForm ? (
          <Card className="p-6 space-y-4 border-primary/50">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Test Name *</Label>
                <Input placeholder="TOEFL, IELTS, GRE, SAT, GMAT..." value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Score *</Label>
                <Input placeholder="110" value={formData.score} onChange={(e) => setFormData({ ...formData, score: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Maximum Score</Label>
                <Input placeholder="120" value={formData.maxScore || ''} onChange={(e) => setFormData({ ...formData, maxScore: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="month" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Additional context about the test..." value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
              <Button onClick={handleSave} disabled={!formData.name || !formData.score}>Save Test Score</Button>
            </div>
          </Card>
        ) : (
          <Button variant="outline" className="w-full border-dashed h-20" onClick={() => setShowForm(true)}>
            <Plus className="w-5 h-5 mr-2" />Add Test Score
          </Button>
        )}
      </div>
    </div>
  );
};

export default TestScoresForm;
</parameter>