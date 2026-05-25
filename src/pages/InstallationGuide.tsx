import React from 'react';
import { PageHero } from '../components/ui-custom/PageHero';
import { SEO } from '../components/SEO';
import { Wrench, Ruler, Droplets, Grid, FileDown, PlayCircle } from 'lucide-react';
import { Button } from '../components/ui/button';

export function InstallationGuide() {
  const steps = [
    {
      title: "Surface Preparation",
      icon: Ruler,
      description: "Ensure the subfloor is perfectly level, dry, and clean. Any undulations larger than 3mm must be leveled using a self-leveling compound before installation begins."
    },
    {
      title: "Adhesive Application",
      icon: Droplets,
      description: "Always use a dual-buttering technique (applying adhesive to both the substrate and the back of the tile) using a notched trowel. Use high-polymer modified thinset for porcelain slabs."
    },
    {
      title: "Tile Placement & Leveling",
      icon: Grid,
      description: "Place the tile firmly and use a suction cup for large formats. Install a mechanical tile leveling system (clips and wedges) immediately to prevent lippage and ensure a perfectly flat surface."
    },
    {
      title: "Grouting & Cleaning",
      icon: Wrench,
      description: "Wait at least 24 hours before grouting. Use an epoxy grout for superior durability. Clean any excess grout from the tile surface immediately using a damp sponge before it cures."
    }
  ];

  return (
    <div className="bg-background min-h-screen">
      <SEO 
        title="Tile Installation Guide & Best Practices | Aura Surfaces" 
        description="Comprehensive step-by-step guide for installing large format porcelain tiles, ceramic walls, and outdoor tiles."
      />
      <PageHero 
        title="Installation Guide" 
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Installation Guide" }
        ]}
      />

      <section className="py-16 container mx-auto px-4 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          
          {/* Main Content */}
          <div className="lg:w-2/3">
            <h2 className="text-3xl font-heading mb-6">Mastering Tile Installation</h2>
            <p className="text-muted-foreground mb-12">
              Large format porcelain tiles require specialized care and precise techniques to ensure longevity, 
              safety, and aesthetic perfection. Follow our rigorous step-by-step guide to achieve a flawless finish.
            </p>

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-brand-primary text-white flex items-center justify-center rounded-none font-heading text-2xl relative shadow-lg">
                    {index + 1}
                    <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-muted/80 flex items-center justify-center rounded-full">
                       <step.icon className="w-4 h-4 text-brand-secondary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 uppercase tracking-wide text-[#111]">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 bg-muted/30 p-8 border border-border/50">
               <h3 className="text-xl font-bold mb-4 flex items-center"><PlayCircle className="mr-2 text-brand-primary" /> Video Tutorial</h3>
               <div className="aspect-video bg-black flex items-center justify-center text-white/50 w-full">
                  <p className="font-mono text-sm tracking-widest">[ YOUTUBE EMBED PLACEHOLDER ]</p>
               </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            <div className="bg-brand-secondary text-white p-8">
               <h3 className="text-xl font-heading mb-4 border-b border-white/20 pb-4">Download PDF Guides</h3>
               <ul className="space-y-4">
                 <li>
                   <a href="#" className="flex items-center hover:text-brand-primary transition-colors text-sm">
                     <FileDown className="w-4 h-4 mr-3" />
                     Indoor Floor Installation
                   </a>
                 </li>
                 <li>
                   <a href="#" className="flex items-center hover:text-brand-primary transition-colors text-sm">
                     <FileDown className="w-4 h-4 mr-3" />
                     Wall Cladding Guide
                   </a>
                 </li>
                 <li>
                   <a href="#" className="flex items-center hover:text-brand-primary transition-colors text-sm">
                     <FileDown className="w-4 h-4 mr-3" />
                     Outdoor Paver Systems
                   </a>
                 </li>
               </ul>
            </div>

            <div className="border border-border/50 p-8 bg-muted/10">
               <h3 className="text-xl font-heading mb-4">Required Tools</h3>
               <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-4">
                 <li>Heavy-duty tile cutter / Wet saw with diamond blade</li>
                 <li>Notched trowels (10mm - 12mm)</li>
                 <li>Mechanical Tile Leveling System (Clips & Wedges)</li>
                 <li>Heavy-duty suction cups for large formats</li>
                 <li>Rubber mallet (whiteheaded)</li>
                 <li>2-meter Spirit level</li>
                 <li>Grout float & cleaning sponges</li>
               </ul>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}
