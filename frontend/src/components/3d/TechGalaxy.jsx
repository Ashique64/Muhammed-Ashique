"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

/* ── Build orbital shell positions (deterministic) ── */
function buildOrbitPositions(skills) {
  return skills.map((skill, i) => {
    const totalSkills = skills.length;
    // Spread across multiple orbital shells
    const shell = Math.floor(i / 6);
    const indexInShell = i % 6;
    const shellRadius = 2.2 + shell * 0.9;
    const phi = Math.acos(-1 + (2 * i + 1) / totalSkills);
    const theta = Math.sqrt(totalSkills * Math.PI) * phi;
    return {
      ...skill,
      radius: shellRadius,
      phi,
      theta,
      speed: 0.08 + shell * 0.03 + (indexInShell * 0.01),
      orbitOffset: (i / totalSkills) * Math.PI * 2,
    };
  });
}

/* ── Single skill node ── */
function SkillNode({ skill, hoveredSkill, setHoveredSkill, time }) {
  const meshRef = useRef();
  const isHovered = hoveredSkill === skill.name;

  const angle = skill.orbitOffset + time * skill.speed;
  const x = Math.sin(angle) * skill.radius * Math.cos(skill.phi * 0.5);
  const y = Math.cos(skill.phi) * skill.radius * 0.6;
  const z = Math.cos(angle) * skill.radius * Math.cos(skill.phi * 0.5);

  const targetScale = isHovered ? skill.size * 2.2 : skill.size;

  useFrame(() => {
    if (!meshRef.current) return;
    const current = meshRef.current.scale.x;
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(current, targetScale, 0.1));
    meshRef.current.position.set(x, y, z);
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={[x, y, z]}
        onPointerEnter={(e) => { e.stopPropagation(); setHoveredSkill(skill.name); }}
        onPointerLeave={() => setHoveredSkill(null)}
      >
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={isHovered ? 1.2 : 0.5}
          roughness={0.1}
          metalness={0.7}
          transparent
          opacity={isHovered ? 1 : 0.85}
        />
      </mesh>
      {/* Label — only show when hovered */}
      {isHovered && (
        <Html
          position={[x, y + 0.35, z]}
          center
          style={{ pointerEvents: "none" }}
        >
          <span
            style={{
              color: skill.color,
              fontSize: "10px",
              fontFamily: "monospace",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              background: "rgba(8,8,16,0.8)",
              padding: "3px 8px",
              borderRadius: 4,
              whiteSpace: "nowrap",
              border: `1px solid ${skill.color}44`,
            }}
          >
            {skill.name}
          </span>
        </Html>
      )}
      {/* Glow halo */}
      <mesh position={[x, y, z]}>
        <sphereGeometry args={[0.19, 8, 8]} />
        <meshBasicMaterial
          color={skill.color}
          transparent
          opacity={isHovered ? 0.15 : 0.04}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

/* ── Central attractor sphere ── */
function CentralSphere() {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    ref.current.rotation.z = state.clock.elapsedTime * 0.1;
  });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial
          color="#0f0a1e"
          emissive="#4f46e5"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.47, 16, 16]} />
        <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.12} />
      </mesh>
      <pointLight color="#818cf8" intensity={3} distance={5} />
    </group>
  );
}

/* ── Main TechGalaxy export ── */
export default function TechGalaxy({ skills, mouseX = 0, mouseY = 0, isMobile = false }) {
  const groupRef = useRef();
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [time, setTime] = useState(0);

  const orbitSkills = useMemo(() => buildOrbitPositions(skills), [skills]);

  useFrame((state) => {
    setTime(state.clock.elapsedTime);
    if (!groupRef.current) return;
    // Mouse-driven galaxy rotation
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouseX * 0.8,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouseY * 0.3,
      0.05
    );
  });

  return (
    <group ref={groupRef}>
      <CentralSphere />

      {orbitSkills.map((skill) => (
        <SkillNode
          key={skill.name}
          skill={skill}
          hoveredSkill={hoveredSkill}
          setHoveredSkill={setHoveredSkill}
          time={time}
        />
      ))}

      {/* Ambient + rim lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} color="#a78bfa" intensity={1} />
      <pointLight position={[-5, -3, -5]} color="#4f46e5" intensity={0.8} />
    </group>
  );
}
