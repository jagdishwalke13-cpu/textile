import React, { useState } from 'react';
import { PageHero } from '../components/ui-custom/PageHero';
import { SEO } from '../components/SEO';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    category: "Product",
    questions: [
      { q: "What sizes are available for porcelain slabs?", a: "We manufacture porcelain slabs in grand formats up to 1200x2400mm and 1600x3200mm to provide a seamless, premium aesthetic. Standard formats like 600x1200mm are also available." },
      { q: "What finishes do you offer?", a: "Our tiles come in various finishes including High Gloss, Polished, Matte, Rustic, Carving, and Anti-Skid (R9-R11)." },
      { q: "What is the thickness of your tiles?", a: "Standard indoor tiles are 9mm thick. Our outdoor and parking tiles range from 12mm to 15mm for high load-bearing capacity." },
      { q: "Are your tiles scratch and stain resistant?", a: "Yes, our porcelain tiles are fired at over 1200°C, making them highly dense, non-porous (water absorption <0.5%), and exceptionally resistant to scratches, stains, and chemicals." }
    ]
  },
  {
    category: "Ordering & Delivery",
    questions: [
      { q: "What is the Minimum Order Quantity (MOQ)?", a: "For standard domestic orders, the MOQ is one pallet. For custom designs or export, the MOQ is typically one 20ft container." },
      { q: "What are your payment terms?", a: "We typically require a 30% advance payment to confirm the order, with the remaining 70% payable against the copy of the Bill of Lading (B/L) or before dispatch for domestic orders." },
      { q: "How long does delivery take?", a: "For in-stock standard items, dispatch happens within 3-5 days. For custom production or large export orders, lead times range from 2 to 4 weeks depending on volume." },
      { q: "Do you provide product samples?", a: "Yes, we provide samples globally. You can request a sample directly from the product detail page. Shipping charges may apply for international courier deliveries." }
    ]
  },
  {
    category: "Export & International",
    questions: [
      { q: "Which countries do you export to?", a: "We export to over 30 countries globally, including the USA, UK, UAE, Saudi Arabia, European Union, Australia, and parts of Africa." },
      { q: "How do you package tiles for export?", a: "Export tiles are securely packed in high-quality corrugated boxes, stacked on heavy-duty fumigated wooden pallets, and wrapped in industrial shrink film to ensure safe transit by sea." },
      { q: "Do your tiles meet CE standards?", a: "Absolutely. Our products are ISO 9001:2015 certified and meet CE marking requirements for the European market." }
    ]
  },
  {
    category: "Installation & Maintenance",
    questions: [
      { q: "What adhesive should I use for large porcelain slabs?", a: "For large format slabs (1200x2400mm and above), we strictly recommend using high-polymer modified tile adhesives (C2TE S1 class or higher) to accommodate slight structural flex." },
      { q: "Do porcelain tiles require sealing?", a: "No, glazed porcelain tiles are non-porous and do not require sealing. Occasional cleaning with warm water and a neutral pH cleaner is sufficient." },
      { q: "What is the recommended grout joint width?", a: "For rectified tiles, we recommend a minimum joint of 2mm to 3mm indoors, and 3mm to 4mm outdoors to allow for thermal expansion." }
    ]
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>("0-0");

  const toggle = (id: string) => {
    if (openIndex === id) {
      setOpenIndex(null);
    } else {
      setOpenIndex(id);
    }
  };

  // Generate FAQ Schema
  const schemaQA = faqs.flatMap(cat => cat.questions).map(q => ({
    "@type": "Question",
    "name": q.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": q.a
    }
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": schemaQA
  };

  return (
    <div className="bg-background min-h-screen">
      <SEO 
        title="Frequently Asked Questions (FAQ) | Aura Surfaces" 
        description="Find answers to common questions about our porcelain tiles, export procedures, installation, and ordering processes."
        schema={faqSchema}
      />
      <PageHero 
        title="Frequently Asked Questions" 
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FAQ" }
        ]}
      />

      <section className="py-16 container mx-auto px-4 md:px-12 max-w-4xl">
        {faqs.map((category, catIdx) => (
          <div key={catIdx} className="mb-12">
            <h2 className="text-2xl font-heading mb-6 pb-2 border-b border-border/50">{category.category}</h2>
            <div className="space-y-4">
              {category.questions.map((item, qIdx) => {
                const id = `${catIdx}-${qIdx}`;
                const isOpen = openIndex === id;
                return (
                  <div key={qIdx} className="border border-border/50 bg-muted/20">
                    <button
                      onClick={() => toggle(id)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/40 transition-colors"
                    >
                      <span className="font-bold text-[#111] pr-8">{item.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-brand-primary flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 pt-0 text-muted-foreground text-sm leading-relaxed border-t border-border/50 mt-2">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
