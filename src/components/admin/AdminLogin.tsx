import React, { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

export function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (res.ok) {
        toast.success('Logged in successfully');
        onLogin();
      } else {
        toast.error(data.error || 'Failed to login');
      }
    } catch (err) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 shadow-2xl p-8 rounded-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-primary/20">
            <Lock className="w-8 h-8 text-brand-primary" />
          </div>
          <h1 className="text-2xl font-heading text-white mb-2">Admin Access</h1>
          <p className="text-zinc-400 text-sm">Sign in to manage the platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-xs uppercase tracking-widest text-zinc-400 font-bold mb-2 block">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-brand-primary transition-colors"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-zinc-400 font-bold mb-2 block">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-brand-primary transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white uppercase text-[10px] tracking-widest font-bold h-12 rounded-lg"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
}
