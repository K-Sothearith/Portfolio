import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Text, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const StylizedLaptop = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Slowly rotate horizontally
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
        {/* Base */}
        <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
          <boxGeometry args={[3, 0.1, 2]} />
          <meshStandardMaterial color="#1a2530" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Screen Top Half */}
        <group position={[0, 0, -0.95]} rotation={[-0.2, 0, 0]}>
          <mesh position={[0, 1, 0]} castShadow>
            <boxGeometry args={[3, 2, 0.1]} />
            <meshStandardMaterial color="#1a2530" metalness={0.8} roughness={0.2} />
          </mesh>
          
          {/* Screen Light/Display */}
          <mesh position={[0, 1, 0.06]}>
            <planeGeometry args={[2.8, 1.8]} />
            <meshBasicMaterial color="#001824" />
          </mesh>

          {/* Cyan Glow Screen Effect */}
          <mesh position={[0, 1, 0.07]}>
            <planeGeometry args={[2.8, 1.8]} />
            <meshStandardMaterial 
              color="#00f0ff" 
              emissive="#00f0ff" 
              emissiveIntensity={0.5} 
              transparent 
              opacity={0.1} 
            />
          </mesh>

          {/* Screen Text */}
          <Text
            position={[0, 1, 0.08]}
            fontSize={0.3}
            color="#00f0ff"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1O4u0Dw.woff"
          >
            Portfolio
          </Text>
        </group>

        {/* Keyboard area placeholder */}
        <mesh position={[0, 0.01, 0.2]}>
          <boxGeometry args={[2.6, 0.02, 1.2]} />
          <meshStandardMaterial color="#0b131a" />
        </mesh>
      </Float>
    </group>
  );
};

const LaptopScene: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 5, 5]} intensity={1} color="#00f0ff" penumbra={1} />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#00ffc2" />
        
        <StylizedLaptop />
        
        <Environment preset="city" />
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} color="#00f0ff" />
      </Canvas>
    </div>
  );
};

export default LaptopScene;
