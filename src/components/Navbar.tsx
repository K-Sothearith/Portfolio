import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Experience', id: 'experience' },
  { name: 'Projects', id: 'projects' },
  { name: 'Contact', id: 'contact' }
];

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const activeIndex = navItems.findIndex(item => item.id === activeSection);
    const activeRef = navRefs.current[activeIndex];
    
    if (activeRef) {
      setIndicatorStyle({
        left: activeRef.offsetLeft,
        width: activeRef.offsetWidth,
      });
    }
  }, [activeSection]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const top = element.offsetTop;
      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <nav className="glass-panel px-2 py-2 flex items-center relative rounded-full">
        {/* Submarine Indicator */}
        <motion.div
          className="absolute h-full top-0 py-2 transition-all duration-300 ease-in-out pointer-events-none"
          initial={false}
          animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="w-full h-full bg-cyanGlow/20 rounded-full border border-cyanGlow/50 shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center justify-center relative">
            <div className="absolute -top-1 w-2 h-1.5 bg-cyanGlow rounded-t-sm shadow-[0_-2px_5px_rgba(0,240,255,0.8)]" /> {/* Submarine periscope */}
            <div className="absolute right-1 w-1 h-1 bg-tealGlow rounded-full animate-pulse" /> {/* Headlight */}
          </div>
        </motion.div>

        {navItems.map((item, i) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            ref={el => { navRefs.current[i] = el; }}
            onClick={(e) => handleNavClick(e, item.id)}
            className={`relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-300 ${
              activeSection === item.id ? 'text-white' : 'text-gray-400 hover:text-cyanGlow'
            }`}
          >
            {item.name}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
