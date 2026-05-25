import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Download } from "lucide-react";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  brochure: { title: string; filename?: string } | null;
}

export function DownloadModal({ isOpen, onClose, brochure }: DownloadModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    city: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brochure) return;
    
    setLoading(true);
    try {
      const res = await fetch("/api/brochure-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, brochureTitle: brochure.title }),
      });
      
      if (res.ok) {
        const data = await res.json();
        setSuccess(true);
        setDownloadUrl(data.downloadUrl || "#");
        toast.success("Request sent successfully.");
      } else {
        toast.error("Failed to submit request.");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setSuccess(false);
    setDownloadUrl(null);
    setFormData({ name: "", email: "", phone: "", company: "", city: "" });
    onClose();
  };

  if (!brochure) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && resetAndClose()}>
      <DialogContent className="sm:max-w-[500px] border-none shadow-2xl p-0 overflow-hidden bg-background">
        <div className="bg-brand-secondary p-6 text-white text-center border-b border-white/10">
          <DialogTitle className="text-2xl font-heading mb-2">Download Catalog</DialogTitle>
          <DialogDescription className="text-white/80 font-sans text-xs uppercase tracking-widest">
            {brochure.title}
          </DialogDescription>
        </div>
        
        <div className="p-6">
          {success ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                ✓
              </div>
              <h3 className="text-xl font-heading text-foreground mb-2">Check Your Inbox</h3>
              <p className="text-muted-foreground font-sans mb-6">
                We've sent the PDF to your email. You can also download it directly below.
              </p>
              <div className="flex flex-col gap-4">
                {downloadUrl && (
                  <Button render={<a href={downloadUrl} download={brochure.filename || "brochure.pdf"} />} className="bg-brand-primary hover:bg-brand-primary/90 text-white rounded-none uppercase text-[10px] tracking-widest font-bold h-12">
                    <Download className="w-4 h-4 mr-2" /> Download Now
                  </Button>
                )}
                <Button variant="outline" onClick={resetAndClose} className="uppercase text-[10px] tracking-widest font-bold h-12">
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              <p className="text-sm text-muted-foreground mb-6 text-center">
                Enter your details to receive the download link via email.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Name *</label>
                  <Input required name="name" value={formData.name} onChange={handleChange} className="rounded-none border-border/50 bg-muted/30 focus-visible:ring-brand-primary" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Email *</label>
                  <Input required type="email" name="email" value={formData.email} onChange={handleChange} className="rounded-none border-border/50 bg-muted/30 focus-visible:ring-brand-primary" />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Phone *</label>
                <Input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="rounded-none border-border/50 bg-muted/30 focus-visible:ring-brand-primary" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Company (Optional)</label>
                  <Input name="company" value={formData.company} onChange={handleChange} className="rounded-none border-border/50 bg-muted/30 focus-visible:ring-brand-primary" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">City *</label>
                  <Input required name="city" value={formData.city} onChange={handleChange} className="rounded-none border-border/50 bg-muted/30 focus-visible:ring-brand-primary" />
                </div>
              </div>
              
              <div className="pt-4">
                <Button disabled={loading} type="submit" className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white rounded-none h-14 uppercase tracking-widest text-[10px] font-bold">
                  {loading ? "Processing..." : "Get Download Link"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
