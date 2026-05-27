"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const CAT_COLORS = {
  frontend: "#22d3ee", // Cyan/Teal
  backend: "#a78bfa",  // Violet/Purple
  database: "#fb923c", // Orange
  tools: "#facc15",    // Gold
  emerging: "#4ade80", // Green
};

/* ── Fibonacci Sphere Distribution ── */
function buildGlobePositions(skills) {
  const n = skills.length;
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  return skills.map((skill, i) => {
    // Fibonacci sphere coordinates
    const y = 1 - (i / (n - 1)) * 2; // y: 1 → -1
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = (2 * Math.PI * i) / goldenRatio;

    const r = 2.8; // Globe radius
    return {
      ...skill,
      px: r * radiusAtY * Math.cos(theta),
      py: r * y,
      pz: r * radiusAtY * Math.sin(theta),
    };
  });
}

/* ── Glass Bubble Skill Node with Glowing Brand Icon Inside ── */
function SkillNode({ skill, hoveredSkill, setHoveredSkill, activeCategory }) {
  const groupRef = useRef();
  const meshRef = useRef();
  const matRef = useRef();
  const isHovered = hoveredSkill === skill.name;

  // Determine category color
  const color = CAT_COLORS[skill.category] || "#ffffff";
  const iconHex = color.replace("#", "");

  // Category filter state: dim mismatched to 20% opacity
  const isMatching = activeCategory === "ALL" || skill.category.toUpperCase() === activeCategory;
  const targetOpacity = isMatching ? (isHovered ? 1.0 : 0.8) : 0.15;
  const targetGlow = isMatching ? (isHovered ? 2.5 : 0.8) : 0.05;

  useFrame((state) => {
    if (!groupRef.current || !matRef.current) return;

    // Smoothly scale bubble on hover
    const targetScale = isHovered ? 1.35 : 1.0;
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.15)
    );

    // Smoothly lerp opacities and glow intensity
    matRef.current.opacity = THREE.MathUtils.lerp(matRef.current.opacity, targetOpacity * 0.28, 0.1);
    matRef.current.emissiveIntensity = THREE.MathUtils.lerp(matRef.current.emissiveIntensity, targetGlow, 0.1);
  });

  const baseSize = skill.size * 0.22;

  return (
    <group ref={groupRef} position={[skill.px, skill.py, skill.pz]}>
      {/* 1. Glass Frosted Bubble */}
      <mesh
        ref={meshRef}
        onPointerEnter={(e) => {
          e.stopPropagation();
          if (isMatching) setHoveredSkill(skill.name);
        }}
        onPointerLeave={() => setHoveredSkill(null)}
      >
        <sphereGeometry args={[baseSize, 32, 32]} />
        <meshStandardMaterial
          ref={matRef}
          color={color}
          emissive={color}
          emissiveIntensity={targetGlow}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={targetOpacity * 0.25}
          depthWrite={false}
        />
      </mesh>

      {/* 2. Inner Glowing Brand SVG Icon */}
      <Html center className="pointer-events-none select-none">
        <div
          className="flex items-center justify-center transition-all duration-300"
          style={{
            opacity: isMatching ? (isHovered ? 1.0 : 0.8) : 0.15,
            transform: isHovered ? "scale(1.2)" : "scale(1)",
          }}
        >
          <img
            src={`https://cdn.simpleicons.org/${skill.icon}/${iconHex}`}
            alt={skill.name}
            className="w-5.5 h-5.5 select-none pointer-events-none object-contain"
            style={{
              filter: `drop-shadow(0 0 6px ${color}cc)`,
            }}
          />
        </div>
      </Html>

      {/* 3. Sleek Floating Tooltip Card (Proficiency + Skill details) */}
      {isHovered && isMatching && (
        <Html
          position={[0, baseSize + 0.35, 0]}
          center
          className="pointer-events-none select-none"
          style={{ zIndex: 100 }}
        >
          <div
            className="flex flex-col p-3 rounded-xl border border-white/10 bg-[#0d0d0f]/90 backdrop-blur-md shadow-2xl min-w-[145px]"
            style={{
              borderLeft: `3px solid ${color}`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 15px ${color}11`,
            }}
          >
            <span className="text-[10px] font-bold text-white tracking-wider mb-0.5">{skill.name}</span>
            <span
              className="text-[7.5px] font-mono uppercase tracking-widest mb-2"
              style={{ color }}
            >
              {skill.category}
            </span>

            <div className="flex items-center justify-between text-[7px] font-mono text-muted/80 mb-0.5">
              <span>Proficiency</span>
              <span style={{ color }}>{Math.round(skill.size * 60 + 10)}%</span>
            </div>

            <div className="h-[3px] bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${skill.size * 60 + 10}%`,
                  background: color,
                  boxShadow: `0 0 6px ${color}`,
                }}
              />
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

/* ── Central Glow Source ── */
function AttractorCore() {
  const ref = useRef();
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.15;
  });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>
      <pointLight color="#7c3aed" intensity={3} distance={6} decay={2} />
      <pointLight color="#22d3ee" intensity={2} distance={4} decay={2} />
    </group>
  );
}

