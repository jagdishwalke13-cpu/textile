import { Heart, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

interface ProductCardProps {
  key?: React.Key;
  id: string;
  name: string;
  category: string;
  dimensions: string;
  finishType?: string;
  badge?: string;
  imageUrl: string;
  onEnquire: () => void;
  onImageClick?: () => void;
  layout?: 'grid' | 'list';
}

export function ProductCard({ 
  id, 
  name, 
  category, 
  finishType, 
  dimensions, 
  badge,
  imageUrl, 
  onEnquire, 
  onImageClick,
  layout = 'grid'
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (layout === 'list') {
    return (
      <div className="bg-background border border-border/50 p-4 shadow-sm flex flex-col md:flex-row gap-6 group hover:shadow-md transition-shadow">
        <div className="relative w-full md:w-48 aspect-square md:h-48 bg-muted overflow-hidden cursor-pointer flex-shrink-0 product-image-hover" onClick={onImageClick}>
          <img src={imageUrl} alt={name} loading="lazy" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
          {badge && (
            <div className="absolute top-2 left-2 bg-brand-primary text-white text-[9px] uppercase tracking-widest font-bold px-2 py-1">
              {badge}
            </div>
          )}
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex justify-between items-start mb-2">
            <div className="flex gap-2 items-center">
              <span className="bg-brand-accent/30 text-brand-secondary text-[9px] uppercase tracking-widest font-bold px-2 py-1 rounded-sm">
                {category}
              </span>
              {finishType && <span className="text-[9px] uppercase tracking-widest font-bold text-brand-primary">{finishType}</span>}
            </div>
            
            <button 
              className={`p-2 rounded-full transition-colors ${isWishlisted ? 'bg-brand-primary text-white' : 'bg-muted text-foreground hover:bg-brand-primary hover:text-white'}`}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
          
          <h3 className="font-heading text-2xl leading-tight text-foreground mb-4">{name}</h3>
          
          <div className="mb-6">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground mr-6">
              Size: <strong className="text-foreground">{dimensions}</strong>
            </span>
          </div>
          
          <div className="flex gap-4 mt-auto">
            <button 
              onClick={onImageClick}
              className="uppercase tracking-[0.2em] text-[10px] bg-brand-secondary text-white px-6 py-3 hover:bg-brand-primary transition-all font-bold"
            >
              View Details
            </button>
            <button 
              onClick={onEnquire} 
              className="uppercase tracking-[0.2em] text-[10px] border border-border text-foreground px-6 py-3 hover:border-brand-primary hover:text-brand-primary transition-all font-bold"
            >
              Quick Enquire
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-background p-4 shadow-xl flex flex-col group cursor-default relative border border-border/50 h-full"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button 
        className={`absolute top-6 right-6 z-20 p-2 rounded-full backdrop-blur-md transition-colors ${isWishlisted ? 'bg-brand-primary text-white' : 'bg-black/20 text-white hover:bg-brand-primary'}`}
        onClick={() => setIsWishlisted(!isWishlisted)}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
      </button>

      {badge && (
        <div className="absolute top-6 left-6 z-20 bg-brand-primary text-white text-[9px] uppercase tracking-widest font-bold px-2 py-1 shadow-md">
          {badge}
        </div>
      )}

      <div className="aspect-[1/1] bg-muted mb-5 overflow-hidden relative cursor-pointer product-image-hover" onClick={onImageClick}>
        <img 
          src={imageUrl} 
          alt={name} 
          loading="lazy"
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Hover Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/40 flex items-center justify-center p-4"
            >
              <button 
                onClick={onImageClick}
                className="bg-white/90 text-brand-secondary p-3 rounded-full hover:bg-brand-primary hover:text-white transition-colors"
                aria-label="View Details"
              >
                <Search className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-2">
          <span className="bg-brand-accent/30 text-brand-secondary text-[9px] uppercase tracking-widest font-bold px-2 py-1 rounded-sm block truncate w-fit max-w-full">
            {category}
          </span>
        </div>
        
        <h3 className="font-heading text-[22px] leading-tight text-foreground mb-4 line-clamp-2" title={name}>{name}</h3>
        
        <div className="mt-auto space-y-4">
          <div className="flex justify-between items-center text-[10px] font-bold text-brand-primary pb-1 border-b border-border/50">
            <span className="uppercase tracking-widest text-muted-foreground font-sans font-medium">Size</span>
            <span className="uppercase tracking-widest text-brand-secondary">{dimensions}</span>
          </div>

          <div className="flex justify-between items-center text-[10px] font-bold text-brand-primary pb-2 border-b border-border/50">
            <span className="uppercase tracking-widest text-muted-foreground font-sans font-medium">Finish</span>
            <span className="uppercase tracking-widest text-brand-secondary">{finishType || '-'}</span>
          </div>
          
          <div className="flex gap-2 pt-2">
             <button 
              onClick={onImageClick}
              className="uppercase font-bold tracking-[0.2em] text-[10px] bg-brand-secondary text-white py-3 flex-1 hover:bg-brand-primary transition-all text-center"
            >
              Details
            </button>
            <button 
              onClick={onEnquire} 
              className="uppercase font-bold tracking-[0.1em] text-[10px] border border-brand-secondary text-brand-secondary py-3 flex-1 hover:bg-brand-secondary hover:text-white transition-all text-center"
            >
              Enquire
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
