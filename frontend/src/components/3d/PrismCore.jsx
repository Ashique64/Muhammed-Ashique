"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Orbiting Crystal Shards ── */
function OrbitingShards({ isMobile }) {
  const groupRef = useRef();
  
  const shards = useMemo(() => {
    const count = isMobile ? 12 : 24;
    const arr = [];
    for (let i = 0; i < count; i++) {
      const radius = 0.7 + Math.random() * 0.6;
      const angle = (i / count) * Math.PI * 2;
      const speed = 0.2 + Math.random() * 0.4;
      const scale = 0.05 + Math.random() * 0.1;
      
      const color = i % 3 === 0 ? "#60a5fa" : (i % 2 === 0 ? "#c084fc" : "#e879f9");
      
      arr.push({ radius, angle, speed, scale, color, yOffset: (Math.random() - 0.5) * 1.5 });
    }
    return arr;
  }, [isMobile]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.z = Math.sin(t * 0.1) * 0.05;
      
      groupRef.current.children.forEach((child, i) => {
        const s = shards[i];
        const currentAngle = s.angle + t * s.speed;
        
        child.position.x = Math.cos(currentAngle) * s.radius;
        child.position.z = Math.sin(currentAngle) * s.radius;
        child.position.y = s.yOffset + Math.sin(t * s.speed + i) * 0.2;
        
        child.rotation.x = t * s.speed;
        child.rotation.y = t * s.speed * 1.5;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {shards.map((s, i) => (
        <mesh key={i} scale={s.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial 
            color={s.color}
            emissive={s.color}
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.8}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Central Prism Core ── */
function CentralPrism() {
  const meshRef = useRef();
  const wireframeRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.2;
      meshRef.current.rotation.z = Math.sin(t * 0.5) * 0.05;
      
      const pulse = 1 + Math.sin(t * 2) * 0.05;
      meshRef.current.scale.set(pulse, pulse, pulse);
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = -t * 0.15;
      wireframeRef.current.rotation.x = Math.cos(t * 0.5) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        {/* Main Crystal Shape */}
        <octahedronGeometry args={[0.5, 0]} />
        <meshPhysicalMaterial 
          color="#1e1b4b" 
          emissive="#6d28d9"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={1}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

/* ── Floating Tech Dust ── */
function TechDust({ isMobile }) {
  const pointsRef = useRef();
  
  const particles = useMemo(() => {
    const count = isMobile ? 150 : 300;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1 + Math.random() * 2;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [isMobile]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={particles.length / 3} 
          array={particles} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.015} 
        color="#818cf8" 
        transparent 
        opacity={0.4} 
      />
    </points>
  );
}

/* ── Main PrismCore export ── */
export default function PrismCore({ mouseX = 0, mouseY = 0, isMobile = false }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    
    groupRef.current.position.y = Math.sin(t) * 0.1;
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.1;
    
    // Smooth Mouse parallax
    groupRef.current.rotation.y += mouseX * 0.05;
    groupRef.current.rotation.x += mouseY * 0.03;
  });

  return (
    <group ref={groupRef} scale={isMobile ? 0.7 : 1.05}>
      <CentralPrism />
      <OrbitingShards isMobile={isMobile} />
      <TechDust isMobile={isMobile} />
      
      {/* Illumination */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 2]} color="#c084fc" intensity={2} />
      <pointLight position={[-3, -2, -3]} color="#60a5fa" intensity={2} distance={10} />
      <pointLight position={[0, 0, 0]} color="#4f46e5" intensity={1} distance={4} />
    </group>
  );
}
