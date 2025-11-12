import React, { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Float, Sparkles, Text, PerspectiveCamera, Line } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, Vignette } from "@react-three/postprocessing";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

// Particle Field - Igloo style with depth layers
function ParticleField({ count = 2000 }) {
    const points = useRef();
    
    const particlesPosition = React.useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const radius = 30 + Math.random() * 70;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi) - 50;
        }
        return positions;
    }, [count]);

    useFrame((state) => {
        if (points.current) {
            points.current.rotation.y = state.clock.elapsedTime * 0.03;
            points.current.rotation.x = state.clock.elapsedTime * 0.01;
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particlesPosition}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                color="#00ff80"
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

// Background glow spheres for atmosphere
function BackgroundGlow() {
    return (
        <>
            <mesh position={[-20, 10, -40]}>
                <sphereGeometry args={[8, 32, 32]} />
                <meshBasicMaterial
                    color="#00ff80"
                    transparent
                    opacity={0.03}
                />
            </mesh>
            <mesh position={[25, -15, -50]}>
                <sphereGeometry args={[12, 32, 32]} />
                <meshBasicMaterial
                    color="#00cc66"
                    transparent
                    opacity={0.02}
                />
            </mesh>
            <mesh position={[0, 20, -60]}>
                <sphereGeometry args={[15, 32, 32]} />
                <meshBasicMaterial
                    color="#00ff80"
                    transparent
                    opacity={0.025}
                />
            </mesh>
        </>
    );
}

// 3D Laptop Model with 3 sections
function Laptop3D({ onClick, isHovered, setIsHovered, scrollSection, onPointerOver, onPointerOut }) {
    const group = useRef();
    const gltf = useGLTF("/macbook.glb");

    useFrame((state) => {
        if (!group.current) return;

        const time = state.clock.elapsedTime;

        // Section 0: Closed laptop, front view
        // Section 1: Open laptop
        // Section 2: Laptop tilted side view

        let targetRotX = 0;
        let targetRotY = time * 0.12;
        let targetRotZ = 0;
        let targetPosY = Math.sin(time * 0.4) * 0.1;
        let targetPosZ = 0;
        let targetScale = 0.25; // SMALLER like Igloo stone

        if (scrollSection === 1) {
            // Open laptop pose - wider
            targetRotX = -0.4;
            targetRotY = time * 0.1;
            targetRotZ = 0;
            targetPosY = Math.sin(time * 0.4) * 0.1;
            targetPosZ = 0;
            targetScale = 0.28;
        } else if (scrollSection === 2) {
            // Tilted side view - dramatic angle
            targetRotX = -0.2;
            targetRotY = time * 0.12 + Math.PI * 0.4;
            targetRotZ = 0.25;
            targetPosY = Math.sin(time * 0.4) * 0.1;
            targetPosZ = 0;
            targetScale = 0.3;
        } else if (scrollSection >= 3) {
            // Scroll 4: laptop exits upwards and fades
            targetRotX = -0.1;
            targetRotY = time * 0.08;
            targetRotZ = 0;
            targetPosY = 4; // fly out top
            targetPosZ = -2;
            targetScale = 0.2;
        }

        // VERY Smooth interpolation
        group.current.rotation.x += (targetRotX - group.current.rotation.x) * 0.08;
        group.current.rotation.y += (targetRotY - group.current.rotation.y) * 0.08;
        group.current.rotation.z += (targetRotZ - group.current.rotation.z) * 0.08;
        group.current.position.y += (targetPosY - group.current.position.y) * 0.08;
        group.current.position.z += (targetPosZ - group.current.position.z) * 0.08;

        const currentScale = group.current.scale.x;
        const newScale = currentScale + (targetScale - currentScale) * 0.08;
        group.current.scale.set(newScale, newScale, newScale);
    });

    if (gltf && gltf.scene) {
        return (
            <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
                <group
                    ref={group}
                    onClick={onClick}
                    onPointerOver={(event) => {
                        setIsHovered(true);
                        onPointerOver?.(event);
                    }}
                    onPointerOut={(event) => {
                        setIsHovered(false);
                        onPointerOut?.(event);
                    }}
                >
                    <primitive object={gltf.scene.clone()} scale={120} />

                    {/* Glow lights */}
                    <pointLight 
                        position={[0, 0, 2]} 
                        color="#00ff80" 
                        intensity={isHovered ? 5 : 3} 
                        distance={18} 
                    />
                    <pointLight 
                        position={[2, 2, 2]} 
                        color="#00ff80" 
                        intensity={1.5} 
                    />

                    <Sparkles
                        count={25}
                        scale={5}
                        size={1.2}
                        speed={0.3}
                        color="#00ff80"
                    />
                </group>
            </Float>
        );
    }

    return null;
}

// 3D Portal Component - Igloo.inc inspired gateway
function Portal3D({ scrollSection, onPortalClick, isActive = false, isAnimating = false, reveal = 0 }) {
    const portalRef = useRef();
    const textRef = useRef();
    const textMaterialRef = useRef();
    const portalModelRef = useRef();
    const portalMaterialsRef = useRef([]);
    const particlesRef = useRef();
    const pointsMaterialRef = useRef();
    const pointerLocalRef = useRef(new THREE.Vector3());
    const pointerWorldRef = useRef(new THREE.Vector3());
    const pointerPlaneRef = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 2));
    const pointerStrengthRef = useRef(0);
    const pointerHoverRef = useRef(false);
    const tempVecRef = useRef(new THREE.Vector3());
    const dirVecRef = useRef(new THREE.Vector3());
    const isVisible = scrollSection === 3;
    const orbitTilt = useMemo(() => {
        const angle = Math.PI / 6;
        return { sin: Math.sin(angle), cos: Math.cos(angle) };
    }, []);

    const portalGltf = useGLTF("/magic_portal.glb");
    const portalScene = useMemo(() => {
        if (!portalGltf?.scene) return null;
        return portalGltf.scene.clone(true);
    }, [portalGltf]);

    useEffect(() => {
        portalMaterialsRef.current = [];
        if (!portalScene) return;
        portalScene.traverse((child) => {
            if (!child.isMesh) return;

            const originalMat = Array.isArray(child.material) ? child.material[0] : child.material;
            const baseColor = originalMat?.color ? originalMat.color.clone() : new THREE.Color('#ffffff');
            const emissiveColor = originalMat?.emissive ? originalMat.emissive.clone() : new THREE.Color('#00ffee');

            const material = new THREE.MeshStandardMaterial({
                color: baseColor,
                emissive: emissiveColor,
                emissiveIntensity: 0.2,
                metalness: originalMat?.metalness ?? 0.1,
                roughness: originalMat?.roughness ?? 0.4,
                map: originalMat?.map ?? null,
                transparent: true,
                opacity: 0,
                side: THREE.DoubleSide
            });

            if (originalMat?.normalMap) material.normalMap = originalMat.normalMap;
            if (originalMat?.roughnessMap) material.roughnessMap = originalMat.roughnessMap;
            if (originalMat?.metalnessMap) material.metalnessMap = originalMat.metalnessMap;
            if (originalMat?.emissiveMap) material.emissiveMap = originalMat.emissiveMap;

            child.material = material;
            portalMaterialsRef.current.push(material);
        });
    }, [portalScene]);

    // Floating energy particles
    const particles = useMemo(() => {
        const count = 320;
        const positions = new Float32Array(count * 3);
        const radii = new Float32Array(count);
        const speeds = new Float32Array(count);
        const phases = new Float32Array(count);
        const tilts = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const radius = 3.2 + Math.random() * 1.8;
            positions[i * 3] = Math.cos(angle) * radius;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 1.2;
            positions[i * 3 + 2] = Math.sin(angle) * radius;
            radii[i] = radius;
            speeds[i] = 0.4 + Math.random() * 0.9;
            phases[i] = Math.random() * Math.PI * 2;
            tilts[i] = (Math.random() - 0.5) * 0.6;
        }
        return { positions, radii, speeds, phases, tilts, count };
    }, []);

    useFrame((state) => {
        if (!isVisible) return;

        const time = state.clock.elapsedTime;
        const easedReveal = THREE.MathUtils.smoothstep(reveal, 0, 1);
        const revealHeight = THREE.MathUtils.lerp(-6.5, -1.2, easedReveal);
        const revealScale = THREE.MathUtils.lerp(0.2, 1, easedReveal);

        let pointerHasIntersection = false;
        if (portalRef.current) {
            state.raycaster.setFromCamera(state.pointer, state.camera);
            const intersection = state.raycaster.ray.intersectPlane(pointerPlaneRef.current, pointerWorldRef.current);
            if (intersection) {
                pointerLocalRef.current.copy(pointerWorldRef.current);
                portalRef.current.worldToLocal(pointerLocalRef.current);
                pointerHasIntersection = true;
            }
        }
        const pointerTargetStrength = pointerHoverRef.current && pointerHasIntersection ? 1 : 0;
        pointerStrengthRef.current += (pointerTargetStrength - pointerStrengthRef.current) * 0.12;
        const pointerStrength = pointerStrengthRef.current;

        if (portalRef.current) {
            portalRef.current.rotation.y = time * 0.2;
            const baseScale = isActive ? 1 : 0.95;
            const targetScale = isAnimating ? 1.25 : baseScale;
            const smoothScale = THREE.MathUtils.lerp(portalRef.current.scale.x || 0, targetScale * revealScale, 0.12);
            portalRef.current.scale.setScalar(smoothScale);
            portalRef.current.position.y = THREE.MathUtils.lerp(portalRef.current.position.y, revealHeight, 0.12);
        }

        if (portalModelRef.current) {
            const model = portalModelRef.current;
            const hover = Math.sin(time * 1.2) * 0.2;
            const baseY = THREE.MathUtils.lerp(-2.2, 0.15, easedReveal);
            model.position.y = baseY + hover;
            model.rotation.y = time * 0.6;
            model.rotation.x = Math.sin(time * 0.4) * 0.08;
            const modelScale = THREE.MathUtils.lerp(0.6, 1.35, easedReveal);
            model.scale.set(modelScale, modelScale, modelScale);
        }

        if (portalMaterialsRef.current.length) {
            const emissiveTarget = THREE.MathUtils.lerp(0.3, isActive ? 1.5 : 0.9, easedReveal);
            portalMaterialsRef.current.forEach((material, index) => {
                if (!material) return;
                const pulse = Math.sin(time * 2.2 + index) * 0.18 + 0.2;
                if ('opacity' in material) {
                    material.opacity = THREE.MathUtils.clamp(easedReveal * (0.6 + pulse * 0.6), 0, 1);
                }
                if ('emissiveIntensity' in material) {
                    material.emissiveIntensity = emissiveTarget + pulse * 0.5;
                }
            });
        }

        if (textMaterialRef.current) {
            const pulse = Math.sin(time * 3) * (isAnimating ? 0.35 : 0.2);
            const baseEmissive = THREE.MathUtils.lerp(0.0, isActive ? 0.45 : 0.25, easedReveal);
            textMaterialRef.current.emissiveIntensity = baseEmissive + pulse * easedReveal;
            textMaterialRef.current.opacity = THREE.MathUtils.lerp(0, 1, easedReveal);
        }

        if (particlesRef.current) {
            const attributes = particlesRef.current.geometry.attributes;
            const pos = attributes.position.array;
            const count = particles.count;
            const orbitTiltSin = orbitTilt.sin;
            const orbitTiltCos = orbitTilt.cos;
            const pointer = pointerLocalRef.current;
            const tempVec = tempVecRef.current;
            const dirVec = dirVecRef.current;
            const effectRadius = 2.6;
            const scatterStrength = 1.25;
            for (let i = 0; i < count; i++) {
                const radius = particles.radii[i];
                const speed = particles.speeds[i];
                const phase = particles.phases[i];
                const tilt = particles.tilts[i];
                const angle = time * speed + i * 0.12;

                const baseX = Math.cos(angle) * radius;
                const baseZ = Math.sin(angle) * radius;
                const baseY = Math.sin(angle + phase) * 0.5 + tilt;

                const rotatedY = baseY * orbitTiltCos - baseZ * orbitTiltSin;
                const rotatedZ = baseY * orbitTiltSin + baseZ * orbitTiltCos;

                tempVec.set(baseX, rotatedY, rotatedZ);

                if (pointerStrength > 0.001) {
                    const dist = tempVec.distanceTo(pointer);
                    if (dist < effectRadius) {
                        dirVec.copy(tempVec).sub(pointer);
                        const len = dirVec.length() || 1;
                        dirVec.divideScalar(len);
                        const influence = (1 - dist / effectRadius) * pointerStrength;
                        tempVec.addScaledVector(dirVec, scatterStrength * influence);
                    }
                }

                const idx = i * 3;
                pos[idx] += (tempVec.x - pos[idx]) * 0.18;
                pos[idx + 1] += (tempVec.y - pos[idx + 1]) * 0.18;
                pos[idx + 2] += (tempVec.z - pos[idx + 2]) * 0.18;
            }
            attributes.position.needsUpdate = true;
        }

        if (pointsMaterialRef.current) {
            pointsMaterialRef.current.opacity = THREE.MathUtils.lerp(0, 0.8, easedReveal);
            pointsMaterialRef.current.size = THREE.MathUtils.lerp(0.025, 0.07, easedReveal);
        }
    });

    const canInteract = isActive && reveal > 0.6 && !isAnimating;
    const interactionScale = useMemo(() => THREE.MathUtils.lerp(0.25, 1, THREE.MathUtils.clamp(reveal, 0, 1)), [reveal]);

    const handlePointerOver = (event) => {
        pointerHoverRef.current = true;
        if (!canInteract) return;
        event.stopPropagation();
        document.body.style.cursor = 'pointer';
    };

    const handlePointerOut = (event) => {
        pointerHoverRef.current = false;
        event.stopPropagation();
        document.body.style.cursor = 'auto';
    };

    const handlePortalActivate = (event) => {
        if (!canInteract) return;
        event.stopPropagation();
        onPortalClick?.();
    };

    return (
        <group ref={portalRef} visible={isVisible} position={[0, 0, -2]}>
            {portalScene && (
                <primitive
                    ref={portalModelRef}
                    object={portalScene}
                    position={[0, -1.2, 0]}
                    rotation={[0, Math.PI, 0]}
                    scale={1}
                />
            )}

            {/* Energy particles */}
            <points ref={particlesRef} position={[0, 0, 0]}> 
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={particles.positions}
                        count={particles.positions.length / 3}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    ref={pointsMaterialRef}
                    size={0.05}
                    color="#00ffee"
                    transparent
                    opacity={0}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* Invisible interaction area */}
            <mesh
                position={[0, 0, 0.4]}
                onClick={handlePortalActivate}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                scale={interactionScale}
            >
                <circleGeometry args={[2.8, 48]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>

            {/* Portal UNIMED Text */}
            <Text
                ref={textRef}
                position={[0, 0, 0.6]}
                fontSize={0.7}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                onClick={handlePortalActivate}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
            >
                PORTAL UNIMED
                <meshStandardMaterial
                    ref={textMaterialRef}
                    color="#00ffee"
                    emissive="#00aaff"
                    emissiveIntensity={0.35}
                    metalness={0.1}
                    roughness={0.4}
                    transparent
                    opacity={isActive ? 1 : 0.8}
                />
            </Text>

            {/* Portal lighting */}
            <pointLight position={[0, 0, 1]} intensity={isActive ? 2.5 : 1.5} color="#00ffee" distance={12} />
            <pointLight position={[0, 0, -1.5]} intensity={isActive ? 1.8 : 1} color="#0055ff" distance={10} />
            <spotLight
                position={[0, 6, 0]}
                angle={0.6}
                penumbra={0.4}
                intensity={isActive ? 1.6 : 1.0}
                color="#00ffee"
            />
        </group>
    );
}

