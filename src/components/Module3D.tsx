import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { useModule } from '../context/ModuleContext';

const DEPTH = 100;

function ModuleGeometry() {
  const { params } = useModule();
  const { width, height, finish } = params;

  const materialProps = useMemo(() => {
    if (finish === 'metal') {
      return {
        color: '#c0c0c0',
        metalness: 0.8,
        roughness: 0.2,
      };
    } else {
      return {
        color: '#8b4513',
        metalness: 0.1,
        roughness: 0.8,
      };
    }
  }, [finish]);

  const panelThickness = 20;

  return (
    <group>
      {/* Top panel (width × depth) */}
      <mesh
        position={[0, height / 2 - panelThickness / 2 , 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[width, panelThickness, DEPTH]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Bottom panel (width × depth) */}
      <mesh
        position={[0, -height / 2 + panelThickness / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[width, panelThickness, DEPTH]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Front panel (width × height) */}
      <mesh
        position={[0, 0, DEPTH / 2 - panelThickness / 2]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[width, height, panelThickness]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Back panel (width × height) */}
      <mesh
        position={[0, 0, -DEPTH / 2 + panelThickness / 2]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[width, height, panelThickness]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Left side panel (height × depth) */}
      <mesh
        position={[-width / 2 + panelThickness / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[panelThickness, height, DEPTH]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Right side panel (height × depth) */}
      <mesh
        position={[width / 2 - panelThickness / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[panelThickness, height, DEPTH]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
    </group>
  );
}

export function Module3D() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#1a1a1a' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[800, 600, 800]} fov={50} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <Environment preset="city" />
        <ModuleGeometry />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={200}
          maxDistance={2000}
        />
        <gridHelper args={[1000, 20]} />
      </Canvas>
    </div>
  );
}

