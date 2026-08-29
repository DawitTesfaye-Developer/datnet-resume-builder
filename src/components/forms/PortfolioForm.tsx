import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Image, Video, Link2, FileText } from 'lucide-react';
import { Portfolio } from '@/types/resume';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

const typeIcons = {
  image: Image,
  video: Video,
  document: FileText,
  link: Link2,
  embed: Link2,
};

const PortfolioForm = () => {
  const { resumeData, addPortfolioItem, removePortfolioItem } = useResume();
  const [showForm, setShowForm] = useState(false);
  const [toolInput, setToolInput] = useState('');
  const [formData, setFormData] = useState<Omit<Portfolio, 'id'>>({
    title: '', type: 'link', url: '', thumbnailUrl: '', description: '', category: '', tools: [], date: '',
  });

  const resetForm = () => {
    setFormData({ title: '', type: 'link', url: '', thumbnailUrl: '', description: '', category: '', tools: [], date: '' });
    setToolInput('');
    setShowForm(false);
  };

  const handleSave = () => {
    if (!formData.title || !formData.url) return;
    addPortfolioItem({ ...formData, id: crypto.randomUUID() });
    resetForm();
  };

  const addTool = () => {
    if (toolInput.trim() && !formData.tools?.includes(toolInput.trim())) {
      setFormData({ ...formData, tools: [...(formData.tools || []), toolInput.trim()] });
      setToolInput('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Portfolio & Work Samples</h2>
        <p className="text-muted-foreground">Showcase your best work — images, videos, documents, and links</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {(resumeData.portfolioItems || []).map((item) => {
            const Icon = typeIcons[item.type] || Link2;
            return (
              <Card key={item.id} className="p-3 group relative">
                <Button variant="ghost" size="sm" className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removePortfolioItem(item.id)}>
                  <Trash2 className="w-3.5 h-3.5 text-destructive" />
                </Button>
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-4 h-4 text-primary" />
                  <Badge variant="secondary" className="text-xs">{item.type}</Badge>
                </div>
                <h3 className="font-medium text-sm truncate">{item.title}</h3>
                {item.category && <p className="text-xs text-muted-foreground">{item.category}</p>}
              </Card>
            );
          })}
        </div>
        {showForm ? (
          <Card className="p-6 space-y-4 border-primary/50">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input placeholder="My Portfolio Website" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Type *</Label>
                <Select value={formData.type} onValueChange={(v: any) => setFormData({ ...formData, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="link">Link</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="embed">Embed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label>URL *</Label>
                <Input placeholder="https://..." value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Thumbnail URL</Label>
                <Input placeholder="https://..." value={formData.thumbnailUrl || ''} onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input placeholder="Web Design, Video, Photography..." value={formData.category || ''} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="month" value={formData.date || ''} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Tools Used</Label>
                <div className="flex gap-2">
                  <Input placeholder="Figma, Premiere Pro..." value={toolInput} onChange={(e) => setToolInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTool(); } }} />
                  <Button type="button" variant="outline" onClick={addTool}><Plus className="w-4 h-4" /></Button>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {(formData.tools || []).map((t) => (
                    <Badge key={t} variant="secondary" className="cursor-pointer" onClick={() => setFormData({ ...formData, tools: formData.tools?.filter(x => x !== t) })}>{t} ×</Badge>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Describe this work sample..." value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
              <Button onClick={handleSave} disabled={!formData.title || !formData.url}>Save Portfolio Item</Button>
            </div>
          </Card>
        ) : (
          <Button variant="outline" className="w-full border-dashed h-20" onClick={() => setShowForm(true)}>
            <Plus className="w-5 h-5 mr-2" />Add Portfolio Item
          </Button>
        )}
      </div>
    </div>
  );
};

export default PortfolioForm;
