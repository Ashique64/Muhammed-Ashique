"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Floating Data Blocks (Blockchain / Tech vibe) ── */
function FloatingCubes({ isMobile }) {
  const groupRef = useRef();
  
  const cubes = useMemo(() => {
    const arr = [];
    const count = isMobile ? 25 : 45;
    for (let i = 0; i < count; i++) {
      const scale = 0.04 + Math.random() * 0.08;
      // Distribute in a spherical volume
      const r = 0.3 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      const speed = 0.5 + Math.random() * 1.5;
      const color = i % 3 === 0 ? "#a78bfa" : (i % 2 === 0 ? "#60a5fa" : "#818cf8");
      
      arr.push({ pos: [x, y, z], scale, speed, color, isWireframe: i % 4 === 0 });
    }
    return arr;
  }, [isMobile]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
      groupRef.current.rotation.z = t * 0.05;
      
      groupRef.current.children.forEach((child, i) => {
         child.rotation.x += cubes[i].speed * 0.01;
         child.rotation.y += cubes[i].speed * 0.01;
         // Floating oscillation
         child.position.y = cubes[i].pos[1] + Math.sin(t * cubes[i].speed) * 0.05;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {cubes.map((c, i) => (
        <mesh key={i} position={c.pos} scale={c.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color={c.color} 
            emissive={c.color}
            emissiveIntensity={c.isWireframe ? 1 : 0.4}
            transparent 
            opacity={0.8} 
            wireframe={c.isWireframe}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Geometric Tech Shells ── */
function TechWireframe() {
  const innerRef = useRef();
  const outerRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.2;
      innerRef.current.rotation.x = t * 0.1;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.15;
      outerRef.current.rotation.z = -t * 0.05;
    }
  });

  return (
    <group>
      {/* Inner structured core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial color="#6d28d9" wireframe transparent opacity={0.3} />
      </mesh>
      
      {/* Outer tech boundaries */}
      <mesh ref={outerRef}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshBasicMaterial color="#4f46e5" wireframe transparent opacity={0.15} />
      </mesh>
      
      {/* Core solid crystal */}
      <mesh>
        <octahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color="#0f0a1e" emissive="#818cf8" emissiveIntensity={0.8} roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  );
}

/* ── Main DeveloperCore export ── */
export default function DeveloperCore({ mouseX = 0, mouseY = 0, isMobile = false }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    groupRef.current.rotation.y = t * 0.08;
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    
    // Mouse-driven parallax
    groupRef.current.rotation.y += mouseX * 0.2;
    groupRef.current.rotation.x += mouseY * 0.1;
  });

  return (
    <group ref={groupRef} scale={isMobile ? 0.6 : 0.95}>
      <TechWireframe />
      <FloatingCubes isMobile={isMobile} />
      
      {/* Dynamic Lighting */}
      <pointLight position={[3, 2, 3]} color="#818cf8" intensity={2} distance={8} />
      <pointLight position={[-3, -2, -2]} color="#4f46e5" intensity={1.5} distance={8} />
      <ambientLight intensity={0.4} />
    </group>
  );
}
