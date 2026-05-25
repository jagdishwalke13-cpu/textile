import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

export function SiteSettings() {
  const [settings, setSettings] = useState({
    companyName: '',
    contactEmail: '',
    salesPhone: '',
    exportPhone: '',
    address: '',
    instagramUrl: '',
    linkedinUrl: '',
    seoTitle: '',
    seoDescription: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        setSettings(prev => ({ ...prev, ...data }));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        toast.success('Settings saved successfully');
      } else {
        toast.error('Failed to save settings');
      }
    } catch {
      toast.error('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (loading) return <div className="text-zinc-500">Loading settings...</div>;

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl font-heading text-white mb-2">Site Settings</h2>
        <p className="text-zinc-400 text-sm">Manage global configuration for your website.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Company Info */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 pb-4 border-b border-zinc-800">Company Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Company Name</label>
              <input type="text" name="companyName" value={settings.companyName} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-brand-primary text-sm" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Primary Email</label>
              <input type="email" name="contactEmail" value={settings.contactEmail} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-brand-primary text-sm" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Sales Phone</label>
              <input type="text" name="salesPhone" value={settings.salesPhone} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-brand-primary text-sm" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Export Phone</label>
              <input type="text" name="exportPhone" value={settings.exportPhone} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-brand-primary text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Headquarters Address</label>
              <textarea name="address" value={settings.address} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-brand-primary text-sm h-20 resize-none" />
            </div>
          </div>
        </div>

        {/* Social & SEO */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 pb-4 border-b border-zinc-800">Social & SEO</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Instagram URL</label>
              <input type="url" name="instagramUrl" value={settings.instagramUrl} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-brand-primary text-sm" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">LinkedIn URL</label>
              <input type="url" name="linkedinUrl" value={settings.linkedinUrl} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-brand-primary text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Default Meta Title</label>
              <input type="text" name="seoTitle" value={settings.seoTitle} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-brand-primary text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Default Meta Description</label>
              <textarea name="seoDescription" value={settings.seoDescription} onChange={handleChange} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-brand-primary text-sm h-20 resize-none" />
            </div>
          </div>
        </div>

        <Button disabled={saving} type="submit" className="w-full sm:w-auto bg-brand-primary text-white hover:bg-brand-primary/90 h-12 px-8 uppercase text-xs tracking-widest font-bold">
          {saving ? 'Saving...' : <><Save className="w-4 h-4 mr-2" /> Save Settings</>}
        </Button>
      </form>
    </div>
  );
}
