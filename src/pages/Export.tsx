import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, ShieldCheck, Ship, Box, FileText, Headphones, CheckCircle, Ship as ShipIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

export function Export() {
  const [formData, setFormData] = useState({
    companyName: '',
    country: '',
    contactName: '',
    email: '',
    phone: '',
    productInterest: [] as string[],
    volume: '',
    targetMarket: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleProductToggle = (product: string) => {
    setFormData(prev => ({
      ...prev,
      productInterest: prev.productInterest.includes(product)
        ? prev.productInterest.filter(p => p !== product)
        : [...prev.productInterest, product]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/export-inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSuccess(true);
        toast.success('Inquiry submitted successfully. We will contact you soon.');
      } else {
        toast.error('Failed to submit inquiry.');
      }
    } catch (e) {
      toast.error('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" }
  };

  return (
    <div className="bg-background min-h-screen pt-20">
      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-brand-secondary text-white py-24 md:py-32">
        <div className="absolute inset-0 z-0 opacity-10 flex items-center justify-center">
          <Globe className="w-[150vw] h-[150vw] md:w-[60vw] md:h-[60vw] text-brand-primary animate-[spin_120s_linear_infinite]" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-primary mb-6 block">INTERNATIONAL TRADE</span>
            <h1 className="text-4xl md:text-6xl font-heading mb-6 max-w-4xl mx-auto leading-tight">
              Global Quality.<br />Indian Craftsmanship.
            </h1>
            <p className="text-white/80 font-sans text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Trusted by importers and distributors across 50+ countries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. EXPORT STATS */}
      <section className="bg-brand-primary py-12 md:py-16 text-white border-y border-white/10 relative z-20 -mt-8 mx-4 md:mx-12 shadow-2xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/20">
            {[
              { value: '50+', label: 'Countries Served' },
              { value: '10M+', label: 'Sq Ft Exported Annually' },
              { value: '15+', label: 'Years Experience' },
              { value: '98%', label: 'On-Time Delivery' }
            ].map((stat, i) => (
              <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="text-center px-4 first:pl-0">
                <div className="text-3xl md:text-5xl font-heading mb-2">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest font-bold opacity-80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY EXPORT WITH US */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading text-foreground mb-4">Why Partner With Us</h2>
            <p className="text-muted-foreground font-sans max-w-2xl mx-auto">
              We streamline the international sourcing process, providing uncompromised quality and end-to-end logistics support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <ShieldCheck />, title: 'Competitive FOB/CIF Pricing', desc: 'Direct-from-factory pricing options tailored to your logistics preferences.' },
              { icon: <Box />, title: 'Flexible MOQ', desc: 'Accommodating low minimum order quantities for new partnerships.' },
              { icon: <FileText />, title: 'Documentation Support', desc: 'Complete assistance with customs, certificates of origin, and compliance.' },
              { icon: <Ship />, title: 'Sea & Air Freight', desc: 'Coordinated logistics for timely delivery to any port worldwide.' },
              { icon: <CheckCircle />, title: 'Sample Before Order', desc: 'Free physical samples dispatched globally via express courier.' },
              { icon: <Headphones />, title: 'After-sales Support', desc: 'Dedicated account managers for international clients across time zones.' }
            ].map((feature, i) => (
              <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="p-8 border border-border/50 hover:border-brand-primary transition-colors bg-muted/20">
                <div className="w-12 h-12 bg-brand-primary text-white flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-heading mb-3">{feature.title}</h3>
                <p className="text-muted-foreground font-sans text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EXPORT MARKETS */}
      <section className="py-24 bg-muted/30 border-y border-border/50">
        <div className="container mx-auto px-4 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-primary mb-4 block">GLOBAL FOOTPRINT</span>
              <h2 className="text-3xl md:text-5xl font-heading text-foreground mb-8">Export Markets</h2>
              <p className="text-muted-foreground font-sans mb-8 leading-relaxed">
                Our products meet the diverse architectural demands of international markets, adhering to varied climate specifications and design sensibilities. We currently maintain strong distribution channels in:
              </p>
              <ul className="grid grid-cols-2 gap-4 font-sans font-medium text-foreground">
                <li className="flex items-center gap-3"><span className="text-2xl">🇦🇪</span> UAE</li>
                <li className="flex items-center gap-3"><span className="text-2xl">🇺🇸</span> USA</li>
                <li className="flex items-center gap-3"><span className="text-2xl">🇬🇧</span> UK</li>
                <li className="flex items-center gap-3"><span className="text-2xl">🇦🇺</span> Australia</li>
                <li className="flex items-center gap-3"><span className="text-2xl">🇰🇪</span> East Africa</li>
                <li className="flex items-center gap-3"><span className="text-2xl">🇸🇬</span> Southeast Asia</li>
                <li className="flex items-center gap-3"><span className="text-2xl">🇪🇺</span> Europe</li>
              </ul>
            </div>
            <div className="lg:w-1/2 relative min-h-[300px]">
              <Globe className="w-full h-full text-brand-primary/20" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. EXPORT PROCESS */}
      <section className="py-24 bg-brand-secondary text-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading mb-4">The Export Process</h2>
            <p className="text-white/70 font-sans max-w-2xl mx-auto">Seamless operation from initial inquiry to final delivery at your port.</p>
          </div>

          <div className="flex overflow-x-auto hide-scrollbar pb-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/20 -translate-y-1/2 z-0 hidden md:block"></div>
            {[
              { step: '01', title: 'Inquiry' },
              { step: '02', title: 'Sample Dispatch' },
              { step: '03', title: 'Order Confirmation' },
              { step: '04', title: 'Production' },
              { step: '05', title: 'QC Check' },
              { step: '06', title: 'Shipment' },
              { step: '07', title: 'Delivery' }
            ].map((process, i) => (
              <div key={i} className="min-w-[150px] md:flex-1 flex flex-col items-center relative z-10">
                <div className="w-12 h-12 rounded-full bg-brand-primary border-4 border-brand-secondary flex items-center justify-center text-xs font-bold mb-4 font-sans text-white">
                  {process.step}
                </div>
                <h4 className="font-heading text-sm text-center px-2">{process.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CERTIFICATIONS */}
      <section className="py-24 bg-background border-b border-border/50">
        <div className="container mx-auto px-4 md:px-12 text-center">
          <div className="mb-12">
             <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-primary mb-4 block">COMPLIANCE</span>
             <h2 className="text-3xl font-heading text-foreground">Certifications for Export</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-12 items-center">
            {['ISO 9001:2015', 'CE Marking', 'REACH Compliance', 'BIS Certified'].map((cert, i) => (
              <div key={i} className="px-8 py-4 border border-border/50 bg-muted/20 font-bold font-sans text-muted-foreground uppercase tracking-wider text-sm shadow-sm">
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. EXPORT INQUIRY FORM */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 md:px-12">
          <div className="max-w-4xl mx-auto bg-background border border-border/50 shadow-xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-3xl rounded-full" />
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                 <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">Start Your Import Journey</h2>
                 <p className="text-muted-foreground font-sans">Reach out to our export division for container load pricing and logistical details.</p>
              </div>

              {success ? (
                 <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
                    <h3 className="text-2xl font-heading text-foreground mb-2">Inquiry Received</h3>
                    <p className="text-muted-foreground font-sans">Our international trade team will contact you within 24 hours.</p>
                 </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 block">Company Name *</label>
                      <input required type="text" name="companyName" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} className="w-full bg-muted/50 border border-border/50 px-4 py-3 rounded-none focus:outline-none focus:border-brand-primary" />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 block">Country *</label>
                      <input required type="text" name="country" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="w-full bg-muted/50 border border-border/50 px-4 py-3 rounded-none focus:outline-none focus:border-brand-primary" />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 block">Contact Name *</label>
                      <input required type="text" name="contactName" value={formData.contactName} onChange={e => setFormData({...formData, contactName: e.target.value})} className="w-full bg-muted/50 border border-border/50 px-4 py-3 rounded-none focus:outline-none focus:border-brand-primary" />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 block">Phone / WhatsApp *</label>
                      <input required type="tel" name="phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-muted/50 border border-border/50 px-4 py-3 rounded-none focus:outline-none focus:border-brand-primary" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 block">Email Address *</label>
                      <input required type="email" name="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-muted/50 border border-border/50 px-4 py-3 rounded-none focus:outline-none focus:border-brand-primary" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-3 block">Product Interest</label>
                    <div className="flex flex-wrap gap-3">
                      {['Porcelain Slabs', 'Ceramic Tiles', 'Outdoor Tiles', 'Other'].map(product => (
                        <button
                          type="button"
                          key={product}
                          onClick={() => handleProductToggle(product)}
                          className={`px-4 py-2 border text-[10px] uppercase font-bold tracking-widest transition-colors ${
                            formData.productInterest.includes(product) 
                              ? 'bg-brand-primary text-white border-brand-primary' 
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
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 block">Estimated Annual Volume</label>
                      <select name="volume" value={formData.volume} onChange={e => setFormData({...formData, volume: e.target.value})} className="w-full bg-muted/50 border border-border/50 px-4 py-3 rounded-none focus:outline-none focus:border-brand-primary appearance-none">
                        <option value="">Select Range</option>
                        <option value="1-5 Containers">1 - 5 Containers</option>
                        <option value="5-20 Containers">5 - 20 Containers</option>
                        <option value="20+ Containers">20+ Containers</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 block">Target Market / End Use</label>
                      <input type="text" name="targetMarket" value={formData.targetMarket} onChange={e => setFormData({...formData, targetMarket: e.target.value})} placeholder="e.g. Retail, Commercial Projects" className="w-full bg-muted/50 border border-border/50 px-4 py-3 rounded-none focus:outline-none focus:border-brand-primary" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 block">Additional Message</label>
                    <textarea rows={4} name="message" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-muted/50 border border-border/50 px-4 py-3 rounded-none focus:outline-none focus:border-brand-primary resize-none"></textarea>
                  </div>

                  <Button disabled={loading} type="submit" className="w-full bg-black text-white hover:bg-black/90 uppercase text-[10px] tracking-widest font-bold h-14 rounded-none">
                     {loading ? "Submitting..." : "Submit Export Inquiry"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 8. SHIPPING PORTS */}
      <section className="bg-brand-secondary text-white py-8 border-t border-brand-primary/20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 font-sans text-sm md:text-base font-bold uppercase tracking-widest">
            <ShipIcon className="w-5 h-5 text-brand-primary" />
            <span>We ship from: Mundra Port <span className="opacity-50 mx-2">|</span> Nhava Sheva <span className="opacity-50 mx-2">|</span> Chennai Port</span>
          </div>
        </div>
      </section>
    </div>
  );
}
