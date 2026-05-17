import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const skills = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 
  'Java', 'MySQL', 'Git', 'Docker', 'Tailwind', 'Figma'
];

const SkillNode = ({ position, text }: { position: [number, number, number], text: string }) => {
  return (
    <group position={position}>
      <Html transform center sprite distanceFactor={10}>
        <div className="px-4 py-2 bg-ocean/80 backdrop-blur-md border border-cyanGlow/30 rounded-full text-sm font-medium text-white whitespace-nowrap shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] hover:border-cyanGlow transition-all duration-300 cursor-default select-none">
          {text}
        </div>
      </Html>
    </group>
  );
};

const OrbitingSphere = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Distribute points evenly on a sphere using Fibonacci lattice
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
    const n = skills.length;
    const radius = 3.25;
    
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y) * radius;
      const theta = phi * i;
      
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      pts.push([x, y * radius, z]);
    }
    return pts;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, index) => (
        <SkillNode key={skill} position={points[index]} text={skill} />
      ))}
    </group>
  );
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="min-h-screen w-full flex flex-col justify-center py-24 z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyanGlow to-tealGlow">Stack</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyanGlow to-transparent rounded-full mx-auto" />
      </motion.div>

      <div className="w-full max-w-5xl mx-auto h-[520px] md:h-[640px] relative">
        <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
            <OrbitingSphere />
          </Float>
        </Canvas>
      </div>
    </section>
  );
};

export default Skills;