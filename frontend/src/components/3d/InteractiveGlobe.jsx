"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

/* ── lat/lon → 3D cartesian ── */
function latLonToVec3(lat, lon, radius = 1) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/* ── Glowing location marker ── */
function LocationMarker({ lat, lon, color = "#a78bfa", label }) {
  const ref = useRef();
  const pos = latLonToVec3(lat, lon, 1.02);

  useFrame((state) => {
    if (!ref.current) return;
    const pulse = 1 + 0.3 * Math.sin(state.clock.elapsedTime * 2);
    ref.current.scale.setScalar(pulse);
  });

  return (
    <group position={pos}>
      {/* Core dot */}
      <mesh>
        <sphereGeometry args={[0.022, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Pulsing halo */}
      <mesh ref={ref}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

/* ── Globe arc from point A to point B on sphere ── */
function GlobeArc({ fromLat, fromLon, toLat, toLon, color = "#7c3aed", opacity = 0.4 }) {
  const start = latLonToVec3(fromLat, fromLon, 1.02);
  const end = latLonToVec3(toLat, toLon, 1.02);

  // Bezier curve through mid-point lifted above surface
  const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(1.5);
  const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
  const points = curve.getPoints(40);

  return (
    <Line points={points} color={color} lineWidth={0.8} transparent opacity={opacity} />
  );
}

/* ── Main InteractiveGlobe export ── */
export default function InteractiveGlobe({ mouseX = 0, mouseY = 0 }) {
  const groupRef = useRef();
  const atmosphereRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Base slow auto-rotation
    groupRef.current.rotation.y = t * 0.08;

    // Mouse-driven tilt
    groupRef.current.rotation.y += mouseX * 1.2;
    groupRef.current.rotation.x = mouseY * 0.4;

    // Atmosphere pulse
    if (atmosphereRef.current) {
      atmosphereRef.current.material.opacity =
        0.08 + 0.04 * Math.sin(t * 0.8);
    }
  });

  return (
    <group ref={groupRef}>

      {/* ── Globe body ── */}
      <Sphere args={[1, 48, 48]}>
        <meshStandardMaterial
          color="#050d1a"
          emissive="#0f1f3d"
          emissiveIntensity={0.5}
          roughness={0.6}
          metalness={0.3}
        />
      </Sphere>

      {/* ── Wireframe latitude/longitude lines ── */}
      <Sphere args={[1.005, 24, 24]}>
        <meshBasicMaterial color="#1e3a5f" wireframe transparent opacity={0.3} />
      </Sphere>

      {/* ── Atmosphere glow ── */}
      <Sphere ref={atmosphereRef} args={[1.12, 32, 32]}>
        <meshBasicMaterial
          color="#4f46e5"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* ── Location marker: Kerala, India ── */}
      <LocationMarker lat={10.8505} lon={76.2711} color="#a78bfa" label="Kerala" />

      {/* ── Sample arcs (international connections) ── */}
      <GlobeArc fromLat={51.5} fromLon={-0.1} toLat={10.85} toLon={76.27} color="#818cf8" opacity={0.35} />
      <GlobeArc fromLat={40.7} fromLon={-74.0} toLat={10.85} toLon={76.27} color="#6d28d9" opacity={0.25} />
      <GlobeArc fromLat={35.6} fromLon={139.7} toLat={10.85} toLon={76.27} color="#7c3aed" opacity={0.3} />
      <GlobeArc fromLat={1.35} fromLon={103.8} toLat={10.85} toLon={76.27} color="#8b5cf6" opacity={0.28} />

      {/* ── Lighting ── */}
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} color="#a78bfa" intensity={1.5} distance={10} />
      <pointLight position={[-3, -2, -3]} color="#4f46e5" intensity={0.8} distance={8} />
      <directionalLight position={[5, 3, 2]} color="#e2e8f0" intensity={0.6} />
    </group>
  );
}
