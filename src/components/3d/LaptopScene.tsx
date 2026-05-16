import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Text, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Simple keycap grid (instanced for perf)
const KEY_ROWS = 5;
const KEY_COLS = 12;
const KEY_COUNT = KEY_ROWS * KEY_COLS;
const KEY_SIZE: [number, number, number] = [0.18, 0.026, 0.18];
const KEY_GAP = 0.035;
const KEY_AREA_WIDTH = KEY_COLS * KEY_SIZE[0] + (KEY_COLS - 1) * KEY_GAP;
const KEY_AREA_DEPTH = KEY_ROWS * KEY_SIZE[2] + (KEY_ROWS - 1) * KEY_GAP;

const StylizedLaptop = () => {
  const groupRef = useRef<THREE.Group>(null);
  const keysRef = useRef<THREE.InstancedMesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
    }
  });

  useEffect(() => {
    if (!keysRef.current) return;
    const dummy = new THREE.Object3D();
    let i = 0;

    for (let r = 0; r < KEY_ROWS; r++) {
      for (let c = 0; c < KEY_COLS; c++) {
        const x = -KEY_AREA_WIDTH / 2 + c * (KEY_SIZE[0] + KEY_GAP) + KEY_SIZE[0] / 2;
        const z = -KEY_AREA_DEPTH / 2 + r * (KEY_SIZE[2] + KEY_GAP) + KEY_SIZE[2] / 2;
        // Keep keys close to the deck and behind the trackpad.
        dummy.position.set(x, 0.034, z - 0.2);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        keysRef.current.setMatrixAt(i, dummy.matrix);
        i++;
      }
    }

    keysRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
        <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
          <boxGeometry args={[3, 0.1, 2]} />
          <meshStandardMaterial color="#1a2530" metalness={0.8} roughness={0.2} />
        </mesh>
        
        <group position={[0, 0, -0.95]} rotation={[-0.2, 0, 0]}>
          <mesh position={[0, 1, 0]} castShadow>
            <boxGeometry args={[3, 2, 0.1]} />
            <meshStandardMaterial color="#1f2530" metalness={0.8} roughness={0.2} />
          </mesh>
          
          <mesh position={[0, 1, 0.06]}>
            <planeGeometry args={[2.8, 1.8]} />
            <meshBasicMaterial color="#32798F" />
          </mesh>
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

          <Text
            position={[0, 1, 0.08]}
            fontSize={0.3}
            color="#034D6E"
            anchorX="center"
            anchorY="middle"
            fontWeight={700}
          >
            PORTFOLIO
          </Text>
        </group>

        {/* Keyboard deck */}
        <mesh position={[0, 0.01, -0.2]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.02, 1.2]} />
          <meshStandardMaterial color="#0b131a" />
        </mesh>

        {/* Keys */}
        <instancedMesh ref={keysRef} args={[undefined, undefined, KEY_COUNT]} castShadow receiveShadow>
          <boxGeometry args={KEY_SIZE} />
          <meshStandardMaterial color="#111a22" roughness={0.6} metalness={0.2} />
        </instancedMesh>

        {/* Trackpad */}
        <mesh position={[0, 0.03, 0.73]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.02, 0.45]} />
          <meshStandardMaterial color="#0f1a22" roughness={0.45} metalness={0.25} />
        </mesh>
        <mesh position={[0, 0.041, 0.73]}>
          <boxGeometry args={[0.86, 0.004, 0.41]} />
          <meshStandardMaterial color="#0a1219" roughness={0.9} metalness={0.05} />
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

        <Suspense fallback={null}>
          <Environment preset="city" />
        </Suspense>
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} color="#00f0ff" />
      </Canvas>
    </div>
  );
};

export default LaptopScene;
