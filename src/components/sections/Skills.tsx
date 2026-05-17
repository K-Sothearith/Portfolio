import React, { useMemo, useRef } from 'react';
import { Canvas, extend, useFrame, type ThreeElement } from '@react-three/fiber';
import { Float, OrbitControls, shaderMaterial, useTexture } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { TechStackData } from '../../data/data';

const SphereMat = shaderMaterial(
  {
    colorDeep: new THREE.Color('#0a1628'),
    colorMid: new THREE.Color('#0d3d5c'),
    colorRim: new THREE.Color('#4dd9f0'),
    lightDir: new THREE.Vector3(0.6, 0.8, 1.0).normalize(),
  },
  // vertex
  /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vViewDir;
    varying vec3 vPos;

    void main() {
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vec3 camPos = cameraPosition;

      vNormal = normalize(normalMatrix * normal);
      vViewDir = normalize(camPos - worldPos.xyz);
      vPos = position;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment
  /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vViewDir;
    varying vec3 vPos;

    uniform vec3 colorDeep;
    uniform vec3 colorMid;
    uniform vec3 colorRim;
    uniform vec3 lightDir;

    void main() {
      // Fresnel — stronger at grazing angles (the rim glow)
      float fresnel = pow(1.0 - clamp(dot(vNormal, vViewDir), 0.0, 1.0), 3.5);

      // Diffuse lighting
      float diff = clamp(dot(vNormal, lightDir), 0.0, 1.0);

      // Specular highlight — sharp water-like glint
      vec3 halfVec = normalize(lightDir + vViewDir);
      float spec = pow(clamp(dot(vNormal, halfVec), 0.0, 1.0), 120.0);

      // Base color: deep core → mid → rim
      vec3 col = mix(colorDeep, colorMid, diff * 0.7);
      col = mix(col, colorRim, fresnel * 0.75);

      // Add specular glint on top
      col += vec3(0.85, 0.97, 1.0) * spec * 1.4;

      // Opacity: mostly opaque in center, slightly transparent at rim
      float alpha = mix(0.92, 0.55, fresnel);

      gl_FragColor = vec4(col, alpha);
    }
  `,
);

extend({ SphereMat });

declare module '@react-three/fiber' {
  interface ThreeElements {
    sphereMat: ThreeElement<typeof SphereMat>;
  }
}

const SphereShell = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = -state.clock.elapsedTime * 0.25; // same speed, leftward
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[3.2, 64, 64]} />
      <sphereMat
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

type TechItem = (typeof TechStackData)[number];

const OrbitIcon = ({ iconUrl, size }: { iconUrl: string; size: number }) => {
  const texture = useTexture(iconUrl);

  return (
    <mesh>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial map={texture} transparent opacity={1} depthWrite={false} />
    </mesh>
  );
};

const TechRing = ({
  items,
  radiusX,
  radiusY,
  speed,
  phase,
}: {
  items: TechItem[];
  radiusX: number;
  radiusY: number;
  speed: number;
  phase: number;
}) => {
  const groupRefs = useRef<(THREE.Group | null)[]>([]);
  const baseAngles = useMemo(
    () => items.map((_, i) => (i / items.length) * Math.PI * 2 + phase),
    [items, phase],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    items.forEach((_, index) => {
      const group = groupRefs.current[index];
      if (!group) return;
      const angle = baseAngles[index] + t;
      group.position.x = Math.cos(angle) * radiusX;
      group.position.y = Math.sin(angle) * radiusY;
      group.position.z = 0; // always on screen plane
    });
  });

  return (
    <group>
      {items.map((item, index) => {
        const size = item.variant === 'secondary' ? 0.55 : 0.65;
        return (
          <group
            key={item.name}
            ref={(el) => {
              groupRefs.current[index] = el;
            }}
          >
            <OrbitIcon iconUrl={item.icon} size={size} />
          </group>
        );
      })}
    </group>
  );
};

const TechSphere = () => {
  return (
    <group>
      <group rotation={[0.15, -0.15, 0]}>
        <SphereShell />
      </group>
      <TechRing
        items={TechStackData}
        radiusX={4.2}
        radiusY={4.2}
        speed={0.25}
        phase={0}
      />
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

      <div className="w-full max-w-5xl mx-auto h-[520px] md:h-[640px] relative cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 0, 13], fov: 45 }}>
          <ambientLight intensity={0.75} />
          <directionalLight position={[5, 4, 6]} intensity={0.65} />
          <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.8}>
            <TechSphere />
          </Float>
          <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={0.25} />
        </Canvas>
      </div>
    </section>
  );
};

export default Skills;
