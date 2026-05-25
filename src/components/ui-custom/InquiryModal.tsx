import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'sonner';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export function InquiryModal({ isOpen, onClose, productName }: InquiryModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app this would call the API
    toast.success('Inquiry submitted successfully. We will contact you soon.', {
      style: { background: '#D2691E', color: 'white', border: 'none' }
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] rounded-none border-border bg-background p-0 overflow-hidden">
        <div className="bg-muted p-6 border-b border-border">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">Enquire About Product</DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">
              {productName ? (
                <>Interested in <strong className="text-foreground">{productName}</strong>? Fill out the form below and our team will get back to you with pricing and availability.</>
              ) : (
                "Fill out the form below to get more information."
              )}
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">First Name</label>
              <Input id="firstName" required className="rounded-none border-border focus-visible:ring-brand-primary h-12" placeholder="John" />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Last Name</label>
              <Input id="lastName" required className="rounded-none border-border focus-visible:ring-brand-primary h-12" placeholder="Doe" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</label>
            <Input id="email" type="email" required className="rounded-none border-border focus-visible:ring-brand-primary h-12" placeholder="john@example.com" />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone Number</label>
            <Input id="phone" type="tel" className="rounded-none border-border focus-visible:ring-brand-primary h-12" placeholder="+1 (555) 000-0000" />
          </div>

          <div className="space-y-2 pt-2">
            <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message / Requirements</label>
            <textarea 
              id="message" 
              className="w-full flex min-h-[120px] rounded-none border border-border bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              placeholder="Tell us about your project scale and timeline..."
            />
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full rounded-none h-12 bg-brand-primary hover:bg-brand-primary/90 text-white font-sans font-semibold tracking-wider uppercase text-sm">
              Submit Inquiry
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-4">
              By submitting, you agree to our Privacy Policy.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
