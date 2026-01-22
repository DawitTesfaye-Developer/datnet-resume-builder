import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const defaultTab = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("mode") === "signup" ? "signup" : "login";
  }, [location.search]);

  const [tab, setTab] = useState<string>(defaultTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState(false);

  const afterAuthRedirect = () => {
    const state = location.state as { from?: string } | null;
    navigate(state?.from || "/builder", { replace: true });
  };

  const handleLogin = async () => {
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast({ title: "Signed in" });
      afterAuthRedirect();
    } catch (e: any) {
      toast({ title: "Sign in failed", description: e?.message ?? "Please try again", variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const handleSignup = async () => {
    setBusy(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) throw error;

      // Create a profile row (no DB trigger on auth tables)
      const userId = data.user?.id;
      if (userId) {
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({ user_id: userId, display_name: displayName || null });
        if (profileError) throw profileError;
      }

      toast({ title: "Account created", description: "You are now signed in." });
      afterAuthRedirect();
    } catch (e: any) {
      toast({ title: "Sign up failed", description: e?.message ?? "Please try again", variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 pb-16">
        <div className="section-container">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-2">Sign in to save resumes</h1>
            <p className="text-muted-foreground mb-8">Access your resumes from any device and generate share links.</p>

            <Card className="p-6">
              <Tabs value={tab} onValueChange={setTab}>
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign up</TabsTrigger>
                </TabsList>

                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </div>

                <TabsContent value="login" className="mt-6">
                  <Button className="w-full" variant="gradient" onClick={handleLogin} disabled={busy}>
                    Sign in
                  </Button>
                </TabsContent>

                <TabsContent value="signup" className="mt-6">
                  <div className="space-y-2 mb-4">
                    <Label htmlFor="displayName">Display name (optional)</Label>
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="e.g. Dawit"
                    />
                  </div>
                  <Button className="w-full" variant="gradient" onClick={handleSignup} disabled={busy}>
                    Create account
                  </Button>
                </TabsContent>
              </Tabs>
            </Card>

            <p className="text-xs text-muted-foreground mt-4">
              By continuing you agree to our terms. Want to build without saving? <Link className="underline" to="/builder">Open builder</Link>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;
