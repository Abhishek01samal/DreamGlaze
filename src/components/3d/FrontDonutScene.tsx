import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, useGLTF, Float } from '@react-three/drei';
import { Suspense, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { DONUT_THEMES, DonutFlavor } from '@/types/donut';

interface FrontDonutMeshProps {
  modelPath: string;
  rotationDirection: 'forward' | 'reverse';
  isTransitioning: boolean;
}

function FrontDonutMesh({ modelPath, rotationDirection, isTransitioning }: FrontDonutMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);
  const [targetRotation, setTargetRotation] = useState(0);
  
  useEffect(() => {
    if (isTransitioning) {
      // On transition, add a big rotation in the appropriate direction
      const rotationAmount = rotationDirection === 'forward' ? Math.PI * 2 : -Math.PI * 2;
      setTargetRotation(prev => prev + rotationAmount);
    }
  }, [isTransitioning, rotationDirection]);
  
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime;
    const directionMultiplier = rotationDirection === 'forward' ? 1 : -1;
    
    // Base continuous rotation
    const baseRotation = time * 0.4 * directionMultiplier;
    
    // Smooth transition rotation
    const currentY = groupRef.current.rotation.y;
    const targetY = baseRotation + targetRotation;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(currentY, targetY, delta * 2);
    
    // Tilt for 3D effect
    groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.15 + 0.3;
    groupRef.current.rotation.z = Math.cos(time * 0.3) * 0.1;
    
    // Subtle floating
    groupRef.current.position.y = Math.sin(time * 0.8) * 0.2;
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.3}
      floatIntensity={0.5}
    >
      <group ref={groupRef} scale={5} position={[0, 0, 0]}>
        <primitive object={scene.clone()} />
      </group>
    </Float>
  );
}

interface FrontDonutSceneProps {
  flavor: DonutFlavor;
  rotationDirection: 'forward' | 'reverse';
  isTransitioning: boolean;
  className?: string;
}

export default function FrontDonutScene({ flavor, rotationDirection, isTransitioning, className }: FrontDonutSceneProps) {
  const theme = DONUT_THEMES.find(t => t.id === flavor) || DONUT_THEMES[0];

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} />
        <spotLight position={[0, 8, 0]} angle={0.4} penumbra={1} intensity={1} castShadow />
        <pointLight position={[0, 0, 5]} intensity={1.5} color={`hsl(${theme.id === 'pink' ? 340 : theme.id === 'blue' ? 175 : theme.id === 'yellow' ? 48 : 270}, 80%, 70%)`} />

        <Suspense fallback={null}>
          <FrontDonutMesh
            key={theme.modelPath}
            modelPath={theme.modelPath}
            rotationDirection={rotationDirection}
            isTransitioning={isTransitioning}
          />
        </Suspense>

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
