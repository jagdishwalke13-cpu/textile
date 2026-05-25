import React from 'react';
import { Home, Package, MessageCircle, Phone } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function MobileNav() {
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Inquiry', path: '/contact?type=inquiry', icon: MessageCircle },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 flex justify-around items-center h-16 px-4 pb-safe">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) => 
            `flex flex-col items-center justify-center w-full h-full space-y-1 ${
              isActive ? 'text-brand-primary' : 'text-muted-foreground hover:text-foreground'
            }`
          }
        >
          <item.icon className="w-5 h-5" />
          <span className="text-[10px] uppercase font-bold tracking-wider">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
}
