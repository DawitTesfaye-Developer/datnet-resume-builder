import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { Copy, RefreshCw, Link2, Link2Off } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type ShareLink = {
  id: string;
  public_id: string;
  is_active: boolean;
  created_at: string;
};

interface ShareSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resumeId: string;
  resumeTitle: string;
}

const ShareSettingsDialog = ({
  open,
  onOpenChange,
  resumeId,
  resumeTitle,
}: ShareSettingsDialogProps) => {
  const { toast } = useToast();
  const [shares, setShares] = useState<ShareLink[]>([]);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);

  const fetchShares = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("resume_shares")
      .select("id, public_id, is_active, created_at")
      .eq("resume_id", resumeId)
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Failed to load share links", description: error.message, variant: "destructive" });
    } else {
      setShares((data || []) as ShareLink[]);
    }
    setLoading(false);
  }, [resumeId, toast]);

  useEffect(() => {
    if (open) {
      fetchShares();
    }
  }, [open, fetchShares]);

  const copyLink = async (publicId: string) => {
    const url = `${window.location.origin}/share/${publicId}`;
    await navigator.clipboard.writeText(url);
    toast({ title: "Link copied to clipboard" });
  };

  const toggleActive = async (shareId: string, currentActive: boolean) => {
    setBusy(true);
    const { error } = await supabase
      .from("resume_shares")
      .update({ is_active: !currentActive })
      .eq("id", shareId);

    if (error) {
      toast({ title: "Failed to update", description: error.message, variant: "destructive" });
    } else {
      setShares((prev) =>
        prev.map((s) => (s.id === shareId ? { ...s, is_active: !currentActive } : s))
      );
      toast({ title: currentActive ? "Link disabled" : "Link enabled" });
    }
    setBusy(false);
  };

  const regenerateLink = async () => {
    setBusy(true);
    try {
      // Disable all existing active links
      const activeShares = shares.filter((s) => s.is_active);
      for (const share of activeShares) {
        await supabase.from("resume_shares").update({ is_active: false }).eq("id", share.id);
      }

      // Create a new share link
      const { data, error } = await supabase
        .from("resume_shares")
        .insert({ resume_id: resumeId, is_active: true })
        .select("id, public_id, is_active, created_at")
        .single();

      if (error) throw error;

      const newShare = data as ShareLink;
      setShares((prev) => [newShare, ...prev.map((s) => ({ ...s, is_active: false }))]);

      const url = `${window.location.origin}/share/${newShare.public_id}`;
      await navigator.clipboard.writeText(url);
      toast({ title: "New link created and copied", description: "Previous links have been disabled." });
    } catch (e: any) {
      toast({ title: "Failed to regenerate", description: e?.message, variant: "destructive" });
    }
    setBusy(false);
  };

  const createFirstLink = async () => {
    setBusy(true);
    try {
      const { data, error } = await supabase
        .from("resume_shares")
        .insert({ resume_id: resumeId, is_active: true })
        .select("id, public_id, is_active, created_at")
        .single();

      if (error) throw error;

      const newShare = data as ShareLink;
      setShares([newShare]);

      const url = `${window.location.origin}/share/${newShare.public_id}`;
      await navigator.clipboard.writeText(url);
      toast({ title: "Share link created and copied" });
    } catch (e: any) {
      toast({ title: "Failed to create link", description: e?.message, variant: "destructive" });
    }
    setBusy(false);
  };

  const activeShare = shares.find((s) => s.is_active);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Settings</DialogTitle>
          <DialogDescription>
            Manage sharing for <span className="font-medium">{resumeTitle}</span>
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="py-8 text-center text-muted-foreground">Loading...</div>
        ) : shares.length === 0 ? (
          <div className="py-6 text-center space-y-4">
            <p className="text-muted-foreground">No share links created yet.</p>
            <Button onClick={createFirstLink} disabled={busy} variant="gradient">
              <Link2 className="w-4 h-4 mr-2" />
              Create Share Link
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Active link section */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Active Link</Label>
              {activeShare ? (
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <code className="flex-1 text-xs truncate">
                    {window.location.origin}/share/{activeShare.public_id.slice(0, 8)}...
                  </code>
                  <Button size="sm" variant="ghost" onClick={() => copyLink(activeShare.public_id)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No active link. Enable one below or regenerate.</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button onClick={regenerateLink} disabled={busy} variant="outline" className="flex-1">
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate Link
              </Button>
            </div>

            {/* All links */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">All Links</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {shares.map((share) => (
                  <div
                    key={share.id}
                    className="flex items-center justify-between gap-3 p-3 border rounded-lg"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        {share.is_active ? (
                          <Link2 className="w-4 h-4 text-success shrink-0" />
                        ) : (
                          <Link2Off className="w-4 h-4 text-muted-foreground shrink-0" />
                        )}
                        <code className="text-xs truncate">{share.public_id.slice(0, 12)}...</code>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Created {format(new Date(share.created_at), "MMM d, yyyy")}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyLink(share.public_id)}
                        disabled={!share.is_active}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Switch
                        checked={share.is_active}
                        onCheckedChange={() => toggleActive(share.id, share.is_active)}
                        disabled={busy}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShareSettingsDialog;
