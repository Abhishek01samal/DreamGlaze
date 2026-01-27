import { motion } from 'framer-motion';
import { useDonutTheme } from '@/context/ThemeContext';

interface DrippingIcingProps {
  position: 'top' | 'bottom';
  className?: string;
}

export default function DrippingIcing({ position, className }: DrippingIcingProps) {
  const { currentFlavor } = useDonutTheme();
  
  // Different drip patterns for variety
  const drips = [
    { width: 45, height: 60, left: '5%', delay: 0 },
    { width: 30, height: 90, left: '12%', delay: 0.3 },
    { width: 55, height: 70, left: '22%', delay: 0.1 },
    { width: 35, height: 110, left: '30%', delay: 0.5 },
    { width: 40, height: 55, left: '40%', delay: 0.2 },
    { width: 60, height: 85, left: '48%', delay: 0.4 },
    { width: 32, height: 100, left: '58%', delay: 0.6 },
    { width: 50, height: 65, left: '66%', delay: 0.15 },
    { width: 38, height: 95, left: '75%', delay: 0.35 },
    { width: 48, height: 75, left: '83%', delay: 0.25 },
    { width: 42, height: 80, left: '92%', delay: 0.45 },
  ];

  const isTop = position === 'top';

  return (
    <div 
      className={`absolute left-0 right-0 z-20 pointer-events-none overflow-hidden ${
        isTop ? 'top-0' : 'bottom-0'
      } ${className}`}
      style={{ height: '150px' }}
    >
      {/* Base layer - solid color bar */}
      <div 
        className={`absolute left-0 right-0 h-12 bg-donut-primary transition-colors duration-700 ${
          isTop ? 'top-0' : 'bottom-0'
        }`}
        style={{
          boxShadow: isTop 
            ? '0 4px 20px hsla(var(--donut-primary), 0.5)' 
            : '0 -4px 20px hsla(var(--donut-primary), 0.5)'
        }}
      />
      
      {/* Dripping effect */}
      {drips.map((drip, index) => (
        <motion.div
          key={`${currentFlavor}-${index}`}
          className="absolute bg-donut-primary transition-colors duration-700"
          style={{
            width: drip.width,
            left: drip.left,
            ...(isTop ? { top: 0 } : { bottom: 0 }),
            borderRadius: isTop ? '0 0 50% 50%' : '50% 50% 0 0',
            boxShadow: `0 ${isTop ? '4px' : '-4px'} 15px hsla(var(--donut-primary), 0.4)`,
          }}
          initial={{ height: isTop ? 48 : 48 }}
          animate={{
            height: [48, drip.height + 20, drip.height, drip.height + 10, drip.height],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: drip.delay,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* Secondary color drips for depth */}
      {drips.slice(0, 6).map((drip, index) => (
        <motion.div
          key={`secondary-${currentFlavor}-${index}`}
          className="absolute bg-donut-secondary/70 transition-colors duration-700"
          style={{
            width: drip.width * 0.6,
            left: `calc(${drip.left} + 15px)`,
            ...(isTop ? { top: 0 } : { bottom: 0 }),
            borderRadius: isTop ? '0 0 50% 50%' : '50% 50% 0 0',
          }}
          initial={{ height: 30 }}
          animate={{
            height: [30, drip.height * 0.7 + 15, drip.height * 0.7],
          }}
          transition={{
            duration: 2.5 + Math.random() * 1.5,
            delay: drip.delay + 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* Drop at the end of long drips */}
      {drips.filter(d => d.height > 80).map((drip, index) => (
        <motion.div
          key={`drop-${currentFlavor}-${index}`}
          className="absolute bg-donut-primary transition-colors duration-700 rounded-full"
          style={{
            width: 14,
            height: 18,
            left: `calc(${drip.left} + ${drip.width / 2 - 7}px)`,
            ...(isTop ? { top: drip.height + 40 } : { bottom: drip.height + 40 }),
          }}
          animate={{
            y: isTop ? [0, 30, 60] : [0, -30, -60],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.3],
          }}
          transition={{
            duration: 2,
            delay: drip.delay + 1.5,
            repeat: Infinity,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  );
}
