import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, Package, MessageSquare, FileText, Settings, LogOut, BarChart } from 'lucide-react';
import { toast } from 'sonner';

import { AdminLogin } from '../../components/admin/AdminLogin';
import { DashboardHome } from '../../components/admin/DashboardHome';
import { ProductsManager } from '../../components/admin/ProductsManager';
import { InquiryManager } from '../../components/admin/InquiryManager';
import { BrochureManager } from '../../components/admin/BrochureManager';
import { SiteSettings } from '../../components/admin/SiteSettings';

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [adminUser, setAdminUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if we have a valid session
    fetch('/api/admin/me')
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          setIsAuthenticated(true);
          setAdminUser(data);
        } else {
          setIsAuthenticated(false);
          if (location.pathname !== '/admin') {
            navigate('/admin');
          }
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
        if (location.pathname !== '/admin') {
           navigate('/admin');
        }
      });
  }, [location.pathname]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setAdminUser(null);
    navigate('/admin');
    toast.success('Logged out successfully');
  };

  if (isAuthenticated === null) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  const NAV_ITEMS = [
    { name: 'Dashboard', path: '', icon: LayoutDashboard },
    { name: 'Products', path: 'products', icon: Package },
    { name: 'Inquiries', path: 'inquiries', icon: MessageSquare },
    { name: 'Brochures', path: 'brochures', icon: FileText },
    { name: 'Site Settings', path: 'settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-zinc-950 text-zinc-100 font-sans pt-20">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col fixed h-[calc(100vh-80px)] overflow-y-auto">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-xl font-heading text-white">Admin Panel</h2>
          <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest">{adminUser?.role}</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map(item => {
            const isActive = location.pathname === `/admin${item.path ? '/' + item.path : ''}`;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={`/admin${item.path ? '/' + item.path : ''}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-brand-primary text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route path="" element={<DashboardHome adminUser={adminUser} />} />
            <Route path="products" element={<ProductsManager adminRole={adminUser?.role} />} />
            <Route path="inquiries" element={<InquiryManager />} />
            <Route path="brochures" element={<BrochureManager />} />
            <Route path="settings" element={<SiteSettings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
