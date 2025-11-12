import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import './LoadingOverlay.css'; // Import file CSS terpisah

// Komponen Preloader yang berdiri sendiri
export default function LoadingOverlay({ 
    logoSrc = "/Lambang_Universitas_Negeri_Medan.png", // Path logo default
    title = "ILMU KOMPUTER", 
    subtitle = "Initializing System...",
    loadingText = "..(T_T)...",
    loadingDuration = 2800 // Durasi total loading dalam ms
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [buildProgress, setBuildProgress] = useState(0);
    const [typedText, setTypedText] = useState("");

    // Logika Loading
    useEffect(() => {
        // Animasi progress bar (buildProgress)
        const buildInterval = setInterval(() => {
            setBuildProgress((prev) => {
                if (prev >= 1) {
                    clearInterval(buildInterval);
                    return 1;
                }
                return prev + (0.02 * (2800 / loadingDuration)); // Menyesuaikan kecepatan progress bar
            });
        }, 50);
        
        // Timer untuk menyelesaikan loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, loadingDuration);
        
        return () => {
            clearInterval(buildInterval);
            clearTimeout(timer);
        };
    }, [loadingDuration]);

    // Animasi typing untuk subtitle
    useEffect(() => {
        if (isLoading) {
            let index = 0;
            const textToType = subtitle;
            const typingInterval = setInterval(() => {
                if (index <= textToType.length) {
                    setTypedText(textToType.slice(0, index));
                    index++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 50); // Kecepatan typing
            return () => clearInterval(typingInterval);
        }
    }, [isLoading, subtitle]);


    return (
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
                                src={logoSrc}
                                alt={title}
                            />
                        </div>
                        <div className="loading-text">
                            <div className="loading-title">{title}</div>
                            <div className="loading-subtitle">
                                {typedText}
                                <span className="cursor-blink">|</span> {/* Cursor blink */}
                            </div>
                        </div>
                        <div className="loading-bar">
                            <motion.div
                                className="loading-progress"
                                initial={{ width: "0%" }}
                                animate={{ width: `${Math.min(buildProgress * 100, 100)}%` }}
                                transition={{ duration: 0.05, ease: "linear" }}
                            />
                        </div>
                        <motion.div
                            className="loading-subtitle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: (loadingDuration / 1000) * 0.5, duration: 0.5 }}
                            style={{ marginTop: '16px', fontSize: '12px' }}
                        >
                            {loadingText}
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Catatan: Pastikan Anda telah menginstal framer-motion jika ingin menggunakan animasi ini.