import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function WhatsAppWidget() {
  const [show, setShow] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('919999999999'); // Default
  const location = useLocation();

  useEffect(() => {
    // Hide on contact page
    if (location.pathname === '/contact' || location.pathname.startsWith('/admin')) {
      setShow(false);
      return;
    }

    // Try to load dynamic settings for number, otherwise use fallback
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.salesPhone) {
           setPhoneNumber(data.salesPhone.replace(/[^0-9]/g, ''));
        }
      })
      .catch(() => {});

    // Show after 10 seconds
    const timer = setTimeout(() => {
      setShow(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!show) return null;

  const message = `Hello! I'm interested in your tile products. I found you at ${window.location.href}.`;
  
  // Checking if mobile directly via UserAgent for direct app link vs web
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const waUrl = isMobile 
    ? `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
    : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  return (
    <AnimatePresence>
      <motion.a
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 20 }}
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-3 transition-all duration-300 ease-in-out font-bold text-sm tracking-wide">
          Chat with us
        </span>
      </motion.a>
    </AnimatePresence>
  );
}
