import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Sprinkle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  rotation: number;
  size: number;
}

const SPRINKLE_COLORS = [
  'hsl(340, 85%, 65%)',
  'hsl(200, 90%, 60%)',
  'hsl(45, 95%, 60%)',
  'hsl(280, 80%, 65%)',
  'hsl(160, 70%, 50%)',
  'hsl(20, 85%, 60%)',
];

interface SprinkleParticlesProps {
  count?: number;
  className?: string;
}

export default function SprinkleParticles({ count = 25, className }: SprinkleParticlesProps) {
  const sprinkles = useMemo<Sprinkle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 12,
      color: SPRINKLE_COLORS[Math.floor(Math.random() * SPRINKLE_COLORS.length)],
      rotation: Math.random() * 360,
      size: 4 + Math.random() * 6,
    }));
  }, [count]);

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}>
      {sprinkles.map((sprinkle) => (
        <motion.div
          key={sprinkle.id}
          className="absolute rounded-full"
          style={{
            left: `${sprinkle.left}%`,
            width: sprinkle.size,
            height: sprinkle.size * 2.5,
            backgroundColor: sprinkle.color,
            rotate: sprinkle.rotation,
          }}
          initial={{ top: '-5%', opacity: 0 }}
          animate={{
            top: '105%',
            opacity: [0, 1, 1, 0],
            rotate: sprinkle.rotation + 720,
          }}
          transition={{
            duration: sprinkle.duration,
            delay: sprinkle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
