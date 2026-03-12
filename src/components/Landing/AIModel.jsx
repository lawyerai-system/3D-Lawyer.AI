import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const BrainParticles = () => {
    const pointsRef = useRef();

    // Create random particles in a sphere shape
    const particleCount = 4000;
    const positions = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
            const phi = THREE.MathUtils.randFloat(0, Math.PI);
            const r = 2.5 * Math.pow(Math.random(), 1 / 3);

            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
        }
        return pos;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        pointsRef.current.rotation.y = time * 0.1;
        pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.2;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <PointMaterial
                transparent
                color="#6c5dd3"
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

const NeuralLines = () => {
    const linesRef = useRef();
    const count = 30;

    const lines = useMemo(() => {
        const l = [];
        for (let i = 0; i < count; i++) {
            const start = new THREE.Vector3(
                THREE.MathUtils.randFloatSpread(4),
                THREE.MathUtils.randFloatSpread(4),
                THREE.MathUtils.randFloatSpread(4)
            );
            const end = new THREE.Vector3(
                THREE.MathUtils.randFloatSpread(4),
                THREE.MathUtils.randFloatSpread(4),
                THREE.MathUtils.randFloatSpread(4)
            );
            l.push({ start, end });
        }
        return l;
    }, []);

    useFrame((state) => {
        linesRef.current.rotation.y += 0.002;
    });

    return (
        <group ref={linesRef}>
            {lines.map((line, i) => (
                <line key={i}>
                    <bufferGeometry attach="geometry">
                        <bufferAttribute
                            attach="attributes-position"
                            count={2}
                            array={new Float32Array([...line.start.toArray(), ...line.end.toArray()])}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial attach="material" color="#6c5dd3" opacity={0.3} transparent />
                </line>
            ))}
        </group>
    );
};

const AIModel = () => {
    return (
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <BrainParticles />
                <NeuralLines />
            </Canvas>
        </div>
    );
};

export default AIModel;
