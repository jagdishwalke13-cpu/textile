import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    location: 'New York, USA',
    quote: 'The Statuario slabs completely transformed our hotel lobby. The veining is incredibly realistic, and the durability has surpassed our expectations.',
    initial: 'S',
  },
  {
    id: 2,
    name: 'Rajeev Mehta',
    location: 'Mumbai, India',
    quote: 'Working with the design team was a breeze. We used their designer series for our entire villa project. Top-notch quality and pristine finishes.',
    initial: 'R',
  },
  {
    id: 3,
    name: 'Elena Rostova',
    location: 'Dubai, UAE',
    quote: 'We required anti-skid tiles for a large commercial pool deck. The outdoor collection not only meets safety standards but looks magnificent.',
    initial: 'E',
  },
  {
    id: 4,
    name: 'Marcus Thorne',
    location: 'London, UK',
    quote: 'Exceptional craftsmanship. The large format porcelain slabs reduced grout lines in our gallery, creating a seamless, monolithic aesthetic.',
    initial: 'M',
  },
  {
    id: 5,
    name: 'Priya Anand',
    location: 'Bangalore, India',
    quote: 'From selection to delivery, the process was flawless. The tiles look even better in person than in the catalog. Highly recommended.',
    initial: 'P',
  }
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="py-24 lg:py-32 bg-brand-secondary text-brand-accent overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center mb-16"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-[1px] bg-brand-primary"></div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-primary">
              Client Stories
            </span>
            <div className="w-12 h-[1px] bg-brand-primary"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic leading-tight text-white">
            What Our <span className="font-bold not-italic">Clients Say.</span>
          </h2>
        </motion.div>

        <div 
          className="max-w-4xl mx-auto relative min-h-[300px] flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <Quote className="absolute top-0 left-0 md:-left-12 w-24 h-24 text-brand-primary/10 rotate-180 -z-0" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-center z-10 w-full"
            >
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-primary text-brand-primary" />
                ))}
              </div>
              
              <p className="font-heading text-2xl md:text-3xl lg:text-4xl leading-relaxed text-white mb-10 italic">
                "{TESTIMONIALS[currentIndex].quote}"
              </p>
              
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-primary/20 border border-brand-primary text-brand-primary flex items-center justify-center font-heading text-xl">
                  {TESTIMONIALS[currentIndex].initial}
                </div>
                <div className="text-left">
                  <div className="font-bold uppercase tracking-widest text-[10px] text-white">
                    {TESTIMONIALS[currentIndex].name}
                  </div>
                  <div className="text-brand-accent/50 text-xs mt-1">
                    {TESTIMONIALS[currentIndex].location}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                index === currentIndex ? 'w-8 bg-brand-primary' : 'w-2 bg-white/20'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
