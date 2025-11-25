// ==================== ParticleSystem.jsx ====================
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getParticleConfig, PARTICLE_DEBUG } from './particleConfig';

export default function ParticleSystem({
    targetObject,      // Mesh object yang jadi target
    objectName,        // Nama objek (untuk config)
    isHovered = false, // Boolean hover state
    hoverPoint = null, // Vector3 posisi cursor di 3D
    isClicked = false  // Boolean click state
}) {
    const instancedMeshRef = useRef();
    const particlesDataRef = useRef([]);
    const timeRef = useRef(0);
    const clickAnimationRef = useRef({ active: false, time: 0 });

    // Get configuration untuk objek ini
    const config = useMemo(() => getParticleConfig(objectName), [objectName]);

    // Initialize particles
    useEffect(() => {
        if (!targetObject) return;

        // Calculate bounding box untuk distribusi partikel
        const box = new THREE.Box3().setFromObject(targetObject);
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);

        const scale = config.distributionScale || 1.5;

        console.log(`[${objectName}] Distribution: ${config.distributionMode}, Size:`, {
            x: size.x.toFixed(2),
            y: size.y.toFixed(2),
            z: size.z.toFixed(2),
            scale
        });

        // Initialize particle data dengan distribution mode
        particlesDataRef.current = Array.from({ length: config.count }, () => {
            let offsetX, offsetY, offsetZ;

            // === DISTRIBUTION MODES ===
            switch (config.distributionMode) {
                case 'volume':
                    // Partikel tersebar di dalam volume (box)
                    offsetX = (Math.random() - 0.5) * size.x * scale;
                    offsetY = (Math.random() - 0.5) * size.y * scale;
                    offsetZ = (Math.random() - 0.5) * size.z * scale;
                    break;

                case 'surface':
                    // Partikel di permukaan objek (shell)
                    const face = Math.floor(Math.random() * 6);
                    const u = (Math.random() - 0.5) * scale;
                    const v = (Math.random() - 0.5) * scale;

                    switch (face) {
                        case 0: // Front
                            offsetX = u * size.x;
                            offsetY = v * size.y;
                            offsetZ = size.z * 0.5 * scale;
                            break;
                        case 1: // Back
                            offsetX = u * size.x;
                            offsetY = v * size.y;
                            offsetZ = -size.z * 0.5 * scale;
                            break;
                        case 2: // Top
                            offsetX = u * size.x;
                            offsetY = size.y * 0.5 * scale;
                            offsetZ = v * size.z;
                            break;
                        case 3: // Bottom
                            offsetX = u * size.x;
                            offsetY = -size.y * 0.5 * scale;
                            offsetZ = v * size.z;
                            break;
                        case 4: // Right
                            offsetX = size.x * 0.5 * scale;
                            offsetY = u * size.y;
                            offsetZ = v * size.z;
                            break;
                        case 5: // Left
                            offsetX = -size.x * 0.5 * scale;
                            offsetY = u * size.y;
                            offsetZ = v * size.z;
                            break;
                    }
                    break;

                case 'edges':
                    // Partikel di sepanjang edges (wireframe style)
                    const edge = Math.floor(Math.random() * 12);
                    const t = Math.random();
                    const halfX = size.x * 0.5 * scale;
                    const halfY = size.y * 0.5 * scale;
                    const halfZ = size.z * 0.5 * scale;

                    if (edge < 4) { // Bottom edges
                        const angle = edge * Math.PI / 2;
                        offsetX = Math.cos(angle) * halfX;
                        offsetY = -halfY;
                        offsetZ = Math.sin(angle) * halfZ;
                    } else if (edge < 8) { // Top edges
                        const angle = (edge - 4) * Math.PI / 2;
                        offsetX = Math.cos(angle) * halfX;
                        offsetY = halfY;
                        offsetZ = Math.sin(angle) * halfZ;
                    } else { // Vertical edges
                        const corner = edge - 8;
                        const angle = corner * Math.PI / 2;
                        offsetX = Math.cos(angle) * halfX;
                        offsetY = (t - 0.5) * size.y * scale;
                        offsetZ = Math.sin(angle) * halfZ;
                    }
                    break;

                default: // Fallback to volume
                    offsetX = (Math.random() - 0.5) * size.x * scale;
                    offsetY = (Math.random() - 0.5) * size.y * scale;
                    offsetZ = (Math.random() - 0.5) * size.z * scale;
            }

            return {
                // Base position (relative to target center)
                baseX: offsetX,
                baseY: offsetY,
                baseZ: offsetZ,

                // Current position
                x: offsetX,
                y: offsetY,
                z: offsetZ,

                // Floating animation offset
                floatOffset: Math.random() * Math.PI * 2,
                floatSpeed: 0.5 + Math.random() * 0.5,

                // Hover interaction
                hoverVelocityX: 0,
                hoverVelocityY: 0,
                hoverVelocityZ: 0,
                reactToHover: Math.random() < config.hoverAffectRatio,

                // Burst animation
                burstVelocityX: 0,
                burstVelocityY: 0,
                burstVelocityZ: 0,
            };
        });

        // Set initial positions
        updateParticlePositions(0, center);

    }, [targetObject, objectName, config.count, config.hoverAffectRatio, config.distributionMode, config.distributionScale]);

    // Trigger click animation
    useEffect(() => {
        if (isClicked) {
            console.log(`[${objectName}] BURST TRIGGERED!`);
            clickAnimationRef.current = { active: true, time: 0 };

            // Initialize burst velocities with stronger force
            particlesDataRef.current.forEach(p => {
                const angle = Math.random() * Math.PI * 2;
                const elevation = (Math.random() - 0.5) * Math.PI * 0.5;
                const strength = config.burstSpeed * (0.7 + Math.random() * 0.6); // More variation

                p.burstVelocityX = Math.cos(angle) * Math.cos(elevation) * strength;
                p.burstVelocityY = Math.sin(elevation) * strength;
                p.burstVelocityZ = Math.sin(angle) * Math.cos(elevation) * strength;
            });
        }
    }, [isClicked, config.burstSpeed, objectName]);

    // Update particle positions
    const updateParticlePositions = (time, targetCenter) => {
        if (!instancedMeshRef.current) return;

        const matrix = new THREE.Matrix4();
        const position = new THREE.Vector3();
        const scale = new THREE.Vector3(1, 1, 1);
        const quaternion = new THREE.Quaternion();

        particlesDataRef.current.forEach((particle, i) => {
            // 1. BASE FLOATING ANIMATION (more aggressive!)
            const floatTime = time * particle.floatSpeed * config.floatSpeed;
            const floatY = Math.sin(floatTime + particle.floatOffset) * config.floatAmplitude;
            const floatX = Math.cos(floatTime * 0.7 + particle.floatOffset) * config.floatAmplitude * 0.8;
            const floatZ = Math.sin(floatTime * 0.4 + particle.floatOffset * 2) * config.floatAmplitude * 0.6;

            particle.x = particle.baseX + floatX;
            particle.y = particle.baseY + floatY;
            particle.z = particle.baseZ + floatZ;

            // 2. HOVER MAGNETIC EFFECT (FIXED!)
            if (isHovered && hoverPoint && particle.reactToHover) {
                const dx = hoverPoint.x - (targetCenter.x + particle.x);
                const dy = hoverPoint.y - (targetCenter.y + particle.y);
                const dz = hoverPoint.z - (targetCenter.z + particle.z);
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (distance < config.hoverRadius) {
                    // Stronger magnetic force!
                    const force = (1 - distance / config.hoverRadius) * config.hoverMagnetStrength;
                    particle.hoverVelocityX += dx * force * 0.3; // Increased from 0.1
                    particle.hoverVelocityY += dy * force * 0.3;
                    particle.hoverVelocityZ += dz * force * 0.3;
                }
            }

            // Apply hover velocity with less damping (more visible movement)
            particle.x += particle.hoverVelocityX;
            particle.y += particle.hoverVelocityY;
            particle.z += particle.hoverVelocityZ;

            // Less damping = more visible movement
            if (isHovered && particle.reactToHover) {
                particle.hoverVelocityX *= 0.85; // Was 0.9
                particle.hoverVelocityY *= 0.85;
                particle.hoverVelocityZ *= 0.85;
            } else {
                // Return to base faster when not hovering
                particle.hoverVelocityX *= 0.8;
                particle.hoverVelocityY *= 0.8;
                particle.hoverVelocityZ *= 0.8;
            }

            // 3. CLICK BURST ANIMATION (FIXED!)
            if (clickAnimationRef.current.active) {
                particle.x += particle.burstVelocityX * 0.016;
                particle.y += particle.burstVelocityY * 0.016;
                particle.z += particle.burstVelocityZ * 0.016;

                // Decay burst velocity
                particle.burstVelocityX *= 0.92; // Less decay = more visible
                particle.burstVelocityY *= 0.92;
                particle.burstVelocityZ *= 0.92;
            }

            // 4. SET POSITION (CRITICAL: Use world position that updates every frame!)
            position.set(
                targetCenter.x + particle.x,
                targetCenter.y + particle.y,
                targetCenter.z + particle.z
            );

            // Apply matrix
            matrix.compose(position, quaternion, scale);
            instancedMeshRef.current.setMatrixAt(i, matrix);
        });

        instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    };

    // Animation loop
    useFrame((state, delta) => {
        if (!targetObject || !instancedMeshRef.current) return;

        timeRef.current += delta;

        // Debug hover state
        if (isHovered && PARTICLE_DEBUG) {
            console.log(`[${objectName}] HOVERING at`, hoverPoint);
        }

        // Update click animation timer
        if (clickAnimationRef.current.active) {
            clickAnimationRef.current.time += delta;
            if (clickAnimationRef.current.time > config.burstDuration) {
                clickAnimationRef.current.active = false;
                console.log(`[${objectName}] Burst animation complete`);
            }
        }

        // CRITICAL: Get current target center (updates every frame to follow animation!)
        targetObject.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(targetObject);
        const center = new THREE.Vector3();
        box.getCenter(center);

        updateParticlePositions(timeRef.current, center);
    });

    // Geometry and Material
    const geometry = useMemo(() =>
        new THREE.SphereGeometry(config.size, 8, 8),
        [config.size]
    );

    const material = useMemo(() =>
        new THREE.MeshBasicMaterial({
            color: config.color,
            transparent: true,
            opacity: config.opacity,
            emissive: config.color,
            emissiveIntensity: config.emissiveIntensity,
            toneMapped: false, // Important for glow effect
            depthWrite: false,
        }),
        [config.color, config.opacity, config.emissiveIntensity]
    );

    if (!targetObject) return null;

    return (
        <>
            <instancedMesh
                ref={instancedMeshRef}
                args={[geometry, material, config.count]}
                frustumCulled={false}
            />

            {/* Debug: Show target center */}
            {PARTICLE_DEBUG && (
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.05, 16, 16]} />
                    <meshBasicMaterial color={0xffff00} />
                </mesh>
            )}
        </>
    );
}