// Camera Controller - 4 sections with portal
function ScrollCamera({ scrollSection }) {
    const { camera } = useThree();
    const targetZ = useRef(30);
    const targetY = useRef(0);

    useFrame(() => {
        let newZ = 30;
        let newY = 0;

        if (scrollSection === 0) {
            newZ = 30;
            newY = 0;
        } else if (scrollSection === 1) {
            newZ = 20;
            newY = 1;
        } else if (scrollSection === 2) {
            newZ = 12;
            newY = 2;
        } else if (scrollSection === 3) {
            // Portal section - deeper into the dimension
            newZ = 5;
            newY = -2;
        }

        // Smooth interpolation
        targetZ.current += (newZ - targetZ.current) * 0.08;
        targetY.current += (newY - targetY.current) * 0.08;

        camera.position.z = targetZ.current;
        camera.position.y = targetY.current;
        camera.lookAt(0, 0, 0);
    });

    return null;
}

// Popup Modal with 3 different contents
function InfoModal({ isOpen, onClose, scrollSection }) {
    const [typedText, setTypedText] = useState("");
    
    const modalContent = [
        {
            code: 'console.log("Welcome to Ilmu Komputer!")',
            title: "Visi & Misi",
            description: "Kami Berkomitmen mencetak lulusan unggul dalam teknologi, etika, dan kolaborasi global.",
            info: [
                { label: "Program", value: "S1 Ilmu Komputer" },
                { label: "Akreditasi", value: "B" }
            ]
        },
        {
            code: 'system.init("Innovation & Research")',
            title: "Inovasi & Penelitian",
            description: "Mengembangkan riset terapan di bidang AI, Machine Learning, dan Cybersecurity untuk solusi nyata.",
            info: [
                { label: "Research Lab", value: "AI & Data Science" },
                { label: "Projects", value: "20+ Active" }
            ]
        },
        {
            code: 'career.start("Tech Professional")',
            title: "Karir & Alumni",
            description: "Alumni kami bekerja di perusahaan teknologi terkemuka dan startup inovatif di Indonesia dan global.",
            info: [
                { label: "Alumni Network", value: "±200 Graduates" },
                { label: "Job Placement", value: "95%" }
            ]
        }
    ];
    
    const content = modalContent[scrollSection] || modalContent[0];

    useEffect(() => {
        if (isOpen) {
            setTypedText("");
            let index = 0;
            const interval = setInterval(() => {
                if (index <= content.code.length) {
                    setTypedText(content.code.slice(0, index));
                    index++;
                } else {
                    clearInterval(interval);
                }
            }, 50);
            return () => clearInterval(interval);
        }
    }, [isOpen, scrollSection]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="igloo-modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="igloo-modal-content"
                        initial={{ scale: 0.7, opacity: 0, y: 100 }}
                        animate={{ 
                            scale: 1, 
                            opacity: 1, 
                            y: 0,
                            transition: {
                                type: "spring",
                                damping: 20,
                                stiffness: 200
                            }
                        }}
                        exit={{ scale: 0.7, opacity: 0, y: 100 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="modal-close" onClick={onClose}>×</button>
                        
                        <div className="modal-code">
                            <span className="code-prompt">{">"}</span> {typedText}
                            <span className="cursor-blink">|</span>
                        </div>
                        
                        <div className="modal-divider" />
                        
                        <h3 className="modal-title">{content.title}</h3>
                        
                        <p className="modal-text">
                            {content.description}
                        </p>
                        
                        <div className="modal-info">
                            {content.info.map((item, index) => (
                                <div key={index} className="info-row">
                                    <span className="info-label">{item.label}:</span>
                                    <span className="info-value">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Persistent Cosmic Dust - FAR from laptop
function CosmicDust({ count = 500, isPersistent = false }) {
    const dustRef = useRef();
    const velocities = useRef([]);
    const initialized = useRef(false);
    
    const positions = React.useMemo(() => {
        const pos = new Float32Array(count * 3);
        velocities.current = [];
        
        for (let i = 0; i < count; i++) {
            // Random direction from center - FAR AWAY
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = isPersistent ? 20 + Math.random() * 30 : Math.random() * 5;
            
            pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = radius * Math.cos(phi);
            
            // Store velocity for physics
            velocities.current.push({
                vx: (Math.random() - 0.5) * 0.02,
                vy: (Math.random() - 0.5) * 0.02,
                vz: (Math.random() - 0.5) * 0.02,
                phase: Math.random() * Math.PI * 2
            });
        }
        return pos;
    }, [count, isPersistent]);
    
    useFrame((state) => {
        if (!dustRef.current) return;
        
        const positions = dustRef.current.geometry.attributes.position.array;
        const time = state.clock.elapsedTime;
        
        for (let i = 0; i < count; i++) {
            const vel = velocities.current[i];
            
            // Continuous floating movement
            positions[i * 3] += vel.vx;
            positions[i * 3 + 1] += vel.vy;
            positions[i * 3 + 2] += vel.vz;
            
            // Elegant wave motion
            positions[i * 3] += Math.sin(time * 0.3 + vel.phase + i * 0.1) * 0.02;
            positions[i * 3 + 1] += Math.cos(time * 0.4 + vel.phase + i * 0.15) * 0.02;
            positions[i * 3 + 2] += Math.sin(time * 0.25 + vel.phase) * 0.015;
            
            // Boundary check - wrap around
            if (Math.abs(positions[i * 3]) > 40) positions[i * 3] *= -0.8;
            if (Math.abs(positions[i * 3 + 1]) > 40) positions[i * 3 + 1] *= -0.8;
            if (Math.abs(positions[i * 3 + 2]) > 40) positions[i * 3 + 2] *= -0.8;
        }
        
        dustRef.current.geometry.attributes.position.needsUpdate = true;
    });
    
    return (
        <points ref={dustRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={isPersistent ? 0.15 : 0.1}
                color="#00ff80"
                transparent
                opacity={isPersistent ? 0.7 : 0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Floating Debris - Elegant chunks
function FloatingDebris({ count = 50 }) {
    const debrisRef = useRef();
    
    const debris = React.useMemo(() => {
        return Array.from({ length: count }, (_, i) => {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 15 + Math.random() * 20;
            
            return {
                position: [
                    radius * Math.sin(phi) * Math.cos(theta),
                    radius * Math.sin(phi) * Math.sin(theta),
                    radius * Math.cos(phi)
                ],
                rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
                scale: 0.3 + Math.random() * 0.5,
                speed: 0.2 + Math.random() * 0.3,
                phase: Math.random() * Math.PI * 2
            };
        });
    }, [count]);
    
    return (
        <group ref={debrisRef}>
            {debris.map((item, i) => (
                <FloatingChunk key={i} {...item} index={i} />
            ))}
        </group>
    );
}

// Individual debris chunk
function FloatingChunk({ position, rotation, scale, speed, phase, index }) {
    const meshRef = useRef();
    
    useFrame((state) => {
        if (!meshRef.current) return;
        
        const time = state.clock.elapsedTime;
        
        // Elegant rotation
        meshRef.current.rotation.x = rotation[0] + time * speed * 0.2;
        meshRef.current.rotation.y = rotation[1] + time * speed * 0.3;
        meshRef.current.rotation.z = rotation[2] + time * speed * 0.15;
        
        // Floating motion
        meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + phase) * 2;
        meshRef.current.position.x = position[0] + Math.cos(time * 0.3 + phase) * 1.5;
    });
    
    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                color="#00ff80"
                emissive="#00ff80"
                emissiveIntensity={0.3}
                metalness={0.8}
                roughness={0.2}
                transparent
                opacity={0.6}
            />
        </mesh>
    );
}

// Nebula Clouds - Elegant gas clouds
function NebulaCloud({ position, scale, color, speed }) {
    const cloudRef = useRef();
    
    useFrame((state) => {
        if (!cloudRef.current) return;
        
        const time = state.clock.elapsedTime;
        
        // Slow rotation
        cloudRef.current.rotation.y = time * speed * 0.1;
        cloudRef.current.rotation.z = Math.sin(time * speed * 0.05) * 0.2;
        
        // Pulsing scale
        const pulse = 1 + Math.sin(time * speed) * 0.1;
        cloudRef.current.scale.setScalar(scale * pulse);
    });
    
    return (
        <mesh ref={cloudRef} position={position}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial
                color={color}
                transparent
                opacity={0.15}
                side={THREE.BackSide}
            />
        </mesh>
    );
}

// Black Hole with Gravitational Lensing - PERSISTENT
function BlackHole({ isPersistent = false }) {
    const blackHoleRef = useRef();
    const accretionRef = useRef();
    
    useFrame((state) => {
        if (accretionRef.current) {
            // Accretion disk rotation
            accretionRef.current.rotation.z = state.clock.elapsedTime * 2;
        }
    });
    
    const bhOpacity = isPersistent ? 1 : 0;
    
    return (
        <group position={[0, 0, -15]} ref={blackHoleRef}>
            {/* Event Horizon - Pure black */}
            <mesh>
                <sphereGeometry args={[0.8, 32, 32]} />
                <meshBasicMaterial color="#000000" />
            </mesh>
            
            {/* Photon Sphere - Light bending */}
            <mesh>
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshBasicMaterial
                    color="#00ff80"
                    transparent
                    opacity={bhOpacity * 0.1}
                    side={THREE.BackSide}
                />
            </mesh>
            
            {/* Accretion Disk */}
            <group ref={accretionRef}>
                {[0, 1, 2].map((ring, i) => (
                    <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[1.5 + i * 0.3, 1.8 + i * 0.3, 64]} />
                        <meshBasicMaterial
                            color={i === 0 ? "#ff6600" : i === 1 ? "#ffaa00" : "#00ff80"}
                            transparent
                            opacity={bhOpacity * (0.6 - i * 0.15)}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                ))}
            </group>
            
            {/* Gravitational Lensing Effect */}
            <mesh>
                <sphereGeometry args={[2, 32, 32]} />
                <meshBasicMaterial
                    color="#00ff80"
                    transparent
                    opacity={bhOpacity * 0.05}
                    side={THREE.BackSide}
                    wireframe
                />
            </mesh>
            
            {/* Hawking Radiation particles */}
            <Sparkles
                count={20}
                scale={3}
                size={0.5}
                speed={0.5}
                color="#00ffff"
                opacity={bhOpacity * 0.8}
            />
        </group>
    );
}

// Beautiful Galaxy Spiral - FAR in background
function GalaxySpiral() {
    const spiralRef = useRef();
    const starsRef = useRef();
    
    // Generate spiral galaxy arms - FAR AWAY
    const spiralPoints = React.useMemo(() => {
        const points = [];
        const arms = 3; // 3 spiral arms
        const pointsPerArm = 200;
        
        for (let arm = 0; arm < arms; arm++) {
            for (let i = 0; i < pointsPerArm; i++) {
                const t = i / pointsPerArm;
                const angle = t * Math.PI * 4 + (arm * Math.PI * 2 / arms);
                const radius = t * 30;
                
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                const y = (Math.random() - 0.5) * 2;
                
                points.push(x, y, z);
            }
        }
        return new Float32Array(points);
    }, []);
    
    useFrame((state) => {
        if (spiralRef.current) {
            spiralRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });
    
    return (
        <group ref={spiralRef} position={[0, 0, -40]}>
            {/* Spiral arms */}
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={spiralPoints.length / 3}
                        array={spiralPoints}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.3}
                    color="#00ff80"
                    transparent
                    opacity={0.6}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                />
            </points>
            
            {/* Galaxy core glow */}
            <mesh>
                <sphereGeometry args={[2, 32, 32]} />
                <meshBasicMaterial
                    color="#00ff80"
                    transparent
                    opacity={0.3}
                />
            </mesh>
            
            {/* Core bright center */}
            <mesh>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshBasicMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.8}
                />
            </mesh>
        </group>
    );
}

// Persistent Ambient Effects - FAR from laptop
function PersistentEffects() {
    return (
        <>
            {/* Beautiful galaxy spiral - FAR BACKGROUND */}
            <GalaxySpiral />
            
            {/* Subtle cosmic dust - FAR AWAY */}
            <CosmicDust count={300} isPersistent={true} />
            
            {/* Stars background - DISTANT */}
            <Sparkles
                count={200}
                scale={80}
                size={0.8}
                speed={0.05}
                color="#ffffff"
                opacity={0.3}
            />
            
            {/* Green star clusters - FAR */}
            <Sparkles
                count={80}
                scale={70}
                size={1}
                speed={0.08}
                color="#00ff80"
                opacity={0.25}
            />
        </>
    );
}

// SIMPLE WHITE FLASH - Clean and smooth
function EnvironmentBuild({ buildProgress }) {
    const flashRef = useRef();

    useFrame((state) => {
        if (flashRef.current) {
            // Gentle rotation
            flashRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });

    // Show longer flash (0.1-0.9 progress = 0.8 seconds)
    if (buildProgress < 0.1 || buildProgress > 0.9) return null;

    // Ultra smooth flash with better easing
    const flashProgress = (buildProgress - 0.1) / 0.8; // 0 to 1 in 0.8 seconds
    // Smooth sine wave with ease-in-out
    const easedProgress = flashProgress < 0.5
        ? 2 * flashProgress * flashProgress
        : 1 - Math.pow(-2 * flashProgress + 2, 2) / 2;
    const flashIntensity = Math.sin(easedProgress * Math.PI);
    const flashOpacity = Math.max(0, flashIntensity * 0.9);

    return (
        <group ref={flashRef}>
            {/* SINGLE WHITE FLASH - Clean */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[8, 32, 32]} />
                <meshBasicMaterial
                    color="#ffffff"
                    transparent
                    opacity={flashOpacity}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Subtle green glow */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[6, 32, 32]} />
                <meshBasicMaterial
                    color="#00ff80"
                    transparent
                    opacity={flashOpacity * 0.6}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Minimal particles */}
            <Sparkles
                key={`flash-particles-${buildProgress.toFixed(2)}`}
                count={50}
                scale={20}
                size={2}
                speed={0.5}
                color="#ffffff"
                opacity={flashOpacity * 0.5}
            />
        </group>
    );
}

// Wireframe Loading Animation
function WireframeLoader({ isLoading, buildProgress }) {
    const wireframeRef = useRef();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 1) {
                        clearInterval(interval);
                        return 1;
                    }
                    return prev + 0.025;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [isLoading]);

    useFrame((state) => {
        if (wireframeRef.current && isLoading) {
            wireframeRef.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
    });

    if (!isLoading || progress >= 1) return null;

    // Laptop wireframe points
    const basePoints = [
        [-0.9, -0.2, 0.6], [0.9, -0.2, 0.6], [0.9, -0.2, -0.6], [-0.9, -0.2, -0.6], [-0.9, -0.2, 0.6],
        [-0.9, -0.08, 0.6], [0.9, -0.08, 0.6], [0.9, -0.08, -0.6], [-0.9, -0.08, -0.6], [-0.9, -0.08, 0.6]
    ];

    const screenPoints = [
        [-0.8, 0.4, -0.5], [0.8, 0.4, -0.5], [0.8, 1.4, -0.5], [-0.8, 1.4, -0.5], [-0.8, 0.4, -0.5]
    ];

    return (
        <group ref={wireframeRef} scale={0.35}>
            {/* Base wireframe */}
            <Line
                points={basePoints}
                color="#00ff80"
                lineWidth={2}
                opacity={progress}
                transparent
            />
            
            {/* Screen wireframe */}
            <Line
                points={screenPoints}
                color="#00ff80"
                lineWidth={2}
                opacity={progress}
                transparent
            />
            
            {/* Connecting lines */}
            <Line
                points={[[-0.9, -0.2, 0.6], [-0.9, -0.08, 0.6]]}
                color="#00ff80"
                lineWidth={1.5}
                opacity={progress * 0.7}
                transparent
            />
            <Line
                points={[[0.9, -0.2, 0.6], [0.9, -0.08, 0.6]]}
                color="#00ff80"
                lineWidth={1.5}
                opacity={progress * 0.7}
                transparent
            />
            
            {/* Grid lines */}
            {Array.from({ length: 5 }).map((_, i) => {
                const x = -0.6 + i * 0.3;
                return (
                    <Line
                        key={`grid-${i}`}
                        points={[[x, 0.5, -0.5], [x, 1.3, -0.5]]}
                        color="#00ff80"
                        lineWidth={1}
                        opacity={progress * 0.5}
                        transparent
                    />
                );
            })}
            
            {/* Particles building effect */}
            <Sparkles
                count={Math.floor(progress * 50)}
                scale={3}
                size={2}
                speed={0.5}
                color="#00ff80"
                opacity={progress}
            />
        </group>
    );
}

// Main Scene Component
export default function IglooScene() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [scrollSection, setScrollSection] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [buildProgress, setBuildProgress] = useState(0);
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [portalActive, setPortalActive] = useState(false);
    const [portalAnimating, setPortalAnimating] = useState(false);
    const [portalReady, setPortalReady] = useState(false);
    const [portalReveal, setPortalReveal] = useState(0);

    const containerRef = useRef();

    // Audio functions - Igloo.inc style
    const playSound = (frequency, duration, type = 'sine') => {
        if (!soundEnabled) return;
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.type = type;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + duration);
        } catch (e) {
            // Silent fail if Web Audio not supported
        }
    };

    const toggleSound = () => {
        setSoundEnabled(!soundEnabled);
        if (!soundEnabled) {
            playSound(600, 0.1, 'square'); // Enable sound feedback
        }
    };

    // Portal click handler - redirect to portal.unimed.ac.id
    const handlePortalClick = () => {
        if (!portalActive || portalAnimating) return;

        setPortalAnimating(true);
        playSound(1200, 0.25, 'sawtooth'); // Portal activation sound
        playSound(640, 0.4, 'triangle'); // Deep warp sound

        setTimeout(() => {
            window.open('https://portal.unimed.ac.id/', '_blank');
            setPortalAnimating(false);
        }, 1200);
    };

    // Loading animation with build progress
    useEffect(() => {
        const buildInterval = setInterval(() => {
            setBuildProgress((prev) => {
                if (prev >= 1) {
                    clearInterval(buildInterval);
                    return 1;
                }
                return prev + 0.02;
            });
        }, 50);
        
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // 1 second total loading
        
        return () => {
            clearInterval(buildInterval);
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const totalHeight = document.documentElement.scrollHeight - windowHeight;

            // Calculate scroll progress (0 to 1)
            const scrollProgress = Math.min(scrollY / (totalHeight * 0.8), 1);

            // Map to 4 sections (0, 1, 2, 3)
            const section = Math.min(Math.floor(scrollProgress * 4), 3);

            // Play scroll sound on section change
            if (section !== scrollSection) {
                playSound(300, 0.2, 'sawtooth'); // Whoosh sound
            }

            setScrollSection(section);
        };

        // Add passive listener for better performance
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const active = scrollSection === 3 && !isLoading;
        setPortalActive(active);

        if (active) {
            // start portal reveal animation
            setPortalReady(true);
        } else {
            setPortalAnimating(false);
            setPortalReady(false);
            setPortalReveal(0);
            document.body.style.cursor = 'auto';
        }
    }, [scrollSection, isLoading]);

    useEffect(() => {
        if (!portalReady) return;

        let frameId;
        const animate = () => {
            setPortalReveal((prev) => {
                const next = Math.min(prev + 0.05, 1);
                return next;
            });
            frameId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(frameId);
    }, [portalReady]);

    return (
        <>
            {/* Loading Screen Overlay */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        className="loading-overlay"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="loading-content"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="loading-logo">
                                <img
                                    src="/Lambang_Universitas_Negeri_Medan.png"
                                    alt="UNIMED"
                                />
                            </div>
                            <div className="loading-text">
                                <div className="loading-title">ILMU KOMPUTER</div>
                                <div className="loading-subtitle">Initializing System...</div>
                            </div>
                            <div className="loading-bar">
                                <motion.div
                                    className="loading-progress"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 0.9, ease: "easeInOut" }}
                                />
                            </div>
                            <motion.div
                                className="loading-subtitle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2, duration: 0.5 }}
                                style={{ marginTop: '16px', fontSize: '12px' }}
                            >
                                Building Environment...
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <div className="igloo-scene-container" ref={containerRef}>
                {/* Header */}
                <motion.header
                    className="scene-header"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: isLoading ? 0 : 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    <div className="header-brand">
                        <img
                            src="/Lambang_Universitas_Negeri_Medan.png"
                            alt="UNIMED"
                            className="brand-logo"
                        />
                        <div className="brand-text">
                            <div className="brand-title">ILMU KOMPUTER</div>
                            <div className="brand-subtitle">UNIMED</div>
                        </div>
                    </div>
                    <div className="header-copyright">// Copyright © 2025</div>
                </motion.header>

                {/* 3D Canvas */}
                <div className="canvas-container">
                    <Canvas
                        shadows
                        dpr={[1, 2]}
                        gl={{
                            antialias: true,
                            alpha: true,
                            powerPreference: "high-performance"
                        }}
                    >
                        <color attach="background" args={["#0a0a0a"]} />
                        <fog attach="fog" args={["#0a0a0a", 20, 100]} />
                        
                        <PerspectiveCamera makeDefault position={[0, 0, 30]} fov={50} />
                        
                        {/* Lighting - BRIGHTER */}
                        <ambientLight intensity={0.5} />
                        <directionalLight
                            position={[10, 10, 5]}
                            intensity={2}
                            color="#ffffff"
                            castShadow
                        />
                        <directionalLight
                            position={[-10, 10, 5]}
                            intensity={1.5}
                            color="#00ff80"
                        />
                        <pointLight position={[0, 0, 10]} intensity={1.5} color="#00ff80" />
                        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#00cc66" />
                        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                        
                        {/* Camera scroll controller */}
                        <ScrollCamera scrollSection={scrollSection} />
                        
                        {/* Scene content */}
                        <BackgroundGlow />
                        
                        {/* Environment build animation - spreading from center */}
                        <EnvironmentBuild buildProgress={buildProgress} />
                        
                        {/* Persistent ambient effects - ALWAYS VISIBLE after loading */}
                        {!isLoading && <PersistentEffects />}
                        
                        {/* Wireframe loading animation */}
                        <WireframeLoader isLoading={isLoading} buildProgress={buildProgress} />
                        
                        {/* Main laptop - sections 0-2 only */}
                        {scrollSection < 3 && (
                            <Suspense fallback={null}>
                                <group>
                                    <Laptop3D
                                        onClick={() => {
                                            playSound(1000, 0.05, 'square'); // Click sound
                                            setIsModalOpen(true);
                                        }}
                                        isHovered={isHovered}
                                        setIsHovered={setIsHovered}
                                        scrollSection={scrollSection}
                                        onPointerOver={() => {
                                            setIsHovered(true);
                                            playSound(800, 0.1, 'square'); // Hover beep
                                        }}
                                        onPointerOut={() => setIsHovered(false)}
                                    />
                                </group>
                            </Suspense>
                        )}
                        
                        {/* Portal 3D - Section 4 */}
                        <Portal3D
                            scrollSection={scrollSection}
                            onPortalClick={handlePortalClick}
                            isActive={portalActive}
                            isAnimating={portalAnimating}
                            reveal={portalReveal}
                        />
                        
                        {/* Post-processing */}
                        <EffectComposer>
                            <Bloom
                                intensity={1.3}
                                luminanceThreshold={0.15}
                                luminanceSmoothing={0.9}
                            />
                            <DepthOfField
                                focusDistance={0.01}
                                focalLength={0.05}
                                bokehScale={2}
                            />
                            <Vignette offset={0.3} darkness={0.7} />
                        </EffectComposer>
                    </Canvas>
                </div>

                {/* FUTURISTIC TEXT OVERLAYS - DIFFERENT FOR EACH SECTION */}
                {!isLoading && (
                    <>
                        {/* SECTION 0 TEXT - TOP RIGHT NEAR LAPTOP */}
                        <motion.div
                            className={`section-text section-0 ${scrollSection === 0 ? 'active' : ''}`}
                            style={{
                                top: '150px',
                                right: '150px',
                                textAlign: 'right'
                            }}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{
                                opacity: scrollSection === 0 ? 1 : 0,
                                x: scrollSection === 0 ? 0 : 100
                            }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="section-title">// VISI & MISI</div>
                            <div className="section-subtitle">Ilmu Komputer UNIMED</div>
                            <div className="section-action">SCROLL TO EXPLORE</div>
                            <div className="section-glow"></div>
                        </motion.div>

                        {/* SECTION 1 TEXT - BOTTOM LEFT NEAR LAPTOP */}
                        <motion.div
                            className={`section-text section-1 ${scrollSection === 1 ? 'active' : ''}`}
                            style={{
                                bottom: '100px',
                                left: '150px',
                                textAlign: 'left'
                            }}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{
                                opacity: scrollSection === 1 ? 1 : 0,
                                y: scrollSection === 1 ? 0 : 50
                            }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        >
                            <div className="section-title">// INOVASI & PENELITIAN</div>
                            <div className="section-subtitle">AI & Machine Learning Lab</div>
                            <div className="section-action">CLICK TO DISCOVER</div>
                            <div className="section-glow glow-blue"></div>
                        </motion.div>

                        {/* SECTION 2 TEXT - BOTTOM RIGHT NEAR LAPTOP */}
                        <motion.div
                            className={`section-text section-2 ${scrollSection === 2 ? 'active' : ''}`}
                            style={{
                                bottom: '100px',
                                right: '150px',
                                textAlign: 'right'
                            }}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{
                                opacity: scrollSection === 2 ? 1 : 0,
                                y: scrollSection === 2 ? 0 : 50
                            }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                        >
                            <div className="section-title">// KARIR & ALUMNI</div>
                            <div className="section-subtitle">Tech Professionals Network</div>
                            <div className="section-action">JOIN OUR COMMUNITY</div>
                            <div className="section-glow glow-purple"></div>
                        </motion.div>

                        {/* SECTION 3 TEXT - CENTER - PORTAL */}
                        <motion.div
                            className={`section-text section-3 ${scrollSection === 3 ? 'active' : ''}`}
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                textAlign: 'center'
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: scrollSection === 3 ? 1 : 0,
                                scale: scrollSection === 3 ? 1 : 0.8
                            }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                        >
                            <div className="section-title">// PORTAL UNIMED</div>
                            <div className="section-subtitle">Journey to Another Dimension</div>
                            <div className="section-action">CLICK THE PORTAL</div>
                            <div className="section-glow glow-cyan"></div>
                        </motion.div>
                    </>
                )}
                
                {/* Footer */}
                <motion.footer
                    className="scene-footer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2 }}
                >
                    <div className="footer-text">
                        © 2025 SSO Universitas Negeri Medan. All Rights Reserved.
                    </div>
                </motion.footer>

                {/* Sound Toggle Button - Bottom Left */}
                {!isLoading && (
                    <motion.button
                        className="sound-toggle-button"
                        onClick={toggleSound}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {soundEnabled ? '🔊' : '🔇'}
                        <span className="sound-toggle-text">
                            {soundEnabled ? 'Sound On' : 'Sound Off'}
                        </span>
                    </motion.button>
                )}
            </div>

            {/* Spacer for scroll - 4 sections with extra space */}
            <div style={{ height: "600vh" }} />

            {/* Modal */}
            <InfoModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                scrollSection={scrollSection}
            />
        </>
    );
}

// Preload model
try {
    useGLTF.preload("/Laptop.glb");
} catch (e) {
    console.log("Model preload skipped");
}
