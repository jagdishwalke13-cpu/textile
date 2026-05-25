import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Mail, ShoppingCart, Info, ArrowRight, Calculator } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const TILE_SPECS = [
  { size: '300×300', mmArea: 90000, pcsPerBox: 10 },
  { size: '300×600', mmArea: 180000, pcsPerBox: 6 },
  { size: '600×600', mmArea: 360000, pcsPerBox: 4 },
  { size: '600×900', mmArea: 540000, pcsPerBox: 3 },
  { size: '600×1200', mmArea: 720000, pcsPerBox: 2 },
  { size: '1200×1200', mmArea: 1440000, pcsPerBox: 2 },
  { size: '1200×1800', mmArea: 2160000, pcsPerBox: 2 },
  { size: '1600×3200', mmArea: 5120000, pcsPerBox: 1 }
];

export function TileCalculator() {
  const [unit, setUnit] = useState<'ft' | 'm'>('ft');
  const [length, setLength] = useState<string>('12');
  const [width, setWidth] = useState<string>('10');
  const [selectedSize, setSelectedSize] = useState<string>('600×1200');
  const [wastage, setWastage] = useState<number>(10);

  const parsedLength = parseFloat(length) || 0;
  const parsedWidth = parseFloat(width) || 0;

  const results = useMemo(() => {
    if (!parsedLength || !parsedWidth) return null;

    let areaSqMeters = 0;
    let areaSqFt = 0;

    if (unit === 'ft') {
      areaSqFt = parsedLength * parsedWidth;
      areaSqMeters = areaSqFt / 10.7639;
    } else {
      areaSqMeters = parsedLength * parsedWidth;
      areaSqFt = areaSqMeters * 10.7639;
    }

    const netAreaFt = areaSqFt;
    const grossAreaFt = netAreaFt * (1 + wastage / 100);
    const grossAreaMeters = areaSqMeters * (1 + wastage / 100);

    const tileSpec = TILE_SPECS.find(t => t.size === selectedSize);
    if (!tileSpec) return null;

    const tileAreaMeters = tileSpec.mmArea / 1000000;
    const totalTilesExact = grossAreaMeters / tileAreaMeters;
    const tilesRequired = Math.ceil(totalTilesExact);
    const boxesRequired = Math.ceil(tilesRequired / tileSpec.pcsPerBox);

    return {
      netAreaFt: netAreaFt.toFixed(2),
      netAreaMeters: areaSqMeters.toFixed(2),
      grossAreaFt: grossAreaFt.toFixed(2),
      tilesRequired,
      boxesRequired,
      pcsPerBox: tileSpec.pcsPerBox
    };
  }, [parsedLength, parsedWidth, unit, selectedSize, wastage]);

  const handleSave = () => {
    toast.success('Calculation saved successfully!');
  };

  const handleEmail = () => {
    toast.success('Results have been emailed to you.');
  };

  const handleEnquire = () => {
    toast.success('Redirecting to inquiry form...');
  };

  return (
    <div className="bg-background border border-border/50 shadow-md">
      <div className="p-6 md:p-10 border-b border-border/50 bg-brand-accent/5">
        <h2 className="text-2xl md:text-3xl font-heading text-foreground mb-2">Tile Quantity Calculator</h2>
        <p className="text-muted-foreground font-sans">Precisely calculate how many tiles and boxes you need for your project.</p>
      </div>

      <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-12 font-sans">
        {/* Left Col - Inputs */}
        <div className="space-y-10">
          
          {/* Step 1 */}
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-widest font-bold text-foreground">1. Enter Room Dimensions</h3>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-muted-foreground">Unit:</span>
              <div className="flex bg-muted p-1">
                <button 
                  onClick={() => setUnit('ft')} 
                  className={`px-4 py-1 text-xs font-bold uppercase ${unit === 'ft' ? 'bg-background shadow-sm text-brand-primary' : 'text-muted-foreground'}`}
                >
                  Feet (ft)
                </button>
                <button 
                  onClick={() => setUnit('m')} 
                  className={`px-4 py-1 text-xs font-bold uppercase ${unit === 'm' ? 'bg-background shadow-sm text-brand-primary' : 'text-muted-foreground'}`}
                >
                  Meters (m)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 block">Length</label>
                <input 
                  type="number" 
                  min="0"
                  value={length} 
                  onChange={e => setLength(e.target.value)} 
                  placeholder="0.0"
                  className="w-full bg-muted/50 border border-border/50 px-4 py-3 rounded-none focus:outline-none focus:border-brand-primary" 
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2 block">Width</label>
                <input 
                  type="number" 
                  min="0"
                  value={width} 
                  onChange={e => setWidth(e.target.value)} 
                  placeholder="0.0"
                  className="w-full bg-muted/50 border border-border/50 px-4 py-3 rounded-none focus:outline-none focus:border-brand-primary" 
                />
              </div>
            </div>
            {results && (
               <div className="text-sm font-medium text-brand-primary mt-2">
                 Your room is: {results.netAreaFt} sq ft ({results.netAreaMeters} sq m)
               </div>
            )}
          </div>

          {/* Step 2 */}
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-widest font-bold text-foreground">2. Select Tile Size (MM)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {TILE_SPECS.map(spec => (
                <button
                  key={spec.size}
                  onClick={() => setSelectedSize(spec.size)}
                  className={`py-3 px-2 text-[10px] font-bold uppercase tracking-widest border transition-colors ${
                    selectedSize === spec.size
                      ? 'bg-brand-secondary text-white border-brand-secondary'
                      : 'bg-transparent text-foreground border-border hover:border-brand-primary'
                  }`}
                >
                  {spec.size}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm uppercase tracking-widest font-bold text-foreground">3. Wastage Factor: {wastage}%</h3>
              <div className="group relative cursor-pointer text-muted-foreground hover:text-brand-primary">
                <Info className="w-4 h-4" />
                <div className="absolute bottom-full right-0 mb-2 w-48 bg-black text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  We recommend 10-15% extra for cuts & breakage during installation.
                </div>
              </div>
            </div>
            <input 
              type="range" 
              min="5" 
              max="20" 
              step="1" 
              value={wastage} 
              onChange={e => setWastage(parseInt(e.target.value))} 
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5% (Minimal)</span>
              <span>10% (Standard)</span>
              <span>20% (Complex)</span>
            </div>
          </div>

        </div>

        {/* Right Col - Results */}
        <div>
          <AnimatePresence>
            {results ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-brand-secondary text-white p-8 md:p-10 sticky top-24"
              >
                <h3 className="font-heading text-2xl mb-8">Calculation Results</h3>
                
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between items-end border-b border-white/20 pb-4">
                    <span className="text-sm text-white/70 uppercase tracking-widest">Net Area</span>
                    <span className="text-2xl font-bold">{results.netAreaFt} <span className="text-sm font-normal">sq ft</span></span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/20 pb-4">
                    <span className="text-sm text-white/70 uppercase tracking-widest">With Wastage ({wastage}%)</span>
                    <span className="text-2xl font-bold">{results.grossAreaFt} <span className="text-sm font-normal">sq ft</span></span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/20 pb-4">
                    <span className="text-sm text-brand-primary uppercase tracking-widest font-bold">Tiles Required</span>
                    <span className="text-3xl font-bold text-brand-primary">{results.tilesRequired} <span className="text-sm font-normal">pieces</span></span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/20 pb-4">
                    <span className="text-sm text-white/70 uppercase tracking-widest">Boxes Required</span>
                    <div className="text-right">
                       <span className="text-2xl font-bold">{results.boxesRequired} <span className="text-sm font-normal">boxes</span></span>
                       <div className="text-xs text-white/50">({results.pcsPerBox} pcs/box)</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <Button onClick={handleEnquire} className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white rounded-none uppercase text-[10px] tracking-widest font-bold h-12">
                    <ShoppingCart className="w-4 h-4 mr-2" /> Enquire for This Quantity
                  </Button>
                  <div className="grid grid-cols-2 gap-4">
                    <Button onClick={handleSave} variant="outline" className="border-white/20 hover:bg-white/10 text-white rounded-none uppercase text-[10px] tracking-widest font-bold h-12">
                      <Save className="w-4 h-4 mr-2" /> Save
                    </Button>
                    <Button onClick={handleEmail} variant="outline" className="border-white/20 hover:bg-white/10 text-white rounded-none uppercase text-[10px] tracking-widest font-bold h-12">
                      <Mail className="w-4 h-4 mr-2" /> Email
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-muted border border-border/50 p-10 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                <Calculator className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
                <h3 className="font-heading text-xl text-foreground mb-2">Awaiting Dimensions</h3>
                <p className="text-muted-foreground text-sm max-w-xs">Enter your room length and width to instantly calculate your tile requirements.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
