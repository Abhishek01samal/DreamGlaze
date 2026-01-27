import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';
import { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { DONUT_THEMES, DonutFlavor } from '@/types/donut';

interface PortalDonutProps {
  modelPath: string;
  scrollProgress: number;
  rotationDirection: 'forward' | 'reverse';
}

function PortalDonut({ modelPath, scrollProgress, rotationDirection }: PortalDonutProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);
  const { viewport } = useThree();

  // Calculate scale based on scroll - starts small, grows huge to fill screen
  const baseScale = Math.min(viewport.width, viewport.height) * 0.15;

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;
    const directionMultiplier = rotationDirection === 'forward' ? 1 : -1;

    // Scale from massive to normal as scroll progresses (Reversed)
    const scaleProgress = Math.pow(1 - scrollProgress, 0.5); // 1 to 0
    const scale = baseScale * (1 + scaleProgress * 15); // Large to small
    groupRef.current.scale.setScalar(scale);

    // Rotate to show front face (Fixed orientation)
    // Assuming model is flat-laid, rotate X to face camera.
    // Adjust these values if the specific model needs different orientation.
    groupRef.current.rotation.x = 0.5; // Tilt slightly to show top/face
    groupRef.current.rotation.y = 0;   // No spinning
    groupRef.current.rotation.z = 0;   // No spinning

    // Slight sway for liveliness instead of full spin
    groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
    groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;

    // Move away from camera as scroll progresses (Reversed)
    // Was: -5 + scrollProgress * 20 (Deep to Close?) -> Wait, zPosition was increasing.
    // UseThree default camera is at z=5 (from line 67: [0, 0, 8] actually, looked at Canvas)
    // Wait, line 67 in DonutPortal says camera at [0, 0, 8].
    // Original zPosition: -5 + scrollProgress * 20.
    // At 0: -5. At 1: 15.
    // So it moved from -5 (behind/far) to 15 (past camera?).

    // User wants: Big when enter (scroll 0) -> Small when left (scroll 1).
    // So at scroll 0, it should be CLOSE (high Z) or LARGE SCALE.
    // At scroll 1, it should be FAR (low Z) or SMALL SCALE.

    // Move away from camera as scroll progresses (Reversed)
    // Camera is at Z=8. We start at Z=5 (Normal/Original) and move to Z=-10 (Far/Small)
    const zPosition = 5 - scrollProgress * 15;
    groupRef.current.position.z = zPosition;

    // Slight wobble
    groupRef.current.position.y = Math.sin(time * 2) * 0.2 * (1 - scrollProgress);
    groupRef.current.position.x = Math.cos(time * 1.5) * 0.1 * (1 - scrollProgress);
  });

  const clonedScene = useMemo(() => scene.clone(), [scene]);

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
  );
}

interface DonutPortalProps {
  flavor: DonutFlavor;
  scrollProgress: number;
  rotationDirection: 'forward' | 'reverse';
  className?: string;
}

export default function DonutPortal({ flavor, scrollProgress, rotationDirection, className }: DonutPortalProps) {
  const theme = DONUT_THEMES.find(t => t.id === flavor) || DONUT_THEMES[0];

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, -5, -5]} intensity={0.6} />
        <pointLight position={[0, 0, 5]} intensity={2} color={`hsl(${theme.id === 'pink' ? 340 : theme.id === 'blue' ? 175 : theme.id === 'yellow' ? 48 : 270}, 80%, 70%)`} />

        <Suspense fallback={null}>
          <PortalDonut
            key={theme.modelPath}
            modelPath={theme.modelPath}
            scrollProgress={scrollProgress}
            rotationDirection={rotationDirection}
          />
        </Suspense>

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
