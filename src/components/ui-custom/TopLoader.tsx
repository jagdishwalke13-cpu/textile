import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export function TopLoader() {
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setProgress(30);
    const timeout1 = setTimeout(() => setProgress(70), 100);
    const timeout2 = setTimeout(() => setProgress(100), 300);
    const timeout3 = setTimeout(() => setProgress(0), 600); // reset after animation

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [location.pathname]);

  if (progress === 0) return null;

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 h-1 bg-brand-primary z-[99999]"
      style={{
        boxShadow: '0 0 10px rgba(var(--brand-primary), 0.5), 0 0 5px rgba(var(--brand-primary), 0.5)',
      }}
    />
  );
}
