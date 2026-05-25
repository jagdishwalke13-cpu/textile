import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Truck, Lightbulb } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const USPS = [
  {
    icon: <ShieldCheck className="w-5 h-5 text-brand-primary" />,
    title: 'ISO Certified Manufacturing',
    description: 'Adhering to strict global quality standards for ultimate durability.'
  },
  {
    icon: <CheckCircle2 className="w-5 h-5 text-brand-primary" />,
    title: 'Slip-resistant & Weather-proof',
    description: 'Engineered variants specifically designed for extreme outdoor and wet conditions.'
  },
  {
    icon: <Truck className="w-5 h-5 text-brand-primary" />,
    title: 'Pan-India Delivery',
    description: 'Seamless logistics ensuring your materials arrive safely and on schedule.'
  },
  {
    icon: <Lightbulb className="w-5 h-5 text-brand-primary" />,
    title: 'Expert Design Consultation',
    description: 'Complimentary sessions with our interior experts for optimal tile selection.'
  }
];

export function PromiseSection() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-20%" });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-24 bg-background overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left: Large Image */}
        <motion.div 
          className="w-full lg:w-1/2 relative h-[500px] lg:h-[700px]"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-brand-primary/10 -translate-x-4 translate-y-4"></div>
          <div className="relative h-full w-full overflow-hidden bg-brand-secondary">
            <img 
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200" 
              alt="Luxury Bathroom Installation" 
              className="object-cover w-full h-full"
            />
            {/* Small floating badge */}
            <div className="absolute bottom-6 left-6 bg-white p-6 shadow-xl max-w-[200px]">
              <div className="text-[10px] uppercase font-bold tracking-widest text-brand-primary mb-2">Since 1994</div>
              <div className="font-heading italic text-lg leading-tight text-brand-secondary">A Legacy of Perfection</div>
            </div>
          </div>
        </motion.div>

        {/* Right: Content */}
        <motion.div 
          className="w-full lg:w-1/2"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.div variants={itemVariants} className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-[1px] bg-brand-primary"></div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-primary">
              Our Promise
            </span>
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-heading text-foreground mb-6 leading-tight"
          >
            Where Craftsmanship <br />
            <span className="italic">Meets Innovation.</span>
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-sm md:text-base text-muted-foreground font-sans mb-12 leading-relaxed max-w-lg"
          >
            We don't just manufacture tiles; we curate surfaces that define architectural masterpieces. Our commitment to quality ensures every piece that leaves our facility is a testament to durability and design excellence.
          </motion.p>

          <div className="space-y-8 mb-12">
            {USPS.map((usp, index) => (
              <motion.div key={index} variants={itemVariants} className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 bg-brand-accent p-3 rounded-full border border-brand-primary/10">
                  {usp.icon}
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm uppercase tracking-wider mb-1">{usp.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {usp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants}>
            <Button render={
              <Link to="/about">
                Learn About Us →
              </Link>
            } className="rounded-none bg-brand-secondary hover:bg-brand-primary text-white h-14 px-10 text-[10px] uppercase tracking-widest font-bold transition-colors" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
