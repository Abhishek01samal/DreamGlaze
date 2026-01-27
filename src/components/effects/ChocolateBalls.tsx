import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useDonutTheme } from '@/context/ThemeContext';

interface ChocolateBallsProps {
  count?: number;
  className?: string;
}

export default function ChocolateBalls({ count = 30, className }: ChocolateBallsProps) {
  const { currentFlavor } = useDonutTheme();
  
  const balls = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 25 + 8,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 3,
      opacity: 0.3 + Math.random() * 0.4,
    }));
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {balls.map((ball) => (
        <motion.div
          key={`${currentFlavor}-${ball.id}`}
          className="absolute rounded-full bg-donut-primary transition-colors duration-700"
          style={{
            width: ball.size,
            height: ball.size,
            left: `${ball.x}%`,
            top: `${ball.y}%`,
            opacity: ball.opacity,
            boxShadow: `
              inset -2px -2px 4px hsla(var(--foreground), 0.3),
              inset 3px 3px 6px hsla(var(--donut-glow), 0.5),
              0 4px 8px hsla(var(--foreground), 0.1)
            `,
            background: `
              radial-gradient(circle at 30% 30%, 
                hsl(var(--donut-glow)) 0%, 
                hsl(var(--donut-primary)) 40%, 
                hsl(var(--donut-secondary)) 100%
              )
            `,
          }}
          animate={{
            y: [0, -20, 0, 15, 0],
            x: [0, 10, -5, 8, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: ball.duration,
            delay: ball.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
