import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, FileText, ExternalLink } from 'lucide-react';
import { BlogPost } from '@/types/resume';

const BlogPostsForm = () => {
  const { resumeData, addBlogPost, removeBlogPost } = useResume();
  const [showForm, setShowForm] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [formData, setFormData] = useState<Omit<BlogPost, 'id'>>({
    title: '', summary: '', url: '', publishDate: '', tags: [], platform: '', readTime: '',
  });

  const resetForm = () => {
    setFormData({ title: '', summary: '', url: '', publishDate: '', tags: [], platform: '', readTime: '' });
    setTagInput('');
    setShowForm(false);
  };

  const handleSave = () => {
    if (!formData.title) return;
    addBlogPost({ ...formData, id: crypto.randomUUID() });
    resetForm();
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...(formData.tags || []), tagInput.trim()] });
      setTagInput('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Blog Posts & Articles</h2>
        <p className="text-muted-foreground">Share your knowledge and thought leadership</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-4">
        {(resumeData.blogPosts || []).map((post) => (
          <Card key={post.id} className="p-4 group">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary shrink-0" />
                  <span className="truncate">{post.title}</span>
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{post.platform} · {post.publishDate}</p>
                {post.readTime && <p className="text-xs text-muted-foreground">{post.readTime} read</p>}
                <div className="flex flex-wrap gap-1 mt-2">
                  {(post.tags || []).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-1 ml-2">
                {post.url && (
                  <Button variant="ghost" size="sm" asChild>
                    <a href={post.url} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-4 h-4" /></a>
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => removeBlogPost(post.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {showForm ? (
          <Card className="p-6 space-y-4 border-primary/50">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label>Title *</Label>
                <Input placeholder="How I Built a Full-Stack App in 7 Days" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Platform</Label>
                <Input placeholder="Medium, Dev.to, LinkedIn, Personal Blog..." value={formData.platform || ''} onChange={(e) => setFormData({ ...formData, platform: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Publish Date</Label>
                <Input type="date" value={formData.publishDate} onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>URL</Label>
                <Input placeholder="https://..." value={formData.url || ''} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Read Time</Label>
                <Input placeholder="5 min" value={formData.readTime || ''} onChange={(e) => setFormData({ ...formData, readTime: e.target.value })} />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input placeholder="React, EdTech, Career..." value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }} />
                  <Button type="button" variant="outline" onClick={addTag}><Plus className="w-4 h-4" /></Button>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {(formData.tags || []).map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => setFormData({ ...formData, tags: formData.tags?.filter(t => t !== tag) })}>{tag} ×</Badge>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label>Summary</Label>
                <Textarea placeholder="Brief summary of the article..." value={formData.summary} onChange={(e) => setFormData({ ...formData, summary: e.target.value })} />
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
              <Button onClick={handleSave} disabled={!formData.title}>Save Blog Post</Button>
            </div>
          </Card>
        ) : (
          <Button variant="outline" className="w-full border-dashed h-20" onClick={() => setShowForm(true)}>
            <Plus className="w-5 h-5 mr-2" />Add Blog Post / Article
          </Button>
        )}
      </div>
    </div>
  );
};

export default BlogPostsForm;
</parameter>