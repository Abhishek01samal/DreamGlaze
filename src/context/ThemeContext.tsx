import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { DonutFlavor, DONUT_THEMES } from '@/types/donut';

interface ThemeContextType {
  currentFlavor: DonutFlavor;
  previousFlavor: DonutFlavor | null;
  setFlavor: (flavor: DonutFlavor) => void;
  isTransitioning: boolean;
  rotationDirection: 'forward' | 'reverse';
  isAutoCycling: boolean;
  setAutoCycling: (enabled: boolean) => void;
  cycleToNext: () => void;
  cycleToPrevious: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const FLAVOR_ORDER: DonutFlavor[] = ['pink', 'blue', 'yellow', 'purple'];
const AUTO_CYCLE_INTERVAL = 6000; // 6 seconds for smoother transitions

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentFlavor, setCurrentFlavor] = useState<DonutFlavor>('pink');
  const [previousFlavor, setPreviousFlavor] = useState<DonutFlavor | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [rotationDirection, setRotationDirection] = useState<'forward' | 'reverse'>('forward');
  const [isAutoCycling, setIsAutoCycling] = useState(false);
  const autoCycleRef = useRef<NodeJS.Timeout | null>(null);

  const setFlavor = useCallback((flavor: DonutFlavor) => {
    if (flavor === currentFlavor) return;

    const currentIndex = FLAVOR_ORDER.indexOf(currentFlavor);
    const newIndex = FLAVOR_ORDER.indexOf(flavor);

    // Determine rotation direction based on flavor order
    const direction = newIndex > currentIndex || (currentIndex === 3 && newIndex === 0)
      ? 'forward'
      : 'reverse';

    setRotationDirection(direction);
    setPreviousFlavor(currentFlavor);
    setIsTransitioning(true);
    setCurrentFlavor(flavor);

    // Reset transition state after animation
    setTimeout(() => {
      setIsTransitioning(false);
      setPreviousFlavor(null);
    }, 1200);
  }, [currentFlavor]);

  const cycleToNext = useCallback(() => {
    const currentIndex = FLAVOR_ORDER.indexOf(currentFlavor);
    const nextIndex = (currentIndex + 1) % FLAVOR_ORDER.length;
    setFlavor(FLAVOR_ORDER[nextIndex]);
  }, [currentFlavor, setFlavor]);

  const cycleToPrevious = useCallback(() => {
    const currentIndex = FLAVOR_ORDER.indexOf(currentFlavor);
    const prevIndex = (currentIndex - 1 + FLAVOR_ORDER.length) % FLAVOR_ORDER.length;
    setFlavor(FLAVOR_ORDER[prevIndex]);
  }, [currentFlavor, setFlavor]);

  // Auto-cycling effect
  useEffect(() => {
    if (isAutoCycling) {
      autoCycleRef.current = setInterval(() => {
        cycleToNext();
      }, AUTO_CYCLE_INTERVAL);
    }

    return () => {
      if (autoCycleRef.current) {
        clearInterval(autoCycleRef.current);
      }
    };
  }, [isAutoCycling, cycleToNext]);

  // Pause auto-cycling on user interaction
  const setAutoCycling = useCallback((enabled: boolean) => {
    setIsAutoCycling(enabled);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentFlavor);
  }, [currentFlavor]);

  return (
    <ThemeContext.Provider value={{
      currentFlavor,
      previousFlavor,
      setFlavor,
      isTransitioning,
      rotationDirection,
      isAutoCycling,
      setAutoCycling,
      cycleToNext,
      cycleToPrevious
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useDonutTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useDonutTheme must be used within a ThemeProvider');
  }
  return context;
}

export { FLAVOR_ORDER };
