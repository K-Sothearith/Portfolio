import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="about" className="min-h-screen w-full flex flex-col justify-center py-24 z-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyanGlow to-tealGlow">About</span> Me
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyanGlow to-transparent rounded-full" />
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]"
      >
        {/* Card 1: Large Intro */}
        <motion.div variants={itemVariants} className="glass-card md:col-span-2 p-8 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyanGlow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="text-2xl font-bold mb-4 text-white">Who I Am</h3>
          <p className="text-gray-400 text-lg">
            I am a passionate software engineer exploring the depths of interactive web experiences. 
            My focus is on creating immersive, high-performance applications that blend beautiful design 
            with solid architecture.
          </p>
        </motion.div>

        {/* Card 2: Stats/Numbers */}
        <motion.div variants={itemVariants} className="glass-card p-8 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-bl from-tealGlow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyanGlow to-white mb-2">3+</span>
          <span className="text-gray-400 text-center uppercase tracking-widest text-sm">Years of<br/>Experience</span>
        </motion.div>

        {/* Card 3: Philosophy */}
        <motion.div variants={itemVariants} className="glass-card p-8 flex flex-col justify-center relative overflow-hidden group">
          <h3 className="text-xl font-bold mb-3 text-white">My Philosophy</h3>
          <p className="text-gray-400">
            Clean code, scalable architecture, and pixel-perfect design. 
            I believe in building applications that are as robust under the hood as they are visually striking.
          </p>
        </motion.div>

        {/* Card 4: Location/Timezone */}
        <motion.div variants={itemVariants} className="glass-card p-8 flex flex-col justify-center relative overflow-hidden group">
          <h3 className="text-xl font-bold mb-3 text-white">Location</h3>
          <p className="text-gray-400 mb-4">
            Based in the Digital Realm, working with clients globally.
          </p>
          <div className="flex items-center space-x-2 text-cyanGlow text-sm font-medium">
            <div className="w-2 h-2 rounded-full bg-cyanGlow animate-pulse" />
            <span>Available for remote work</span>
          </div>
        </motion.div>

        {/* Card 5: Interests */}
        <motion.div variants={itemVariants} className="glass-card p-8 flex flex-col justify-center relative overflow-hidden group">
          <h3 className="text-xl font-bold mb-3 text-white">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {['Creative Coding', '3D Web', 'Open Source', 'UI/UX'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-ocean border border-cyanGlow/20 rounded-full text-xs text-gray-300">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
