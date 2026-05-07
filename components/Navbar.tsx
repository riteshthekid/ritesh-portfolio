'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Instagram, Linkedin, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight - 80) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl"
        >
          {/* Capsule Container */}
          <div className="flex items-center justify-between px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)]">

            {/* Logo */}
            <div className="text-xl font-bold text-white tracking-widest">
              R<span className="text-gray-400">itesh</span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
              <a href="#about" className="hover:text-white hover:scale-110 transition-all duration-300">About</a>
              <a href="#project" className="hover:text-white hover:scale-110 transition-all duration-300">Project</a>
              <a href="#services" className="hover:text-white hover:scale-110 transition-all duration-300">Services</a>
              <a href="#contact" className="hover:text-white hover:scale-110 transition-all duration-300">Contact</a>
            </div>

            {/* Socials & Mobile Toggle */}
            <div className="flex items-center gap-4 text-gray-300">
              <div className="hidden sm:flex items-center gap-4 mr-2">
                <a href="https://github.com/riteshthekid" className="hover:text-white hover:scale-125 transition-all duration-300"><Github size={18} /></a>
                <a href="https://www.instagram.com/riteshthekid" className="hover:text-white hover:scale-125 transition-all duration-300"><Instagram size={18} /></a>
                <a href="https://www.linkedin.com/in/riteshpatel02" className="hover:text-white hover:scale-125 transition-all duration-300"><Linkedin size={18} /></a>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-1 hover:text-white hover:scale-110 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-4 p-4 bg-[#111]/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl md:hidden flex flex-col gap-4"
              >
                <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white text-center py-2 transition-colors">Home</a>
                <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white text-center py-2 transition-colors">About</a>
                <a href="#project" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white text-center py-2 transition-colors">Project</a>
                <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white text-center py-2 transition-colors">Services</a>
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white text-center py-2 transition-colors">Contact</a>

                <div className="flex justify-center gap-6 pt-4 border-t border-white/10 sm:hidden">
                  <a href="https://github.com/riteshthekid" className="text-gray-300 hover:text-white hover:scale-125 transition-all duration-300"><Github size={20} /></a>
                  <a href="https://www.linkedin.com/in/riteshpatel02" className="text-gray-300 hover:text-white hover:scale-125 transition-all duration-300"><Linkedin size={20} /></a>
                  <a href="https://www.instagram.com/riteshthekid" className="text-gray-300 hover:text-white hover:scale-125 transition-all duration-300"><Instagram size={20} /></a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
