import { X } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';

interface FilterOption {
  label: string;
  value: string;
}

interface ProductFiltersProps {
  categories: FilterOption[];
  sizes: FilterOption[];
  finishes: FilterOption[];
  applications: FilterOption[];
  collections: FilterOption[];
  grades: FilterOption[];
  
  selectedCategories: string[];
  selectedSizes: string[];
  selectedFinishes: string[];
  selectedApplications: string[];
  selectedCollections: string[];
  selectedGrades: string[];
  
  onCategoryChange: (value: string) => void;
  onSizeChange: (value: string) => void;
  onFinishChange: (value: string) => void;
  onApplicationChange: (value: string) => void;
  onCollectionChange: (value: string) => void;
  onGradeChange: (value: string) => void;
  
  onClearFilters: () => void;
  onCloseMobile?: () => void;
  className?: string;
}

export function ProductFilters({
  categories, sizes, finishes, applications, collections, grades,
  selectedCategories, selectedSizes, selectedFinishes, selectedApplications, selectedCollections, selectedGrades,
  onCategoryChange, onSizeChange, onFinishChange, onApplicationChange, onCollectionChange, onGradeChange,
  onClearFilters, onCloseMobile, className = ''
}: ProductFiltersProps) {
  
  const FilterGroup = ({ title, options, selected, onChange }: { title: string, options: FilterOption[], selected: string[], onChange: (v: string) => void }) => (
    <div className="mb-8 border-b border-border/50 pb-6">
      <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-foreground mb-4">{title}</h4>
      <div className="space-y-3">
        {options.map(option => (
          <div key={option.value} className="flex items-center space-x-3">
            <Checkbox 
              id={`${title}-${option.value}`} 
              checked={selected.includes(option.value)}
              onCheckedChange={() => onChange(option.value)}
              className="rounded-none border-border/50 data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
            />
            <label 
              htmlFor={`${title}-${option.value}`}
              className="text-sm font-sans text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`bg-background w-full h-full overflow-y-auto ${className}`}>
      {onCloseMobile && (
        <div className="flex justify-between items-center p-4 border-b border-border/50 md:hidden sticky top-0 bg-background z-10">
          <span className="font-heading text-lg">Filters</span>
          <button onClick={onCloseMobile} className="p-2">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
      
      <div className="p-4 md:p-0">
        <FilterGroup title="Category" options={categories} selected={selectedCategories} onChange={onCategoryChange} />
        <FilterGroup title="Size" options={sizes} selected={selectedSizes} onChange={onSizeChange} />
        <FilterGroup title="Finish" options={finishes} selected={selectedFinishes} onChange={onFinishChange} />
        <FilterGroup title="Application" options={applications} selected={selectedApplications} onChange={onApplicationChange} />
        <FilterGroup title="Collection Series" options={collections} selected={selectedCollections} onChange={onCollectionChange} />
        <FilterGroup title="Quality Grade" options={grades} selected={selectedGrades} onChange={onGradeChange} />
        
        <Button 
          variant="outline" 
          onClick={onClearFilters}
          className="w-full uppercase text-[10px] font-bold tracking-widest rounded-none border-border hover:bg-muted mb-8 md:mb-0"
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );
}
