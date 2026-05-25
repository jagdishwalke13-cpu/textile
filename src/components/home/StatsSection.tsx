import { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.floor(latest).toLocaleString();
          }
        }
      });
      return () => controls.stop();
    }
  }, [inView, from, to, duration]);

  return <span ref={ref}>{from}</span>;
}

const STATS = [
  { value: 15, suffix: '+', label: 'Years of Excellence', duration: 2 },
  { value: 500, suffix: '+', label: 'Tile Designs', duration: 2.5 },
  { value: 50, suffix: '+', label: 'Export Countries', duration: 2 },
  { value: 10000, suffix: '+', label: 'Happy Clients', duration: 3 },
];

export function StatsSection() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section ref={containerRef} className="w-full bg-brand-secondary text-white py-16 border-y border-white/5">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
          {STATS.map((stat, index) => (
            <motion.div 
              key={index}
              className={`flex flex-col items-center text-center ${
                index !== STATS.length - 1 ? 'lg:border-r lg:border-brand-primary/30 lg:border-dashed' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-heading font-medium tracking-tight mb-2 text-brand-primary flex items-center justify-center">
                <Counter from={0} to={stat.value} duration={stat.duration} />
                <span>{stat.suffix}</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-accent/70">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
