import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  className?: string;
  onClick?: () => void;
}

export default function ScrollIndicator({ className, onClick }: ScrollIndicatorProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6 }}
    >
      <span className="text-sm font-medium tracking-widest uppercase">Scroll to explore</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </motion.button>
  );
}
