import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    id: 1,
    role: 'Senior Full-Stack Engineer',
    company: 'TechFlow Solutions',
    period: '2022 - Present',
    description: 'Led the development of a real-time data analytics dashboard. Architected scalable microservices and improved frontend rendering performance by 40%.',
  },
  {
    id: 2,
    role: 'Frontend Developer',
    company: 'Creative Studio X',
    period: '2020 - 2022',
    description: 'Built interactive, high-fidelity web experiences for premium clients. Integrated WebGL and Three.js for immersive 3D product showcases.',
  },
  {
    id: 3,
    role: 'Junior Web Developer',
    company: 'Innovate Digital',
    period: '2018 - 2020',
    description: 'Developed and maintained responsive e-commerce platforms. Implemented modern UI/UX principles and optimized accessibility standards.',
  }
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="min-h-screen w-full flex flex-col justify-center py-24 z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-right"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyanGlow to-tealGlow">Experience</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-l from-cyanGlow to-transparent rounded-full ml-auto" />
      </motion.div>

      <div className="relative max-w-4xl mx-auto w-full">
        {/* Vertical Timeline Line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyanGlow/50 to-transparent -translate-x-1/2" />

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-abyss border-2 border-cyanGlow rounded-full -translate-x-1/2 shadow-[0_0_10px_rgba(0,240,255,0.8)] z-10" />

              {/* Content Card */}
              <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                <div className="glass-card p-6 md:p-8 hover:-translate-y-2 transition-transform duration-300">
                  <span className="text-cyanGlow text-sm font-medium tracking-wider mb-2 block">{exp.period}</span>
                  <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                  <h4 className="text-gray-400 text-lg mb-4">{exp.company}</h4>
                  <p className="text-gray-500 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
