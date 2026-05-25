import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toaster } from './components/ui/sonner';

// Mobile Bottom Nav
import { MobileNav } from './components/layout/MobileNav';

// WhatsApp Widget
import { WhatsAppWidget } from './components/WhatsAppWidget';

// Lazy load pages for performance
const Home = React.lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Products = React.lazy(() => import('./pages/Products').then(m => ({ default: m.Products })));
const CategoryDetail = React.lazy(() => import('./pages/CategoryDetail').then(m => ({ default: m.CategoryDetail })));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail').then(m => ({ default: m.ProductDetail })));
const AboutUs = React.lazy(() => import('./pages/AboutUs').then(m => ({ default: m.AboutUs })));
const Brochure = React.lazy(() => import('./pages/Brochure').then(m => ({ default: m.Brochure })));
const Export = React.lazy(() => import('./pages/Export').then(m => ({ default: m.Export })));
const Utilities = React.lazy(() => import('./pages/Utilities').then(m => ({ default: m.Utilities })));
const Contact = React.lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Admin = React.lazy(() => import('./pages/admin/Admin').then(m => ({ default: m.Admin })));
const DesignSystemShowcase = React.lazy(() => import('./components/DesignSystemShowcase').then(m => ({ default: m.DesignSystemShowcase })));

const PremiumExport = React.lazy(() => import('./pages/collections/PremiumExport').then(m => ({ default: m.PremiumExport })));
const DesignerSeries = React.lazy(() => import('./pages/collections/DesignerSeries').then(m => ({ default: m.DesignerSeries })));
const AntiSkidParking = React.lazy(() => import('./pages/collections/AntiSkidParking').then(m => ({ default: m.AntiSkidParking })));
const FAQ = React.lazy(() => import('./pages/FAQ').then(m => ({ default: m.FAQ })));
const InstallationGuide = React.lazy(() => import('./pages/InstallationGuide').then(m => ({ default: m.InstallationGuide })));

const PageFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground pb-16 md:pb-0">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <MobileNav />
      <WhatsAppWidget />
      <Toaster />
    </div>
  );
}

// Global Animations
import { CustomCursor } from './components/ui-custom/CustomCursor';
import { PageTransition } from './components/layout/PageTransition';
import { TopLoader } from './components/ui-custom/TopLoader';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<PageTransition><Home /></PageTransition>} />
          <Route path="design" element={<PageTransition><DesignSystemShowcase /></PageTransition>} />
          <Route path="about" element={<PageTransition><AboutUs /></PageTransition>} />
          <Route path="products" element={<PageTransition><Products /></PageTransition>} />
          <Route path="products/:categorySlug" element={<PageTransition><CategoryDetail /></PageTransition>} />
          <Route path="products/:categorySlug/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
          <Route path="collections/premium-export" element={<PageTransition><PremiumExport /></PageTransition>} />
          <Route path="collections/designer-series" element={<PageTransition><DesignerSeries /></PageTransition>} />
          <Route path="collections/anti-skid-parking" element={<PageTransition><AntiSkidParking /></PageTransition>} />
          <Route path="brochure" element={<PageTransition><Brochure /></PageTransition>} />
          <Route path="export" element={<PageTransition><Export /></PageTransition>} />
          <Route path="utilities" element={<PageTransition><Utilities /></PageTransition>} />
          <Route path="contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="faq" element={<PageTransition><FAQ /></PageTransition>} />
          <Route path="installation-guide" element={<PageTransition><InstallationGuide /></PageTransition>} />
          <Route path="admin/*" element={<PageTransition><Admin /></PageTransition>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <Router>
      <TopLoader />
      <CustomCursor />
      <AnimatedRoutes />
    </Router>
  );
}
