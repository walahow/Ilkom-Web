import React from"react";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import ParallaxModel from "./ParallaxModel.jsx";

export default function Hero() {
    const { scrollY } = useScroll();

    const scale = useTransform(scrollY, [0, 500], [1.05, 1.15]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const translateX = useTransform(mouseX, [-1, 1], [-10, 10]);
    const translateY = useTransform(mouseY, [-1, 1], [-5, 5]);

    const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <div className="hero-root" onMouseMove={handleMouseMove}>
            <motion.div
                className="hero-video-bg-wrapper"
                style={{
                    x: translateX,
                    y: translateY,
                    scale,
                }}
                transition={{ type: "spring", stiffness: 40, damping: 25}}
            >
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="hero-video-bg"
                >
                    <source src="/videos/background.mp4" type="video/mp4" />
                </video>
            </motion.div>

            <ParallaxModel
                url="/models/mymodel.glb"
                intitialRotation={[0, 0, 0]}
                position={[0, -40, 0]}
                scale={3}
                cameraZ={220}
                parallaxIntensity={10}
            />

            <div className="hero-grid">
                <div className="hero-left">
                    <div className="hero-brand">
                        <img
                            src="/Lambang_Universitas_Negeri_Medan.png"
                            alt="Lambang Universitas Negeri Medan"
                            className="hero-logo"
                        />
                        <div className="hero-title glow-white">
                            <div>Ilmu</div>
                            <div>komputer</div>
                        </div>
                    </div>

                    <div className="hero-copy glow-white">
                        <div className="hero-console glow-green"> // Copyright @ 2025</div>
                        <br />
                        <div>SSO UNIVERSITAS NEGERI MEDAN.</div>
                        <div>All Rights Reserved.</div>
                    </div>
                </div>

                    <div className="hero-right">
                        <div className="hero-console glow-green">//// console.log("Hello World!")</div>
                        <div className="hero-paragraph glow-white">
                            Kami Berkomitmen <br />
                            mencetak lulusan yang <br />
                            unggul dalam <br />
                            teknologi, etika, dan <br />
                            kolaborasi global.
                        </div>
                    </div>
            </div>
        </div>
    );
}