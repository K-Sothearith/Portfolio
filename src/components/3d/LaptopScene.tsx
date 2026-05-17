import React, { Suspense, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Html, ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';

// Real-world keyboard layout (key widths and labels)
const KEYBOARD_LAYOUT = [
  // F-row
  [{w: 1, l: 'Esc'}, {w: 1, l: 'F1'}, {w: 1, l: 'F2'}, {w: 1, l: 'F3'}, {w: 1, l: 'F4'}, {w: 1, l: 'F5'}, {w: 1, l: 'F6'}, {w: 1, l: 'F7'}, {w: 1, l: 'F8'}, {w: 1, l: 'F9'}, {w: 1, l: 'F10'}, {w: 1, l: 'F11'}, {w: 1, l: 'F12'}, {w: 1, l: 'Prt'}, {w: 1, l: 'Del'}],
  // Num-row
  [{w: 1, l: '`'}, {w: 1, l: '1'}, {w: 1, l: '2'}, {w: 1, l: '3'}, {w: 1, l: '4'}, {w: 1, l: '5'}, {w: 1, l: '6'}, {w: 1, l: '7'}, {w: 1, l: '8'}, {w: 1, l: '9'}, {w: 1, l: '0'}, {w: 1, l: '-'}, {w: 1, l: '='}, {w: 2, l: 'Back'}],
  // QWERTY
  [{w: 1.5, l: 'Tab'}, {w: 1, l: 'Q'}, {w: 1, l: 'W'}, {w: 1, l: 'E'}, {w: 1, l: 'R'}, {w: 1, l: 'T'}, {w: 1, l: 'Y'}, {w: 1, l: 'U'}, {w: 1, l: 'I'}, {w: 1, l: 'O'}, {w: 1, l: 'P'}, {w: 1, l: '['}, {w: 1, l: ']'}, {w: 1.5, l: '\\'}],
  // ASDF
  [{w: 1.75, l: 'Caps'}, {w: 1, l: 'A'}, {w: 1, l: 'S'}, {w: 1, l: 'D'}, {w: 1, l: 'F'}, {w: 1, l: 'G'}, {w: 1, l: 'H'}, {w: 1, l: 'J'}, {w: 1, l: 'K'}, {w: 1, l: 'L'}, {w: 1, l: ';'}, {w: 1, l: "'"}, {w: 2.25, l: 'Enter'}],
  // ZXCV
  [{w: 2.25, l: 'Shift'}, {w: 1, l: 'Z'}, {w: 1, l: 'X'}, {w: 1, l: 'C'}, {w: 1, l: 'V'}, {w: 1, l: 'B'}, {w: 1, l: 'N'}, {w: 1, l: 'M'}, {w: 1, l: ','}, {w: 1, l: '.'}, {w: 1, l: '/'}, {w: 2.75, l: 'Shift'}],
  // Space row
  [{w: 1.25, l: 'Ctrl'}, {w: 1.25, l: 'Win'}, {w: 1.25, l: 'Alt'}, {w: 6.25, l: ''}, {w: 1.25, l: 'Alt'}, {w: 1.25, l: 'Fn'}, {w: 1.25, l: 'Menu'}, {w: 1.25, l: 'Ctrl'}]
];

const KEY_COUNT = KEYBOARD_LAYOUT.reduce((acc, row) => acc + row.length, 0);
const KEY_U = 0.15;
const KEY_DEPTH = 0.15;
const KEY_HEIGHT = 0.026;
const KEY_GAP = 0.02;

const TOTAL_WIDTH = 15 * KEY_U + 14 * KEY_GAP;
const TOTAL_DEPTH = KEYBOARD_LAYOUT.length * KEY_DEPTH + (KEYBOARD_LAYOUT.length - 1) * KEY_GAP;

const StylizedLaptop = () => {
  const groupRef = useRef<THREE.Group>(null);
  const keysRef = useRef<THREE.InstancedMesh>(null);

  const code = `import Navbar from './components/Navbar';
import SonarReveal from './components/SonarReveal';
import Home from './components/sections/Home';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';

function App() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', {e.clientX}px);
      document.documentElement.style.setProperty('--mouse-y', {e.clientY}px);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return (
    <div className="relative w-full bg-abyss text-white selection:bg-cyanGlow/30 selection:text-white">
      <SonarReveal />
      <Navbar />

      <main className="relative z-20 flex flex-col items-center w-full max-w-7xl mx-auto px-6 lg:px-12">
        <Home />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
`;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
    }
  });

  const keyPositions = useMemo(() => {
    const positions: { x: number; z: number; w: number; l: string; i: number }[] = [];
    const startZ = -TOTAL_DEPTH / 2;
    let i = 0;

    for (let r = 0; r < KEYBOARD_LAYOUT.length; r++) {
      const row = KEYBOARD_LAYOUT[r];
      let currentX = -TOTAL_WIDTH / 2;
      const z = startZ + r * (KEY_DEPTH + KEY_GAP) + KEY_DEPTH / 2;

      for (let c = 0; c < row.length; c++) {
        const key = row[c];
        const keyWidth = key.w * KEY_U + (key.w - 1) * KEY_GAP;
        const x = currentX + keyWidth / 2;

        positions.push({ x, z, w: key.w, l: key.l, i });
        
        currentX += keyWidth + KEY_GAP;
        i++;
      }
    }
    return positions;
  }, []);

  useEffect(() => {
    if (!keysRef.current) return;
    const dummy = new THREE.Object3D();

    keyPositions.forEach(({ x, z, w, i }) => {
      const keyWidth = w * KEY_U + (w - 1) * KEY_GAP;
      // Keep keys close to the deck and behind the trackpad.
      dummy.position.set(x, 0.034, z - 0.2);
      dummy.rotation.set(0, 0, 0);
      
      // Scale the key horizontally based on its unit width
      dummy.scale.set(keyWidth / KEY_U, 1, 1);
      dummy.updateMatrix();
      
      keysRef.current!.setMatrixAt(i, dummy.matrix);
    });

    keysRef.current.instanceMatrix.needsUpdate = true;
  }, [keyPositions]);

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
            <meshBasicMaterial color="#0b1020" />
          </mesh>
          <mesh position={[0, 1, 0.062]}>
            <planeGeometry args={[2.8, 1.8]} />
            <meshStandardMaterial 
              color="#00f0ff" 
              emissive="#00f0ff" 
              emissiveIntensity={0.5} 
              transparent 
              opacity={0.1} 
            />
          </mesh>

          <Html
            transform
            position={[0, 1, 0.065]}
            style={{ pointerEvents: 'none' }}
            distanceFactor={1.15}
            center
          >
            <div
              className="overflow-hidden border border-cyan-400/20 bg-[#0b1020] shadow-[0_0_30px_rgba(0,240,255,0.15)]"
              style={{ width: 900, height: 600, boxSizing: 'border-box' }}
            >
              <div className="flex items-center gap-2 px-3 py-2 bg-[#0f1730] border-b border-cyan-400/10">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                </div>
                <div className="text-[10px] tracking-wide text-cyan-100/70">
                  portfolio — VS Code
                </div>
              </div>

              <div className="flex" style={{ width: '100%', height: 600 - 33 }}>
                <div className="w-[175px] bg-[#0a132a] border-r border-cyan-400/10 px-2 py-2">
                  <div className="text-[10px] font-semibold tracking-wider text-cyan-100/60 mb-2 bg-[#0D0524]">
                    EXPLORER
                  </div>
                  <div className="text-[10px] text-cyan-50/75 leading-5">
                    <div className="text-cyan-50/80 font-semibold">PORTFOLIO</div>
                    <div className="pl-3">
                      <div>{'>'} dist</div>
                      <div>{'>'} node_modules</div>
                      <div>{'/'} src</div>
                      <div className="pl-3">{'>'} assets</div>
                      <div className="pl-3">{'>'} components</div>
                      <div className="pl-3">{'>'} styles</div>
                      <div className="pl-3">App.tsx</div>
                      <div className="pl-3">App.css</div>
                      <div className="pl-3">main.tsx</div>
                      <div>.gitignore</div>
                      <div>eslint.config.js</div>
                      <div>package.json</div>
                      <div>README.md</div>
                      <div>vite.config.ts</div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 bg-[#0b1020] px-3 py-2">
                  <div className="text-[10px] text-cyan-100/60 mb-2">
                    src/App.tsx
                  </div>
                  <pre className="m-0 text-[10px] leading-[15px] font-mono text-cyan-50/80 whitespace-pre">
                    {code}
                  </pre>
                </div>
              </div>
            </div>
          </Html>
        </group>

        {/* Keyboard deck */}
        <mesh position={[0, 0.01, -0.2]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.02, 1.2]} />
          <meshStandardMaterial color="#0b131a" />
        </mesh>

        {/* Keys */}
        <instancedMesh ref={keysRef} args={[undefined, undefined, KEY_COUNT]} castShadow receiveShadow>
          <boxGeometry args={[KEY_U, KEY_HEIGHT, KEY_DEPTH]} />
          <meshStandardMaterial color="#111a22" roughness={0.6} metalness={0.2} />
        </instancedMesh>

        {/* Key Labels */}
        <group position={[0, 0, 0]}>
          {keyPositions.map((k) => (
            k.l ? (
              <Text
                key={k.i}
                position={[k.x, 0.048, k.z - 0.2]}
                fontSize={0.035}
                color="#00f0ff"
                anchorX="center"
                anchorY="middle"
                rotation={[-Math.PI / 2, 0, 0]}
              >
                {k.l}
              </Text>
            ) : null
          ))}
        </group>

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
