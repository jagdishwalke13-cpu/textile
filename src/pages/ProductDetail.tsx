import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, ArrowRight, Expand, Phone, Download, LayoutDashboard } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ProductCard } from '../components/ui-custom/ProductCard';
import { InquiryModal } from '../components/products/InquiryModal';
import { SEO } from '../components/SEO';

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [activeImage, setActiveImage] = useState(0);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [isSampleMode, setIsSampleMode] = useState(false);
  const [activeTab, setActiveTab] = useState('Description');

  const openModal = (isSample: boolean) => {
    setIsSampleMode(isSample);
    setShowInquiryModal(true);
  };
  
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFinish, setSelectedFinish] = useState("");

  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          
          if (data.availableSizes && data.availableSizes.length > 0) {
            setSelectedSize(data.availableSizes[0]);
          }
          if (data.availableFinishes && data.availableFinishes.length > 0) {
            setSelectedFinish(data.availableFinishes[0]);
          }

          // Fetch related
          const relatedRes = await fetch(`/api/products?category=${data.category}&limit=4`);
          if (relatedRes.ok) {
            const relatedData = await relatedRes.json();
            setRelatedProducts(relatedData.data.filter((p: any) => p.id !== data.id).slice(0, 4));
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center pt-20 text-center">
        <h1 className="text-3xl font-heading mb-4 text-foreground">Product Not Found</h1>
        <Button render={<Link to="/products" />} className="bg-brand-primary text-white rounded-none uppercase text-[10px] tracking-widest font-bold px-8 h-12">
          Back to Products
        </Button>
      </div>
    );
  }

  const categorySlug = product.category.toLowerCase().replace(/ /g, '-');

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.gallery[0],
    "description": product.description,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Aura Surfaces"
    },
    "category": product.category
  };

  return (
    <div className="bg-background min-h-screen pt-20 pb-24 md:pb-0 relative">
      <SEO 
        title={product.name} 
        description={`Explore the ${product.name} from our ${product.category}. ${product.description.substring(0, 50)}...`}
        image={product.gallery[0]}
        schema={productSchema}
      />
      <InquiryModal 
        isOpen={showInquiryModal} 
        onClose={() => setShowInquiryModal(false)} 
        productName={product.name} 
        isSampleRequest={isSampleMode}
      />

      <div className="container mx-auto px-4 md:px-12 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-8">
          <Link to="/" className="hover:text-brand-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/products" className="hover:text-brand-primary transition-colors">Products</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/products/${categorySlug}`} className="hover:text-brand-primary transition-colors">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* LEFT COLUMN - GALLERY */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="relative aspect-square bg-muted mb-4 group overflow-hidden border border-border/50">
              <img 
                src={product.gallery[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <button 
                className="absolute top-4 right-4 p-3 bg-white/90 text-brand-secondary rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-primary hover:text-white"
                aria-label="View Fullscreen"
              >
                <Expand className="w-5 h-5" />
              </button>
              
              <div className="absolute inset-y-0 left-0 flex items-center">
                 <button 
                   onClick={() => setActiveImage(prev => prev === 0 ? product.gallery.length - 1 : prev - 1)}
                   className="p-2 ml-4 bg-white/90 text-brand-secondary hover:bg-brand-primary hover:text-white rounded-full transition-colors shadow-md opacity-0 group-hover:opacity-100"
                 >
                   <ArrowLeft className="w-4 h-4" />
                 </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                 <button 
                   onClick={() => setActiveImage(prev => prev === product.gallery.length - 1 ? 0 : prev + 1)}
                   className="p-2 mr-4 bg-white/90 text-brand-secondary hover:bg-brand-primary hover:text-white rounded-full transition-colors shadow-md opacity-0 group-hover:opacity-100"
                 >
                   <ArrowRight className="w-4 h-4" />
                 </button>
              </div>
              
              {product.badge && (
                <div className="absolute top-4 left-4 bg-brand-primary text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-md z-10">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {product.gallery.map((img: string, i: number) => (
                <button
                  key={i}
                  className={`aspect-square relative overflow-hidden border transition-all duration-300 group ${
                    activeImage === i 
                      ? 'border-brand-primary ring-1 ring-brand-primary brightness-100' 
                      : 'border-border/50 opacity-70 hover:opacity-100 hover:brightness-110'
                  }`}
                  onClick={() => setActiveImage(i)}
                >
                  <img 
                    src={img} 
                    alt={`Thumbnail ${i}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </button>
              ))}
            </div>

            <Button variant="outline" className="w-full rounded-none border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white uppercase tracking-[0.2em] text-[10px] font-bold h-14 transition-colors group">
              <LayoutDashboard className="w-4 h-4 mr-2 group-hover:animate-pulse" />
              View in Room Visualizer
            </Button>
          </div>

          {/* RIGHT COLUMN - INFO */}
          <div className="lg:w-1/2 flex flex-col max-w-2xl">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-primary bg-brand-accent/20 px-3 py-1 w-fit mb-4">
              {product.category}
            </span>
            
            <h1 className="text-4xl md:text-5xl font-heading text-foreground mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-brand-primary text-sm gap-1">
                {'★★★★★'.split('').map((star, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? 'text-brand-primary' : 'text-muted'}>{star}</span>
                ))}
                <span className="ml-2 font-bold font-sans">{product.rating}</span>
              </div>
              <span className="text-muted-foreground text-sm font-sans underline decoration-border underline-offset-4">
                ({product.reviewsCount} Projects)
              </span>
            </div>
            
            <p className="text-muted-foreground font-sans text-lg mb-8 leading-relaxed">
              {product.description}
            </p>
            
            <hr className="border-border/50 mb-8" />
            
            {/* Options */}
            <div className="space-y-8 mb-10">
              {/* Finishes */}
              {product.availableFinishes && (
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-foreground mb-4 flex items-center justify-between">
                    <span>Available Finishes</span>
                    <span className="text-brand-primary">{selectedFinish}</span>
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.availableFinishes.map((finish: string) => (
                      <button
                        key={finish}
                        onClick={() => setSelectedFinish(finish)}
                        className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest border transition-colors ${
                          selectedFinish === finish
                            ? 'bg-brand-secondary text-white border-brand-secondary'
                            : 'bg-transparent text-foreground border-border hover:border-brand-primary'
                        }`}
                      >
                        {finish}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.availableSizes && (
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-foreground mb-4 flex items-center justify-between">
                    <span>Available Sizes</span>
                    <span className="text-brand-primary">{selectedSize} MM</span>
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.availableSizes.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest border transition-colors ${
                          selectedSize === size
                            ? 'bg-brand-secondary text-white border-brand-secondary'
                            : 'bg-transparent text-foreground border-border hover:border-brand-primary'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button 
                onClick={() => openModal(false)}
                className="flex-1 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-none h-14 uppercase tracking-widest text-[10px] font-bold"
              >
                Request Inquiry <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                onClick={() => openModal(true)}
                variant="outline" 
                className="flex-1 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white rounded-none h-14 uppercase tracking-widest text-[10px] font-bold transition-colors"
              >
                Request Sample
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-border/50">
               <div className="flex items-center gap-2 text-xs font-sans text-muted-foreground font-medium">
                 <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-brand-secondary">✓</span>
                 ISO Certified
               </div>
               <div className="flex items-center gap-2 text-xs font-sans text-muted-foreground font-medium">
                 <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-brand-secondary">✓</span>
                 Export Quality
               </div>
               <div className="flex items-center gap-2 text-xs font-sans text-muted-foreground font-medium">
                 <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-brand-secondary">✓</span>
                 Free Sample Available
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* BELOW FOLD: TABS */}
      <section className="bg-muted/30 py-16 border-y border-border/50 mt-12">
        <div className="container mx-auto px-4 md:px-12 max-w-5xl">
          <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-12 border-b border-border/50 pb-px">
            {['Description', 'Technical Specs', 'Installation Guide', 'Downloads'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-8 py-4 text-[10px] uppercase font-bold tracking-[0.2em] transition-colors border-b-2 ${
                  activeTab === tab 
                    ? 'border-brand-primary text-brand-primary bg-background shadow-sm' 
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-background p-8 md:p-12 shadow-sm border border-border/50 min-h-[300px]">
             {activeTab === 'Description' && (
               <div className="prose prose-sm md:prose-base max-w-none prose-p:font-sans prose-headings:font-heading prose-a:text-brand-primary">
                 <h3 className="text-2xl mb-4">About {product.name}</h3>
                 <p className="leading-relaxed mb-6">{product.description}</p>
                 <p className="leading-relaxed mb-6">Designed with meticulous attention to detail, this product offers an unparalleled aesthetic that elevates any space. Its robust vitrified body ensures longevity, while the surface finish provides both visual appeal and ease of maintenance.</p>
               </div>
             )}
             
             {activeTab === 'Technical Specs' && (
               <div>
                  <h3 className="font-heading text-2xl text-foreground mb-6">Specifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
                     {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="border-b border-border/50 pb-4">
                           <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-2">{key}</div>
                           <div className="font-sans text-foreground font-medium">{String(value)}</div>
                        </div>
                     ))}
                  </div>
               </div>
             )}

             {activeTab === 'Installation Guide' && (
               <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground font-sans">
                 <h3 className="text-2xl font-heading text-foreground mb-4">Installation Recommendations</h3>
                 <p className="mb-4">For best results, we recommend installation by certified professionals. Follow these general guidelines:</p>
                 <ul className="list-disc pl-5 space-y-2 mb-6">
                   <li>Ensure the subfloor is perfectly leveled, clean, and dry before application.</li>
                   <li>Use high-quality, flexible adhesives suitable for porcelain.</li>
                   <li>Maintain a minimum joint space of 2-3mm, depending on the format.</li>
                   <li>Use leveling systems to avoid lippage, especially for large formats.</li>
                 </ul>
                 <p>For detailed outdoor or wall cladding installations, please refer to our comprehensive manuals.</p>
               </div>
             )}

             {activeTab === 'Downloads' && (
               <div className="flex flex-col gap-4 max-w-md">
                 <a href="#" className="flex items-center justify-between p-4 border border-border/50 hover:border-brand-primary hover:bg-brand-primary/5 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="bg-brand-secondary/10 p-2 text-brand-secondary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                        <Download className="w-4 h-4" />
                      </div>
                      <span className="font-sans font-medium text-foreground">Product Data Sheet (PDF)</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">1.2 MB</span>
                 </a>
                 <a href="#" className="flex items-center justify-between p-4 border border-border/50 hover:border-brand-primary hover:bg-brand-primary/5 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="bg-brand-secondary/10 p-2 text-brand-secondary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                        <Download className="w-4 h-4" />
                      </div>
                      <span className="font-sans font-medium text-foreground">High-Res Textures (ZIP)</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">15 MB</span>
                 </a>
               </div>
             )}
          </div>
        </div>
      </section>

      {/* YOU MAY ALSO LIKE */}
      {relatedProducts.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-12">
            <div className="flex justify-between items-end mb-12">
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-[1px] bg-brand-primary" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary">Similar Styles</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-heading text-foreground">
                  You May Also Like
                </h2>
              </div>
              <Button render={<Link to={`/products?category=${categorySlug}`} />} variant="outline" className="hidden sm:flex border-border rounded-none text-[10px] uppercase tracking-widest font-bold">
                View All {product.category}
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {relatedProducts.map(p => {
                 const slug = p.category.toLowerCase().replace(/ /g, '-');
                 return (
                 <ProductCard
                   key={p.id}
                   {...p}
                   layout="grid"
                   onEnquire={() => {}}
                   onImageClick={() => { window.location.href = `/products/${slug}/${p.id}`; }}
                 />
               )})}
            </div>
          </div>
        </section>
      )}

      {/* Sticky Mobile Inquiry Button */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 p-4 bg-background border-t border-border z-40 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.05)] flex gap-2">
        <Button 
          onClick={() => openModal(false)}
          className="flex-1 bg-brand-primary text-white h-12 uppercase text-[10px] tracking-[0.2em] font-bold"
        >
          Inquiry
        </Button>
        <Button 
          onClick={() => openModal(true)}
          variant="outline"
          className="flex-1 border-brand-primary text-brand-primary h-12 uppercase text-[10px] tracking-[0.2em] font-bold"
        >
          Sample
        </Button>
      </div>
    </div>
  );
}
