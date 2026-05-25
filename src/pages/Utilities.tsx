import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, LayoutDashboard } from 'lucide-react';
import { TileCalculator } from '../components/utilities/TileCalculator';
import { RoomVisualizer } from '../components/utilities/RoomVisualizer';
import { SEO } from '../components/SEO';

export function Utilities() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'visualizer'>('calculator');

  return (
    <div className="bg-background min-h-screen pt-20">
      <SEO 
        title="Tile Calculator & 3D Room Visualizer" 
        description="Plan your renovations with precision. Use our premium Tile Quantity Calculator to find exact tile counts and box estimates, or visualize surfaces in our 3D Room Visualizer."
      />
      
      {/* 1. HERO */}
      <section className="py-20 bg-muted border-b border-border/50 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_black_1px,_transparent_1px)] dark:bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:24px_24px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-primary mb-4 block">
              DESIGN & PLANNING TOOLS
            </span>
            <h1 className="text-4xl md:text-5xl font-heading text-foreground mb-6">
              Project Utilities
            </h1>
            <p className="text-muted-foreground font-sans text-lg max-w-2xl mx-auto">
              Plan your spaces with precision. Calculate tile quantities instantly or visualize our surfaces in your rooms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. TABS */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 md:px-12 max-w-6xl">
          
          <div className="flex border-b border-border/50 mb-12">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex-1 flex items-center justify-center gap-3 py-6 uppercase text-sm font-bold tracking-widest transition-colors border-b-2 ${
                activeTab === 'calculator'
                  ? 'border-brand-primary text-brand-primary bg-muted/30'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/10'
              }`}
            >
              <Calculator className="w-5 h-5" /> Tile Calculator
            </button>
            <button
              onClick={() => setActiveTab('visualizer')}
              className={`flex-1 flex items-center justify-center gap-3 py-6 uppercase text-sm font-bold tracking-widest transition-colors border-b-2 ${
                activeTab === 'visualizer'
                  ? 'border-brand-primary text-brand-primary bg-muted/30'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/10'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" /> Room Visualizer
            </button>
          </div>

          <div className="min-h-[600px]">
             <AnimatePresence mode="wait">
                {activeTab === 'calculator' && (
                  <motion.div
                    key="calculator"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TileCalculator />
                  </motion.div>
                )}
                
                {activeTab === 'visualizer' && (
                  <motion.div
                    key="visualizer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <RoomVisualizer />
                  </motion.div>
                )}
             </AnimatePresence>
          </div>

        </div>
      </section>
    </div>
  );
}
