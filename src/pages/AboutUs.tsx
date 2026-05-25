import { motion } from 'framer-motion';
import { Linkedin, MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { SEO } from '../components/SEO';
import { ImageZoom } from '../components/ui-custom/Animations';

export function AboutUs() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.7 }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-50px" },
    transition: { staggerChildren: 0.15 }
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aura Surfaces",
    "description": "Crafting the finest ceramic and porcelain surfaces since 2010.",
    "url": "https://aurasurfaces.com/about",
    "logo": "https://aurasurfaces.com/logo.png"
  };

  return (
    <div className="bg-background min-h-screen pt-20">
      <SEO 
        title="About Us | Our Heritage & Craftsmanship" 
        description="Learn about Aura Surfaces' decade-long journey of crafting the finest porcelain and ceramic tiles. Excellence in surface design."
        schema={orgSchema}
      />
      {/* 1. HERO */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1563836746830-4e3a479ffceb?auto=format&fit=crop&q=80&w=1920)' }}
        >
          <div className="absolute inset-0 bg-black/70" />
        </div>
        
        <div className="container mx-auto px-4 md:px-12 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-primary mb-6 block">
              OUR HERITAGE
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading text-white leading-tight mb-6">
              Built on Craftsmanship.<br/>Driven by Innovation.
            </h1>
            <p className="text-white/80 font-sans text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              We are shaping the physical world with premium, durable surfaces that inspire awe and elevate spaces.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. OUR STORY */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Story Text */}
            <motion.div 
              {...fadeInUp}
              className="lg:w-1/2 prose prose-lg prose-p:font-sans prose-p:text-muted-foreground prose-headings:font-heading prose-headings:text-foreground max-w-none"
            >
              <h2 className="text-3xl md:text-5xl mb-8">A Journey Discovered in Earth & Fire</h2>
              <p>
                Founded in 2005 in Morbi, the heart of India's ceramic industry, we embarked on a singular mission: to bring world-class surface solutions to local and global markets. What started as a modest kiln operation producing standard regional tiles has evolved into a powerhouse of modern manufacturing.
              </p>
              <p>
                As architectural demands evolved, so did we. We quickly expanded our expertise from traditional ceramic tiles to cutting-edge, large-format porcelain slabs. By adopting Italian press technologies and stringent vitrification processes, we mastered the art of replicating natural marble, wood, and concrete with uncompromising durability.
              </p>
              <p>
                Today, our surfaces grace luxury residences, commercial towers, and hospitality venues across the globe. Proudly exporting to over <b>50 countries</b>, we bridge the gap between visionary design and structural reality.
              </p>
              <p>
                <b>Our Vision:</b> To make premium, sustainable, and aesthetically profound tiles universally accessible across India and the international stage, transforming structural blueprints into enduring architectural landmarks.
              </p>
            </motion.div>

            {/* Founder & Timeline */}
            <div className="lg:w-1/2 flex flex-col gap-12">
              <motion.div {...fadeInUp} className="bg-muted p-8 md:p-12 border border-border/50 relative">
                <div className="absolute -top-6 -left-6 text-6xl text-brand-primary/20 font-serif leading-none">"</div>
                <blockquote className="text-xl md:text-2xl font-heading text-foreground mb-8 leading-snug relative z-10">
                  We don't just bake clay; we engineer the foundations of modern living. Every slab that leaves our facility carries our solemn promise of absolute quality.
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-brand-primary/20">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200" alt="Founder" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold font-sans text-foreground">Rajesh Patel</div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Founder & Chairman</div>
                  </div>
                </div>
              </motion.div>

              <motion.div {...fadeInUp}>
                <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground mb-6">Our Path to Excellence</h3>
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                  {[
                    { year: '2005', title: 'Company Founded', desc: 'Started ceramic tile operations in Morbi.' },
                    { year: '2010', title: 'ISO Certification', desc: 'Achieved ISO 9001:2015 for quality management.' },
                    { year: '2015', title: 'Started Exports', desc: 'Initial shipments to UAE and European markets.' },
                    { year: '2023', title: '500+ Designs', desc: 'Launched massive large-format slab production line.' }
                  ].map((milestone, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
                      className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-brand-secondary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-500 group-hover:scale-110">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-muted/30 p-4 border border-border/50 group-hover:border-brand-primary/30 transition-colors relative overflow-hidden group-hover:shadow-md">
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-brand-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold font-sans text-foreground text-sm">{milestone.title}</h4>
                          <span className="text-[10px] font-bold text-brand-primary tracking-widest uppercase">{milestone.year}</span>
                        </div>
                        <p className="text-xs text-muted-foreground font-sans leading-relaxed">{milestone.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MANUFACTURING EXCELLENCE */}
      <section className="py-24 bg-black text-white px-4 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/5 blur-3xl rounded-full" />
        
        <div className="container mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-primary mb-4 block">Our Infrastructure</span>
            <h2 className="text-4xl md:text-5xl font-heading mb-6">State-of-the-Art Manufacturing</h2>
            <p className="max-w-2xl mx-auto text-white/70 font-sans">
              Precision engineering meets absolute scale. We leverage the world's most advanced pressing, glazing, and continuous kiln technologies.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {[
              { img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800', title: 'Factory Floor', desc: 'Automated 1.2KM long continuous kiln setups.' },
              { img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800', title: 'Quality Testing Lab', desc: 'Rigorous stress, abrasion, and water absorption checks.' },
              { img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800', title: 'Packaging & Dispatch', desc: 'Safe, automated crating for seamless global logistics.' }
            ].map((facility, i) => (
              <motion.div key={i} variants={fadeInUp} className="group cursor-pointer">
                <ImageZoom className="aspect-video relative mb-4">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  <img src={facility.img} alt={facility.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </ImageZoom>
                <h3 className="text-xl font-heading mb-2">{facility.title}</h3>
                <p className="text-white/60 font-sans text-sm">{facility.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center pt-8 border-t border-white/10">
             <p className="text-xl md:text-2xl font-light font-sans tracking-wide">
               Our facility spans <span className="font-bold text-brand-primary">1.5 Million sq ft</span> with capacity of <span className="font-bold text-brand-primary">85,000 sq ft/day</span>
             </p>
          </div>
        </div>
      </section>

      {/* 4. CERTIFICATIONS & AWARDS */}
      <section className="py-16 bg-muted/50 border-y border-border/50">
        <div className="container mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 justify-center flex-wrap">
            <div className="text-center md:text-left shrink-0">
              <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground mb-2">Global Standards</h3>
              <p className="font-heading text-lg">Certifications & Awards</p>
            </div>
            
            <div className="flex items-center gap-8 md:gap-12 flex-wrap justify-center">
              {['ISO 9001:2015', 'BIS Certified', 'Export Excellence', 'CE Marking'].map((cert, i) => (
                <div key={i} className="flex items-center justify-center h-16 px-6 bg-background border border-border/50 text-muted-foreground hover:text-foreground hover:border-brand-primary transition-all cursor-default shadow-sm grayscale hover:grayscale-0">
                  <span className="font-sans font-bold text-sm tracking-wide uppercase">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. TEAM */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-heading text-foreground mb-4">The People Behind the Tiles</h2>
            <p className="text-muted-foreground font-sans max-w-2xl mx-auto">
              Our executive leadership brings together decades of experience in ceramics, international trade, and design.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Rajesh Patel', role: 'Founder & Chairman', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400' },
              { name: 'Vikram Singh', role: 'Head of Manufacturing', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400' },
              { name: 'Priya Sharma', role: 'Lead Product Designer', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' },
              { name: 'Amit Desai', role: 'Global Exports Director', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
            ].map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="aspect-[4/5] overflow-hidden bg-muted mb-4 relative">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a href="#" className="w-12 h-12 rounded-full bg-white text-brand-primary flex items-center justify-center hover:scale-110 transition-transform">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <h3 className="font-heading text-xl text-foreground mb-1">{member.name}</h3>
                <p className="text-xs uppercase tracking-widest text-brand-primary font-bold">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. VALUES */}
      <section className="py-24 bg-brand-accent/20 border-y border-border/50">
        <div className="container mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🎯', title: 'Quality First', desc: 'No compromises. Every tile is visually and structurally inspected before dispatch.' },
              { icon: '🌍', title: 'Global Vision', desc: 'Bridging Indian craftsmanship with international design standards and logistics.' },
              { icon: '🤝', title: 'Client First', desc: 'From custom sizes to dedicated support, our partners success is our success.' },
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background p-10 border border-border/50 text-center hover:border-brand-primary transition-colors"
              >
                <div className="text-4xl mb-6">{value.icon}</div>
                <h3 className="text-xl font-heading mb-4">{value.title}</h3>
                <p className="text-muted-foreground font-sans leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. VISIT US */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className="lg:w-1/3">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-primary mb-4 block">SHOWROOM & FACTORY</span>
              <h2 className="text-4xl font-heading text-foreground mb-8">Visit Us</h2>
              
              <div className="space-y-8 font-sans">
                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 text-brand-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Headquarters & Plant</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Survey No. 42, 8-A National Highway,<br />
                      Morbi - 363642, Gujarat, India
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Phone className="w-5 h-5 text-brand-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Contact</h4>
                    <p className="text-muted-foreground text-sm">
                      +91 98765 43210<br />
                      +91 98765 01234
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Mail className="w-5 h-5 text-brand-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground text-sm">
                      info@yourcompany.com<br />
                      exports@yourcompany.com
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Clock className="w-5 h-5 text-brand-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Working Hours</h4>
                    <p className="text-muted-foreground text-sm">
                      Monday - Saturday<br />
                      9:00 AM - 6:30 PM (IST)
                    </p>
                  </div>
                </div>
              </div>
              
              <Button render={<a href="https://maps.google.com" target="_blank" rel="noreferrer" />} className="mt-10 w-full sm:w-auto bg-brand-primary text-white rounded-none uppercase text-[10px] tracking-widest font-bold px-10 h-14">
                Get Directions <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <div className="lg:w-2/3 max-h-[500px]">
              {/* Google Maps iFrame Placeholder */}
              <div className="w-full h-full min-h-[400px] border border-border/50 bg-muted relative grayscale">
                 <iframe 
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d117565.34005167664!2d70.76766953934372!3d22.82315998634125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39598c199d701d63%3A0xe6bf44b7f80f68dc!2sMorbi%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                   width="100%" 
                   height="100%" 
                   style={{ border: 0 }} 
                   allowFullScreen 
                   loading="lazy" 
                   referrerPolicy="no-referrer-when-downgrade"
                   title="Morbi location map"
                   className="absolute inset-0"
                 ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
