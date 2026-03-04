import { useRef } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, MapPin, Linkedin, Globe, Camera, X } from 'lucide-react';

const PersonalInfoForm = () => {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      updatePersonalInfo({ photoUrl: event.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    updatePersonalInfo({ photoUrl: undefined });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Personal Information</h2>
        <p className="text-muted-foreground">Let's start with your basic details</p>
      </div>

      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="relative group">
          {personalInfo.photoUrl ? (
            <div className="relative">
              <img
                src={personalInfo.photoUrl}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-primary/20 shadow-md"
              />
              <button
                onClick={removePhoto}
                className="absolute -top-1 -right-1 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center shadow-sm hover:bg-destructive/90 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-28 h-28 rounded-full bg-muted border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <Camera className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Add Photo</span>
            </button>
          )}
        </div>
        {personalInfo.photoUrl && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="text-xs"
          >
            Change Photo
          </Button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />
        <p className="text-xs text-muted-foreground">Optional · JPG, PNG under 5MB</p>
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
