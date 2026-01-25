import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ShareSettingsDialog from "@/components/ShareSettingsDialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { ExternalLink, Settings2, Trash2 } from "lucide-react";

type ResumeRow = {
  id: string;
  title: string;
  document_type: string;
  field_category: string;
  template_id: string | null;
  updated_at: string;
};

const MyResumes = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [items, setItems] = useState<ResumeRow[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [shareDialogResume, setShareDialogResume] = useState<ResumeRow | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((r) => r.title.toLowerCase().includes(q));
  }, [items, query]);

  const load = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("resumes")
      .select("id,title,document_type,field_category,template_id,updated_at")
      .order("updated_at", { ascending: false });
    if (error) {
      toast({ title: "Failed to load resumes", description: error.message, variant: "destructive" });
      return;
    }
    setItems((data || []) as ResumeRow[]);
  }, [toast, user]);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/auth", { replace: true, state: { from: "/my-resumes" } });
      return;
    }
    load();
  }, [load, loading, navigate, user]);

  const handleDelete = async (resumeId: string) => {
    setBusyId(resumeId);
    try {
      const { error } = await supabase.from("resumes").delete().eq("id", resumeId);
      if (error) throw error;
      toast({ title: "Deleted" });
      setItems((prev) => prev.filter((x) => x.id !== resumeId));
    } catch (e: any) {
      toast({ title: "Delete failed", description: e?.message ?? "Please try again", variant: "destructive" });
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 pb-16">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">My Resumes</h1>
              <p className="text-muted-foreground">Manage your saved resumes and share links.</p>
            </div>
            <div className="flex gap-3">
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title..." />
              <Link to="/builder">
                <Button variant="gradient">New</Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {filtered.map((r) => (
              <Card key={r.id} className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <h2 className="font-semibold truncate">{r.title}</h2>
                    <Badge variant="secondary" className="shrink-0">
                      {r.document_type.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="shrink-0">
                      {r.field_category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Updated {formatDistanceToNow(new Date(r.updated_at), { addSuffix: true })}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link to={`/builder?resumeId=${r.id}`}>
                    <Button variant="secondary" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShareDialogResume(r)}
                  >
                    <Settings2 className="w-4 h-4 mr-2" />
                    Share settings
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(r.id)}
                    disabled={busyId === r.id}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}

            {filtered.length === 0 && (
              <Card className="p-10 text-center">
                <p className="text-muted-foreground">No saved resumes yet.</p>
                <div className="mt-4">
                  <Link to="/builder">
                    <Button variant="gradient">Create one</Button>
                  </Link>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>

      {shareDialogResume && (
        <ShareSettingsDialog
          open={!!shareDialogResume}
          onOpenChange={(open) => !open && setShareDialogResume(null)}
          resumeId={shareDialogResume.id}
          resumeTitle={shareDialogResume.title}
        />
      )}
    </div>
  );
};

export default MyResumes;
