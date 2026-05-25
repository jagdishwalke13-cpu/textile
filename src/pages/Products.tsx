import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, LayoutGrid, List, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { PageHero } from '../components/ui-custom/PageHero';
import { ProductCard } from '../components/ui-custom/ProductCard';
import { StaggerContainer, StaggerItem } from '../components/ui-custom/Animations';
import { ProductFilters } from '../components/products/ProductFilters';
import { Button } from '../components/ui/button';
import { SEO } from '../components/SEO';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '../components/ui/sheet';
import { toast } from 'sonner';

// Mock filter data
const FILTER_DATA = {
  categories: [
    { label: 'All', value: 'All' },
    { label: 'Porcelain Slab Tiles', value: 'Porcelain Slab Tiles' },
    { label: 'Ceramic Tiles', value: 'Ceramic Tiles' },
    { label: 'Outdoor Tiles', value: 'Outdoor Tiles' },
    { label: 'Special', value: 'Special' },
  ],
  sizes: [
    { label: '300x1200 MM', value: '300x1200' },
    { label: '600x600 MM', value: '600x600' },
    { label: '600x900 MM', value: '600x900' },
    { label: '800x800 MM', value: '800x800' },
    { label: '1200x1200 MM', value: '1200x1200' },
    { label: '1200x1800 MM', value: '1200x1800' },
    { label: '1200x2400 MM', value: '1200x2400' },
    { label: '1600x3200 MM', value: '1600x3200' },
  ],
  finishes: [
    { label: 'Glossy', value: 'Glossy' },
    { label: 'Matte', value: 'Matte' },
    { label: 'Satin', value: 'Satin' },
    { label: 'Rustic', value: 'Rustic' },
    { label: 'Polished', value: 'Polished' },
    { label: 'Anti-Skid', value: 'Anti-Skid' },
    { label: 'Textured', value: 'Textured' },
    { label: 'Honed', value: 'Honed' },
  ],
  applications: [
    { label: 'Floor', value: 'Floor' },
    { label: 'Wall', value: 'Wall' },
    { label: 'Outdoor', value: 'Outdoor' },
    { label: 'Commercial', value: 'Commercial' },
  ],
  collections: [
    { label: 'Premium', value: 'Premium' },
    { label: 'Standard', value: 'Standard' },
    { label: 'Luxury', value: 'Luxury' },
    { label: 'Export Series', value: 'Export Series' },
  ],
  grades: [
    { label: 'Standard', value: 'Standard' },
    { label: 'Premium', value: 'Premium' },
    { label: 'Luxury', value: 'Luxury' },
  ],
};

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // States
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState('newest');

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([]);
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);

  // Initialize filters from URL
  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam) {
      if (catParam === 'all') setSelectedCategories(['All']);
      else {
        const matchingCat = FILTER_DATA.categories.find(c => c.value.toLowerCase().replace(/ /g, '-') === catParam);
        if (matchingCat) setSelectedCategories([matchingCat.value]);
      }
    }
  }, [searchParams]);

  // Fetch data
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (selectedCategories.length && !selectedCategories.includes('All')) {
          query.set('category', selectedCategories.join(','));
        }
        if (selectedSizes.length) query.set('size', selectedSizes.join(','));
        if (selectedFinishes.length) query.set('finish', selectedFinishes.join(','));
        if (selectedApplications.length) query.set('application', selectedApplications.join(','));
        if (selectedGrades.length) query.set('grade', selectedGrades.join(','));
        if (sortOption) query.set('sort', sortOption);
        query.set('page', page.toString());
        query.set('limit', '12');

        const res = await fetch(`/api/products?${query.toString()}`);
        const data = await res.json();
        
        if (page === 1) {
          setProducts(data.data || []);
        } else {
          setProducts(prev => [...prev, ...(data.data || [])]);
        }
        
        setTotalProducts(data.total || 0);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategories, selectedSizes, selectedFinishes, selectedApplications, selectedGrades, sortOption, page]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [selectedCategories, selectedSizes, selectedFinishes, selectedApplications, selectedGrades, sortOption]);

  const toggleFilter = (value: string, current: string[], setter: (val: string[]) => void) => {
    if (value === 'All' && current === selectedCategories) {
      setter(['All']);
      return;
    }
    
    let newSelection;
    if (current.includes(value)) {
      newSelection = current.filter(item => item !== value);
    } else {
      if (current.includes('All')) {
         newSelection = [value];
      } else {
         newSelection = [...current, value];
      }
    }
    setter(newSelection);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedFinishes([]);
    setSelectedApplications([]);
    setSelectedCollections([]);
    setSelectedGrades([]);
    setPage(1);
    toast.success("Filters cleared");
  };

  const getFilterCount = () => {
    let count = selectedCategories.filter(c => c !== 'All').length + 
                selectedSizes.length + 
                selectedFinishes.length + 
                selectedApplications.length + 
                selectedCollections.length + 
                selectedGrades.length;
    return count;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO 
        title="Products & Collections" 
        description="Browse our extensive catalog of porcelain slab tiles, ceramic tiles, and outdoor tiles in various sizes and finishes."
      />
      <PageHero 
        title="Our Collections" 
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products' }
        ]} 
      />

      <div className="container mx-auto px-4 md:px-12 py-12 flex-1">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilters 
              categories={FILTER_DATA.categories}
              sizes={FILTER_DATA.sizes}
              finishes={FILTER_DATA.finishes}
              applications={FILTER_DATA.applications}
              collections={FILTER_DATA.collections}
              grades={FILTER_DATA.grades}
              
              selectedCategories={selectedCategories}
              selectedSizes={selectedSizes}
              selectedFinishes={selectedFinishes}
              selectedApplications={selectedApplications}
              selectedCollections={selectedCollections}
              selectedGrades={selectedGrades}
              
              onCategoryChange={(val) => toggleFilter(val, selectedCategories, setSelectedCategories)}
              onSizeChange={(val) => toggleFilter(val, selectedSizes, setSelectedSizes)}
              onFinishChange={(val) => toggleFilter(val, selectedFinishes, setSelectedFinishes)}
              onApplicationChange={(val) => toggleFilter(val, selectedApplications, setSelectedApplications)}
              onCollectionChange={(val) => toggleFilter(val, selectedCollections, setSelectedCollections)}
              onGradeChange={(val) => toggleFilter(val, selectedGrades, setSelectedGrades)}
              
              onClearFilters={clearFilters}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 sticky top-0 bg-background/95 backdrop-blur-sm z-30 py-4 border-b border-border/50">
              
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
                <span className="text-sm font-sans text-muted-foreground mr-4">
                  Showing <strong className="text-foreground">{totalProducts}</strong> products
                </span>
                
                {/* Mobile Filter Trigger */}
                <Sheet>
                  <SheetTrigger render={
                    <Button variant="outline" className="lg:hidden rounded-none border-border">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filters {getFilterCount() > 0 && `(${getFilterCount()})`}
                    </Button>
                  } />
                  <SheetContent side="bottom" className="h-[90vh] p-0">
                    <div className="h-full flex flex-col">
                      <ProductFilters 
                        className="flex-1 overflow-y-auto"
                        categories={FILTER_DATA.categories}
                        sizes={FILTER_DATA.sizes}
                        finishes={FILTER_DATA.finishes}
                        applications={FILTER_DATA.applications}
                        collections={FILTER_DATA.collections}
                        grades={FILTER_DATA.grades}
                        
                        selectedCategories={selectedCategories}
                        selectedSizes={selectedSizes}
                        selectedFinishes={selectedFinishes}
                        selectedApplications={selectedApplications}
                        selectedCollections={selectedCollections}
                        selectedGrades={selectedGrades}
                        
                        onCategoryChange={(val) => toggleFilter(val, selectedCategories, setSelectedCategories)}
                        onSizeChange={(val) => toggleFilter(val, selectedSizes, setSelectedSizes)}
                        onFinishChange={(val) => toggleFilter(val, selectedFinishes, setSelectedFinishes)}
                        onApplicationChange={(val) => toggleFilter(val, selectedApplications, setSelectedApplications)}
                        onCollectionChange={(val) => toggleFilter(val, selectedCollections, setSelectedCollections)}
                        onGradeChange={(val) => toggleFilter(val, selectedGrades, setSelectedGrades)}
                        
                        onClearFilters={clearFilters}
                      />
                      <div className="p-4 border-t border-border mt-auto">
                        <SheetClose render={
                          <Button className="w-full bg-brand-primary text-white rounded-none uppercase text-[10px] tracking-widest font-bold">
                            Apply Filters
                          </Button>
                        } />
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-full sm:w-[180px] rounded-none border-border font-sans text-xs focus:ring-brand-primary">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="newest" className="font-sans text-xs">Newest Arrivals</SelectItem>
                    <SelectItem value="name_asc" className="font-sans text-xs">Name: A-Z</SelectItem>
                    <SelectItem value="name_desc" className="font-sans text-xs">Name: Z-A</SelectItem>
                    <SelectItem value="size_asc" className="font-sans text-xs">Size: Small to Large</SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden sm:flex border border-border">
                  <button 
                    className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-brand-primary text-white' : 'bg-transparent text-muted-foreground hover:bg-muted'}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button 
                    className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-brand-primary text-white' : 'bg-transparent text-muted-foreground hover:bg-muted'}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid / List */}
            {products.length > 0 ? (
              <StaggerContainer className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" 
                  : "flex flex-col gap-6"
              }>
                {products.map((product) => {
                  const slug = product.category.toLowerCase().replace(/ /g, '-');
                  return (
                  <StaggerItem key={product.id}>
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      category={product.category}
                      dimensions={product.dimensions}
                      finishType={product.finishType}
                      badge={product.badge}
                      imageUrl={product.imageUrl}
                      layout={viewMode}
                      onEnquire={() => { toast.success(`Inquiry started for ${product.name}`); }}
                      onImageClick={() => { window.location.href = `/products/${slug}/${product.id}`; }}
                    />
                  </StaggerItem>
                )})}
              </StaggerContainer>
            ) : (
              !loading && (
                <div className="text-center py-24 border border-dashed border-border/50">
                  <p className="text-muted-foreground font-sans text-lg mb-4">No products match your current filters.</p>
                  <Button variant="outline" onClick={clearFilters} className="rounded-none border-brand-primary text-brand-primary">
                    Clear Filters
                  </Button>
                </div>
              )
            )}

            {loading && (
              <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-6" : "flex flex-col gap-6 mt-6"}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-muted flex flex-col md:flex-row gap-6 p-4">
                    <div className="bg-muted-foreground/10 aspect-square w-full md:w-48" />
                    <div className="pt-2 flex-1 space-y-4">
                      <div className="h-4 bg-muted-foreground/10 rounded w-1/4"></div>
                      <div className="h-6 bg-muted-foreground/10 rounded w-3/4"></div>
                      <div className="h-4 bg-muted-foreground/10 rounded w-1/2"></div>
                      <div className="h-10 bg-muted-foreground/10 rounded w-full mt-4"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination / Load More */}
            {page < totalPages && !loading && (
              <div className="flex justify-center mt-16">
                <Button 
                  onClick={() => setPage(p => p + 1)}
                  className="rounded-none border-brand-primary text-brand-secondary bg-brand-primary/10 hover:bg-brand-primary hover:text-white uppercase tracking-[0.2em] text-[10px] font-bold px-12 h-14 transition-colors"
                >
                  Load More Products
                </Button>
              </div>
            )}
          </main>
          
        </div>
      </div>
    </div>
  );
}
