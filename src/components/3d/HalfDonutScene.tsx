import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { DONUT_THEMES, DonutFlavor } from '@/types/donut';

interface HalfDonutMeshProps {
  modelPath: string;
  rotationProgress: number; // 0 to 1
}

function HalfDonutMesh({ modelPath, rotationProgress }: HalfDonutMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);
  
  useEffect(() => {
    if (!groupRef.current) return;
    // Rotate based on scroll progress - creates the "half circle" reveal effect
    groupRef.current.rotation.z = rotationProgress * Math.PI;
    groupRef.current.rotation.y = rotationProgress * Math.PI * 0.5;
  }, [rotationProgress]);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    // Subtle floating motion
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.2;
  });

  return (
    <group ref={groupRef} scale={6} position={[3, 0, 0]}>
      <primitive object={scene.clone()} />
    </group>
  );
}

interface HalfDonutSceneProps {
  flavor: DonutFlavor;
  rotationProgress: number;
  className?: string;
}

export default function HalfDonutScene({ flavor, rotationProgress, className }: HalfDonutSceneProps) {
  const theme = DONUT_THEMES.find(t => t.id === flavor) || DONUT_THEMES[0];

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} />
        <spotLight position={[0, 8, 0]} angle={0.4} penumbra={1} intensity={0.8} />

        <Suspense fallback={null}>
          <HalfDonutMesh
            key={theme.modelPath}
            modelPath={theme.modelPath}
            rotationProgress={rotationProgress}
          />
        </Suspense>

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
