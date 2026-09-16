import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Vehicle3D {
  id: string;
  type: 'truck' | 'excavator';
  position: [number, number, number];
  color: string;
  name: string;
}

const mockVehicles: Vehicle3D[] = [
  { id: '1', type: 'excavator', position: [-8, 0.5, -4], color: '#f59e0b', name: 'ЭКГ-5А #2' },
  { id: '2', type: 'excavator', position: [6, -1.5, 6], color: '#f59e0b', name: 'Hitachi #7' },
  { id: '3', type: 'truck', position: [-5, 0.3, -2], color: '#10b981', name: 'БелАЗ 101' },
  { id: '4', type: 'truck', position: [0, -0.5, 2], color: '#3b82f6', name: 'БелАЗ 104' },
  { id: '5', type: 'truck', position: [4, -1.2, 4], color: '#10b981', name: 'БелАЗ 108' },
];

function QuarryTerrain() {
  return (
    <group>
      {/* Уступ 1 (Верхний горизонт +1650м) */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[18, 20, 1.5, 32]} />
        <meshStandardMaterial color="#475569" roughness={0.9} wireframe={false} />
      </mesh>

      {/* Уступ 2 (Средний горизонт +1630м) */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[14, 16, 1.5, 32]} />
        <meshStandardMaterial color="#334155" roughness={0.85} />
      </mesh>

      {/* Дно карьера (+1600м) */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[10, 12, 1.5, 32]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>
    </group>
  );
}

function MovingTruck({ vehicle }: { vehicle: Vehicle3D }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (meshRef.current && vehicle.type === 'truck') {
      const t = clock.getElapsedTime() * 0.5;
      meshRef.current.position.x = vehicle.position[0] + Math.sin(t) * 1.5;
      meshRef.current.position.z = vehicle.position[2] + Math.cos(t) * 1.5;
    }
  });

  return (
    <group ref={meshRef} position={vehicle.position}>
      {vehicle.type === 'excavator' ? (
        // Модель экскаватора
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1.5, 1.2, 1.5]} />
          <meshStandardMaterial color={vehicle.color} metalness={0.4} />
        </mesh>
      ) : (
        // Модель карьерного самосвала
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.2, 0.8, 2.0]} />
          <meshStandardMaterial color={vehicle.color} metalness={0.2} />
        </mesh>
      )}

      {/* Бейдж с номером */}
      <Text position={[0, 1.8, 0]} fontSize={0.4} color="#ffffff" anchorX="center" anchorY="middle">
        {vehicle.name}
      </Text>
    </group>
  );
}

export function OpenPit3DScene() {
  return (
    <div className="w-full h-full min-h-[420px] rounded-xl overflow-hidden relative bg-slate-900 border border-slate-800">
      <div className="absolute top-4 left-4 z-10 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/50 text-xs font-mono text-emerald-400 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        3D ЦМК КАРЬЕРА (OPENGL/THREE.JS)
      </div>

      <Canvas camera={{ position: [16, 14, 20], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[20, 30, 15]} intensity={1.2} castShadow />
        <pointLight position={[-10, 10, -10]} intensity={0.5} />

        <QuarryTerrain />

        {mockVehicles.map((v) => (
          <MovingTruck key={v.id} vehicle={v} />
        ))}

        <OrbitControls makeDefault enableDamping dampingFactor={0.05} maxPolarAngle={Math.PI / 2.1} />
        <gridHelper args={[40, 20, '#f59e0b', '#334155']} position={[0, -2.75, 0]} />
      </Canvas>
    </div>
  );
}
