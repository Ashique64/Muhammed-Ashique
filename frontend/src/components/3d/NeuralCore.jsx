"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Pre-generate neural node positions on the sphere surface ── */
function fibonacciSphere(n) {
  const points = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < n; i++) {
    const theta = Math.acos(1 - (2 * i + 1) / n);
    const phi = (2 * Math.PI * i) / goldenRatio;
    points.push(
      new THREE.Vector3(
        Math.sin(theta) * Math.cos(phi),
        Math.cos(theta),
        Math.sin(theta) * Math.sin(phi)
      )
    );
  }
  return points;
}

/* ── Generate connections between nearby nodes ── */
function buildConnections(nodes, maxDist = 0.85, maxConns = 50) {
  const lines = [];
  for (let i = 0; i < nodes.length && lines.length < maxConns; i++) {
    for (let j = i + 1; j < nodes.length && lines.length < maxConns; j++) {
      if (nodes[i].distanceTo(nodes[j]) < maxDist) {
        lines.push([nodes[i].clone().multiplyScalar(0.62), nodes[j].clone().multiplyScalar(0.62)]);
      }
    }
  }
  return lines;
}

/* ── Individual glowing node ── */
function NeuralNode({ position, color, scale = 1 }) {
  const meshRef = useRef();
  const speed = useMemo(() => 0.5 + Math.random() * 1.5, []);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const pulse = 0.8 + 0.4 * Math.sin(state.clock.elapsedTime * speed + offset);
    meshRef.current.scale.setScalar(scale * pulse);
    if (meshRef.current.material) {
      meshRef.current.material.opacity = 0.4 + 0.5 * Math.sin(state.clock.elapsedTime * speed + offset);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.025, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
}

/* ── Neural connection lines (no ref — use BufferGeometry directly) ── */
function NeuralLines({ connections }) {
  const groupRef = useRef();

  // Build a single LineSegments object for all connections (much faster than many Lines)
  const geometry = useMemo(() => {
    const positions = [];
    connections.forEach(([start, end]) => {
      positions.push(start.x, start.y, start.z, end.x, end.y, end.z);
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [connections]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.material.opacity = 0.08 + 0.06 * Math.sin(state.clock.elapsedTime * 0.8);
  });

  return (
    <lineSegments ref={groupRef} geometry={geometry}>
      <lineBasicMaterial color="#a78bfa" transparent opacity={0.1} />
    </lineSegments>
  );
}

/* ── Rotating orbital rings ── */
function OrbitalRings() {
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.3;
      ring1Ref.current.rotation.x = t * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.2;
      ring2Ref.current.rotation.y = t * 0.12;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.85, 0.004, 8, 80]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[0.95, 0.003, 8, 80]} />
        <meshBasicMaterial color="#4f46e5" transparent opacity={0.3} />
      </mesh>
    </>
  );
}

/* ── Core glowing sphere ── */
function CoreSphere() {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const pulse = 1 + 0.04 * Math.sin(state.clock.elapsedTime * 1.5);
    meshRef.current.scale.setScalar(pulse);
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color="#1a0533"
          emissive="#6d28d9"
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Wireframe shell */}
      <mesh>
        <sphereGeometry args={[0.57, 16, 16]} />
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

/* ── Main NeuralCore export ── */
export default function NeuralCore({ mouseX = 0, mouseY = 0, isMobile = false }) {
  const groupRef = useRef();

  const nodeCount = isMobile ? 18 : 36;
  const nodes = useMemo(() => fibonacciSphere(nodeCount), [nodeCount]);
  const connections = useMemo(
    () => buildConnections(nodes, 0.9, isMobile ? 18 : 45),
    [nodes, isMobile]
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Continuous slow rotation
    groupRef.current.rotation.y = t * 0.12;
    groupRef.current.rotation.x = Math.sin(t * 0.07) * 0.15;

    // Mouse-driven parallax (additive, lerped)
    groupRef.current.rotation.y += mouseX * 0.3;
    groupRef.current.rotation.x += mouseY * 0.15;
  });

  const nodeColors = ["#f9a8d4", "#93c5fd", "#a78bfa", "#c4b5fd", "#818cf8"];

  return (
    <group ref={groupRef}>
      <CoreSphere />
      <OrbitalRings />

      {/* Neural nodes */}
      {nodes.map((pos, i) => (
        <NeuralNode
          key={i}
          position={pos.clone().multiplyScalar(0.62)}
          color={nodeColors[i % nodeColors.length]}
          scale={0.8 + (i % 4) * 0.15}
        />
      ))}

      {/* Neural connection lines (single draw call) */}
      <NeuralLines connections={connections} />

      {/* Lighting */}
      <pointLight position={[2, 2, 2]} color="#a78bfa" intensity={3} distance={8} />
      <pointLight position={[-2, -1, -2]} color="#4f46e5" intensity={2} distance={6} />
      <ambientLight intensity={0.5} />
    </group>
  );
}
