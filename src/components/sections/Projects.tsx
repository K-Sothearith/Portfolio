import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Abyssal Analytics',
    category: 'Web Application',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    description: 'A deep-dive analytics dashboard with real-time data processing and dark mode visualization.',
    tags: ['React', 'TypeScript', 'D3.js']
  },
  {
    id: 2,
    title: 'Echo E-Commerce',
    category: 'Full Stack',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    description: 'Modern storefront built for high performance with headless CMS integration.',
    tags: ['Next.js', 'Stripe', 'Tailwind']
  },
  {
    id: 3,
    title: 'Lumina 3D Editor',
    category: 'Web Tool',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop',
    description: 'Browser-based 3D scene editor using WebGL and advanced shader techniques.',
    tags: ['Three.js', 'WebGL', 'React']
  },
  {
    id: 4,
    title: 'Sonar Social',
    category: 'Mobile App',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
    description: 'A location-based social platform connecting users through proximity algorithms.',
    tags: ['React Native', 'Node.js', 'MongoDB']
  }
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="min-h-screen w-full flex flex-col justify-center py-24 z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyanGlow to-tealGlow">Projects</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyanGlow to-transparent rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -10, rotateX: 2, rotateY: 2 }}
            style={{ perspective: 1000 }}
            className="group"
          >
            <div className="glass-card overflow-hidden h-full flex flex-col transform-gpu transition-all duration-500 group-hover:shadow-[0_15px_30px_rgba(0,240,255,0.15)] group-hover:border-cyanGlow/40 cursor-pointer">
              {/* Image Container */}
              <div className="w-full h-56 relative overflow-hidden">
                <div className="absolute inset-0 bg-ocean/40 z-10 group-hover:bg-transparent transition-colors duration-500" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 text-xs font-medium bg-abyss/80 backdrop-blur-sm border border-cyanGlow/30 rounded-full text-cyanGlow">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyanGlow transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-6 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
