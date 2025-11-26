import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";
import './LoadingOverlay.css'; // Import file CSS terpisah

// Komponen Preloader yang berdiri sendiri
export default function LoadingOverlay({
    logoSrc = "/Lambang_Universitas_Negeri_Medan.png", // Path logo default
    title = "ILMU KOMPUTER",
    loadingText = "..(T_T)..."
}) {
    const { progress, active } = useProgress();
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (!active && progress === 100) {
            // Beri sedikit delay agar user bisa melihat 100%
            const timer = setTimeout(() => {
                setShow(false);
            }, 10);
            return () => clearTimeout(timer);
        } else {
            setShow(true);
        }
    }, [active, progress]);


    return (
        <AnimatePresence>
            {show && (
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
                                src={logoSrc}
                                alt={title}
                            />
                        </div>
                        <div className="loading-text">
                            <div className="loading-title">{title}</div>
                        </div>
                        <div className="loading-bar">
                            <motion.div
                                className="loading-progress"
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.1, ease: "linear" }}
                            />
                        </div>
                        <motion.div
                            className="loading-subtitle"
                            style={{ marginTop: '16px', fontSize: '12px' }}
                        >
                            {Math.round(progress)}%
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}