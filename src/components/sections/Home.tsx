import React from 'react';
import { motion } from 'framer-motion';
import LaptopScene from '../3d/LaptopScene';

const Home: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="home" className="min-h-screen w-full flex items-center pt-24 pb-12">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Text Content */}
        <div className="flex flex-col space-y-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-cyanGlow font-medium tracking-wider mb-2 text-sm uppercase">Welcome,</h2>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
              I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyanGlow to-tealGlow">Kong Sothearith</span>
            </h1>
            <h3 className="text-2xl md:text-3xl text-gray-300 font-medium mb-6">
              A CS major student, specializing in Software Engineering
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg mb-8 text-justify">
              I am a passionate and dedicated computer science student with a strong interest and currently pursuing a bachelor degree in full-stack development. 
              I'm always eager to expand my knowledge and skills in the field of technology.
            </p>
            
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-cyanGlow/10 border border-cyanGlow text-cyanGlow rounded-full hover:bg-cyanGlow hover:text-abyss hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 font-medium"
              >
                View Work
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-transparent border border-gray-600 text-gray-300 rounded-full hover:border-gray-400 hover:text-white transition-all duration-300 font-medium"
              >
                Contact Me
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right 3D Laptop */}
        <div className="w-full h-[400px] md:h-[600px] relative">
          <LaptopScene />
        </div>
      </div>
    </section>
  );
};

export default Home;
