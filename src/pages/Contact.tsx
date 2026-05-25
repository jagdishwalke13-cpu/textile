import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Linkedin, Youtube, MessageCircle, Send, Upload, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

import { SEO } from '../components/SEO';

type InquiryType = 'Product Inquiry' | 'Export Inquiry' | 'Showroom Visit' | 'Other';

export function Contact() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Aura Surfaces",
    "image": "https://aurasurfaces.com/logo.png",
    "@id": "https://aurasurfaces.com",
    "url": "https://aurasurfaces.com/contact",
    "telephone": "+91 99999 99999",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "8-A National Highway",
      "addressLocality": "Morbi",
      "addressRegion": "Gujarat",
      "postalCode": "363642",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
      ],
      "opens": "09:30",
      "closes": "18:30"
    }
  };

  const [inquiryType, setInquiryType] = useState<InquiryType>('Product Inquiry');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    city: '',
    projectType: '',
    quantity: '',
    source: '',
    message: '',
    productInterest: [] as string[]
  });

  const [fileName, setFileName] = useState<string | null>(null);

  const handleProductToggle = (product: string) => {
    setFormData(prev => ({
      ...prev,
      productInterest: prev.productInterest.includes(product)
        ? prev.productInterest.filter(p => p !== product)
        : [...prev.productInterest, product]
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, inquiryType, fileName })
      });
      
      if (res.ok) {
        setSuccess(true);
        toast.success("Inquiry sent successfully.");
      } else {
        toast.error("Failed to submit inquiry.");
      }
    } catch (err) {
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen pt-20">
      <SEO 
        title="Contact Us | Inquiry & Showroom" 
        description="Get in touch with Aura Surfaces. Send an inquiry, locate our showroom, or connect with our export team."
        schema={localBusinessSchema}
      />
      <div className="container mx-auto px-4 md:px-12 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* LEFT SIDE - CONTACT INFO */}
          <div className="lg:w-5/12 flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-primary mb-4 block">GET IN TOUCH</span>
            <h1 className="text-4xl md:text-5xl font-heading text-foreground mb-6">Let's Build Something Beautiful Together</h1>
            <p className="text-muted-foreground font-sans text-lg mb-12">
              Whether you're an architect, interior designer, builder, or homeowner — we're here to help you find the perfect tiles.
            </p>

            <div className="space-y-8 font-sans mb-12">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-brand-primary/10 flex items-center justify-center shrink-0 text-brand-primary rounded-full">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-1">Showroom Address</h4>
                  <p className="font-semibold text-foreground">Aura surfaces Corporate House</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-1">
                    Survey No. 42, 8-A National Highway,<br />
                    Lakhdhirpur Road, Morbi - 363642<br />
                    Gujarat, India (<span className="text-brand-primary hover:underline cursor-pointer">Near Ceramic Plaza</span>)
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-brand-primary/10 flex items-center justify-center shrink-0 text-brand-primary rounded-full">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-1">Phone</h4>
                  <div className="text-sm font-medium text-foreground mt-1 space-y-1">
                    <p>+91 98765 43210 <span className="text-muted-foreground font-normal ml-2">(Sales)</span></p>
                    <p>+91 98765 01234 <span className="text-muted-foreground font-normal ml-2">(Export Enquiries)</span></p>
                    <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="flex items-center text-[#25D366] hover:text-[#1ebd5b] mt-2 group">
                      <MessageCircle className="w-4 h-4 mr-2" /> 
                      <span className="group-hover:underline">WhatsApp Us</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-brand-primary/10 flex items-center justify-center shrink-0 text-brand-primary rounded-full">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-1">Email</h4>
                  <div className="text-sm font-medium text-foreground mt-1 space-y-1">
                    <p><a href="mailto:sales@aurasurfaces.com" className="hover:text-brand-primary">sales@aurasurfaces.com</a></p>
                    <p><a href="mailto:export@aurasurfaces.com" className="hover:text-brand-primary">export@aurasurfaces.com</a></p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-brand-primary/10 flex items-center justify-center shrink-0 text-brand-primary rounded-full">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-1">Working Hours</h4>
                  <div className="text-sm font-medium text-foreground mt-1 space-y-1">
                    <p>Mon-Sat: 9:00 AM – 7:00 PM</p>
                    <p>Sunday: 10:00 AM – 4:00 PM <span className="text-muted-foreground font-normal ml-1">(Showroom only)</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mb-12">
              <a href="#" className="w-12 h-12 flex items-center justify-center border border-border/50 text-muted-foreground hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 flex items-center justify-center border border-border/50 text-muted-foreground hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 flex items-center justify-center border border-border/50 text-muted-foreground hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            <div className="h-64 bg-muted border border-border/50 relative grayscale mb-4">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d117565.34005167664!2d70.76766953934372!3d22.82315998634125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39598c199d701d63%3A0xe6bf44b7f80f68dc!2sMorbi%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 title="Morbi location map"
                 className="absolute inset-0"
               ></iframe>
            </div>
            <Button render={<a href="https://maps.google.com" target="_blank" rel="noreferrer" />} variant="outline" className="w-full sm:w-auto uppercase text-[10px] tracking-widest font-bold h-12 rounded-none border-border/50">
              Get Directions <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
          </div>

          {/* RIGHT SIDE - CONTACT FORM */}
          <div className="lg:w-7/12">
            <div className="bg-background border border-border/50 shadow-xl p-6 md:p-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
               
               <div className="relative z-10">
                 {success ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-16"
                    >
                       <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                         <CheckCircle className="w-10 h-10" />
                       </div>
                       <h3 className="text-3xl font-heading text-foreground mb-4">Thank You!</h3>
                       <p className="text-muted-foreground font-sans text-lg mb-8 max-w-md mx-auto">
                         Your inquiry has been successfully received. Our team will contact you within 24 hours.
                       </p>
                       <Button 
                         render={<a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" />}
                         className="bg-[#25D366] hover:bg-[#1ebd5b] text-white uppercase text-[10px] tracking-widest font-bold h-14 px-8 rounded-none"
                       >
                         <MessageCircle className="w-4 h-4 mr-2" /> Chat on WhatsApp Now
                       </Button>
                    </motion.div>
                 ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex overflow-x-auto hide-scrollbar mb-8 border-b border-border/50">
                        {['Product Inquiry', 'Export Inquiry', 'Showroom Visit', 'Other'].map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setInquiryType(type as InquiryType)}
                            className={`whitespace-nowrap px-6 py-4 text-xs font-bold uppercase tracking-widest transition-colors border-b-2 ${
                              inquiryType === type 
                                ? 'border-brand-primary text-brand-primary' 
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 block">Full Name *</label>
                            <input required type="text" name="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-muted/30 border border-border/50 px-4 py-3 rounded-none focus:outline-none focus:border-brand-primary focus:bg-background transition-colors" />
                          </div>
                          <div>
                            <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 block">Email Address *</label>
                            <input required type="email" name="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-muted/30 border border-border/50 px-4 py-3 rounded-none focus:outline-none focus:border-brand-primary focus:bg-background transition-colors" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 block">Phone Number *</label>
                            <div className="flex">
                              {inquiryType === 'Export Inquiry' && (
                                <select 
                                  value={formData.countryCode} 
                                  onChange={e => setFormData({...formData, countryCode: e.target.value})}
                                  className="bg-muted/30 border border-border/50 border-r-0 px-2 py-3 rounded-none focus:outline-none text-muted-foreground text-sm"
                                >
                                  <option value="+1">+1 (US)</option>
                                  <option value="+44">+44 (UK)</option>
                                  <option value="+91">+91 (IN)</option>
                                  <option value="+971">+971 (AE)</option>
                                  <option value="+61">+61 (AU)</option>
                                </select>
                              )}
                              <input required type="tel" name="phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full flex-1 bg-muted/30 border border-border/50 px-4 py-3 rounded-none focus:outline-none focus:border-brand-primary focus:bg-background transition-colors" placeholder={inquiryType === 'Export Inquiry' ? '' : '+91'} />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 block">{inquiryType === 'Export Inquiry' ? 'Country *' : 'City, State *'}</label>
                            <input required type="text" name="city" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-muted/30 border border-border/50 px-4 py-3 rounded-none focus:outline-none focus:border-brand-primary focus:bg-background transition-colors" />
                          </div>
                        </div>

                        {(inquiryType === 'Product Inquiry' || inquiryType === 'Export Inquiry') && (
                          <AnimatePresence>
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-6 overflow-hidden">
                              <div>
                                <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-3 block">Product Interest</label>
                                <div className="flex flex-wrap gap-2">
                                  {['Slabs', 'Floor Tiles', 'Wall Tiles', 'Outdoor', 'Sanitaryware'].map(product => (
                                    <button
                                      type="button"
                                      key={product}
                                      onClick={() => handleProductToggle(product)}
                                      className={`px-4 py-2 border text-[10px] uppercase font-bold tracking-widest transition-colors ${
                                        formData.productInterest.includes(product) 
                                          ? 'bg-brand-secondary text-white border-brand-secondary' 
                                          : 'bg-transparent text-muted-foreground border-border/50 hover:border-brand-primary'
                                      }`}
                                    >
                                      {product}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 block">Project Type</label>
                                  <select name="projectType" value={formData.projectType} onChange={e => setFormData({...formData, projectType: e.target.value})} className="w-full bg-muted/30 border border-border/50 px-4 py-3 rounded-none focus:outline-none focus:border-brand-primary focus:bg-background transition-colors text-sm appearance-none">
                                    <option value="">Select Project Type</option>
                                    <option value="Residential">Residential</option>
                                    <option value="Commercial">Commercial</option>
                                    <option value="Hospitality">Hospitality</option>
                                    <option value="Industrial">Industrial</option>
                                    <option value="Government">Government</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 block">Quantity Estimate (Optional)</label>
                                  <input type="text" name="quantity" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} placeholder="e.g. 5000 sq.ft or 2 containers" className="w-full bg-muted/30 border border-border/50 px-4 py-3 rounded-none focus:outline-none focus:border-brand-primary focus:bg-background transition-colors text-sm" />
                                </div>
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="md:col-span-2">
                             <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 block">How did you find us?</label>
                             <select name="source" value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} className="w-full bg-muted/30 border border-border/50 px-4 py-3 rounded-none focus:outline-none focus:border-brand-primary focus:bg-background transition-colors text-sm appearance-none">
                               <option value="">Select Option</option>
                               <option value="Google">Google Search</option>
                               <option value="SocialMedia">Social Media (Instagram/Facebook)</option>
                               <option value="Architect">Architect / Interior Designer</option>
                               <option value="Referral">Friend / Colleague</option>
                               <option value="Exhibition">Trade Show / Exhibition</option>
                               <option value="Other">Other</option>
                             </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 block">Message / Requirements *</label>
                          <textarea required rows={4} name="message" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-muted/30 border border-border/50 px-4 py-3 rounded-none focus:outline-none focus:border-brand-primary focus:bg-background transition-colors text-sm resize-none" placeholder="Tell us more about your project..."></textarea>
                        </div>

                        <div>
                           <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 block flex items-center gap-2">
                             Reference Image (Optional) <span className="font-normal normal-case tracking-normal">(Max 5MB)</span>
                           </label>
                           <div className="flex items-center gap-4">
                             <label className="flex items-center gap-2 px-4 py-3 bg-muted/30 border border-border/50 border-dashed cursor-pointer hover:border-brand-primary transition-colors hover:bg-muted/50 rounded-none w-full sm:w-auto">
                               <Upload className="w-4 h-4 text-muted-foreground" />
                               <span className="text-sm font-medium text-foreground">Choose File</span>
                               <input type="file" className="hidden" accept="image/*,.pdf" onChange={handleFileChange} />
                             </label>
                             {fileName && <span className="text-sm text-brand-primary truncate max-w-[200px]">{fileName}</span>}
                           </div>
                        </div>

                        <div className="pt-4">
                          <Button disabled={loading} type="submit" className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white uppercase text-[10px] tracking-widest font-bold h-14 rounded-none">
                            {loading ? "Sending..." : "Send Inquiry"} <Send className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                        
                        <div className="text-center pt-2">
                           <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="text-xs font-bold text-muted-foreground hover:text-brand-primary uppercase tracking-widest inline-flex items-center transition-colors">
                             Or WhatsApp us directly <ArrowRight className="w-3 h-3 ml-1" />
                           </a>
                        </div>
                      </form>
                    </motion.div>
                 )}
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
