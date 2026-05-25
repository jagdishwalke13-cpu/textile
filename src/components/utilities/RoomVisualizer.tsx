import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const ROOMS = [
  { id: 'living', name: 'Living Room', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200' },
  { id: 'bathroom', name: 'Bathroom', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200' },
  { id: 'kitchen', name: 'Kitchen', img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200' },
  { id: 'outdoor', name: 'Outdoor', img: 'https://images.unsplash.com/photo-1605814513146-241517fec658?auto=format&fit=crop&q=80&w=1200' }
];

const TILES = [
  { id: 'marble', name: 'Statuario Marble', texture: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=200' },
  { id: 'concrete', name: 'Grey Concrete', texture: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=200' },
  { id: 'wood', name: 'Oak Wood', texture: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=200' },
  { id: 'slate', name: 'Black Slate', texture: 'https://images.unsplash.com/photo-1584285888806-3f11acff252c?auto=format&fit=crop&q=80&w=200' },
  { id: 'terrazzo', name: 'Terrazzo', texture: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=200' } // reusing suitable image
];

export function RoomVisualizer() {
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0]);
  const [selectedTile, setSelectedTile] = useState(TILES[0]);
  const [applyTo, setApplyTo] = useState<'floor' | 'wall'>('floor');

  const handleSave = () => toast.success('Preview saved as image!');
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };
  const handleInquire = () => toast.success('Redirecting to inquiry form...');

  return (
    <div className="bg-background border border-border/50 shadow-md">
      <div className="p-6 md:p-10 border-b border-border/50 bg-brand-secondary text-white">
        <h2 className="text-2xl md:text-3xl font-heading mb-2">Room Visualizer</h2>
        <p className="text-white/70 font-sans">Preview how different tiles look in various settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border/50">
        
        {/* Left - Room Selection */}
        <div className="p-6 md:p-8 flex flex-col gap-6">
          <h3 className="text-sm uppercase tracking-widest font-bold text-foreground">1. Select Room</h3>
          <div className="grid grid-cols-2 gap-4">
            {ROOMS.map(room => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`relative aspect-square overflow-hidden border-2 transition-all ${
                  selectedRoom.id === room.id ? 'border-brand-primary' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={room.img} alt={room.name} className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-[10px] text-white uppercase tracking-widest font-bold">
                  {room.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Center - Preview */}
        <div className="p-6 md:p-8 flex flex-col items-center bg-muted/20">
          <h3 className="text-sm uppercase tracking-widest font-bold text-foreground mb-6 self-start">Preview</h3>
          
          <div className="w-full aspect-[4/3] bg-muted relative overflow-hidden border border-border/50 shadow-inner group">
            {/* Base Room Image */}
            <img src={selectedRoom.img} alt="Room Preview" className="absolute inset-0 w-full h-full object-cover z-0 grayscale-[30%]" />
            
            {/* Applied Tile Overlay (Simulated via CSS) */}
            <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-80"
                 style={{
                   backgroundImage: `url(${selectedTile.texture})`,
                   backgroundSize: applyTo === 'floor' ? '100px 100px' : '60px 60px',
                   transform: applyTo === 'floor' ? 'perspective(800px) rotateX(60deg) scale(2.5) translateY(20%)' : 'none',
                   transformOrigin: 'bottom center',
                   boxShadow: applyTo === 'floor' ? 'inset 0 100px 100px -50px rgba(0,0,0,0.8)' : 'inset 0 0 100px rgba(0,0,0,0.5)'
                 }}
            />
          </div>

          <div className="flex gap-4 w-full mt-6">
            <Button onClick={handleSave} variant="outline" className="flex-1 rounded-none text-[10px] uppercase tracking-widest font-bold">
              <Download className="w-4 h-4 mr-2" /> Save
            </Button>
            <Button onClick={handleShare} variant="outline" className="flex-1 rounded-none text-[10px] uppercase tracking-widest font-bold">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
          </div>
          <Button onClick={handleInquire} className="w-full mt-4 bg-brand-primary text-white rounded-none text-[10px] uppercase tracking-widest font-bold h-12">
            <MessageSquare className="w-4 h-4 mr-2" /> Inquire About This Tile
          </Button>
        </div>

        {/* Right - Tile Selection */}
        <div className="p-6 md:p-8 flex flex-col gap-6">
          <h3 className="text-sm uppercase tracking-widest font-bold text-foreground">2. Select Tile</h3>
          
          <div className="flex bg-muted p-1 mb-2">
            <button 
              onClick={() => setApplyTo('floor')} 
              className={`flex-1 py-2 text-xs font-bold uppercase transition-colors ${applyTo === 'floor' ? 'bg-background shadow-sm text-brand-primary' : 'text-muted-foreground'}`}
            >
              Floor
            </button>
            <button 
              onClick={() => setApplyTo('wall')} 
              className={`flex-1 py-2 text-xs font-bold uppercase transition-colors ${applyTo === 'wall' ? 'bg-background shadow-sm text-brand-primary' : 'text-muted-foreground'}`}
            >
              Wall
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {TILES.map(tile => (
              <button
                key={tile.id}
                onClick={() => setSelectedTile(tile)}
                className={`flex flex-col items-center gap-2 group`}
              >
                <div className={`w-full aspect-square rounded-full overflow-hidden border-4 transition-all ${
                  selectedTile.id === tile.id ? 'border-brand-primary scale-105 shadow-lg' : 'border-transparent opacity-80 group-hover:opacity-100'
                }`}>
                  <img src={tile.texture} alt={tile.name} className="w-full h-full object-cover" />
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-widest text-center ${selectedTile.id === tile.id ? 'text-brand-primary' : 'text-muted-foreground'}`}>
                  {tile.name}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
