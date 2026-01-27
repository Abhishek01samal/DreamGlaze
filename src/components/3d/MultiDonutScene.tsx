import { Canvas } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import DonutModel from './DonutModel';

export default function MultiDonutScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.6} />

        {/* Pink - Front left */}
        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
          <DonutModel
            modelPath="/models/pink-donut.glb"
            scale={1.8}
            position={[-4, 1, 2]}
            rotationSpeed={0.15}
          />
        </Float>

        {/* Blue - Back right */}
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
          <DonutModel
            modelPath="/models/blue-donut.glb"
            scale={1.5}
            position={[5, 2, -3]}
            rotationSpeed={0.2}
          />
        </Float>

        {/* Yellow - Center back */}
        <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1}>
          <DonutModel
            modelPath="/models/yellow-donut.glb"
            scale={1.3}
            position={[0, -1, -2]}
            rotationSpeed={0.25}
          />
        </Float>

        {/* Purple - Front right */}
        <Float speed={1.4} rotationIntensity={0.35} floatIntensity={1.1}>
          <DonutModel
            modelPath="/models/purple-donut.glb"
            scale={1.6}
            position={[3, 0, 1]}
            rotationSpeed={0.18}
          />
        </Float>

        <ContactShadows
          position={[0, -3, 0]}
          opacity={0.3}
          scale={20}
          blur={2}
          far={5}
        />

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
