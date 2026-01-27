import { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface DonutModelProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotationSpeed?: number;
  floatIntensity?: number;
}

function DonutMesh({ modelPath, scale = 1, position = [0, 0, 0], rotationSpeed = 0.3, floatIntensity = 0.5 }: DonutModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Gentle rotation
    groupRef.current.rotation.y = time * rotationSpeed;
    groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    
    // Floating motion
    groupRef.current.position.y = position[1] + Math.sin(time * 0.8) * floatIntensity;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive object={scene.clone()} />
    </group>
  );
}

export default function DonutModel(props: DonutModelProps) {
  return (
    <Suspense fallback={null}>
      <DonutMesh {...props} />
    </Suspense>
  );
}

// Preload all donut models
useGLTF.preload('/models/pink-donut.glb');
useGLTF.preload('/models/blue-donut.glb');
useGLTF.preload('/models/yellow-donut.glb');
useGLTF.preload('/models/purple-donut.glb');
