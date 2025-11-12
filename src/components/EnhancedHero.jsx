import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useScroll, useSpring } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Sphere } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import * as THREE from "three";
import ParallaxModel from "./ParallaxModel.jsx";

// Particle system component
function ParticleField({ count = 2000 }) {
    const mesh = useRef();
    const [sphere] = useState(() => new THREE.SphereGeometry(1, 32, 32));
    
    const particlesPosition = useState(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 400;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 400;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 400;
        }
        return positions;
    })[0];

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.x = state.clock.elapsedTime * 0.05;
            mesh.current.rotation.y = state.clock.elapsedTime * 0.075;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={mesh} positions={particlesPosition} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#00ff64"
                    size={0.8}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
}

// Floating geometric shapes
function FloatingShapes() {
    const group = useRef();
    
    useFrame((state) => {
        if (group.current) {
            group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
            group.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });

    return (
        <group ref={group}>
            {[...Array(8)].map((_, i) => (
                <mesh
                    key={i}
                    position={[
                        Math.sin(i * 0.8) * 150,
                        Math.cos(i * 0.8) * 150,
                        Math.sin(i * 0.4) * 50
                    ]}
                >
                    <boxGeometry args={[2, 2, 2]} />
                    <meshStandardMaterial
                        color="#00ff64"
                        emissive="#00ff64"
                        emissiveIntensity={0.2}
                        transparent
                        opacity={0.3}
                    />
                </mesh>
            ))}
        </group>
    );
}

// Enhanced 3D Scene
function Enhanced3DScene({ scrollY, mousePosition }) {
    const { camera } = useThree();
    
    useFrame(() => {
        // Camera movement based on scroll and mouse
        const scrollOffset = scrollY.get() * 0.001;
        const mouseX = mousePosition.x.get() * 0.01;
        const mouseY = mousePosition.y.get() * 0.01;
        
        camera.position.x = mouseX * 10;
        camera.position.y = mouseY * 10;
        camera.position.z = 220 + scrollOffset * 50;
        camera.lookAt(0, 0, 0);
    });

    return (
        <>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#00ff64" />
            <pointLight position={[0, 0, 100]} intensity={0.8} color="#00ff64" />
            
            <ParticleField />
            <FloatingShapes />
            
            <EffectComposer>
                <Bloom intensity={1.5} luminanceThreshold={0.1} />
                <ChromaticAberration offset={[0.001, 0.001]} />
            </EffectComposer>
        </>
    );
}

export default function EnhancedHero() {
    const containerRef = useRef();
    const { scrollY } = useScroll();
    
    // Mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    // Smooth spring animations
    const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 });
    
    // Transform values based on scroll
    const backgroundScale = useTransform(scrollY, [0, 1000], [1, 1.2]);
    const backgroundOpacity = useTransform(scrollY, [0, 500], [1, 0.3]);
    const textY = useTransform(scrollY, [0, 500], [0, -100]);
    const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
    
    // Parallax transforms
    const parallaxX = useTransform(smoothMouseX, [-1, 1], [-20, 20]);
    const parallaxY = useTransform(smoothMouseY, [-1, 1], [-10, 10]);

    const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <div 
            ref={containerRef}
            className="enhanced-hero-root" 
            onMouseMove={handleMouseMove}
        >
            {/* Background Video with Enhanced Effects */}
            <motion.div
                className="hero-video-bg-wrapper"
                style={{
                    scale: backgroundScale,
                    opacity: backgroundOpacity,
                    x: parallaxX,
                    y: parallaxY,
                }}
            >
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="hero-video-bg enhanced"
                >
                    <source src="/videos/background.mp4" type="video/mp4" />
                </video>
            </motion.div>

            {/* Enhanced 3D Scene */}
            <div className="hero-3d enhanced">
                <Canvas 
                    gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                    style={{ background: 'transparent' }}
                    camera={{ position: [0, 0, 220], fov: 60 }}
                    dpr={[1, 2]}
                >
                    <Enhanced3DScene scrollY={scrollY} mousePosition={{ x: smoothMouseX, y: smoothMouseY }} />
                </Canvas>
            </div>

            {/* Main 3D Model */}
            <ParallaxModel
                url="/models/mymodel.glb"
                initialRotation={[0, 0, 0]}
                position={[0, -40, 0]}
                scale={3}
                cameraZ={220}
                parallaxIntensity={15}
            />

            {/* Enhanced Content Grid */}
            <motion.div 
                className="hero-grid enhanced"
                style={{
                    y: textY,
                    opacity: textOpacity,
                }}
            >
                <motion.div 
                    className="hero-left"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <motion.div 
                        className="hero-brand"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <motion.img
                            src="/Lambang_Universitas_Negeri_Medan.png"
                            alt="Lambang Universitas Negeri Medan"
                            className="hero-logo enhanced"
                            whileHover={{ 
                                rotate: 360,
                                filter: "drop-shadow(0 0 20px rgba(0, 255, 100, 0.8))"
                            }}
                            transition={{ duration: 0.8 }}
                        />
                        <motion.div 
                            className="hero-title glow-white enhanced"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <motion.div
                                whileHover={{ x: 10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                Ilmu
                            </motion.div>
                            <motion.div
                                whileHover={{ x: -10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                Komputer
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        className="hero-copy glow-white"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <motion.div 
                            className="hero-console glow-green"
                            animate={{ 
                                textShadow: [
                                    "0 0 12px rgba(0, 157, 10, 0.5)",
                                    "0 0 20px rgba(0, 157, 10, 0.8)",
                                    "0 0 12px rgba(0, 157, 10, 0.5)"
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            // Copyright @ 2025
                        </motion.div>
                        <br />
                        <div>SSO UNIVERSITAS NEGERI MEDAN.</div>
                        <div>All Rights Reserved.</div>
                    </motion.div>
                </motion.div>

                <motion.div 
                    className="hero-right"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    <motion.div 
                        className="hero-console glow-green"
                        animate={{ 
                            opacity: [0.7, 1, 0.7],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        //// console.log("Hello World!")
                    </motion.div>
                    <motion.div 
                        className="hero-paragraph glow-white enhanced"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <motion.span
                            whileHover={{ color: "#00ff64" }}
                            transition={{ duration: 0.3 }}
                        >
                            Kami Berkomitmen
                        </motion.span>
                        <br />
                        mencetak lulusan yang <br />
                        unggul dalam <br />
                        teknologi, etika, dan <br />
                        kolaborasi global.
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
                className="scroll-indicator"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="scroll-arrow"
                >
                    ↓
                </motion.div>
                <div className="scroll-text">Scroll to explore</div>
            </motion.div>
        </div>
    );
}
