import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
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
  const navRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const sectionElements = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sectionElements.length === 0) return;

    const computeActive = () => {
      const viewportHeight = window.innerHeight || 1;

      let bestId = sectionElements[0]?.id ?? 'home';
      let bestCoverage = -1;

      for (const el of sectionElements) {
        const rect = el.getBoundingClientRect();
        const visiblePx = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        const visible = Math.max(0, visiblePx);
        const coverage = visible / viewportHeight; // "majority on my window"

        if (coverage > bestCoverage) {
          bestCoverage = coverage;
          bestId = el.id;
        }
      }

      // Hysteresis: avoid rapid flipping near boundaries.
      setActiveSection((prev) => {
        if (bestCoverage < 0.35) return prev;
        if (prev === bestId) return prev;
        if (bestCoverage >= 0.5) return bestId;
        return prev;
      });
    };

    const schedule = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        computeActive();
      });
    };

    // Initial + on scroll/resize
    computeActive();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, []);

  const updateIndicator = useCallback(() => {
    const activeIndex = navItems.findIndex(item => item.id === activeSection);
    const activeRef = navRefs.current[activeIndex];
    
    if (activeRef) {
      setIndicatorStyle({
        left: activeRef.offsetLeft,
        width: activeRef.offsetWidth,
      });
    }
  }, [activeSection]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    const el = navRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    const ro = new ResizeObserver(() => updateIndicator());
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateIndicator]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <nav ref={navRef} className="glass-panel px-2 py-2 flex items-center relative rounded-full">
        <motion.div
          className="absolute h-full top-0 py-2 transition-all duration-300 ease-in-out pointer-events-none"
          initial={false}
          animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
          transition={{ type: 'spring', stiffness: 220, damping: 26, mass: 0.9 }}
        >
          <div className="w-full h-full bg-cyanGlow/20 rounded-full border border-cyanGlow/50 shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center justify-center relative">
            <div className="absolute -top-1 w-2 h-1.5 bg-cyanGlow rounded-t-sm shadow-[0_-2px_5px_rgba(0,240,255,0.8)]" />
            <div className="absolute right-1 w-1 h-1 bg-tealGlow rounded-full animate-pulse" />
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
