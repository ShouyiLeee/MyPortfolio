"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PresentationControls, Stars, Html } from "@react-three/drei";
import * as THREE from "three";

// ─── Sun ──────────────────────────────────────────────────────────────────────
function Sun() {
  const t = useRef(0);
  const c1 = useRef<THREE.Mesh>(null!);
  const c2 = useRef<THREE.Mesh>(null!);
  const c3 = useRef<THREE.Mesh>(null!);
  const core = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    t.current += delta;
    if (core.current) core.current.rotation.y += delta * 0.15;
    if (c1.current) c1.current.scale.setScalar(1 + Math.sin(t.current * 1.4) * 0.028);
    if (c2.current) c2.current.scale.setScalar(1 + Math.cos(t.current * 0.9) * 0.045);
    if (c3.current) c3.current.scale.setScalar(1 + Math.sin(t.current * 0.55 + 1) * 0.065);
  });

  return (
    <group>
      {/* Core */}
      <mesh ref={core}>
        <sphereGeometry args={[2.6, 64, 64]} />
        <meshBasicMaterial color="#FFE050" />
      </mesh>
      {/* Inner corona — warm orange, pulsing */}
      <mesh ref={c1}>
        <sphereGeometry args={[2.92, 32, 32]} />
        <meshBasicMaterial color="#FFAA20" transparent opacity={0.42} />
      </mesh>
      {/* Mid corona — deep orange */}
      <mesh ref={c2}>
        <sphereGeometry args={[3.35, 32, 32]} />
        <meshBasicMaterial color="#FF7010" transparent opacity={0.2} />
      </mesh>
      {/* Outer haze — blue tint (solar wind) */}
      <mesh ref={c3}>
        <sphereGeometry args={[3.85, 32, 32]} />
        <meshBasicMaterial color="#0096E0" transparent opacity={0.07} />
      </mesh>
    </group>
  );
}

// ─── Shooting Star ─────────────────────────────────────────────────────────────
function ShootingStar({ seed }: { seed: number }) {
  const timeRef = useRef(seed * -4.2);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array([0, 0, -800, 0, 0, -800]), 3)
    );
    return g;
  }, []);

  const mat = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#cce8ff", transparent: true, opacity: 0 }),
    []
  );

  const line = useMemo(() => new THREE.LineSegments(geo, mat), [geo, mat]);

  // Stable seeded trajectory
  const traj = useMemo(() => {
    const r = (n: number) =>
      Math.abs(Math.sin(seed * 127.1 + n * 311.7) * 43758.5453) % 1;
    return {
      sx: (r(0) - 0.5) * 160,
      sy: 50 + r(1) * 30,
      sz: -20 + (r(2) - 0.5) * 60,
      dx: -45 - r(3) * 55,
      dy: -30 - r(4) * 25,
      dz: (r(5) - 0.5) * 18,
      cycle: 5.5 + r(6) * 9.5,
    };
  }, [seed]);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const { sx, sy, sz, dx, dy, dz, cycle } = traj;
    const lt = ((timeRef.current % cycle) + cycle) % cycle;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const DURATION = 1.3;
    const TAIL = 0.32;

    if (lt < DURATION) {
      const p = lt / DURATION;
      const tp = Math.max(0, p - TAIL);
      pos.setXYZ(0, sx + dx * tp, sy + dy * tp, sz + dz * tp);
      pos.setXYZ(1, sx + dx * p, sy + dy * p, sz + dz * p);
      pos.needsUpdate = true;
      const alpha = p < 0.1 ? p * 10 : p > 0.72 ? (1 - p) / 0.28 : 1;
      mat.opacity = alpha * 0.85;
    } else {
      pos.setXYZ(0, 0, -800, 0);
      pos.setXYZ(1, 0, -800, 0);
      pos.needsUpdate = true;
      mat.opacity = 0;
    }
  });

  return <primitive object={line} />;
}

// ─── Planet ────────────────────────────────────────────────────────────────────
interface PlanetProps {
  name: string;
  radius: number;
  dist: number;
  color: string;
  speed: number;
  emissive?: boolean;
  atmosphere?: string | null;
  hasRing?: boolean;
  ringTilt?: number;
}

