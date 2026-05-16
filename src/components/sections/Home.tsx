import React from 'react';
import { motion } from 'framer-motion';
import LaptopScene from '../3d/LaptopScene';

const Home: React.FC = () => {
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
            <h2 className="text-cyanGlow font-medium tracking-wider mb-2 text-sm uppercase">Welcome to the Abyss</h2>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyanGlow to-tealGlow">Alex</span>
            </h1>
            <h3 className="text-2xl md:text-3xl text-gray-300 font-medium mb-6">
              Full-Stack Developer
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg mb-8">
              I dive deep into code to create immersive, high-performance web applications. 
              Let's explore the depths of modern web development together.
            </p>
            
            <div className="flex space-x-4">
              <button className="px-8 py-3 bg-cyanGlow/10 border border-cyanGlow text-cyanGlow rounded-full hover:bg-cyanGlow hover:text-abyss hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 font-medium">
                View Work
              </button>
              <button className="px-8 py-3 bg-transparent border border-gray-600 text-gray-300 rounded-full hover:border-gray-400 hover:text-white transition-all duration-300 font-medium">
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
