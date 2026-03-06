import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Plus, X, Sparkles, GraduationCap, Loader2 } from 'lucide-react';
import { Skill, fieldCategories } from '@/types/resume';
import { useAiAssistant } from '@/hooks/useAiAssistant';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const skillSuggestions: Record<string, string[]> = {
  technology: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Git', 'SQL', 'REST APIs'],
  healthcare: ['Patient Care', 'EMR/EHR', 'HIPAA Compliance', 'Clinical Research', 'Medical Terminology', 'CPR Certified'],
  finance: ['Financial Analysis', 'Excel', 'Bloomberg Terminal', 'Risk Management', 'Financial Modeling', 'QuickBooks'],
  education: ['Curriculum Development', 'Classroom Management', 'Student Assessment', 'Lesson Planning', 'EdTech'],
  marketing: ['SEO/SEM', 'Google Analytics', 'Content Strategy', 'Social Media', 'HubSpot', 'Copywriting'],
  engineering: ['CAD/CAM', 'Project Management', 'AutoCAD', 'MATLAB', 'Technical Documentation', 'Quality Assurance'],
  design: ['Figma', 'Adobe Creative Suite', 'UI/UX Design', 'Wireframing', 'Design Systems', 'Prototyping'],
  legal: ['Legal Research', 'Contract Law', 'LexisNexis', 'Document Review', 'Compliance', 'Case Management'],
  sales: ['CRM Software', 'Salesforce', 'Negotiation', 'Lead Generation', 'Account Management', 'Cold Calling'],
  course_development: ['Articulate Storyline', 'Articulate Rise', 'Adobe Captivate', 'Camtasia', 'Instructional Design', 'Storyboarding', 'SCORM', 'xAPI'],
  other: ['Microsoft Office', 'Communication', 'Problem Solving', 'Leadership', 'Time Management', 'Teamwork'],
};

const lmsSkills = [
  'Articulate Storyline', 'Articulate Rise', 'Adobe Captivate', 'Camtasia',
  'Canvas LMS', 'Moodle', 'Blackboard', 'Google Classroom',
  'Brightspace (D2L)', 'Schoology', 'TalentLMS', 'Docebo',
  'SCORM', 'xAPI (Tin Can)', 'cmi5', 'LTI',
  'Lectora', 'iSpring Suite', 'Vyond', 'H5P',
];

const lmsFieldCategories = ['course_development', 'education', 'technology'];

const SkillsForm = () => {
  const { resumeData, addSkill, removeSkill } = useResume();
  const { invoke, isLoading: aiLoading } = useAiAssistant();
  const [newSkill, setNewSkill] = useState('');
  const [skillLevel, setSkillLevel] = useState<Skill['level']>('intermediate');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  const suggestions = skillSuggestions[resumeData.fieldCategory] || skillSuggestions.other;
  const existingSkillNames = resumeData.skills.map((s) => s.name.toLowerCase());

  const handleAddSkill = (name: string = newSkill) => {
    if (name.trim() && !existingSkillNames.includes(name.toLowerCase())) {
      addSkill({
        id: crypto.randomUUID(),
        name: name.trim(),
        level: skillLevel,
      });
      setNewSkill('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const getLevelColor = (level: Skill['level']) => {
    switch (level) {
      case 'beginner': return 'bg-muted text-muted-foreground';
      case 'intermediate': return 'bg-primary/20 text-primary';
      case 'advanced': return 'bg-accent/20 text-accent';
      case 'expert': return 'bg-success/20 text-success';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Skills</h2>
        <p className="text-muted-foreground">Add your technical and soft skills</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Add Skill Form */}
        <Card className="p-6">
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Type a skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <Select value={skillLevel} onValueChange={(val) => setSkillLevel(val as Skill['level'])}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => handleAddSkill()} disabled={!newSkill.trim()}>
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </Card>

        {/* Suggestions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-warning" />
              <h3 className="font-medium">Suggested for {fieldCategories.find(f => f.value === resumeData.fieldCategory)?.label}</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-primary"
              disabled={aiLoading}
              onClick={async () => {
                const ctx = `Field: ${resumeData.fieldCategory}\nExisting skills: ${resumeData.skills.map(s => s.name).join(', ')}\nExperience: ${resumeData.experiences.map(e => `${e.position} at ${e.company}`).join(', ')}`;
                const res = await invoke('suggest_skills', ctx);
                if (res) {
                  try {
                    const parsed = JSON.parse(res);
                    if (Array.isArray(parsed)) setAiSuggestions(parsed);
                  } catch { /* ignore */ }
                }
              }}
            >
              {aiLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              AI Suggest
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {[...suggestions, ...aiSuggestions]
              .filter((s, i, arr) => arr.indexOf(s) === i) // dedupe
              .filter((s) => !existingSkillNames.includes(s.toLowerCase()))
              .map((skill) => (
                <Button
                  key={skill}
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddSkill(skill)}
                  className="rounded-full"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {skill}
                </Button>
              ))}
          </div>
        </Card>

        {/* LMS & Authoring Tools Quick-Add */}
        {lmsFieldCategories.includes(resumeData.fieldCategory) && (
          <Card className="p-6 border-accent/30">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5 text-accent" />
              <h3 className="font-medium">LMS & Authoring Tools</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {lmsSkills
                .filter((s) => !existingSkillNames.includes(s.toLowerCase()))
                .map((skill) => (
                  <Button
                    key={skill}
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddSkill(skill)}
                    className="rounded-full border-accent/40 hover:bg-accent/10"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    {skill}
                  </Button>
                ))}
            </div>
          </Card>
        )}

        {resumeData.skills.length > 0 && (
          <Card className="p-6">
            <h3 className="font-medium mb-4">Your Skills ({resumeData.skills.length})</h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill) => (
                <Badge
                  key={skill.id}
                  variant="secondary"
                  className={`${getLevelColor(skill.level)} py-1.5 px-3 text-sm group`}
                >
                  {skill.name}
                  <span className="text-xs ml-1 opacity-60">({skill.level})</span>
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SkillsForm;
