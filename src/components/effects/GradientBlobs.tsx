import { motion } from 'framer-motion';
import { useDonutTheme } from '@/context/ThemeContext';

interface GradientBlobsProps {
  className?: string;
}

export default function GradientBlobs({ className }: GradientBlobsProps) {
  const { currentFlavor } = useDonutTheme();
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Primary blob - larger and more vibrant */}
      <motion.div
        key={`primary-${currentFlavor}`}
        className="absolute w-[700px] h-[700px] rounded-full opacity-40 blur-3xl transition-all duration-1000"
        style={{
          background: 'radial-gradient(circle, hsl(var(--donut-primary)) 0%, hsla(var(--donut-glow), 0.5) 50%, transparent 70%)',
          top: '5%',
          right: '-15%',
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Secondary blob - complementary color */}
      <motion.div
        key={`secondary-${currentFlavor}`}
        className="absolute w-[600px] h-[600px] rounded-full opacity-35 blur-3xl transition-all duration-1000"
        style={{
          background: 'radial-gradient(circle, hsl(var(--donut-secondary)) 0%, hsla(var(--donut-accent), 0.5) 50%, transparent 70%)',
          bottom: '10%',
          left: '-10%',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      
      {/* Accent blob - glow effect */}
      <motion.div
        key={`accent-${currentFlavor}`}
        className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-3xl transition-all duration-1000"
        style={{
          background: 'radial-gradient(circle, hsl(var(--donut-glow)) 0%, hsla(var(--primary), 0.4) 50%, transparent 70%)',
          top: '40%',
          left: '25%',
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.25, 0.95, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      
      {/* Fourth blob for extra depth */}
      <motion.div
        key={`fourth-${currentFlavor}`}
        className="absolute w-[400px] h-[400px] rounded-full opacity-25 blur-3xl transition-all duration-1000"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent)) 0%, hsla(var(--donut-secondary), 0.3) 60%, transparent 80%)',
          top: '60%',
          right: '20%',
        }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 30, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      />
    </div>
  );
}