/* ── Connection lines between nodes in same category ── */
function ConnectionLines({ nodes, activeCategory }) {
  const lineGeo = useMemo(() => {
    const lines = [];
    const keys = new Set();

    nodes.forEach((nodeA, i) => {
      // Find matches in same category
      nodes.forEach((nodeB, j) => {
        if (i === j || nodeA.category !== nodeB.category) return;
        const key = `${Math.min(i, j)}-${Math.max(i, j)}`;
        if (keys.has(key)) return;

        // Limit connection to nearest category neighbors (dist < 3.2)
        const dist = Math.sqrt(
          (nodeA.px - nodeB.px) ** 2 +
          (nodeA.py - nodeB.py) ** 2 +
          (nodeA.pz - nodeB.pz) ** 2
        );
        if (dist < 3.2) {
          keys.add(key);
          lines.push({
            pts: [new THREE.Vector3(nodeA.px, nodeA.py, nodeA.pz), new THREE.Vector3(nodeB.px, nodeB.py, nodeB.pz)],
            category: nodeA.category,
          });
        }
      });
    });
    return lines;
  }, [nodes]);

  return (
    <group>
      {lineGeo.map((line, idx) => {
        const active = activeCategory === "ALL" || line.category.toUpperCase() === activeCategory;
        const color = CAT_COLORS[line.category] || "#ffffff";
        return (
          <LineItem
            key={idx}
            pts={line.pts}
            color={color}
            targetOpacity={active ? 0.08 : 0.01}
          />
        );
      })}
    </group>
  );
}

function LineItem({ pts, color, targetOpacity }) {
  const lineRef = useRef();
  const matRef = useRef();

  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(pts), [pts]);

  useFrame(() => {
    if (matRef.current) {
      matRef.current.opacity = THREE.MathUtils.lerp(matRef.current.opacity, targetOpacity, 0.1);
    }
  });

  return (
    <line ref={lineRef} geometry={geo}>
      <lineBasicMaterial ref={matRef} color={color} transparent opacity={0} />
    </line>
  );
}

/* ── Main TechGalaxy Globe Export ── */
export default function TechGalaxy({ skills, activeCategory, mouseX = 0, mouseY = 0 }) {
  const groupRef = useRef();
  const controlsRef = useRef();
  const isInteracting = useRef(false);
  const idleTimer = useRef(0);

  const nodes = useMemo(() => buildGlobePositions(skills), [skills]);
  const [hovered, setHovered] = useState(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Detect user controls interactions
    if (controlsRef.current && controlsRef.current.state.isDragging) {
      isInteracting.current = true;
      idleTimer.current = 0;
    }

    if (!isInteracting.current) {
      // Auto rotate
      groupRef.current.rotation.y += delta * 0.07;
      // Add subtle parallax offset based on hover / mouse position
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseY * -0.3, 0.04);
    } else {
      // Count down resume auto-rotate on idle
      idleTimer.current += delta;
      if (idleTimer.current > 4.5) {
        isInteracting.current = false;
      }
    }
  });

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={false}
        minDistance={5}
        maxDistance={12}
      />
      <group ref={groupRef}>
        <AttractorCore />
        <ConnectionLines nodes={nodes} activeCategory={activeCategory} />
        {nodes.map((skill) => (
          <SkillNode
            key={skill.name}
            skill={skill}
            hoveredSkill={hovered}
            setHoveredSkill={setHovered}
            activeCategory={activeCategory}
          />
        ))}
      </group>
    </>
  );
}
