import React, { useEffect, useState } from 'react';
import { Package, MessageSquare, FileText, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export function DashboardHome({ adminUser }: { adminUser: any }) {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error);
  }, []);

  if (!stats) return <div className="text-zinc-400">Loading dashboard...</div>;

  const cards = [
    { label: 'New Inquiries Today', value: stats.newInquiriesToday, icon: MessageSquare, alert: stats.newInquiriesToday > 0 },
    { label: 'Total Products', value: stats.totalProducts, icon: Package },
    { label: 'Brochure Downloads (Month)', value: stats.brochureDownloadsThisMonth, icon: FileText },
    { label: 'Total Inquiries', value: stats.totalInquiries, icon: Activity }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading text-white mb-2">Welcome back, {adminUser?.name}</h1>
        <p className="text-zinc-400">Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative overflow-hidden">
               {card.alert && (
                 <div className="absolute top-4 right-4 flex items-center">
                   <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                 </div>
               )}
               <Icon className="w-8 h-8 text-brand-primary mb-4" />
               <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
               <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold">{card.label}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Recent Inquiries</h2>
          <Link to="/admin/inquiries" className="text-sm text-brand-primary hover:text-brand-primary/80 uppercase tracking-widest font-bold">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950 text-zinc-400">
              <tr>
                <th className="px-6 py-4 font-medium uppercase tracking-widest text-xs">Date</th>
                <th className="px-6 py-4 font-medium uppercase tracking-widest text-xs">Name</th>
                <th className="px-6 py-4 font-medium uppercase tracking-widest text-xs">Type</th>
                <th className="px-6 py-4 font-medium uppercase tracking-widest text-xs">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {(stats.recentInquiries || []).map((inquiry: any) => (
                <tr key={inquiry.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4 text-zinc-300">{format(new Date(inquiry.createdAt), 'MMM dd, yyyy')}</td>
                  <td className="px-6 py-4 text-white font-medium">{inquiry.name}</td>
                  <td className="px-6 py-4 text-zinc-300">
                    <span className="bg-zinc-800 text-xs px-2 py-1 rounded border border-zinc-700">{inquiry.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full border ${
                      inquiry.status === 'NEW' ? 'text-red-400 border-red-400/20 bg-red-400/10' :
                      inquiry.status === 'IN_PROGRESS' ? 'text-amber-400 border-amber-400/20 bg-amber-400/10' :
                      'text-emerald-400 border-emerald-400/20 bg-emerald-400/10'
                    }`}>
                      {inquiry.status}
                    </span>
                  </td>
                </tr>
              ))}
              {stats.recentInquiries.length === 0 && (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-zinc-500">No recent inquiries</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
