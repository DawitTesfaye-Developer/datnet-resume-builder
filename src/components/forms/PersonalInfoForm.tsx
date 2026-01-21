import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const PersonalInfoForm = () => {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Personal Information</h2>
        <p className="text-muted-foreground">Let's start with your basic details</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Full Name *
          </Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={personalInfo.fullName}
            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={personalInfo.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone Number *
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={personalInfo.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location *
          </Label>
          <Input
            id="location"
            placeholder="New York, NY"
            value={personalInfo.location}
            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin" className="flex items-center gap-2">
            <Linkedin className="w-4 h-4" />
            LinkedIn URL
          </Label>
          <Input
            id="linkedin"
            placeholder="linkedin.com/in/johndoe"
            value={personalInfo.linkedIn}
            onChange={(e) => updatePersonalInfo({ linkedIn: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="portfolio" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Portfolio / Website
          </Label>
          <Input
            id="portfolio"
            placeholder="johndoe.com"
            value={personalInfo.portfolio}
            onChange={(e) => updatePersonalInfo({ portfolio: e.target.value })}
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="summary">Professional Summary *</Label>
          <Textarea
            id="summary"
            placeholder="A brief overview of your professional background, key skills, and career objectives. Keep it concise and impactful (2-4 sentences)."
            value={personalInfo.summary}
            onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
            className="min-h-[120px] resize-none"
          />
          <p className="text-xs text-muted-foreground">
            Tip: Focus on your unique value proposition and what you can offer to potential employers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
