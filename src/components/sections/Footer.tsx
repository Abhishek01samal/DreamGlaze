import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import { useDonutTheme } from '@/context/ThemeContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { currentFlavor } = useDonutTheme();

  return (
    <footer className="relative py-12 overflow-hidden gradient-background">
      {/* Texture overlay */}
      <div 
        className="absolute inset-0 opacity-10 transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 20% 80%, hsl(var(--donut-glow)) 0%, transparent 40%),
                       radial-gradient(circle at 80% 20%, hsl(var(--donut-primary)) 0%, transparent 40%)`,
        }}
      />
      
      {/* Floating decorative donuts */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-4 left-[10%] text-3xl opacity-30"
          animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🍩
        </motion.div>
        <motion.div
          className="absolute bottom-8 right-[15%] text-2xl opacity-25"
          animate={{ y: [0, 8, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          🍩
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.h3
              key={`footer-title-${currentFlavor}`}
              className="text-2xl font-display font-bold text-gradient mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Sweet Donuts
            </motion.h3>
            <p className="text-muted-foreground text-sm max-w-sm mb-4">
              Crafting colorful happiness, one donut at a time.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2">
              {['Menu', 'About Us', 'Locations', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-3 text-sm">Visit Us</h4>
            <address className="text-muted-foreground text-sm not-italic space-y-1">
              <p>123 Sweet Street</p>
              <p>Donut City, DC 12345</p>
              <p className="mt-3">hello@sweetdonuts.com</p>
            </address>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Sweet Donuts. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
