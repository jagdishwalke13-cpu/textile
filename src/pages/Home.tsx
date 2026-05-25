import { HeroSection } from '../components/home/HeroSection';
import { StatsSection } from '../components/home/StatsSection';
import { PromiseSection } from '../components/home/PromiseSection';
import { CollectionsSection } from '../components/home/CollectionsSection';
import { TrendingSection } from '../components/home/TrendingSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { CtaSection } from '../components/home/CtaSection';
import { SEO } from '../components/SEO';

export function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aura Surfaces",
    "url": "https://aurasurfaces.com/",
    "logo": "https://aurasurfaces.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-1234567890",
      "contactType": "customer service"
    }
  };

  return (
    <div className="w-full flex flex-col">
      <SEO 
        title="Premium Porcelain & Ceramic Tiles" 
        description="Discover our premium collection of porcelain and ceramic tiles for floors and walls. Elevate your space with Aura Surfaces."
        schema={organizationSchema}
      />
      <HeroSection />
      <StatsSection />
      <PromiseSection />
      <CollectionsSection />
      <TrendingSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
}
