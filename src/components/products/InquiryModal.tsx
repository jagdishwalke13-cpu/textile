import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  isSampleRequest?: boolean;
}

export function InquiryModal({ isOpen, onClose, productName, isSampleRequest = false }: InquiryModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    message: "",
    source: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          address: formData.address,
          inquiryType: isSampleRequest ? 'Sample Request' : 'Product Inquiry',
          message: `Product: ${productName}\n\n${formData.message}`,
          source: formData.source
        }),
      });
      
      if (res.ok) {
        setSuccess(true);
      } else {
        toast.error("Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] border-none shadow-2xl p-0 overflow-hidden bg-background">
        <div className="bg-brand-secondary p-6 text-white text-center border-b border-white/10">
          <DialogTitle className="text-2xl font-heading mb-2">{isSampleRequest ? "Request a Sample" : "Request Information"}</DialogTitle>
          <DialogDescription className="text-white/80 font-sans text-xs uppercase tracking-widest">
            {productName}
          </DialogDescription>
        </div>
        
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                ✓
              </div>
              <h3 className="text-xl font-heading text-foreground mb-2">Thank You!</h3>
              <p className="text-muted-foreground font-sans mb-6">
                Your inquiry has been successfully submitted. Our team will get back to you shortly.
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                   onClick={() => {
                     window.open(`https://wa.me/1234567890?text=Hi, I want to know more about ${productName}`, "_blank");
                     onClose();
                   }}
                   className="bg-[#25D366] hover:bg-[#1ebd5b] text-white uppercase text-[10px] tracking-widest font-bold h-12 px-6"
                >
                  Chat on WhatsApp
                </Button>
                <Button variant="outline" onClick={onClose} className="uppercase text-[10px] tracking-widest font-bold h-12 px-6">
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Name *</label>
                  <Input required name="name" value={formData.name} onChange={handleChange} className="rounded-none border-border/50 bg-muted/30 focus-visible:ring-brand-primary" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Phone *</label>
                  <Input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="rounded-none border-border/50 bg-muted/30 focus-visible:ring-brand-primary" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Email *</label>
                  <Input required type="email" name="email" value={formData.email} onChange={handleChange} className="rounded-none border-border/50 bg-muted/30 focus-visible:ring-brand-primary" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">City *</label>
                  <Input required name="city" value={formData.city} onChange={handleChange} className="rounded-none border-border/50 bg-muted/30 focus-visible:ring-brand-primary" />
                </div>
              </div>

              {isSampleRequest && (
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Full Address (for courier) *</label>
                  <textarea 
                    required
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange}
                    rows={2} 
                    className="w-full flex rounded-none border border-border/50 bg-muted/30 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary disabled:cursor-not-allowed disabled:opacity-50"
                  ></textarea>
                </div>
              )}
              
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Message (Quantity, Project Type)</label>
                <textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange}
                  rows={3} 
                  className="w-full flex rounded-none border border-border/50 bg-muted/30 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary disabled:cursor-not-allowed disabled:opacity-50"
                ></textarea>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">How did you hear about us?</label>
                <select name="source" value={formData.source} onChange={handleChange} className="w-full flex h-10 rounded-none border border-border/50 bg-muted/30 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
                  <option value="">Select an option</option>
                  <option value="Google">Google Search</option>
                  <option value="SocialMedia">Social Media</option>
                  <option value="Referral">Friend / Referral</option>
                  <option value="Architect">Architect / Designer</option>
                </select>
              </div>
              
              <div className="pt-4">
                <Button disabled={loading} type="submit" className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white rounded-none h-14 uppercase tracking-widest text-[10px] font-bold">
                  {loading ? "Submitting..." : isSampleRequest ? "Order Sample" : "Send Inquiry"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
