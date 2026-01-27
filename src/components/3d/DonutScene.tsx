import { Canvas } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import DonutModel from './DonutModel';
import { DONUT_THEMES, DonutFlavor } from '@/types/donut';

interface DonutSceneProps {
  flavor: DonutFlavor;
  className?: string;
}

export default function DonutScene({ flavor, className }: DonutSceneProps) {
  const theme = DONUT_THEMES.find(t => t.id === flavor) || DONUT_THEMES[0];

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={0.4} />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.8}
          castShadow
        />

        <Float
          speed={2}
          rotationIntensity={0.5}
          floatIntensity={1}
        >
          <DonutModel
            key={theme.modelPath}
            modelPath={theme.modelPath}
            scale={2.5}
            position={[0, 0, 0]}
            rotationSpeed={0.2}
            floatIntensity={0}
          />
        </Float>

        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4}
        />

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
