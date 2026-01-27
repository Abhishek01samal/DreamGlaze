import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useDonutTheme } from '@/context/ThemeContext';
import { DONUT_THEMES } from '@/types/donut';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { currentFlavor, setFlavor } = useDonutTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'Flavors', 'About', 'Contact'];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-card py-3' : 'py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-2xl font-display font-bold text-gradient"
            whileHover={{ scale: 1.05 }}
          >
            Sweet
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
              >
                {link}
              </motion.a>
            ))}
          </div>

          {/* Theme toggles */}
          <div className="hidden md:flex items-center gap-2">
            {DONUT_THEMES.map((theme) => (
              <motion.button
                key={theme.id}
                onClick={() => setFlavor(theme.id)}
                className={`w-6 h-6 rounded-full transition-all duration-300 ${
                  currentFlavor === theme.id
                    ? 'ring-2 ring-offset-2 ring-primary scale-110'
                    : 'opacity-60 hover:opacity-100'
                }`}
                style={{
                  background: 
                    theme.id === 'pink' ? 'linear-gradient(135deg, #ec4899, #f472b6)' :
                    theme.id === 'blue' ? 'linear-gradient(135deg, #0ea5e9, #38bdf8)' :
                    theme.id === 'yellow' ? 'linear-gradient(135deg, #eab308, #facc15)' :
                    'linear-gradient(135deg, #a855f7, #c084fc)'
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden p-2"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileOpen ? <X /> : <Menu />}
          </motion.button>
        </nav>

        {/* Mobile menu */}
        <motion.div
          className={`md:hidden ${isMobileOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isMobileOpen ? 1 : 0, height: isMobileOpen ? 'auto' : 0 }}
        >
          <div className="py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="block text-lg font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setIsMobileOpen(false)}
              >
                {link}
              </a>
            ))}
            <div className="flex gap-3 pt-4">
              {DONUT_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    setFlavor(theme.id);
                    setIsMobileOpen(false);
                  }}
                  className={`w-8 h-8 rounded-full ${
                    currentFlavor === theme.id ? 'ring-2 ring-primary' : ''
                  }`}
                  style={{
                    background: 
                      theme.id === 'pink' ? 'linear-gradient(135deg, #ec4899, #f472b6)' :
                      theme.id === 'blue' ? 'linear-gradient(135deg, #0ea5e9, #38bdf8)' :
                      theme.id === 'yellow' ? 'linear-gradient(135deg, #eab308, #facc15)' :
                      'linear-gradient(135deg, #a855f7, #c084fc)'
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
