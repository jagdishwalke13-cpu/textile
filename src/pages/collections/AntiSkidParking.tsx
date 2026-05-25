import React, { useState, useEffect } from 'react';
import { PageHero } from '../../components/ui-custom/PageHero';
import { ProductCard } from '../../components/ui-custom/ProductCard';
import { SEO } from '../../components/SEO';
import { AlertTriangle, Car, Droplets } from 'lucide-react';
import { toast } from 'sonner';

export function AntiSkidParking() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        // Filter Outdoor products
        setProducts((data.data || []).filter((p: any) => p.category === 'Outdoor Tiles').slice(0, 6));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <SEO 
        title="Anti-Skid & Parking Tiles" 
        description="Safety meets style. Discover our heavy-duty anti-skid tiles perfect for outdoor areas, parking lots, and industrial pathways."
      />
      <PageHero 
        title="Anti-Skid & Parking" 
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/products" },
          { label: "Anti-Skid & Parking" }
        ]}
      />

      <section className="py-16 container mx-auto px-4 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-heading mb-4">Safety Meets Style.</h2>
          <p className="text-muted-foreground">
            Heavy-duty, weather-resistant, and maximum grip. Our anti-skid rating R9 to R11 ensures 
            secure footing even in wet conditions, perfect for driveways, pool decks, and industrial zones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-muted/30 p-8 border border-border/50 flex flex-col items-center text-center">
            <Car className="w-12 h-12 text-brand-primary mb-4" />
            <h3 className="font-bold mb-2">Heavy Load Bearing</h3>
            <p className="text-xs text-muted-foreground">Extra thickness (12mm-15mm) prevents cracking under vehicular weight.</p>
          </div>
          <div className="bg-muted/30 p-8 border border-border/50 flex flex-col items-center text-center">
            <Droplets className="w-12 h-12 text-brand-primary mb-4" />
            <h3 className="font-bold mb-2">Moisture Resistant</h3>
            <p className="text-xs text-muted-foreground">&lt;0.5% water absorption ensures freeze-thaw durability outdoors.</p>
          </div>
          <div className="bg-muted/30 p-8 border border-border/50 flex flex-col items-center text-center">
            <AlertTriangle className="w-12 h-12 text-brand-primary mb-4" />
            <h3 className="font-bold mb-2">R10+ Slip Rating</h3>
            <p className="text-xs text-muted-foreground">Structured surfaces provide maximum grip in wet conditions.</p>
          </div>
        </div>

        <div className="mb-8 overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm text-left border border-border">
            <thead className="bg-muted/50 font-bold uppercase tracking-widest text-[#111]">
              <tr>
                <th className="px-6 py-4 border-b border-border">Rating</th>
                <th className="px-6 py-4 border-b border-border">Slip Resistance</th>
                <th className="px-6 py-4 border-b border-border">Application Area</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-background border-b border-border">
                <td className="px-6 py-4 font-bold">R9</td>
                <td className="px-6 py-4 text-emerald-600">Low (Standard)</td>
                <td className="px-6 py-4">Internal rooms, hallways, dry public areas.</td>
              </tr>
              <tr className="bg-muted/10 border-b border-border">
                <td className="px-6 py-4 font-bold">R10</td>
                <td className="px-6 py-4 text-emerald-600">Medium (Textured)</td>
                <td className="px-6 py-4">Bathrooms, garages, covered outdoor dining.</td>
              </tr>
              <tr className="bg-background border-b border-border">
                <td className="px-6 py-4 font-bold">R11</td>
                <td className="px-6 py-4 text-emerald-600">High (Grip)</td>
                <td className="px-6 py-4">Driveways, pool areas, ramps, outdoor working areas.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-heading mt-16 mb-8">Heavy-Duty Catalog</h2>
        {loading ? (
          <div className="py-20 text-center">
             <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard 
                key={product.id}
                id={product.id}
                name={product.name}
                category={product.category}
                imageUrl={product.imageUrl}
                dimensions={product.dimensions}
                finishType={product.finishType}
                badge="R11 Certified"
                onEnquire={() => { toast.success(`Inquiry started for ${product.name}`); }}
                onImageClick={() => { window.location.href = `/products/${product.category.toLowerCase().replace(/ /g, '-')}/${product.id}`; }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
