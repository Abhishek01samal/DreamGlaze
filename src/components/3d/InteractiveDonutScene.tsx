import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ContactShadows, useGLTF, PresentationControls } from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';
import * as THREE from 'three';
import { DONUT_THEMES, DonutFlavor } from '@/types/donut';

interface DonutMeshProps {
  modelPath: string;
  isInteracting: boolean;
  onInteractionChange: (isInteracting: boolean) => void;
}

function DonutMesh({ modelPath, isInteracting, onInteractionChange }: DonutMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);

  useFrame((state) => {
    if (!groupRef.current || isInteracting) return;

    const time = state.clock.elapsedTime;

    // Smooth idle rotation when not being controlled
    groupRef.current.rotation.y = time * 0.3;
    groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    groupRef.current.position.y = Math.sin(time * 0.8) * 0.3;
  });

  return (
    <PresentationControls
      global
      rotation={[0.1, 0, 0]}
      polar={[-Math.PI / 4, Math.PI / 4]}
      azimuth={[-Math.PI / 2, Math.PI / 2]}
      config={{ mass: 2, tension: 400 }}
      snap={{ mass: 4, tension: 400 }}
    >
      <group
        ref={groupRef}
        scale={4}
        onPointerDown={() => onInteractionChange(true)}
        onPointerUp={() => onInteractionChange(false)}
        onPointerLeave={() => onInteractionChange(false)}
      >
        <primitive object={scene.clone()} />
      </group>
    </PresentationControls>
  );
}

interface InteractiveDonutSceneProps {
  flavor: DonutFlavor;
  className?: string;
}

export default function InteractiveDonutScene({ flavor, className }: InteractiveDonutSceneProps) {
  const [isInteracting, setIsInteracting] = useState(false);
  const theme = DONUT_THEMES.find(t => t.id === flavor) || DONUT_THEMES[0];

  return (
    <div className={`relative ${className}`}>
      {/* Circular container with glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-[90%] h-[90%] max-w-[600px] max-h-[600px] rounded-full"
          style={{
            background: `radial-gradient(circle, hsla(var(--donut-glow), 0.15) 0%, transparent 70%)`,
            boxShadow: `0 0 100px 20px hsla(var(--donut-glow), 0.2), inset 0 0 60px hsla(var(--donut-primary), 0.1)`,
          }}
        />
      </div>

      <Canvas
        dpr={1} // Hard cap to 1 for max FPS (avoid Retina scaling)
        performance={{ min: 0.8 }}
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance', stencil: false, depth: true }}
      >
        <ambientLight intensity={0.9} /> {/* Increased ambient since shadows are gone */}
        <directionalLight position={[10, 10, 5]} intensity={1.5} /> {/* No castShadow */}
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
        />

        <Suspense fallback={null}>
          <DonutMesh
            key={theme.modelPath}
            modelPath={theme.modelPath}
            isInteracting={isInteracting}
            onInteractionChange={setIsInteracting}
          />
        </Suspense>

        <ContactShadows
          position={[0, -3, 0]}
          opacity={0.5}
          scale={15}
          blur={2.5}
          far={5}
        />

        <Environment preset="studio" />
      </Canvas>

      {/* Hint text */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        <p className="text-sm text-muted-foreground opacity-70">
          {isInteracting ? 'Release to auto-rotate' : 'Drag to explore'}
        </p>
      </div>
    </div>
  );
}
