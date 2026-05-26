"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* Geometry presets keyed by scroll step (0-3) */
const GEOMETRIES = [
  (size) => new THREE.IcosahedronGeometry(size, 0),     // step 0: crystal
  (size) => new THREE.OctahedronGeometry(size),          // step 1: octahedron
  (size) => new THREE.TorusGeometry(size * 0.7, size * 0.28, 8, 24), // step 2: torus
  (size) => new THREE.SphereGeometry(size, 16, 16),     // step 3: sphere
];

/* Morph a geometry's vertices toward a target geometry */
function lerpGeometry(source, target, t) {
  const srcPos = source.attributes.position;
  const tgtPos = target.attributes.position;
  const count = Math.min(srcPos.count, tgtPos.count);
  const arr = new Float32Array(srcPos.array.length);

  for (let i = 0; i < count * 3; i++) {
    const si = srcPos.array[i] ?? 0;
    const ti = tgtPos.array[i] ?? 0;
    arr[i] = si + (ti - si) * t;
  }

  const geo = source.clone();
  geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
  geo.computeVertexNormals();
  return geo;
}

export default function MorphingGeometry({ progress = 0 }) {
  const meshRef = useRef();
  const edgeRef = useRef();
  const size = 1.1;

  // Determine which step we're in (0–3) and local progress within that step
  const totalSteps = GEOMETRIES.length - 1;
  const rawStep = progress * totalSteps;
  const step = Math.floor(rawStep);
  const localT = rawStep - step;

  const clampedStep = Math.min(step, GEOMETRIES.length - 2);
  const sourceGeo = GEOMETRIES[clampedStep](size);
  const targetGeo = GEOMETRIES[clampedStep + 1](size);

  // Use lerped geometry only when morphing — this is a simplified approach
  // (for production, use morphTargets or position lerp in useFrame)

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.25 + progress * Math.PI;
    meshRef.current.rotation.y = t * 0.4 + progress * Math.PI * 0.7;
    if (edgeRef.current) {
      edgeRef.current.rotation.x = meshRef.current.rotation.x;
      edgeRef.current.rotation.y = meshRef.current.rotation.y;
    }

    // Pulsing emissive intensity
    const pulse = 0.4 + 0.3 * Math.sin(t * 1.2);
    meshRef.current.material.emissiveIntensity = pulse + progress * 0.5;
  });

  // Emissive color shifts through scroll progress
  const hue = 260 + progress * 80; // violet → pink
  const emissiveColor = new THREE.Color(`hsl(${hue}, 80%, 60%)`);

  return (
    <group>
      {/* Solid face */}
      <mesh ref={meshRef} geometry={sourceGeo}>
        <meshStandardMaterial
          color="#1a0533"
          emissive={emissiveColor}
          emissiveIntensity={0.5}
          roughness={0.15}
          metalness={0.85}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Wireframe outline */}
      <lineSegments ref={edgeRef} geometry={new THREE.EdgesGeometry(sourceGeo)}>
        <lineBasicMaterial color={`hsl(${hue}, 70%, 75%)`} transparent opacity={0.5} />
      </lineSegments>

      {/* Glow halo */}
      <mesh geometry={sourceGeo} scale={1.15}>
        <meshBasicMaterial
          color={emissiveColor}
          transparent
          opacity={0.05 + progress * 0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Lighting */}
      <pointLight color={emissiveColor} intensity={3} distance={6} />
      <ambientLight intensity={0.3} />
    </group>
  );
}
