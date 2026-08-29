import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Settings2, ChevronDown, ChevronUp } from 'lucide-react';
import { CustomSection, CustomSectionItem } from '@/types/resume';

const CustomSectionForm = () => {
  const { resumeData, addCustomSection, removeCustomSection, updateResumeData } = useResume();
  const [showNewSection, setShowNewSection] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newItem, setNewItem] = useState<Omit<CustomSectionItem, 'id'>>({
    title: '', subtitle: '', date: '', description: '', bullets: [''],
  });
  const [addingToSection, setAddingToSection] = useState<string | null>(null);

  const handleCreateSection = () => {
    if (!newSectionTitle.trim()) return;
    addCustomSection({ id: crypto.randomUUID(), title: newSectionTitle.trim(), items: [] });
    setNewSectionTitle('');
    setShowNewSection(false);
  };

  const handleAddItem = (sectionId: string) => {
    const updated = (resumeData.customSections || []).map(s => {
      if (s.id !== sectionId) return s;
      return {
        ...s,
        items: [...s.items, { ...newItem, id: crypto.randomUUID(), bullets: newItem.bullets?.filter(b => b.trim()) }],
      };
    });
    updateResumeData({ customSections: updated });
    setNewItem({ title: '', subtitle: '', date: '', description: '', bullets: [''] });
    setAddingToSection(null);
  };

  const handleRemoveItem = (sectionId: string, itemId: string) => {
    const updated = (resumeData.customSections || []).map(s => {
      if (s.id !== sectionId) return s;
      return { ...s, items: s.items.filter(i => i.id !== itemId) };
    });
    updateResumeData({ customSections: updated });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Custom Sections</h2>
        <p className="text-muted-foreground">Add any section that doesn't fit elsewhere — Hobbies, Interests, Achievements, etc.</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-4">
        {(resumeData.customSections || []).map((section) => (
          <Card key={section.id} className="overflow-hidden">
            <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}>
              <h3 className="font-semibold flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-primary" />{section.title}
                <span className="text-xs text-muted-foreground">({section.items.length} items)</span>
              </h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); removeCustomSection(section.id); }}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
                {expandedSection === section.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
            {expandedSection === section.id && (
              <div className="p-4 border-t space-y-3">
                {section.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start bg-muted/30 rounded-lg p-3">
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      {item.subtitle && <p className="text-xs text-muted-foreground">{item.subtitle}</p>}
                      {item.date && <p className="text-xs text-muted-foreground">{item.date}</p>}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(section.id, item.id)}>
                      <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    </Button>
                  </div>
                ))}
                {addingToSection === section.id ? (
                  <div className="space-y-3 border rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Title *</Label>
                        <Input placeholder="Item title" value={newItem.title} onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Subtitle</Label>
                        <Input placeholder="Subtitle" value={newItem.subtitle || ''} onChange={(e) => setNewItem({ ...newItem, subtitle: e.target.value })} />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Date</Label>
                        <Input placeholder="2024" value={newItem.date || ''} onChange={(e) => setNewItem({ ...newItem, date: e.target.value })} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Description</Label>
                      <Textarea placeholder="Description..." value={newItem.description || ''} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} className="min-h-[60px]" />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleAddItem(section.id)} disabled={!newItem.title}>Add Item</Button>
                      <Button size="sm" variant="outline" onClick={() => setAddingToSection(null)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" className="w-full border-dashed" onClick={() => setAddingToSection(section.id)}>
                    <Plus className="w-4 h-4 mr-1" />Add Item
                  </Button>
                )}
              </div>
            )}
          </Card>
        ))}
        {showNewSection ? (
          <Card className="p-4 space-y-3 border-primary/50">
            <Label>Section Title *</Label>
            <Input placeholder="e.g. Hobbies, Interests, Achievements..." value={newSectionTitle} onChange={(e) => setNewSectionTitle(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleCreateSection(); }} />
            <div className="flex gap-2">
              <Button onClick={handleCreateSection} disabled={!newSectionTitle.trim()}>Create Section</Button>
              <Button variant="outline" onClick={() => { setShowNewSection(false); setNewSectionTitle(''); }}>Cancel</Button>
            </div>
          </Card>
        ) : (
          <Button variant="outline" className="w-full border-dashed h-20" onClick={() => setShowNewSection(true)}>
            <Plus className="w-5 h-5 mr-2" />Add Custom Section
          </Button>
        )}
      </div>
    </div>
  );
};

export default CustomSectionForm;
