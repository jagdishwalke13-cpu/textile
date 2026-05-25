import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

export function CtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-brand-primary" ref={ref}>
      {/* Subtle geometric tile pattern overlay */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <motion.div 
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
            Ready to Transform Your <span className="italic font-normal text-black/80">Space?</span>
          </h2>
          
          <p className="text-black/70 font-sans md:text-lg mb-12 max-w-2xl font-medium leading-relaxed">
            Visit our showroom to experience the textures in person, or send an inquiry online. Our design experts are ready to guide you to the perfect selection.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <Button render={
              <Link to="/about">
                <MapPin className="w-4 h-4 mr-2" /> Book Showroom Visit
              </Link>
            } className="bg-black text-white hover:bg-black/90 hover:scale-105 transition-all duration-300 h-14 px-10 rounded-none text-[10px] uppercase font-bold tracking-widest" />
            
            <Button render={
              <Link to="/contact">
                Send Inquiry <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            } variant="outline" className="border-black text-black hover:bg-white hover:text-brand-primary hover:border-white h-14 px-10 rounded-none text-[10px] uppercase font-bold tracking-widest bg-transparent transition-all duration-300" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
