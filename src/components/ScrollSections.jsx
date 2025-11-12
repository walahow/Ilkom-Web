import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Box, Torus } from "@react-three/drei";
import * as THREE from "three";

// Animated 3D shapes for sections
function AnimatedShape({ type = "sphere", position = [0, 0, 0], color = "#00ff64" }) {
    const meshRef = useRef();
    
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
        }
    });

    const shapes = {
        sphere: <Sphere ref={meshRef} args={[2, 32, 32]} position={position} />,
        box: <Box ref={meshRef} args={[3, 3, 3]} position={position} />,
        torus: <Torus ref={meshRef} args={[2, 0.8, 16, 32]} position={position} />
    };

    return (
        <mesh ref={meshRef} position={position}>
            {shapes[type]}
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.2}
                transparent
                opacity={0.8}
                wireframe
            />
        </mesh>
    );
}

function Section3D({ shape, color }) {
    return (
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color={color} />
            <AnimatedShape type={shape} color={color} />
        </Canvas>
    );
}

// Individual section component
function ScrollSection({ 
    title, 
    description, 
    features, 
    shape = "sphere", 
    color = "#00ff64",
    reverse = false 
}) {
    const ref = useRef();
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    
    const sectionVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: reverse ? 50 : -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <motion.section
            ref={ref}
            className="section-enhanced"
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <div className={`section-content ${reverse ? 'reverse' : ''}`}>
                <motion.div 
                    className="section-text"
                    variants={itemVariants}
                >
                    <motion.h2 
                        className="section-title"
                        variants={itemVariants}
                    >
                        {title}
                    </motion.h2>
                    <motion.p 
                        className="section-description"
                        variants={itemVariants}
                    >
                        {description}
                    </motion.p>
                    <motion.ul 
                        className="section-features"
                        variants={itemVariants}
                    >
                        {features.map((feature, index) => (
                            <motion.li
                                key={index}
                                variants={itemVariants}
                                whileHover={{ x: 10, color: color }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {feature}
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>
                
                <motion.div 
                    className="section-visual"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <Section3D shape={shape} color={color} />
                </motion.div>
            </div>
        </motion.section>
    );
}

// Floating navigation dots
function NavigationDots({ sections, activeSection }) {
    return (
        <div className="nav-dots">
            {sections.map((_, index) => (
                <motion.div
                    key={index}
                    className={`nav-dot ${activeSection === index ? 'active' : ''}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                        const element = document.getElementById(`section-${index}`);
                        element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                />
            ))}
        </div>
    );
}

// Parallax background elements
function ParallaxBackground() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -400]);
    const y3 = useTransform(scrollY, [0, 1000], [0, -100]);

    return (
        <div className="parallax-background">
            <motion.div 
                className="parallax-layer layer-1"
                style={{ y: y1 }}
            />
            <motion.div 
                className="parallax-layer layer-2"
                style={{ y: y2 }}
            />
            <motion.div 
                className="parallax-layer layer-3"
                style={{ y: y3 }}
            />
        </div>
    );
}

export default function ScrollSections() {
    const sections = [
        {
            title: "Teknologi Terdepan",
            description: "Menggunakan teknologi terkini dalam pengembangan kurikulum dan metode pembelajaran yang inovatif untuk mempersiapkan mahasiswa menghadapi tantangan industri 4.0.",
            features: [
                "Artificial Intelligence & Machine Learning",
                "Cloud Computing & DevOps",
                "Cybersecurity & Blockchain",
                "Mobile & Web Development"
            ],
            shape: "sphere",
            color: "#00ff64"
        },
        {
            title: "Kolaborasi Global",
            description: "Membangun jaringan kerjasama internasional dengan universitas dan industri terkemuka untuk memberikan pengalaman belajar yang berkualitas dunia.",
            features: [
                "Program Pertukaran Mahasiswa",
                "Joint Research Projects",
                "International Certification",
                "Global Industry Partnership"
            ],
            shape: "box",
            color: "#ff6b00",
            reverse: true
        },
        {
            title: "Inovasi & Penelitian",
            description: "Mendorong budaya inovasi melalui penelitian aplikatif yang berdampak langsung pada masyarakat dan industri teknologi informasi.",
            features: [
                "Research & Development Center",
                "Startup Incubator Program",
                "Innovation Lab",
                "Industry Collaboration"
            ],
            shape: "torus",
            color: "#6b00ff"
        }
    ];

    const [activeSection, setActiveSection] = React.useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const currentSection = Math.floor(scrollPosition / windowHeight);
            setActiveSection(Math.min(currentSection, sections.length - 1));
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections.length]);

    return (
        <>
            <ParallaxBackground />
            <NavigationDots sections={sections} activeSection={activeSection} />
            
            {sections.map((section, index) => (
                <div key={index} id={`section-${index}`}>
                    <ScrollSection {...section} />
                </div>
            ))}
            
            {/* Final CTA Section */}
            <motion.section 
                className="section-enhanced cta-section"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="section-content centered">
                    <motion.div 
                        className="cta-content"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="section-title">Bergabunglah Dengan Kami</h2>
                        <p className="section-description">
                            Wujudkan impian Anda menjadi profesional teknologi yang unggul dan berdampak global.
                        </p>
                        <motion.button
                            className="cta-button"
                            whileHover={{ 
                                scale: 1.05,
                                boxShadow: "0 0 30px rgba(0, 255, 100, 0.5)"
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Daftar Sekarang
                        </motion.button>
                    </motion.div>
                </div>
            </motion.section>
        </>
    );
}
