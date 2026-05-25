import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download, CheckCircle, Search } from 'lucide-react';
import { ProductCard } from '../components/ui-custom/ProductCard';
import { Button } from '../components/ui/button';
import { SEO } from '../components/SEO';

// Mock category data
const CATEGORY_DATA: Record<string, any> = {
  'porcelain-slab-tiles': {
    name: 'Porcelain Slab Tiles',
    title: 'Large Format Luxury — Redefined',
    description: 'Our porcelain slabs deliver the grandeur of natural stone with superior durability. Perfect for residential lobbies, commercial spaces, and feature walls.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920',
    badges: ['1200×1200 MM', '1200×1800 MM', '1600×3200 MM'],
    features: [
      { icon: '🏆', title: 'High Strength', desc: 'Vitrified for maximum durability' },
      { icon: '💧', title: 'Stain Resistant', desc: 'Easy to clean, hard to damage' },
      { icon: '🎨', title: 'Realistic Textures', desc: 'Marble, wood, concrete looks' },
    ],
    tabs: ['ALL', 'MARBLE LOOK', 'CONCRETE LOOK', 'WOOD LOOK', 'SOLID COLOR'],
    sizeGuide: [
      { size: '1200×1200 MM', recommended: 'Living rooms, hotels', minRoom: '200 sq ft+' },
      { size: '1200×1800 MM', recommended: 'Feature walls, large floors', minRoom: '400 sq ft+' },
      { size: '1600×3200 MM', recommended: 'Grand lobbies, commercial', minRoom: '1000 sq ft+' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd28?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552858725-2758b5fb1286?auto=format&fit=crop&q=80&w=800',
    ],
    inquiryText: 'Interested in Porcelain Slabs? Request a sample or visit our showroom.',
  },
  'ceramic-tiles': {
    name: 'Ceramic Tiles',
    title: 'Versatile Elegance for Every Space',
    description: 'Discover the perfect blend of aesthetic appeal and practicality with our ceramic tile collection, ideal for walls and moderate-traffic floors.',
    heroImage: 'https://images.unsplash.com/photo-1552858725-2758b5fb1286?auto=format&fit=crop&q=80&w=1920',
    badges: ['300×300 MM', '300×600 MM', '600×600 MM'],
    features: [
      { icon: '✨', title: 'Vibrant Glazes', desc: 'Rich, lasting colors and patterns' },
      { icon: '🛠️', title: 'Easy Install', desc: 'Lighter weight, simple to cut' },
      { icon: '🛡️', title: 'Moisture Proof', desc: 'Perfect for bathrooms and kitchens' },
    ],
    tabs: ['ALL', 'METRO & SUBWAY', 'GEOMETRIC', 'RUSTIC', 'GLOSSY'],
    sizeGuide: [
      { size: '300×300 MM', recommended: 'Bathrooms, utility rooms', minRoom: 'Any size' },
      { size: '300×600 MM', recommended: 'Kitchen backsplashes, shower walls', minRoom: 'Any size' },
      { size: '600×600 MM', recommended: 'Bedrooms, small living areas', minRoom: '100 sq ft+' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552858725-2758b5fb1286?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    ],
    inquiryText: 'Ready to elevate your walls and spaces? Speak to our ceramic tile experts.',
  },
  'outdoor-tiles': {
    name: 'Outdoor Tiles',
    title: 'Rugged Beauty With Anti-Skid Safety',
    description: 'Transform patios, driveways, and pool decks with our high-thickness outdoor tiles designed to withstand extreme weather and heavy foot traffic.',
    heroImage: 'https://images.unsplash.com/photo-1605814513146-241517fec658?auto=format&fit=crop&q=80&w=1920',
    badges: ['600×600 MM', '600×900 MM', '600×1200 MM'],
    features: [
      { icon: '🛑', title: 'Anti-Skid Surface', desc: 'R11 rated for maximum grip' },
      { icon: '☀️', title: 'Weather Proof', desc: 'UV stable and frost resistant' },
      { icon: '🏋️', title: 'Heavy Load', desc: 'Suitable for parking and driveways' },
    ],
    tabs: ['ALL', 'STONE EFFECT', 'WOOD EFFECT', 'CONCRETE EFFECT', '20MM PAVERS'],
    sizeGuide: [
      { size: '600×600 MM', recommended: 'Balconies, small patios', minRoom: 'Any size' },
      { size: '600×900 MM', recommended: 'Pool decks, garden walkways', minRoom: '150 sq ft+' },
      { size: '600×1200 MM', recommended: 'Large terraces, public spaces', minRoom: '300 sq ft+' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1605814513146-241517fec658?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=800',
    ],
    inquiryText: 'Design your perfect outdoor oasis. Contact us for 20mm paver catalogs.',
  }
};

export function CategoryDetail() {
  const { categorySlug } = useParams();
  const [activeTab, setActiveTab] = useState('ALL');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const data = CATEGORY_DATA[categorySlug || ''] || CATEGORY_DATA['porcelain-slab-tiles'];
  const dbCategoryName = data.name;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        query.set('category', dbCategoryName);
        query.set('limit', '8');
        
        const res = await fetch(`/api/products?${query.toString()}`);
        const result = await res.json();
        setProducts(result.data || []);
      } catch (e) {
         console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryProducts();
    window.scrollTo(0,0);
  }, [categorySlug, dbCategoryName]);

  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": data.name,
    "description": data.description,
    "url": `https://aurasurfaces.com/products/${categorySlug}`,
    "image": data.heroImage
  };

  return (
    <div className="bg-background min-h-screen">
      <SEO 
        title={`${data.name} — Premium Collections`} 
        description={data.description}
        image={data.heroImage}
        schema={categorySchema}
      />
      {/* 1. CATEGORY HERO */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${data.heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="container mx-auto px-4 md:px-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="mb-4">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-primary bg-black/50 px-3 py-1 backdrop-blur-sm border border-brand-primary/30">
                {data.name.toUpperCase()}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading text-white leading-tight mb-6">
              {data.title}
            </h1>
            
            <p className="text-white/80 font-sans text-lg md:text-xl font-medium max-w-2xl leading-relaxed mb-8">
              {data.description}
            </p>
            
            <div className="flex flex-wrap gap-3">
              {data.badges.map((badge: string) => (
                <div key={badge} className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-white/10 text-white backdrop-blur-md border border-white/20">
                  {badge}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURES BAR */}
      <section className="bg-brand-secondary py-16 text-white border-y border-white/10">
        <div className="container mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {data.features.map((feature: any, i: number) => (
              <div key={i} className="flex items-start gap-4 pt-8 md:pt-0 md:px-8 first:pt-0 first:px-0 first:pl-0 lg:px-12">
                <span className="text-3xl">{feature.icon}</span>
                <div>
                  <h3 className="font-heading text-xl mb-2">{feature.title}</h3>
                  <p className="font-sans text-brand-accent/70 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PRODUCT GRID */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-8 h-[1px] bg-brand-primary" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary">Explore The Range</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading text-foreground">
                Featured <span className="italic">{data.name}</span>
              </h2>
            </div>
            
            <Button render={<Link to={`/products?category=${categorySlug}`} />} variant="outline" className="rounded-none border-border text-[10px] uppercase font-bold tracking-[0.2em] px-8 hover:bg-brand-primary hover:text-white">
              View All Products <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Sub-categories Tabs */}
          <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-12 border-b border-border/50 pb-px">
            {data.tabs.map((tab: string) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-6 py-3 text-[10px] uppercase font-bold tracking-widest transition-colors border-b-2 ${
                  activeTab === tab 
                    ? 'border-brand-primary text-brand-primary' 
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
               [...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-muted animate-pulse border border-border/50" />
               ))
            ) : products.length > 0 ? (
               products.map((product) => {
                 const slug = product.category.toLowerCase().replace(/ /g, '-');
                 return (
                 <ProductCard
                   key={product.id}
                   {...product}
                   layout="grid"
                   onEnquire={() => {}}
                   onImageClick={() => window.location.href = `/products/${slug}/${product.id}`}
                 />
               )})
            ) : (
               <div className="col-span-full text-center py-24 text-muted-foreground">
                 No featured products available at the moment.
               </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. SIZE GUIDE TABLE */}
      <section className="py-24 bg-brand-accent/20">
        <div className="container mx-auto px-4 md:px-12 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">Size & Application Guide</h2>
            <p className="text-muted-foreground font-sans max-w-2xl mx-auto">
              Choosing the right tile format is crucial for achieving your desired interior aesthetic. Use our quick reference guide below.
            </p>
          </div>

          <div className="overflow-x-auto border border-border/50 bg-background shadow-md">
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="bg-muted text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border/50">
                  <th className="p-6 font-bold w-1/3">Tile Size</th>
                  <th className="p-6 font-bold w-1/3">Recommended Application</th>
                  <th className="p-6 font-bold">Minimum Room Size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-sm font-sans">
                {data.sizeGuide.map((row: any, i: number) => (
                  <tr key={i} className="hover:bg-muted/50 transition-colors">
                    <td className="p-6 font-bold text-brand-secondary">{row.size}</td>
                    <td className="p-6 text-foreground/80">{row.recommended}</td>
                    <td className="p-6 text-foreground/80">{row.minRoom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. INSTALLATION INSPIRATION GALLERY */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-12">
          <div className="flex flex-col items-center text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">Installation Inspiration</h2>
             <p className="text-muted-foreground font-sans max-w-2xl">
               See how our {data.name.toLowerCase()} come to life in real architectural projects.
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
             {data.gallery.map((img: string, i: number) => (
                <div 
                  key={i} 
                  className={`bg-muted relative group overflow-hidden cursor-pointer ${i === 0 || i === 3 ? 'md:col-span-2 lg:col-span-2' : ''}`}
                >
                  <img src={img} alt="Installation gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Search className="text-white w-8 h-8" />
                  </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* 6. INQUIRY CTA */}
      <section className="py-24 bg-brand-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:24px_24px]" />
        
        <div className="container mx-auto px-4 relative z-10 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-heading mb-6 leading-tight">
            {data.inquiryText}
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Button render={<Link to="/contact" />} className="bg-black hover:bg-black/80 text-white rounded-none px-10 h-14 uppercase tracking-widest text-[10px] font-bold">
              Request Sample
            </Button>
            <Button render={<Link to="/about" />} variant="outline" className="border-black text-black hover:bg-white hover:border-white hover:text-brand-primary rounded-none bg-transparent px-10 h-14 uppercase tracking-widest text-[10px] font-bold">
              Find Showroom
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
