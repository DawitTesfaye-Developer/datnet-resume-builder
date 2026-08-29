import { useRef, useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { User, Mail, Phone, MapPin, Linkedin, Globe, Camera, X, Github, Twitter, Instagram, Youtube, Link2, MessageCircle, Briefcase, Calendar, Flag, Heart, Car, DollarSign, Clock, Map as MapIcon } from 'lucide-react';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

const PersonalInfoForm = () => {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('Image must be under 5MB'); return; }
    const reader = new FileReader();
    reader.onload = (event) => updatePersonalInfo({ photoUrl: event.target?.result as string });
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
        <p className="text-muted-foreground">Complete your profile — more details = stronger resume</p>
      </div>

      {/* Photo Upload */}
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="relative group">
          {personalInfo.photoUrl ? (
            <div className="relative">
              <img src={personalInfo.photoUrl} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-primary/20 shadow-md" />
              <button onClick={removePhoto} className="absolute -top-1 -right-1 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center shadow-sm hover:bg-destructive/90 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button onClick={() => fileInputRef.current?.click()} className="w-28 h-28 rounded-full bg-muted border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer">
              <Camera className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Add Photo</span>
            </button>
          )}
        </div>
        {personalInfo.photoUrl && (
          <Button variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()} className="text-xs">Change Photo</Button>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
        <p className="text-xs text-muted-foreground">Optional · JPG, PNG under 5MB</p>
      </div>

      <Tabs defaultValue="basic" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="contact">Contact & Social</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="personal">Personal Details</TabsTrigger>
        </TabsList>

        {/* BASIC INFO */}
        <TabsContent value="basic">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2"><User className="w-4 h-4" />Full Name *</Label>
              <Input id="fullName" placeholder="John Doe" value={personalInfo.fullName} onChange={(e) => updatePersonalInfo({ fullName: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="flex items-center gap-2"><Briefcase className="w-4 h-4" />Job Title / Headline</Label>
              <Input id="jobTitle" placeholder="Senior Software Engineer" value={personalInfo.jobTitle || ''} onChange={(e) => updatePersonalInfo({ jobTitle: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2"><Mail className="w-4 h-4" />Email Address *</Label>
              <Input id="email" type="email" placeholder="john@example.com" value={personalInfo.email} onChange={(e) => updatePersonalInfo({ email: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2"><Phone className="w-4 h-4" />Phone Number *</Label>
              <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" value={personalInfo.phone} onChange={(e) => updatePersonalInfo({ phone: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2"><MapPin className="w-4 h-4" />City, Country *</Label>
              <Input id="location" placeholder="New York, USA" value={personalInfo.location} onChange={(e) => updatePersonalInfo({ location: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2"><MapIcon className="w-4 h-4" />Full Address</Label>
              <Input id="address" placeholder="123 Main St, Apt 4B" value={personalInfo.address || ''} onChange={(e) => updatePersonalInfo({ address: e.target.value })} />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="summary">Professional Summary *</Label>
              <Textarea id="summary" placeholder="A brief overview of your professional background, key skills, and career objectives..." value={personalInfo.summary} onChange={(e) => updatePersonalInfo({ summary: e.target.value })} className="min-h-[120px] resize-none" />
              <p className="text-xs text-muted-foreground">Tip: 2–4 sentences highlighting your unique value proposition.</p>
            </div>
          </div>
        </TabsContent>

        {/* CONTACT & SOCIAL */}
        <TabsContent value="contact">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Linkedin className="w-4 h-4" />LinkedIn URL</Label>
              <Input placeholder="linkedin.com/in/johndoe" value={personalInfo.linkedIn || ''} onChange={(e) => updatePersonalInfo({ linkedIn: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Github className="w-4 h-4" />GitHub</Label>
              <Input placeholder="github.com/johndoe" value={personalInfo.github || ''} onChange={(e) => updatePersonalInfo({ github: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Globe className="w-4 h-4" />Portfolio / Website</Label>
              <Input placeholder="johndoe.com" value={personalInfo.portfolio || ''} onChange={(e) => updatePersonalInfo({ portfolio: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Twitter className="w-4 h-4" />Twitter / X</Label>
              <Input placeholder="twitter.com/johndoe" value={personalInfo.twitter || ''} onChange={(e) => updatePersonalInfo({ twitter: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Instagram className="w-4 h-4" />Instagram</Label>
              <Input placeholder="instagram.com/johndoe" value={personalInfo.instagram || ''} onChange={(e) => updatePersonalInfo({ instagram: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Youtube className="w-4 h-4" />YouTube</Label>
              <Input placeholder="youtube.com/@johndoe" value={personalInfo.youtube || ''} onChange={(e) => updatePersonalInfo({ youtube: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Link2 className="w-4 h-4" />Behance</Label>
              <Input placeholder="behance.net/johndoe" value={personalInfo.behance || ''} onChange={(e) => updatePersonalInfo({ behance: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Link2 className="w-4 h-4" />Dribbble</Label>
              <Input placeholder="dribbble.com/johndoe" value={personalInfo.dribbble || ''} onChange={(e) => updatePersonalInfo({ dribbble: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Link2 className="w-4 h-4" />Stack Overflow</Label>
              <Input placeholder="stackoverflow.com/users/..." value={personalInfo.stackoverflow || ''} onChange={(e) => updatePersonalInfo({ stackoverflow: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Link2 className="w-4 h-4" />Medium / Blog</Label>
              <Input placeholder="medium.com/@johndoe" value={personalInfo.medium || ''} onChange={(e) => updatePersonalInfo({ medium: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><MessageCircle className="w-4 h-4" />WhatsApp</Label>
              <Input placeholder="+1 555 123 4567" value={personalInfo.whatsapp || ''} onChange={(e) => updatePersonalInfo({ whatsapp: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><MessageCircle className="w-4 h-4" />Skype</Label>
              <Input placeholder="live:johndoe" value={personalInfo.skype || ''} onChange={(e) => updatePersonalInfo({ skype: e.target.value })} />
            </div>
          </div>
        </TabsContent>

        {/* PROFESSIONAL */}
        <TabsContent value="professional">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Briefcase className="w-4 h-4" />Years of Experience</Label>
              <Input placeholder="e.g. 5" value={personalInfo.yearsOfExperience || ''} onChange={(e) => updatePersonalInfo({ yearsOfExperience: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Calendar className="w-4 h-4" />Available From</Label>
              <Input type="date" value={personalInfo.availableFrom || ''} onChange={(e) => updatePersonalInfo({ availableFrom: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Flag className="w-4 h-4" />Work Authorization</Label>
              <Select value={personalInfo.workAuthorization || ''} onValueChange={(v) => updatePersonalInfo({ workAuthorization: v })}>
                <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="citizen">Citizen</SelectItem>
                  <SelectItem value="permanent_resident">Permanent Resident</SelectItem>
                  <SelectItem value="work_visa">Work Visa</SelectItem>
                  <SelectItem value="student_visa">Student Visa</SelectItem>
                  <SelectItem value="requires_sponsorship">Requires Sponsorship</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Clock className="w-4 h-4" />Notice Period</Label>
              <Select value={personalInfo.noticePeriod || ''} onValueChange={(v) => updatePersonalInfo({ noticePeriod: v })}>
                <SelectTrigger><SelectValue placeholder="Select notice period" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediately">Immediately Available</SelectItem>
                  <SelectItem value="1_week">1 Week</SelectItem>
                  <SelectItem value="2_weeks">2 Weeks</SelectItem>
                  <SelectItem value="1_month">1 Month</SelectItem>
                  <SelectItem value="2_months">2 Months</SelectItem>
                  <SelectItem value="3_months">3 Months</SelectItem>
                  <SelectItem value="negotiable">Negotiable</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><DollarSign className="w-4 h-4" />Salary Expectation</Label>
              <Input placeholder="e.g. $80,000 - $100,000 / year" value={personalInfo.salaryExpectation || ''} onChange={(e) => updatePersonalInfo({ salaryExpectation: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Car className="w-4 h-4" />Driving License</Label>
              <Input placeholder="e.g. Class B, Valid until 2028" value={personalInfo.drivingLicense || ''} onChange={(e) => updatePersonalInfo({ drivingLicense: e.target.value })} />
            </div>
            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Label>Willing to Relocate</Label>
                <Switch checked={personalInfo.willingToRelocate || false} onCheckedChange={(v) => updatePersonalInfo({ willingToRelocate: v })} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Open to Remote Work</Label>
                <Switch checked={personalInfo.remoteWork || false} onCheckedChange={(v) => updatePersonalInfo({ remoteWork: v })} />
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* PERSONAL DETAILS */}
        <TabsContent value="personal">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Calendar className="w-4 h-4" />Date of Birth</Label>
              <Input type="date" value={personalInfo.dateOfBirth || ''} onChange={(e) => updatePersonalInfo({ dateOfBirth: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Flag className="w-4 h-4" />Nationality</Label>
              <Input placeholder="e.g. American, Ethiopian" value={personalInfo.nationality || ''} onChange={(e) => updatePersonalInfo({ nationality: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={personalInfo.gender || ''} onValueChange={(v) => updatePersonalInfo({ gender: v })}>
                <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non_binary">Non-binary</SelectItem>
                  <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Heart className="w-4 h-4" />Marital Status</Label>
              <Select value={personalInfo.maritalStatus || ''} onValueChange={(v) => updatePersonalInfo({ maritalStatus: v })}>
                <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                  <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>City</Label>
              <Input placeholder="New York" value={personalInfo.city || ''} onChange={(e) => updatePersonalInfo({ city: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>State / Province</Label>
              <Input placeholder="New York" value={personalInfo.state || ''} onChange={(e) => updatePersonalInfo({ state: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Country</Label>
              <Input placeholder="United States" value={personalInfo.country || ''} onChange={(e) => updatePersonalInfo({ country: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Postal / ZIP Code</Label>
              <Input placeholder="10001" value={personalInfo.postalCode || ''} onChange={(e) => updatePersonalInfo({ postalCode: e.target.value })} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PersonalInfoForm;
