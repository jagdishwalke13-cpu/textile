import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, ArrowDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Particles } from '../ui-custom/Effects';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd28?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1920',
];

const CYCLING_WORDS = ["Inspire.", "Endure.", "Impress.", "Define You."];

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const imageTimer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(imageTimer);
  }, []);

  useEffect(() => {
    const wordTimer = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % CYCLING_WORDS.length);
    }, 3000);
    return () => clearInterval(wordTimer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-brand-secondary">
      {/* Background Image Slider with parallax */}
      <motion.div style={{ y: y1 }} className="absolute inset-x-0 top-[-10%] z-0 h-[120%]">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImage}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_IMAGES[currentImage]})` }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
        </AnimatePresence>
      </motion.div>

      {/* Dark Overlay & Effects */}
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay opacity-[0.15]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      <Particles count={70} color="#dfc282" />

      {/* Content */}
      <div className="relative z-20 h-full container mx-auto px-4 md:px-12 flex flex-col justify-center items-center text-center pt-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-12 h-[1px] bg-brand-primary"></div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-primary">
              Premium Quality Tiles Since 1994
            </span>
            <div className="w-12 h-[1px] bg-brand-primary"></div>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-[84px] font-heading font-bold text-white leading-[1.1] mb-6 drop-shadow-lg"
          >
            Crafting Spaces That
            <br />
            <div className="h-[1.2em] relative overflow-hidden mt-2 inline-block w-full">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={currentWord}
                  className="absolute left-0 right-0 italic text-brand-accent font-normal"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  {CYCLING_WORDS[currentWord]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-sm md:text-base text-brand-accent/80 font-sans max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            India's finest porcelain, ceramic & outdoor tiles — engineered for perfection, designed for excellence. Experience the fusion of art and material science.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button render={
              <Link to="/products" className="flex items-center gap-2">
                Explore Collection <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            } className="bg-brand-primary hover:bg-brand-primary hover:brightness-110 text-white rounded-none h-14 px-10 text-[10px] uppercase tracking-widest font-bold border-none w-full sm:w-auto" />
            <Button render={
              <a href="/brochure.pdf" className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                Download Brochure <Download className="w-4 h-4 ml-2" />
              </a>
            } variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black rounded-none h-14 px-10 text-[10px] uppercase tracking-widest font-bold bg-transparent w-full sm:w-auto" />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Scroll Details</span>
        <ArrowDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}
