import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({ title, subtitle, centered = false }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? 'flex flex-col items-center text-center' : ''}`}>
      {subtitle && (
        <div className={`flex items-center space-x-4 mb-6 ${centered ? 'justify-center' : ''}`}>
          {!centered && <div className="w-12 h-[1px] bg-brand-primary"></div>}
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-primary">
            {subtitle}
          </span>
          {centered && <div className="w-12 h-[1px] bg-brand-primary"></div>}
        </div>
      )}
      <h2 className="text-4xl md:text-6xl font-heading text-foreground italic leading-tight">
        {title.split(' ').map((word, i, arr) => 
          i === arr.length - 1 ? <span key={i} className="not-italic font-bold">{word}</span> : <span key={i}>{word} </span>
        )}
      </h2>
    </div>
  );
}
