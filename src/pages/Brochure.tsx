import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { DownloadModal } from '../components/brochure/DownloadModal';
import { toast } from 'sonner';
import { SEO } from '../components/SEO';

const BROCHURES = [
  {
    id: 1,
    title: 'Full Product Catalog 2024',
    desc: 'Our complete range including porcelain slabs, ceramic tiles, and outdoor solutions.',
    details: '148 pages | All Collections | Full Specs',
    size: '28.5 MB',
    img: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 2,
    title: 'Porcelain Slab Collection',
    desc: 'Large format luxury surfaces covering marble, stone, and absolute concrete finishes.',
    details: '48 pages | 120+ designs | Install Guide',
    size: '12.4 MB',
    img: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 3,
    title: 'Ceramic Tiles Collection',
    desc: 'Versatile wall and floor ceramic tiles for residential and light commercial spaces.',
    details: '64 pages | Subway & Geometric | Specs',
    size: '15.2 MB',
    img: 'https://images.unsplash.com/photo-1552858725-2758b5fb1286?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 4,
    title: 'Outdoor & Parking Tiles',
    desc: 'Heavy-duty, anti-skid surfaces including 20mm pavers and vitrified parking tiles.',
    details: '32 pages | R11 Ratings | Load Specs',
    size: '8.7 MB',
    img: 'https://images.unsplash.com/photo-1605814513146-241517fec658?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 5,
    title: 'Export Collection Preview',
    desc: 'Curated premium selection strictly adhering to international export standards.',
    details: '24 pages | Premium Grades | Packaging',
    size: '6.1 MB',
    img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 6,
    title: 'Technical Specs Handbook',
    desc: 'Comprehensive engineering details, water absorption rates, and installation limits.',
    details: '18 pages | ASTM / ISO Results',
    size: '3.5 MB',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600'
  }
];

export function Brochure() {
  const [selectedBrochure, setSelectedBrochure] = useState<{ title: string; filename?: string } | null>(null);
  
  const [customForm, setCustomForm] = useState({
    name: '',
    email: '',
    phone: '',
    requirements: ''
  });
  const [customLoading, setCustomLoading] = useState(false);

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCustomLoading(true);
    
    // Mock API Call
    setTimeout(() => {
      toast.success('Custom catalog request sent. Our team will contact you soon.');
      setCustomForm({ name: '', email: '', phone: '', requirements: '' });
      setCustomLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-background min-h-screen pt-20">
      <SEO 
        title="Download Premium Tiles & Technical Catalogs" 
        description="Access and download Aura Surfaces' complete premium porcelain slabs, outdoor tiles, and ceramic tile catalogs. Explore luxury textures, collections, and technical specifications."
      />
      <DownloadModal 
        isOpen={!!selectedBrochure} 
        onClose={() => setSelectedBrochure(null)} 
        brochure={selectedBrochure} 
      />

      {/* 1. HERO */}
      <section className="py-20 md:py-28 bg-brand-secondary text-white text-center border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="mb-4">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white bg-white/10 px-3 py-1 backdrop-blur-sm border border-white/20">
                RESOURCES
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading leading-tight mb-6">
              Download Our Product Catalogs
            </h1>
            <p className="text-white/80 font-sans text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Explore our complete range with specifications, finishes, and size charts — all in one place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. BROCHURE GRID */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {BROCHURES.map((brochure, i) => (
              <motion.div 
                key={brochure.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col items-start"
              >
                <div className="w-full aspect-[3/4] bg-muted mb-6 relative overflow-hidden border border-border/50 shadow-sm group-hover:shadow-xl transition-all duration-500">
                   <img src={brochure.img} alt={brochure.title} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                   
                   {/* Decorative overlay element */}
                   <div className="absolute top-4 right-4 bg-brand-primary w-12 h-12 rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                     <FileText className="w-5 h-5" />
                   </div>
                </div>
                
                <h3 className="text-2xl font-heading text-foreground mb-3">{brochure.title}</h3>
                <p className="text-muted-foreground font-sans text-sm mb-4 leading-relaxed line-clamp-2">
                  {brochure.desc}
                </p>
                
                <div className="flex items-center gap-4 text-xs font-sans text-muted-foreground mb-6 font-medium">
                  <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {brochure.details}</span>
                  <span>•</span>
                  <span>{brochure.size}</span>
                </div>
                
                <Button 
                  onClick={() => setSelectedBrochure({ title: brochure.title, filename: 'catalog.pdf' })}
                  className="w-full uppercase text-[10px] tracking-widest font-bold h-12 bg-white text-brand-primary border border-brand-primary hover:bg-brand-primary hover:text-white transition-colors rounded-none"
                >
                  <Download className="w-4 h-4 mr-2" /> Download PDF
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. REQUEST CUSTOM BROCHURE */}
      <section className="py-24 bg-brand-accent/20 border-t border-border/50">
        <div className="container mx-auto px-4 md:px-12">
          <div className="max-w-4xl mx-auto bg-background p-8 md:p-12 border border-border/50 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-3xl rounded-full" />
            
            <div className="relative z-10 flex flex-col md:flex-row gap-12">
              <div className="md:w-5/12">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-primary mb-4 block">CUSTOM SERVICE</span>
                <h2 className="text-3xl font-heading text-foreground mb-4">Request Custom Catalog</h2>
                <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-6">
                  Working on a massive commercial project or need specs for a highly specific application? 
                  Our export and corporate teams can compile a customized digital deck tailored specifically to your architectural requirements.
                </p>
              </div>
              
              <div className="md:w-7/12">
                <form onSubmit={handleCustomSubmit} className="space-y-4 font-sans focus-within:text-brand-primary">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                      required
                      type="text" 
                      placeholder="Your Name *"
                      value={customForm.name}
                      onChange={e => setCustomForm({...customForm, name: e.target.value})}
                      className="w-full bg-muted/50 border border-border/50 px-4 py-3 text-sm rounded-none focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-foreground" 
                    />
                    <input 
                      required
                      type="tel" 
                      placeholder="Phone Number *"
                      value={customForm.phone}
                      onChange={e => setCustomForm({...customForm, phone: e.target.value})}
                      className="w-full bg-muted/50 border border-border/50 px-4 py-3 text-sm rounded-none focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-foreground" 
                    />
                  </div>
                  <input 
                    required
                    type="email" 
                    placeholder="Email Address *"
                    value={customForm.email}
                    onChange={e => setCustomForm({...customForm, email: e.target.value})}
                    className="w-full bg-muted/50 border border-border/50 px-4 py-3 text-sm rounded-none focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-foreground" 
                  />
                  <textarea 
                    required
                    rows={4}
                    placeholder="What specific products or specs are you looking for?"
                    value={customForm.requirements}
                    onChange={e => setCustomForm({...customForm, requirements: e.target.value})}
                    className="w-full bg-muted/50 border border-border/50 px-4 py-3 text-sm rounded-none focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-foreground resize-none" 
                  ></textarea>
                  
                  <Button disabled={customLoading} type="submit" className="w-full bg-black text-white hover:bg-black/80 uppercase text-[10px] tracking-widest font-bold h-14 rounded-none">
                    {customLoading ? "Sending Request..." : <><Send className="w-4 h-4 mr-2" /> Request Custom Catalog</>}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
