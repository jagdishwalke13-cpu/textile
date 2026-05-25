import React, { useState, useEffect } from 'react';
import { PageHero } from '../../components/ui-custom/PageHero';
import { ProductCard } from '../../components/ui-custom/ProductCard';
import { SEO } from '../../components/SEO';
import { toast } from 'sonner';

export function DesignerSeries() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        // Mock Designer products
        setProducts((data.data || []).slice(0, 8));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <SEO 
        title="Designer Series Collection" 
        description="Where tiles become art. Explore our artistic, patterned, and unique designer tiles for luxury homes and boutique spaces."
      />
      <PageHero 
        title="Designer Series" 
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/products" },
          { label: "Designer Series" }
        ]}
      />

      <section className="py-16 container mx-auto px-4 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-heading mb-4">Where Tiles Become Art.</h2>
          <p className="text-muted-foreground">
            Curated designs for luxury homes, boutique hotels, and artisanal spaces. 
            Step away from the ordinary with our exclusive designer surfaces that command attention.
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center">
             <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {products.map((product, i) => (
              <div key={product.id} className="break-inside-avoid">
                <ProductCard 
                  id={product.id}
                  name={product.name}
                  category={product.category}
                  imageUrl={product.imageUrl}
                  dimensions={product.dimensions}
                  finishType={product.finishType}
                  badge={i % 3 === 0 ? "Boutique" : undefined}
                  onEnquire={() => { toast.success(`Inquiry started for ${product.name}`); }}
                  onImageClick={() => { window.location.href = `/products/${product.category.toLowerCase().replace(/ /g, '-')}/${product.id}`; }}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
