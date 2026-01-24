import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { templates } from "@/components/templates";
import { fieldCategories, FieldCategory } from "@/types/resume";
import { Camera, Loader2 } from "lucide-react";

type ProfileRow = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  preferred_field: string | null;
  preferred_template_id: string | null;
};

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [preferredField, setPreferredField] = useState<FieldCategory | "">("");
  const [preferredTemplate, setPreferredTemplate] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const load = useCallback(async () => {
    if (!user) return;
    setLoadingProfile(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("id, display_name, avatar_url, preferred_field, preferred_template_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      toast({ title: "Failed to load profile", description: error.message, variant: "destructive" });
      setLoadingProfile(false);
      return;
    }

    if (data) {
      setProfile(data);
      setDisplayName(data.display_name || "");
      setPreferredField((data.preferred_field as FieldCategory) || "");
      setPreferredTemplate(data.preferred_template_id || "");
      setAvatarUrl(data.avatar_url);
    }
    setLoadingProfile(false);
  }, [toast, user]);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/auth", { replace: true, state: { from: "/profile" } });
      return;
    }
    load();
  }, [authLoading, load, navigate, user]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}/avatar.${fileExt}`;

    setUploading(true);
    try {
      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(fileName);
      const publicUrl = urlData.publicUrl + "?t=" + Date.now(); // cache-bust

      setAvatarUrl(publicUrl);
      toast({ title: "Avatar uploaded" });
    } catch (err: any) {
      toast({ title: "Upload failed", description: err?.message ?? "Please try again", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const updates = {
        display_name: displayName || null,
        avatar_url: avatarUrl,
        preferred_field: preferredField || null,
        preferred_template_id: preferredTemplate || null,
        updated_at: new Date().toISOString(),
      };

      if (profile) {
        const { error } = await supabase
          .from("profiles")
          .update(updates)
          .eq("id", profile.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("profiles").insert({ ...updates, user_id: user.id });
        if (error) throw error;
      }

      toast({ title: "Profile saved" });
    } catch (err: any) {
      toast({ title: "Save failed", description: err?.message ?? "Please try again", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const initials = displayName
    ? displayName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() ?? "U";

  if (authLoading || loadingProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 pb-16">
        <div className="section-container">
          <div className="max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Profile &amp; Preferences</h1>
            <p className="text-muted-foreground mb-8">
              Customize your defaults and personalize your account.
            </p>

            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>Manage your personal information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={avatarUrl ?? undefined} alt="Avatar" />
                      <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                    </Avatar>
                    <label
                      htmlFor="avatar-upload"
                      className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:bg-primary/90"
                    >
                      {uploading ? (
                        <Loader2 className="w-4 h-4 text-primary-foreground animate-spin" />
                      ) : (
                        <Camera className="w-4 h-4 text-primary-foreground" />
                      )}
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleAvatarUpload}
                        disabled={uploading}
                      />
                    </label>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{user?.email}</p>
                    <p className="text-xs text-muted-foreground">Click the camera icon to upload an avatar.</p>
                  </div>
                </div>

                {/* Display Name */}
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display name</Label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Jane Doe"
                  />
                </div>

                {/* Default Field */}
                <div className="space-y-2">
                  <Label>Default Field</Label>
                  <Select value={preferredField} onValueChange={(v) => setPreferredField(v as FieldCategory)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldCategories.map((fc) => (
                        <SelectItem key={fc.value} value={fc.value}>
                          {fc.icon} {fc.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Default Template */}
                <div className="space-y-2">
                  <Label>Default Template</Label>
                  <Select value={preferredTemplate} onValueChange={setPreferredTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full" variant="gradient" onClick={handleSave} disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
