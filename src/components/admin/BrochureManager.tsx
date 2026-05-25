import React, { useState, useEffect } from 'react';
import { Upload, File, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

export function BrochureManager() {
  const [brochures, setBrochures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBrochures = () => {
    fetch('/api/brochures') // we might want an admin endpoint, but this is fine
      .then(res => res.json())
      .then(data => setBrochures(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBrochures();
  }, []);

  const toggleStatus = async (brochure: any) => {
    try {
      const res = await fetch(`/api/admin/brochures/${brochure.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !brochure.isActive })
      });
      if (res.ok) {
        toast.success('Brochure status updated');
        fetchBrochures();
      } else {
        toast.error('Failed to update status');
      }
    } catch {
      toast.error('An error occurred');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
        <div>
          <h2 className="text-2xl font-heading text-white">Brochure Manager</h2>
          <p className="text-zinc-400 text-sm">Upload catalogs and track downloads.</p>
        </div>
        <Button className="bg-brand-primary text-white hover:bg-brand-primary/90 h-10 px-4 text-xs tracking-widest uppercase font-bold rounded-lg border-0 shadow-none">
          <Upload className="w-4 h-4 mr-2" /> Upload New PDF
        </Button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
             <div className="p-8 text-center text-zinc-500">Loading...</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-950 text-zinc-400">
                <tr>
                  <th className="px-6 py-4 font-medium uppercase tracking-widest text-xs">Brochure</th>
                  <th className="px-6 py-4 font-medium uppercase tracking-widest text-xs text-center">Downloads</th>
                  <th className="px-6 py-4 font-medium uppercase tracking-widest text-xs text-center">Status</th>
                  <th className="px-6 py-4 font-medium uppercase tracking-widest text-xs text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {brochures.map(brochure => (
                  <tr key={brochure.id} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-zinc-800 rounded flex items-center justify-center text-brand-primary">
                          <File className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-white">{brochure.title}</p>
                          <a href={brochure.fileUrl} target="_blank" rel="noreferrer" className="text-xs text-brand-primary hover:underline">View PDF</a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-white text-lg">{brochure.downloadCount}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                       <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full border ${
                        brochure.isActive ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10' : 'text-zinc-500 border-zinc-700 bg-zinc-800'
                       }`}>
                         {brochure.isActive ? 'Active' : 'Hidden'}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button onClick={() => toggleStatus(brochure)} className="p-2 text-zinc-400 hover:text-white bg-zinc-800 rounded transition-colors" title={brochure.isActive ? 'Hide' : 'Show'}>
                         {brochure.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                       </button>
                    </td>
                  </tr>
                ))}
                {brochures.length === 0 && (
                   <tr><td colSpan={4} className="px-6 py-8 text-center text-zinc-500">No brochures uploaded.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
