"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Swirling Data Particles ── */
function DataSwirl({ isMobile }) {
  const groupRef = useRef();
  
  const particles = useMemo(() => {
    const arr = [];
    const count = isMobile ? 80 : 150;
    for (let i = 0; i < count; i++) {
      // Cylindrical distribution
      const radius = 0.8 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 2;
      
      const x = radius * Math.cos(theta);
      const z = radius * Math.sin(theta);
      
      const speed = 0.2 + Math.random() * 0.8;
      const size = 0.015 + Math.random() * 0.02;
      // Violet to Blue tech colors
      const color = i % 3 === 0 ? "#818cf8" : (i % 2 === 0 ? "#c084fc" : "#60a5fa");
      
      arr.push({ pos: [x, y, z], size, speed, color, radius, theta, yBase: y });
    }
    return arr;
  }, [isMobile]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.z = Math.sin(t * 0.1) * 0.1;
      
      groupRef.current.children.forEach((child, i) => {
        const p = particles[i];
        // Swirl effect
        const angle = p.theta + t * p.speed * 0.5;
        child.position.x = p.radius * Math.cos(angle);
        child.position.z = p.radius * Math.sin(angle);
        // Gentle up/down float
        child.position.y = p.yBase + Math.sin(t * p.speed * 2) * 0.1;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.pos}>
          <boxGeometry args={[p.size, p.size, p.size * 3]} />
          <meshBasicMaterial 
            color={p.color} 
            transparent 
            opacity={0.6 + Math.random() * 0.4} 
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Cybernetic Rings ── */
function CyberRings() {
  const ringsRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ringsRef.current) {
      ringsRef.current.children[0].rotation.x = t * 0.2;
      ringsRef.current.children[0].rotation.y = t * 0.3;
      
      ringsRef.current.children[1].rotation.x = -t * 0.15;
      ringsRef.current.children[1].rotation.z = t * 0.25;
      
      ringsRef.current.children[2].rotation.y = t * 0.1;
      ringsRef.current.children[2].rotation.z = -t * 0.2;
    }
  });

  return (
    <group ref={ringsRef}>
      {/* Ring 1 */}
      <mesh>
        <torusGeometry args={[1.2, 0.005, 16, 100]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.5} />
      </mesh>
      {/* Ring 2 */}
      <mesh>
        <torusGeometry args={[0.9, 0.008, 16, 100]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.3} />
      </mesh>
      {/* Ring 3 (dashed/segmented look via low tubular segments) */}
      <mesh>
        <torusGeometry args={[1.5, 0.003, 4, 30]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.2} wireframe />
      </mesh>
    </group>
  );
}

/* ── Dark Energy Core ── */
function DarkCore() {
  const coreRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.1;
      const scale = 1 + Math.sin(t * 2) * 0.03;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={coreRef}>
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial 
          color="#050510" 
          emissive="#2e1065" 
          emissiveIntensity={0.5}
          roughness={0.1} 
          metalness={1} 
        />
      </mesh>
      {/* Core Halo */}
      <mesh>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

/* ── Main CyberCore export ── */
export default function CyberCore({ mouseX = 0, mouseY = 0, isMobile = false }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Base subtle rotation
    groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.1;
    groupRef.current.rotation.x = Math.cos(t * 0.1) * 0.05;
    
    // Mouse parallax
    groupRef.current.rotation.y += mouseX * 0.25;
    groupRef.current.rotation.x += mouseY * 0.15;
  });

  return (
    <group ref={groupRef} scale={isMobile ? 0.9 : 1.3}>
      <DarkCore />
      <CyberRings />
      <DataSwirl isMobile={isMobile} />
      
      {/* Lighting */}
      <pointLight position={[2, 0, 2]} color="#818cf8" intensity={2} distance={5} />
      <pointLight position={[-2, 2, -2]} color="#c084fc" intensity={1.5} distance={5} />
      <ambientLight intensity={0.3} />
    </group>
  );
}
