"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PresentationControls, Stars } from "@react-three/drei";
import * as THREE from "three";

// Planet Component
function Planet({ radius, position, color, speed, emitGlow = false }: any) {
  const planetRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);

  // Rotate planet around the sun
  useFrame((state: any, delta: number) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += speed * delta;
    }
    if (planetRef.current) {
      planetRef.current.rotation.y += delta; // Self-rotation
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh ref={planetRef} position={position}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={emitGlow ? color : "#000000"} 
          emissiveIntensity={emitGlow ? 1.5 : 0} 
        />
      </mesh>
      
      {/* Orbit paths */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[position[0] - 0.05, position[0] + 0.05, 64]} />
        <meshBasicMaterial color="#ffffff" opacity={0.03} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Scene
export default function SolarSystem() {
  return (
    <div className="absolute inset-0 pointer-events-auto" style={{ zIndex: 0 }}>
      {/* 
        We use PresentationControls so the user can slightly drag and interact with the 3D scene.
        We ensure it doesn't block scroll completely by keeping the canvas in the background.
      */}
      <Canvas camera={{ position: [0, 15, 30], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={['#030308']} />
        
        {/* Ambient and glowing lights */}
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 0]} intensity={200} color="#ffcc00" distance={100} />
        <pointLight position={[0, 0, 0]} intensity={150} color="#0096E0" distance={50} />

        <PresentationControls
          global

          rotation={[0.1, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          {/* Central Star (The Sun) */}
          <group>
            <mesh>
              <sphereGeometry args={[3, 64, 64]} />
              <meshBasicMaterial color="#ffcc00" />
            </mesh>
            <mesh>
              <sphereGeometry args={[3.2, 32, 32]} />
              <meshBasicMaterial color="#ffcc00" transparent opacity={0.2} />
            </mesh>
            <mesh>
              <sphereGeometry args={[3.5, 32, 32]} />
              <meshBasicMaterial color="#0096E0" transparent opacity={0.1} />
            </mesh>
          </group>

          {/* Planets */}
          {/* Inner rocky planets */}
          <Planet radius={0.4} position={[6, 0, 0]} color="#a8a29e" speed={0.8} />
          <Planet radius={0.6} position={[9, 0, 0]} color="#f59e0b" speed={0.5} />
          
          {/* Earth-like with a moon (simplification) */}
          <group>
            <Planet radius={0.8} position={[13, 0, 0]} color="#0096E0" speed={0.3} emitGlow={true} />
          </group>
          
          {/* Mars-like */}
          <Planet radius={0.5} position={[17, 0, 0]} color="#ef4444" speed={0.24} />

          {/* Gas Giant */}
          <Planet radius={1.8} position={[24, 0, 0]} color="#d97706" speed={0.1} />
          
          {/* Ice Giant */}
          <Planet radius={1.2} position={[30, 0, 0]} color="#06b6d4" speed={0.05} emitGlow={true} />

          {/* Beautiful Starry Background */}
          <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={1.5} />
        </PresentationControls>
      </Canvas>
      
      {/* Overlay to ensure the canvas fades nicely into the page background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030308]/50 to-[#030308] pointer-events-none" />
    </div>
  );
}
