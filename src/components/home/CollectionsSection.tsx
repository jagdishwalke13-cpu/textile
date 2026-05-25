import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '../ui-custom/SectionHeading';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  {
    id: 'porcelain',
    name: 'Porcelain Slab Tiles',
    sizes: 'Available in 1200x1200, 1200x1800, 1600x3200 MM',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'ceramic',
    name: 'Ceramic Tiles',
    sizes: 'Available in 300x300, 300x600, 600x600 MM',
    image: 'https://images.unsplash.com/photo-1552858725-2758b5fb1286?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'outdoor',
    name: 'Outdoor Tiles',
    sizes: 'Available in 600x600, 600x900, 600x1200 MM',
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=1200',
  }
];

const SPECIAL_TAGS = [
  'Anti-skid',
  'Parking Tiles',
  'Designer Series',
  'Export Collection'
];

export function CollectionsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading title="Our Collections" subtitle="Curated Series" centered />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {CATEGORIES.map((cat, index) => (
            <motion.div 
              key={cat.id}
              variants={itemVariants}
              className="group relative h-[500px] lg:h-[600px] overflow-hidden cursor-pointer"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end h-full">
                <div className="transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
                  <h3 className="text-2xl md:text-3xl font-heading text-white mb-3">{cat.name}</h3>
                  <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/70 mb-6">{cat.sizes}</p>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <Link to={`/products?category=${cat.id}`} className="inline-flex items-center text-brand-primary text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors">
                      Explore <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Special Tags */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {SPECIAL_TAGS.map((tag) => (
            <Link 
              key={tag}
              to={`/products?tag=${tag.toLowerCase().replace(/ /g, '-')}`}
              className="px-6 py-3 border border-border hover:border-brand-primary text-[10px] uppercase tracking-widest font-bold text-foreground/80 hover:text-brand-primary transition-colors bg-white/50 backdrop-blur-sm shadow-sm"
            >
              {tag}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
