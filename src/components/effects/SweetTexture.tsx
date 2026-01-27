import { motion } from 'framer-motion';
import { useDonutTheme } from '@/context/ThemeContext';

interface SweetTextureProps {
  className?: string;
}

export default function SweetTexture({ className }: SweetTextureProps) {
  const { currentFlavor } = useDonutTheme();

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Wavy pattern overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 transition-all duration-700"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id={`sweet-pattern-${currentFlavor}`}
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="15" cy="15" r="3" className="fill-donut-primary transition-colors duration-700" />
            <circle cx="45" cy="45" r="2" className="fill-donut-secondary transition-colors duration-700" />
            <circle cx="45" cy="15" r="1.5" className="fill-donut-glow transition-colors duration-700" />
            <circle cx="15" cy="45" r="2.5" className="fill-donut-accent transition-colors duration-700" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#sweet-pattern-${currentFlavor})`} />
      </svg>

      {/* Gradient mesh overlay */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 20%, hsla(var(--donut-glow), 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 80%, hsla(var(--donut-primary), 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 50% 60% at 50% 50%, hsla(var(--donut-secondary), 0.08) 0%, transparent 60%)
          `,
        }}
      />


    </div>
  );
}
