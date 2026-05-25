import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '../ui/sheet';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Company', path: '/about', hasDropdown: true },
  { name: 'Products', path: '/products', hasDropdown: true },
  { name: 'Export', path: '/export' },
  { name: 'Utilities', path: '/utilities' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b border-border ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-12 h-24 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-heading tracking-tighter font-bold uppercase italic text-foreground">
          Aura<span className="text-brand-primary ml-1">Surfaces</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path || 
              (link.path !== '/' && location.pathname.startsWith(link.path));
            
            return (
              <div key={link.name} className="relative group">
                <Link
                  to={link.path}
                  className={`flex items-center gap-1 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors hover-underline-center ${isActive ? 'text-brand-primary' : 'text-foreground/80 hover:text-brand-primary'}`}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button render={<Link to="/contact">CONTACT US</Link>} className="rounded-full px-8 py-6 h-auto bg-brand-primary hover:brightness-110 text-white text-[10px] uppercase font-bold tracking-widest border-none" />
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Menu" />} >
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-[400px] border-r-0 bg-background/95 backdrop-blur-xl pt-20">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col gap-8 h-full">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className="text-3xl font-heading text-foreground/90 hover:text-brand-primary transition-colors block"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-auto pb-12"
                >
                  <Button render={<Link to="/contact">CONTACT US</Link>} className="w-full rounded-full bg-brand-primary hover:bg-brand-primary/90 py-6 text-lg" />
                </motion.div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
