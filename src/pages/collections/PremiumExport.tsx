import React, { useState, useEffect } from 'react';
import { PageHero } from '../../components/ui-custom/PageHero';
import { ProductCard } from '../../components/ui-custom/ProductCard';
import { SEO } from '../../components/SEO';
import { Globe, Award, ShieldCheck, Ship } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InquiryModal } from '../../components/products/InquiryModal';
import { toast } from 'sonner';

export function PremiumExport() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        // Just mock filter for demonstration, take first 6
        const exportProducts = (data.data || []).slice(0, 6);
        setProducts(exportProducts);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const openInquiry = (name: string) => {
    setSelectedProduct(name);
    setShowInquiryModal(true);
  };

  return (
    <div className="bg-background min-h-screen">
      <SEO 
        title="Premium Export Collection" 
        description="Explore our export-quality tiles. Meeting international standards for luxury homes, commercial projects, and global distribution."
      />
      <PageHero 
        title="Premium Export Collection" 
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/products" },
          { label: "Premium Export" }
        ]}
      />

      <section className="py-16 container mx-auto px-4 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-heading mb-4">Export Quality. Global Standards.</h2>
          <p className="text-muted-foreground">
            Our export collection is engineered to exceed international benchmarks. From rigorous quality 
            control to specialized packaging, every tile is prepared for global deployment.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { icon: Globe, title: "Global Reach", desc: "Exporting to 30+ countries" },
            { icon: Award, title: "ISO Certified", desc: "International quality benchmarks" },
            { icon: ShieldCheck, title: "CE Marked", desc: "European compliance standards" },
            { icon: Ship, title: "Pallet Packing", desc: "Secure sea-worthy transit packaging" }
          ].map((Feature, idx) => (
            <div key={idx} className="text-center p-6 bg-muted/30 border border-border/50">
              <Feature.icon className="w-10 h-10 mx-auto text-brand-primary mb-4" />
              <h3 className="font-bold text-sm uppercase tracking-widest mb-2">{Feature.title}</h3>
              <p className="text-xs text-muted-foreground">{Feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-heading">Export Catalog</h2>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
               <div key={product.id} className="relative group">
                 <ProductCard 
                   id={product.id}
                   name={product.name}
                   category={product.category}
                   imageUrl={product.imageUrl}
                   dimensions={product.dimensions}
                   finishType={product.finishType}
                   badge="Export Grade"
                   onEnquire={() => { openInquiry(product.name); }}
                   onImageClick={() => { window.location.href = `/products/${product.category.toLowerCase().replace(/ /g, '-')}/${product.id}`; }}
                 />
                 <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => openInquiry(product.name)}
                      className="bg-brand-primary text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 hover:bg-brand-primary/90"
                    >
                      Export Inquiry
                    </button>
                 </div>
               </div>
            ))}
          </div>
        )}
      </section>

      <InquiryModal 
        isOpen={showInquiryModal} 
        onClose={() => setShowInquiryModal(false)}
        productName={selectedProduct + " (Export Inquiry)"}
      />
    </div>
  );
}
