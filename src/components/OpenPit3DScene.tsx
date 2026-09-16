import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

// 3D Модель карьерного экскаватора (ЭКГ-5А)
function ExcavatorModel({ position, name }: { position: [number, number, number]; name: string }) {
  return (
    <group position={position}>
      {/* Гусеничная тележка */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.8, 3.2]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>
      {/* Поворотная платформа (яркий карьерный желтый) */}
      <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 1.0, 2.8]} />
        <meshStandardMaterial color="#d97706" roughness={0.5} />
      </mesh>
      {/* Кабина машиниста */}
      <mesh position={[0.7, 2.0, 0.6]} castShadow>
        <boxGeometry args={[0.7, 0.7, 0.9]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} />
      </mesh>
      {/* Стрела */}
      <mesh position={[-0.2, 2.4, 1.6]} rotation={[0.6, 0, 0]} castShadow>
        <boxGeometry args={[0.3, 3.2, 0.3]} />
        <meshStandardMaterial color="#334155" roughness={0.7} />
      </mesh>
      {/* Метка над техникой */}
      <Text
        position={[0, 3.2, 0]}
        fontSize={0.45}
        color="#0f172a"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
}

// 3D Модель карьерного самосвала (БелАЗ-75131)
function HaulTruckModel({
  position,
  rotation,
  code,
  loaded,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  code: string;
  loaded: boolean;
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Шасси и колеса */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.7, 3.0]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>
      {/* Кабина самосвала */}
      <mesh position={[-0.5, 1.2, 1.0]} castShadow>
        <boxGeometry args={[0.7, 0.8, 0.8]} />
        <meshStandardMaterial color="#d97706" roughness={0.4} />
      </mesh>
      {/* Кузов */}
      <mesh position={[0, 1.4, -0.4]} rotation={[-0.1, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.9, 2.4]} />
        <meshStandardMaterial color="#b45309" roughness={0.6} />
      </mesh>
      {/* Руда в кузове */}
      {loaded && (
        <mesh position={[0, 1.8, -0.4]} castShadow>
          <boxGeometry args={[1.7, 0.4, 2.1]} />
          <meshStandardMaterial color="#574c43" roughness={0.95} />
        </mesh>
      )}
      {/* Подпись борта */}
      <Text
        position={[0, 2.6, 0]}
        fontSize={0.4}
        color="#0f172a"
        anchorX="center"
        anchorY="middle"
      >
        {code}
      </Text>
    </group>
  );
}

// Уступы и горизонты карьера (Дневной естественный ландшафт)
function PitBenches() {
  return (
    <group>
      {/* Дно карьера (горизонт +1620) */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[10, 12, 1, 32]} />
        <meshStandardMaterial color="#8c7e6d" roughness={0.9} />
      </mesh>
      {/* Второй уступ (горизонт +1640) */}
      <mesh position={[0, 1, 0]} receiveShadow>
        <cylinderGeometry args={[18, 20, 1.2, 32]} />
        <meshStandardMaterial color="#9e9080" roughness={0.92} />
      </mesh>
      {/* Третий уступ (горизонт +1660) */}
      <mesh position={[0, 2.2, 0]} receiveShadow>
        <cylinderGeometry args={[26, 28, 1.4, 32]} />
        <meshStandardMaterial color="#b3a594" roughness={0.95} />
      </mesh>
      {/* Верхняя поверхность (горизонт +1680) */}
      <mesh position={[0, 3.4, 0]} receiveShadow>
        <cylinderGeometry args={[34, 36, 1.2, 32]} />
        <meshStandardMaterial color="#85996f" roughness={0.95} />
      </mesh>

      {/* Технологическая автодорога (серпантин) */}
      <mesh position={[6, 1.2, 5]} rotation={[-0.15, 0.6, 0]} receiveShadow>
        <boxGeometry args={[3.2, 0.1, 14]} />
        <meshStandardMaterial color="#64748b" roughness={0.9} />
      </mesh>
      <mesh position={[-6, 2.4, -4]} rotation={[0.15, -0.6, 0]} receiveShadow>
        <boxGeometry args={[3.2, 0.1, 16]} />
        <meshStandardMaterial color="#64748b" roughness={0.9} />
      </mesh>
    </group>
  );
}

export function OpenPit3DScene() {
  const [activeCamPreset, setActiveCamPreset] = useState<'free' | 'top' | 'bench'>('free');

  return (
    <div className="w-full h-full bg-slate-100 rounded-2xl border border-slate-200 relative overflow-hidden shadow-sm flex flex-col">
      {/* Переключатель ракурсов камеры */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <span className="text-[11px] font-bold text-slate-600 uppercase bg-white/95 px-2.5 py-1.5 rounded-xl border border-slate-200 shadow-sm">
          3D Камера:
        </span>
        <button
          onClick={() => setActiveCamPreset('free')}
          className={`px-3 py-1 rounded-xl text-xs font-semibold transition shadow-sm ${
            activeCamPreset === 'free'
              ? 'bg-blue-600 text-white font-bold'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          Свободный обзор
        </button>
        <button
          onClick={() => setActiveCamPreset('top')}
          className={`px-3 py-1 rounded-xl text-xs font-semibold transition shadow-sm ${
            activeCamPreset === 'top'
              ? 'bg-blue-600 text-white font-bold'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          План сверху (2D)
        </button>
      </div>

      <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-700 font-bold flex items-center gap-2 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        3D WebGL 60 FPS
      </div>

      <Canvas
        camera={{ position: [18, 16, 22], fov: 42 }}
        shadows
        className="w-full h-full"
      >
        {/* Дневной естественный свет */}
        <color attach="background" args={['#e2e8f0']} />
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[25, 35, 18]}
          intensity={1.3}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={80}
          shadow-camera-left={-25}
          shadow-camera-right={25}
          shadow-camera-top={25}
          shadow-camera-bottom={-25}
        />
        <hemisphereLight args={['#ffffff', '#cbd5e1', 0.6]} />

        {/* Уступы карьера */}
        <PitBenches />

        {/* Экскаваторы на горизонтах */}
        <ExcavatorModel position={[-3.5, 0.5, 2.5]} name="ЭКГ-5А #2 (+1620)" />
        <ExcavatorModel position={[7.5, 2.7, -4.5]} name="Hitachi EX3600 (+1660)" />

        {/* Самосвалы на маршрутах */}
        <HaulTruckModel
          position={[-1.2, 0.5, 2.0]}
          rotation={[0, 0.5, 0]}
          code="Борт #101"
          loaded={true}
        />
        <HaulTruckModel
          position={[5.5, 1.8, 3.5]}
          rotation={[0, -0.8, 0]}
          code="Борт #104"
          loaded={false}
        />
        <HaulTruckModel
          position={[4.8, 3.9, -6.5]}
          rotation={[0, 1.2, 0]}
          code="Борт #108"
          loaded={true}
        />

        <OrbitControls
          makeDefault
          maxPolarAngle={Math.PI / 2.05}
          minDistance={10}
          maxDistance={65}
        />
      </Canvas>
    </div>
  );
}
