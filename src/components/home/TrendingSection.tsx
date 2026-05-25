import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeading } from '../ui-custom/SectionHeading';
import { ProductCard } from '../ui-custom/ProductCard';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const TRENDING_PRODUCTS = [
  {
    id: 'p1', name: 'Calacatta Gold', category: 'Porcelain Slab', dimensions: '1600x3200 MM', finishType: 'High Gloss',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'p2', name: 'Nero Marquina', category: 'Porcelain Slab', dimensions: '1200x2400 MM', finishType: 'Matte',
    imageUrl: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'p3', name: 'Onyx Pearl', category: 'Ceramic Wall', dimensions: '600x1200 MM', finishType: 'Polished',
    imageUrl: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'p4', name: 'Rustic Travertine', category: 'Outdoor Tile', dimensions: '600x600 MM', finishType: 'Anti-Skid',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'p5', name: 'Statuario Venato', category: 'Porcelain Slab', dimensions: '1200x1800 MM', finishType: 'Honed',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'p6', name: 'Terrazzo Noir', category: 'Ceramic Floor', dimensions: '800x800 MM', finishType: 'Satin',
    imageUrl: 'https://images.unsplash.com/photo-1552858725-2758b5fb1286?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'p7', name: 'Stone Grey', category: 'Outdoor Tile', dimensions: '600x900 MM', finishType: 'Textured',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'p8', name: 'White Macaubas', category: 'Porcelain Slab', dimensions: '1600x3200 MM', finishType: 'Polished',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
  }
];

export function TrendingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const handleEnquire = (name: string) => {
    toast.success(`Inquiry started for ${name}`);
  };

  return (
    <section className="py-24 bg-brand-accent/30" ref={ref}>
      <div className="container mx-auto px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <SectionHeading title="Trending Designs" subtitle="Signature Series" />
          <Button render={
            <Link to="/products">
              View All Products <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          } variant="ghost" className="hidden md:flex bg-transparent hover:bg-transparent text-brand-primary hover:text-brand-secondary h-12 uppercase tracking-widest text-[10px] font-bold" />
        </motion.div>

        {/* Mobile Horizontal Scroll, Desktop Grid */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 md:pb-0 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {TRENDING_PRODUCTS.map((product, index) => (
            <motion.div 
              key={product.id}
              className="min-w-[280px] md:min-w-0 snap-center"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 * (index % 4) }} // stagger by row
            >
              <ProductCard
                id={product.id}
                name={product.name}
                category={product.category}
                dimensions={product.dimensions}
                finishType={product.finishType}
                imageUrl={product.imageUrl}
                onEnquire={() => handleEnquire(product.name)}
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Button render={
            <Link to="/products">
              View All Products <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          } className="bg-brand-primary hover:bg-brand-primary/90 text-white w-full rounded-none h-14 uppercase tracking-widest text-[10px] font-bold" />
        </div>
      </div>
    </section>
  );
}
