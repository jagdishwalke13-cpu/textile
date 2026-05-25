import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PageHeroProps {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
  bgImage?: string;
}

export function PageHero({ 
  title, 
  breadcrumbs,
  bgImage = "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=1920" 
}: PageHeroProps) {
  return (
    <div className="relative h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden bg-brand-secondary">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary via-brand-secondary/80 to-transparent" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      
      {/* Content */}
      <div className="relative z-10 text-center flex flex-col items-center">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-6 uppercase tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>
        
        <motion.nav 
          className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-brand-accent/70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.label} className="flex items-center">
              {crumb.href ? (
                <Link to={crumb.href} className="hover:text-brand-primary transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white">{crumb.label}</span>
              )}
              
              {index < breadcrumbs.length - 1 && (
                <ChevronRight className="w-3 h-3 mx-2 text-brand-primary" />
              )}
            </div>
          ))}
        </motion.nav>
      </div>
    </div>
  );
}
