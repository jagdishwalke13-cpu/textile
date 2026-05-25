import { Link } from 'react-router-dom';
import { Instagram, Linkedin, MessageCircle, Youtube, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function Footer() {
  return (
    <footer className="bg-brand-secondary text-brand-accent/70 pt-20 pb-8 border-t border-brand-secondary relative overflow-hidden">
      {/* Subtle geometric tile pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Logo & Tagline */}
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-heading tracking-tighter font-bold uppercase italic text-brand-accent block">
              Aura<span className="text-brand-primary ml-1">Surfaces</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs font-sans">
              Curating the world's finest porcelain slabs and ceramic masterpieces for high-end architecture.
            </p>
            <div className="space-y-4 pt-4">
              <h4 className="text-[9px] font-bold tracking-[0.3em] text-brand-primary uppercase">Newsletter</h4>
              <div className="flex gap-2 max-w-xs">
                <Input 
                  type="email" 
                  placeholder="Enter email..." 
                  className="bg-black/20 border-white/10 text-brand-accent placeholder:text-gray-500 focus-visible:ring-brand-primary rounded-none h-12"
                />
                <Button size="icon" className="bg-brand-primary hover:bg-brand-primary/90 hover:brightness-110 h-12 w-14 rounded-none shrink-0 border-none">
                  <ArrowRight className="w-4 h-4 text-white" />
                </Button>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-[9px] font-bold tracking-[0.3em] text-brand-primary uppercase">Quick Links</h4>
            <ul className="space-y-4">
              {['About', 'Brochures', 'Export', 'Utilities', 'FAQ', 'Installation-Guide', 'Contact'].map((link) => (
                <li key={link}>
                  <Link to={`/${link.toLowerCase()}`} className="text-sm hover:text-brand-primary transition-colors font-sans">
                    {link.replace('-', ' ')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className="space-y-6">
            <h4 className="text-[9px] font-bold tracking-[0.3em] text-brand-primary uppercase">Collections</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/products" className="text-sm hover:text-brand-primary transition-colors font-sans">All Products</Link>
              </li>
              <li>
                <Link to="/collections/premium-export" className="text-sm hover:text-brand-primary transition-colors font-sans">Premium Export</Link>
              </li>
              <li>
                <Link to="/collections/designer-series" className="text-sm hover:text-brand-primary transition-colors font-sans">Designer Series</Link>
              </li>
              <li>
                <Link to="/collections/anti-skid-parking" className="text-sm hover:text-brand-primary transition-colors font-sans">Anti-Skid & Parking</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-6">
            <h4 className="text-[9px] font-bold tracking-[0.3em] text-brand-primary uppercase">Contact Info</h4>
            <ul className="space-y-4 text-sm font-sans">
              <li>123 Luxury Avenue</li>
              <li>Ceramic District, NY 10001</li>
              <li>info@companytiles.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
            <div className="flex gap-4 pt-4">
              <a href="#" className="hover:text-brand-primary transition-all duration-300 p-3 bg-black/20 border border-white/10 rounded-full hover:border-brand-primary hover:scale-110 hover:-translate-y-1"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="hover:text-brand-primary transition-all duration-300 p-3 bg-black/20 border border-white/10 rounded-full hover:border-brand-primary hover:scale-110 hover:-translate-y-1"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="hover:text-brand-primary transition-all duration-300 p-3 bg-black/20 border border-white/10 rounded-full hover:border-brand-primary hover:scale-110 hover:-translate-y-1"><MessageCircle className="w-4 h-4" /></a>
              <a href="#" className="hover:text-brand-primary transition-all duration-300 p-3 bg-black/20 border border-white/10 rounded-full hover:border-brand-primary hover:scale-110 hover:-translate-y-1"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase font-bold tracking-widest opacity-60">
          <p>© {new Date().getFullYear()} Aura Surfaces. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
