"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Floating Energy Dust ── */
function EnergyDust({ isMobile }) {
  const pointsRef = useRef();
  
  const particles = useMemo(() => {
    const count = isMobile ? 300 : 800;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.2 + Math.random() * 2.5;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [isMobile]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (pointsRef.current) {
      // Swirling galaxy rotation for the dust
      pointsRef.current.rotation.y = t * 0.05;
      pointsRef.current.rotation.x = t * 0.02;
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
        size={0.02} 
        color="#c084fc" 
        transparent 
        opacity={0.4} 
        sizeAttenuation={true} 
      />
    </points>
  );
}

/* ── The Quantum Structure ── */
function QuantumStructure() {
  const knotRef = useRef();
  const shellRef = useRef();
  const ringsRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (knotRef.current) {
      // Complex rotation for the core
      knotRef.current.rotation.x = t * 0.15;
      knotRef.current.rotation.y = t * 0.2;
    }
    if (shellRef.current) {
      // Counter-rotation for the wireframe shell
      shellRef.current.rotation.y = -t * 0.1;
      shellRef.current.rotation.z = t * 0.05;
      // Gentle pulsing
      const scale = 1 + Math.sin(t * 2) * 0.03;
      shellRef.current.scale.set(scale, scale, scale);
    }
    if (ringsRef.current) {
      // Multi-axis orbital ring rotation
      ringsRef.current.children[0].rotation.x = t * 0.3;
      ringsRef.current.children[1].rotation.y = -t * 0.25;
      ringsRef.current.children[2].rotation.z = t * 0.2;
    }
  });

  return (
    <group>
      {/* 1. Center Torus Knot (The Core) */}
      <mesh ref={knotRef}>
        <torusKnotGeometry args={[0.4, 0.12, 128, 32]} />
        <meshPhysicalMaterial 
          color="#0f0a1e" 
          emissive="#4f46e5"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          wireframe={false}
        />
      </mesh>
      
      {/* 2. Wireframe Icosahedron Shell */}
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.25} />
      </mesh>
      
      {/* 3. Orbital Rings */}
      <group ref={ringsRef}>
        <mesh>
          <torusGeometry args={[1.3, 0.003, 16, 100]} />
          <meshBasicMaterial color="#60a5fa" transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.4, 0.004, 16, 100]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[0, Math.PI / 3, 0]}>
          <torusGeometry args={[1.5, 0.002, 16, 100]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  );
}

/* ── Main QuantumCore export ── */
export default function QuantumCore({ mouseX = 0, mouseY = 0, isMobile = false }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    
    // Core floating animation
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.1;
    groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.1;
    
    // Smooth Mouse parallax
    groupRef.current.rotation.y += mouseX * 0.15;
    groupRef.current.rotation.x += mouseY * 0.1;
  });

  return (
    <group ref={groupRef} scale={isMobile ? 0.7 : 1.05}>
      <QuantumStructure />
      <EnergyDust isMobile={isMobile} />
      
      {/* Studio Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} color="#c084fc" intensity={2} />
      <pointLight position={[-5, -5, -5]} color="#60a5fa" intensity={2} distance={15} />
      <pointLight position={[0, 0, 0]} color="#4f46e5" intensity={1} distance={3} />
    </group>
  );
}
