import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { templates, getRecommendedTemplate } from "@/components/templates";
import type { ResumeData } from "@/types/resume";

type SharedResumePayload = {
  id: string;
  template_id: string | null;
  field_category: string;
  data: ResumeData;
};

const SharedResume = () => {
  const { shareId } = useParams();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<SharedResumePayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!shareId) return;
      setLoading(true);
      setError(null);

      try {
        const { data: share, error: shareErr } = await supabase
          .from("resume_shares")
          .select("resume_id")
          .eq("public_id", shareId)
          .eq("is_active", true)
          .maybeSingle();
        if (shareErr) throw shareErr;
        if (!share?.resume_id) {
          setError("This share link is invalid or disabled.");
          setItem(null);
          return;
        }

        const { data: resume, error: resumeErr } = await supabase
          .from("resumes")
          .select("id,template_id,field_category,data")
          .eq("id", share.resume_id)
          .single();
        if (resumeErr) throw resumeErr;

        setItem({
          id: (resume as any).id,
          template_id: (resume as any).template_id,
          field_category: (resume as any).field_category,
          data: (resume as any).data as unknown as ResumeData,
        });
      } catch (e: any) {
        setError(e?.message ?? "Failed to load shared resume.");
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [shareId]);

  const template = useMemo(() => {
    if (!item) return null;
    if (item.template_id) return templates.find((t) => t.id === item.template_id) || null;
    return getRecommendedTemplate(item.data.fieldCategory);
  }, [item]);

  const TemplateComponent = template?.component;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 pb-16">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">Shared resume</h1>
            <p className="text-muted-foreground mb-6">View-only link.</p>

            {loading && <Card className="p-8">Loading…</Card>}

            {!loading && error && (
              <Card className="p-8">
                <p className="text-muted-foreground">{error}</p>
                <div className="mt-4">
                  <Link to="/">
                    <Button variant="secondary">Go home</Button>
                  </Link>
                </div>
              </Card>
            )}

            {!loading && !error && item && TemplateComponent && (
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <TemplateComponent data={item.data} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SharedResume;
