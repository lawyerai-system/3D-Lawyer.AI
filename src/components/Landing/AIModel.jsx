import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const MorphingConstellation = () => {
    const pointsRef = useRef();
    const particleCount = 8000;
    
    // Using refs for crucial animation data to avoid React state delays and jitter
    const targetRef = useRef(0);
    const phaseRef = useRef('stable'); // 'stable', 'exploding', 'combining'
    const timerRef = useRef(0);

    // --- High-Scale Logic for Large-Impact Shapes ---
    const targets = useMemo(() => {
        const addPos = (arr, i, x, y, z) => {
            arr[i * 3] = x;
            arr[i * 3 + 1] = y;
            arr[i * 3 + 2] = z;
        };

        const shapes = Array.from({ length: 11 }, () => new Float32Array(particleCount * 3));
        const chaos = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            // Chaos (Full Frustum Explosion)
            addPos(chaos, i, (Math.random() - 0.5) * 120, (Math.random() - 0.5) * 70, (Math.random() - 0.5) * 50);

            // Shape 0: BRAIN
            const bR = 6.5 * Math.pow(Math.random(), 1 / 3);
            addPos(shapes[0], i, bR * Math.sin(Math.acos(2 * Math.random() - 1)) * Math.cos(Math.random() * Math.PI * 2), bR * Math.sin(Math.acos(2 * Math.random() - 1)) * Math.sin(Math.random() * Math.PI * 2) * 1.3, bR * Math.cos(Math.acos(2 * Math.random() - 1)));

            // Shape 1: SCALES
            const sSec = Math.random();
            if (sSec < 0.3) addPos(shapes[1], i, (Math.random() - 0.5) * 16, 4.5, 0); 
            else if (sSec < 0.45) addPos(shapes[1], i, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 14, 0); 
            else { const side = Math.random() > 0.5 ? 6.5 : -6.5; addPos(shapes[1], i, side + 2.5 * Math.cos(Math.random() * Math.PI * 2), -4 - 2 * Math.random(), 0); };

            // Shape 2: GAVEL
            if (Math.random() < 0.6) addPos(shapes[2], i, (Math.random() - 0.5) * 15, -2, 0);
            else addPos(shapes[2], i, 6.5 + (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 4);

            // Shape 3: SHIELD
            const shU = Math.random() * 2 - 1, shV = Math.random() * 2 - 1;
            addPos(shapes[3], i, shU * 7.5, (1 - shU * shU) * 6 - (shV * shV) * 0.5 - 4, (Math.random() - 0.5) * 1.5);

            // Shape 4: BOOK
            const bkU = Math.random() - 0.5, bkV = Math.random() - 0.5;
            addPos(shapes[4], i, bkU * 15 + (bkU > 0 ? 0.8 : -0.8), bkV * 16, Math.abs(bkU) * 2.5);

            // Shape 5: COURTHOUSE
            const chS = Math.random();
            if (chS < 0.4) addPos(shapes[5], i, (Math.random() - 0.5) * 16, -6 + Math.random() * 4, 0);
            else if (chS < 0.8) { 
                const ci = Math.floor(Math.random() * 4);
                addPos(shapes[5], i, -6 + ci * 4 + (Math.random() - 0.5) * 0.8, -2 + (Math.random() - 0.5) * 8, 0);
            } else addPos(shapes[5], i, (Math.random() - 0.5) * 20 * (1 - Math.random()), 4.5 + Math.random() * 4, 0);

            // Shape 6: FOUNTAIN PEN
            if (Math.random() < 0.8) addPos(shapes[6], i, (Math.random() - 0.5) * 16, (Math.random() - 0.5) * 1.5, 0);
            else addPos(shapes[6], i, 8 + Math.random() * 4, (Math.random() - 0.5) * (4 - (Math.random() * 4)), 0);

            // Shape 7: PARAGRAPH §
            const pTh = Math.random() * Math.PI * 2.5;
            addPos(shapes[7], i, Math.cos(pTh) * 5, (pTh - 3) * 3, Math.sin(pTh) * 1.5);

            // Shape 8: HOURGLASS
            const hU = Math.random() - 0.5, hV = Math.random() - 0.5;
            if (Math.abs(hU) < Math.abs(hV)) addPos(shapes[8], i, hU * 16 * Math.abs(hV), hV * 16, 0);
            else addPos(shapes[8], i, hU * 16, hV * 16 * Math.abs(hU), 0);

            // Shape 9: LOCK
            const lSec = Math.random();
            if (lSec < 0.6) addPos(shapes[9], i, (Math.random() - 0.5) * 10, -4 + (Math.random() - 0.5) * 8, 0);
            else { const lTh = Math.random() * Math.PI; addPos(shapes[9], i, Math.cos(lTh) * 4, 3.5 + Math.sin(lTh) * 4, 0); }

            // Shape 10: STAR
            const stI = Math.floor(Math.random() * 5), stR = i % 2 === 0 ? 8 : 4;
            addPos(shapes[10], i, Math.cos((stI / 5) * Math.PI * 2) * stR, Math.sin((stI / 5) * Math.PI * 2) * stR, 0);
        }

        return { shapes, chaos };
    }, []);

    useFrame((state, delta) => {
        const positions = pointsRef.current.geometry.attributes.position.array;
        const time = state.clock.getElapsedTime();
        timerRef.current += delta;

        // --- INTERNAL STATE MACHINE (DETERMINISTIC) ---
        // 0-6s: Stable at TargetIndex
        // 6-7s: Explode To Chaos
        // 7s precisely: SWITCH TARGETINDEX
        // 7s-9s: Combine To NEW TargetIndex
        // 9s: Reset timer
        
        const cycleTime = 9.0;
        const localTime = timerRef.current % cycleTime;
        
        let targetPosArr;
        let lerpSpeed = 0.02;

        if (localTime < 6.0) {
            // STABLE PHASE
            phaseRef.current = 'stable';
            targetPosArr = targets.shapes[targetRef.current];
            lerpSpeed = 0.025;
        } else if (localTime < 7.0) {
            // EXPLOSION PHASE
            phaseRef.current = 'exploding';
            targetPosArr = targets.chaos;
            lerpSpeed = 0.12; // VERY FAST EXPLOSION
        } else {
            // COMBINING PHASE
            // Logic to switch target exactly once at 7s mark
            if (phaseRef.current !== 'combining') {
                targetRef.current = (targetRef.current + 1) % targets.shapes.length;
                phaseRef.current = 'combining';
            }
            targetPosArr = targets.shapes[targetRef.current];
            lerpSpeed = 0.07; // Fast pull-in to the NEW shape
        }

        for (let i = 0; i < particleCount * 3; i++) {
            const shimmer = Math.sin(time * 3 + (i % 500)) * 0.01;
            positions[i] += (targetPosArr[i] - positions[i]) * lerpSpeed + shimmer;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        pointsRef.current.rotation.y = time * 0.1;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={new Float32Array(targets.shapes[0])}
                    itemSize={3}
                />
            </bufferGeometry>
            <PointMaterial
                transparent
                color="#6c5dd3"
                size={0.16} // EVEN BIGGER PARTICLES as requested
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

const AIModel = () => {
    return (
        <div style={{ 
            width: '100%', 
            height: '100%', 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            zIndex: 0,
            opacity: 0.95
        }}>
            <Canvas camera={{ position: [0, 0, 30], fov: 35 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={2.5} />
                <MorphingConstellation />
            </Canvas>
        </div>
    );
};

export default AIModel;
