import { motion } from 'framer-motion';
import { useDonutTheme } from '@/context/ThemeContext';

interface SectionDripDividerProps {
  className?: string;
  flip?: boolean;
}

export default function SectionDripDivider({ className, flip = false }: SectionDripDividerProps) {
  const { currentFlavor } = useDonutTheme();
  
  // Generate wavy drip path
  const dripPath = flip 
    ? "M0,0 L0,20 Q25,35 50,20 T100,20 L100,0 Z"
    : "M0,60 L0,40 Q15,60 30,40 Q45,20 60,40 Q75,55 90,35 Q100,25 100,40 L100,60 Z";

  return (
    <div className={`relative w-full overflow-hidden ${flip ? 'rotate-180' : ''} ${className}`}>
      <svg 
        viewBox="0 0 100 60" 
        preserveAspectRatio="none"
        className="w-full h-16 md:h-24 transition-all duration-700"
      >
        <defs>
          <linearGradient id={`drip-gradient-${currentFlavor}-${flip}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'hsl(var(--donut-primary))' }} />
            <stop offset="50%" style={{ stopColor: 'hsl(var(--donut-glow))' }} />
            <stop offset="100%" style={{ stopColor: 'hsl(var(--donut-secondary))' }} />
          </linearGradient>
        </defs>
        <path 
          d={dripPath}
          fill={`url(#drip-gradient-${currentFlavor}-${flip})`}
          className="transition-all duration-700"
        />
      </svg>
      
      {/* Drip drops */}
      <div className={`absolute inset-x-0 ${flip ? 'bottom-0' : 'top-0'} flex justify-around pointer-events-none`}>
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={`drip-${currentFlavor}-${i}`}
            className="w-3 h-8 rounded-b-full bg-gradient-to-b from-donut-primary to-donut-secondary transition-colors duration-700"
            style={{
              marginTop: flip ? 0 : '-8px',
              marginBottom: flip ? '-8px' : 0,
            }}
            animate={{
              scaleY: [1, 1.4, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2 + i * 0.3,
              delay: i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}