function Planet({
  name,
  radius,
  dist,
  color,
  speed,
  emissive = false,
  atmosphere = null,
  hasRing = false,
  ringTilt = 0.38,
}: PlanetProps) {
  const orbitRef = useRef<THREE.Group>(null!);
  const selfRef = useRef<THREE.Mesh>(null!);
  const scaleRef = useRef(1);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (orbitRef.current) orbitRef.current.rotation.y += speed * delta;
    if (selfRef.current) {
      selfRef.current.rotation.y += delta * 0.5;
      // Smooth scale lerp on hover
      const target = hovered ? 1.14 : 1.0;
      scaleRef.current += (target - scaleRef.current) * 8 * delta;
      selfRef.current.scale.setScalar(scaleRef.current);
    }
  });

  return (
    <group ref={orbitRef}>
      {/* Orbit ring — highlights on hover */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[dist - 0.045, dist + 0.045, 128]} />
        <meshBasicMaterial
          color={hovered ? "#0096E0" : "#ffffff"}
          opacity={hovered ? 0.2 : 0.04}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      <group position={[dist, 0, 0]}>
        {/* Planet body */}
        <mesh
          ref={selfRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[radius, 48, 48]} />
          <meshStandardMaterial
            color={color}
            emissive={emissive ? color : "#000000"}
            emissiveIntensity={emissive ? 0.28 : 0}
            roughness={0.65}
            metalness={0.05}
          />
        </mesh>

        {/* Atmosphere glow (back-side) */}
        {atmosphere && (
          <mesh>
            <sphereGeometry args={[radius * 1.22, 32, 32]} />
            <meshBasicMaterial
              color={atmosphere}
              transparent
              opacity={0.14}
              side={THREE.BackSide}
            />
          </mesh>
        )}

        {/* Saturn rings — two layers */}
        {hasRing && (
          <>
            <mesh rotation={[Math.PI / 2 + ringTilt, 0, 0]}>
              <ringGeometry args={[radius * 1.55, radius * 2.2, 128]} />
              <meshBasicMaterial
                color="#D4C090"
                transparent
                opacity={0.62}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh rotation={[Math.PI / 2 + ringTilt, 0, 0]}>
              <ringGeometry args={[radius * 2.35, radius * 2.72, 128]} />
              <meshBasicMaterial
                color="#B89860"
                transparent
                opacity={0.32}
                side={THREE.DoubleSide}
              />
            </mesh>
          </>
        )}

        {/* Hover: selection glow ring */}
        {hovered && (
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius * 1.5, radius * 1.78, 64]} />
            <meshBasicMaterial
              color="#0096E0"
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}

        {/* Hover: tooltip label */}
        {hovered && (
          <Html center distanceFactor={14} position={[0, radius + 1.2, 0]}>
            <div
              style={{
                background: "rgba(3,3,8,0.92)",
                border: "1px solid rgba(0,150,224,0.7)",
                borderRadius: "6px",
                padding: "3px 10px",
                color: "#d0eeff",
                fontSize: "10px",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                letterSpacing: "0.12em",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                backdropFilter: "blur(8px)",
                boxShadow: "0 0 16px rgba(0,150,224,0.5)",
                textTransform: "uppercase",
              }}
            >
              {name}
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}

// ─── Asteroid Belt ─────────────────────────────────────────────────────────────
function AsteroidBelt() {
  const groupRef = useRef<THREE.Group>(null!);

  const data = useMemo(
    () =>
      Array.from({ length: 140 }, (_, i) => {
        const r = (n: number) =>
          Math.abs(Math.sin(i * 9.3 + n * 17.7) * 43758.5) % 1;
        const angle = r(0) * Math.PI * 2;
        const d = 22 + r(1) * 3.2;
        return {
          x: Math.cos(angle) * d,
          y: (r(2) - 0.5) * 0.65,
          z: Math.sin(angle) * d,
          s: 0.025 + r(3) * 0.07,
        };
      }),
    []
  );

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.016;
  });

  return (
    <group ref={groupRef}>
      {data.map((a, i) => (
        <mesh key={i} position={[a.x, a.y, a.z]}>
          <octahedronGeometry args={[a.s, 0]} />
          <meshStandardMaterial color="#7A7060" roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Main Scene & Export ────────────────────────────────────────────────────────
export default function SolarSystem() {
  return (
    <div className="absolute inset-0 pointer-events-auto" style={{ zIndex: 0 }}>
      <Canvas camera={{ position: [0, 18, 36], fov: 42 }} dpr={[1, 2]}>
        <color attach="background" args={["#030308"]} />

        {/* Lights */}
        <ambientLight intensity={0.08} />
        {/* Solar warm light */}
        <pointLight
          position={[0, 0, 0]}
          intensity={220}
          color="#FFE060"
          distance={120}
          decay={1.5}
        />
        {/* Blue accent (reflection) */}
        <pointLight
          position={[0, 2, 0]}
          intensity={130}
          color="#0096E0"
          distance={55}
          decay={2}
        />

        <PresentationControls
          global
          rotation={[0.12, 0.18, 0]}
          polar={[-Math.PI / 3.5, Math.PI / 3.5]}
          azimuth={[-Math.PI / 1.6, Math.PI / 1.6]}
        >
          <Sun />

          <Planet name="Mercury" radius={0.32} dist={6.5}  color="#B8AEA0" speed={0.95} />
          <Planet name="Venus"   radius={0.52} dist={9.8}  color="#E8C97A" speed={0.60} atmosphere="#FFD080" />
          <Planet name="Earth"   radius={0.72} dist={13.5} color="#3E90D5" speed={0.33} emissive atmosphere="#5ECFFF" />
          <Planet name="Mars"    radius={0.42} dist={18.2} color="#CC6045" speed={0.23} atmosphere="#FF8855" />

          <AsteroidBelt />

          <Planet name="Jupiter" radius={1.85} dist={27.5} color="#C8965A" speed={0.088} />
          <Planet name="Saturn"  radius={1.35} dist={36}   color="#E0C480" speed={0.054} hasRing />

          {/* Starfield background */}
          <Stars radius={120} depth={60} count={7000} factor={4} saturation={0.1} fade speed={1.2} />

          {/* Shooting stars — 6 staggered instances */}
          {[0, 1, 2, 3, 4, 5].map((s) => (
            <ShootingStar key={s} seed={s} />
          ))}
        </PresentationControls>
      </Canvas>

      {/* Bottom fade into page background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 35%, rgba(3,3,8,0.55) 65%, #030308 100%)",
        }}
      />
      {/* Center radial dark — text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 45%, rgba(3,3,8,0.52) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
