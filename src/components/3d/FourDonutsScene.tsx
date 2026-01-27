import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { DONUT_THEMES } from '@/types/donut';
import DonutModel from '@/components/3d/DonutModel';
import * as THREE from 'three';

export default function FourDonutsScene() {
    const groupRef = useRef<THREE.Group>(null);

    // Layout: 2x2 Grid
    // Spacing: Horizontal 5, Vertical 4
    const donuts = [
        { ...DONUT_THEMES[0], position: [-2.5, 1.8, 0] }, // Top Left (Pink)
        { ...DONUT_THEMES[1], position: [2.5, 1.8, 0] },  // Top Right (Blue)
        { ...DONUT_THEMES[2], position: [-2.5, -1.8, 0] }, // Bottom Left (Yellow)
        { ...DONUT_THEMES[3], position: [2.5, -1.8, 0] },  // Bottom Right (Purple)
    ];

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.elapsedTime;

        // Rotate the entire group slightly creates a nice parallax feel
        groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
        groupRef.current.rotation.z = Math.cos(time * 0.15) * 0.05;
    });

    return (
        <group ref={groupRef}>
            {donuts.map((donut, index) => (
                <DonutModel
                    key={donut.id}
                    modelPath={donut.modelPath}
                    position={donut.position as [number, number, number]}
                    scale={2.2} // Good size for grid
                    rotationSpeed={0.4}
                    floatIntensity={0.3}
                />
            ))}
        </group>
    );
}
