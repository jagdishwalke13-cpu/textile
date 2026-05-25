import { useState } from 'react';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { toast } from 'sonner';
import { ProductCard } from './ui-custom/ProductCard';
import { SectionHeading } from './ui-custom/SectionHeading';
import { PageHero } from './ui-custom/PageHero';
import { InquiryModal } from './ui-custom/InquiryModal';
import { ImageLightbox } from './ui-custom/ImageLightbox';
import { LoadingSpinner } from './ui/loading-spinner';

export function DesignSystemShowcase() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  const demoProduct = {
    id: 'p1',
    name: 'Statuario Marble Slab',
    category: 'Porcelain Slab Tiles',
    dimensions: '1600 X 3200 MM',
    imageUrl: 'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  };

  const handleEnquire = () => {
    setSelectedProduct(demoProduct.name);
    setIsInquiryOpen(true);
  };

  const handleImageClick = () => {
    setLightboxImages([
      demoProduct.imageUrl,
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
    ]);
    setIsLightboxOpen(true);
  };

  return (
    <div className="pb-24">
      {/* 1. Page Hero */}
      <PageHero 
        title="Design System" 
        bgImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Design System', href: '/design-system' }]}
      />

      <div className="container mx-auto px-4 mt-16 space-y-24">
        {/* Colors & Typography */}
        <section>
          <SectionHeading title="Colors & Typography" subtitle="Brand Identity" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="space-y-2">
              <div className="h-24 bg-brand-primary rounded shadow-sm"></div>
              <p className="font-mono text-xs text-muted-foreground">brand-primary / Terracotta</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-brand-secondary rounded shadow-sm"></div>
              <p className="font-mono text-xs text-muted-foreground">brand-secondary / Charcoal</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-brand-accent border border-border rounded shadow-sm"></div>
              <p className="font-mono text-xs text-muted-foreground">brand-accent / Warm White</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-brand-gold rounded shadow-sm"></div>
              <p className="font-mono text-xs text-muted-foreground">brand-gold / Gold Accent</p>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-heading">Heading 1: Playfair Display</h1>
              <p className="text-muted-foreground text-sm font-mono mt-1">Font: Playfair Display, weight 400-700</p>
            </div>
            <div>
              <p className="text-base text-foreground leading-relaxed max-w-3xl">
                Body text uses Inter. This provides excellent readability for product descriptions, technical specifications, and company information. The contrast between the elegant Playfair Display and the clean Inter creates a modern luxury aesthetic appropriate for a $1M website.
              </p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <SectionHeading title="Buttons" subtitle="Interactive elements" />
          <div className="flex flex-wrap gap-6 items-center">
            <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white rounded-none h-12 px-8 font-sans uppercase tracking-[0.1em] text-xs">
              Primary Button
            </Button>
            <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white rounded-none h-12 px-8 font-sans uppercase tracking-[0.1em] text-xs">
              Secondary Outline
            </Button>
            <Button variant="ghost" className="hover:bg-brand-accent text-brand-secondary rounded-none h-12 px-8 font-sans uppercase tracking-[0.1em] text-xs">
              Ghost Button
            </Button>
          </div>
        </section>

        {/* Product Card */}
        <section>
          <SectionHeading title="Product Card" subtitle="Catalog items" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl">
            <ProductCard 
              id={demoProduct.id}
              name={demoProduct.name}
              category={demoProduct.category}
              dimensions={demoProduct.dimensions}
              imageUrl={demoProduct.imageUrl}
              onEnquire={handleEnquire}
              onImageClick={handleImageClick}
            />
          </div>
        </section>

        {/* Toasts and Loaders */}
        <section>
          <SectionHeading title="Feedback Components" subtitle="User states" />
          <div className="space-y-12 max-w-2xl">
            <div className="space-y-4">
              <h3 className="font-heading text-2xl">Toast Notifications</h3>
              <p className="text-muted-foreground text-sm">Testing standard and success states.</p>
              <div className="flex gap-4">
                <Button onClick={() => toast('Product added to inquiry list')}>
                  Trigger Default Toast
                </Button>
                <Button 
                  onClick={() => toast.success('Inquiry submitted!', { style: { background: '#D2691E', color: 'white', border: 'none' }})}
                  className="bg-brand-primary"
                >
                  Trigger Success Toast
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-heading text-2xl">Loading States</h3>
              <div className="flex gap-12 items-center">
                <div className="p-8 border border-border">
                  <LoadingSpinner size={32} />
                  <p className="text-xs text-center text-muted-foreground mt-4">Spinner</p>
                </div>
                
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <p className="text-xs text-muted-foreground mt-2">Skeleton block</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modals trigger from within code, configured above */}
      </div>

      <InquiryModal 
        isOpen={isInquiryOpen} 
        onClose={() => setIsInquiryOpen(false)} 
        productName={selectedProduct}
      />

      <ImageLightbox 
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={lightboxImages}
      />
    </div>
  );
}
