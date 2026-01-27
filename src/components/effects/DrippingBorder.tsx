import { motion } from 'framer-motion';

interface DrippingBorderProps {
    color?: string;
    className?: string;
    position?: 'top' | 'bottom';
}

export default function DrippingBorder({
    color = '#5D4037', // Chocolate brown default
    className = '',
    position = 'top'
}: DrippingBorderProps) {
    return (
        <div
            className={`absolute left-0 w-full z-20 pointer-events-none overflow-hidden ${position === 'top' ? 'top-0 rotate-180' : 'bottom-0'
                } ${className}`}
            style={{ height: 'min(150px, 15vw)' }}
        >
            <svg
                viewBox="0 0 1440 320"
                className="w-full h-full block"
                preserveAspectRatio="none"
            >
                <motion.path
                    fill={color}
                    initial={{ d: "M0,0 L1440,0 L1440,100 C1380,120 1320,80 1260,100 C1200,120 1140,240 1080,220 C1020,200 960,100 900,120 C840,140 780,280 720,260 C660,240 600,100 540,120 C480,140 420,200 360,180 C300,160 240,100 180,120 C120,140 60,180 0,160 Z" }}
                    animate={{
                        d: [
                            "M0,0 L1440,0 L1440,100 C1380,120 1320,80 1260,100 C1200,120 1140,240 1080,220 C1020,200 960,100 900,120 C840,140 780,280 720,260 C660,240 600,100 540,120 C480,140 420,200 360,180 C300,160 240,100 180,120 C120,140 60,180 0,160 Z",
                            "M0,0 L1440,0 L1440,130 C1380,150 1320,110 1260,130 C1200,150 1140,280 1080,260 C1020,240 960,130 900,150 C840,170 780,320 720,300 C660,280 600,130 540,150 C480,170 420,230 360,210 C300,190 240,130 180,150 C120,170 60,210 0,190 Z",
                            "M0,0 L1440,0 L1440,100 C1380,120 1320,80 1260,100 C1200,120 1140,240 1080,220 C1020,200 960,100 900,120 C840,140 780,280 720,260 C660,240 600,100 540,120 C480,140 420,200 360,180 C300,160 240,100 180,120 C120,140 60,180 0,160 Z"
                        ]
                    }}
                    transition={{
                        duration: 8,
                        ease: "easeInOut",
                        repeat: Infinity,
                    }}
                />
                {/* Shiny highlights for liquid chocolate look */}
                <path
                    fill="rgba(255,255,255,0.1)"
                    d="M0,0 L1440,0 L1440,100 C1380,120 1320,80 1260,100 C1200,120 1140,240 1080,220 C1020,200 960,100 900,120 C840,140 780,280 720,260 C660,240 600,100 540,120 C480,140 420,200 360,180 C300,160 240,100 180,120 C120,140 60,180 0,160 Z"
                    transform="translate(0, -5) scale(1, 0.95)"
                />
            </svg>
        </div>
    );
}
