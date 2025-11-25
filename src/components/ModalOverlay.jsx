import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// SCRAMBLE TEXT COMPONENT (OPTIMIZED)
// ==========================================
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

const ScrambleText = ({ text, duration = 0.8, delay = 0, className = "", onComplete }) => {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        let frameId;
        let startTime;
        let timeoutId;

        const startScramble = () => {
            startTime = Date.now();
            const length = text.length;

            const animate = () => {
                const now = Date.now();
                const progress = Math.min((now - startTime) / (duration * 1000), 1);

                if (progress < 1) {
                    let result = "";
                    // Calculate how many characters should be revealed based on progress
                    const revealCount = Math.floor(progress * length);

                    for (let i = 0; i < length; i++) {
                        if (i < revealCount) {
                            result += text[i];
                        } else if (text[i] === ' ') {
                            result += ' '; // Preserve spaces to maintain word wrapping
                        } else {
                            // Only scramble a subset of characters to reduce visual noise if needed, 
                            // but for "matrix" feel we scramble all remaining
                            result += CHARS[Math.floor(Math.random() * CHARS.length)];
                        }
                    }
                    setDisplayText(result);
                    frameId = requestAnimationFrame(animate);
                } else {
                    setDisplayText(text);
                    if (onComplete) onComplete();
                }
            };

            frameId = requestAnimationFrame(animate);
        };

        timeoutId = setTimeout(startScramble, delay * 1000);

        return () => {
            clearTimeout(timeoutId);
            cancelAnimationFrame(frameId);
        };
    }, [text, duration, delay, onComplete]);

    return <span className={className}>{displayText}</span>;
};

// ==========================================
// HOVER SCRAMBLE TEXT COMPONENT (INTERACTIVE)
// ==========================================
const HoverScrambleText = ({ text, trigger, duration = 0.4, className = "" }) => {
    const [displayText, setDisplayText] = useState(text);

    useEffect(() => {
        if (!trigger) {
            setDisplayText(text);
            return;
        }

        let frameId;
        let startTime = Date.now();
        const length = text.length;

        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / (duration * 1000), 1);

            if (progress < 1) {
                let result = "";
                const revealCount = Math.floor(progress * length);

                for (let i = 0; i < length; i++) {
                    if (i < revealCount) {
                        result += text[i];
                    } else {
                        result += CHARS[Math.floor(Math.random() * CHARS.length)];
                    }
                }
                setDisplayText(result);
                frameId = requestAnimationFrame(animate);
            } else {
                setDisplayText(text);
            }
        };

        frameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frameId);
    }, [trigger, text, duration]);

    return <span className={className}>{displayText}</span>;
};

// ==========================================
// MODAL OVERLAY COMPONENT (FULLSCREEN REFINED)
// ==========================================
const ModalOverlay = ({ title, description, onClose }) => {
    // Split description into lines for per-line animation
    const descriptionLines = description.split('\n').filter(line => line.trim() !== "");
    const [isCloseHovered, setIsCloseHovered] = useState(false);

    // Animation Config
    const TITLE_DURATION = 1.0;
    const TITLE_DELAY = 0.2;
    // Description starts immediately (parallel with title, or very slight stagger)
    const DESC_START_DELAY = 0.3;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
                backgroundColor: 'rgba(5, 5, 5, 0.95)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                fontFamily: '"IBM Plex Mono", monospace' // Enforce font
            }}
        >
            {/* Background Grid/Noise (Fixed) */}
            <div
                className="fixed inset-0 opacity-[0.05] pointer-events-none"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    opacity: 0.03,
                    pointerEvents: 'none'
                }}
            />

            {/* Close Button - Fixed Position */}
            <div
                style={{
                    position: 'fixed',
                    top: '3rem',
                    right: '3rem',
                    zIndex: 10000
                }}
            >
                <button
                    onClick={onClose}
                    onMouseEnter={() => setIsCloseHovered(true)}
                    onMouseLeave={() => setIsCloseHovered(false)}
                    className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.7)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '1rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase'
                    }}
                >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transition: 'opacity 0.3s' }}>[</span>
                    <HoverScrambleText text="CLOSE" trigger={isCloseHovered} />
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transition: 'opacity 0.3s' }}>]</span>
                </button>
            </div>

            {/* Scrollable Content Container with Fade Mask */}
            <div
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    zIndex: 10,
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 90%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 90%, transparent 100%)'
                }}
            >
                <div
                    style={{
                        width: '100%',
                        maxWidth: '600px', // Narrower width as requested
                        margin: '0 auto',
                        padding: '8rem 2rem 12rem 2rem',
                        minHeight: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start', // Left align content
                        textAlign: 'left' // Left align text
                    }}
                >
                    {/* Header / Label */}
                    <div style={{ marginBottom: '3rem', width: '100%' }}>
                        <div style={{
                            color: '#39ff14',
                            fontFamily: '"IBM Plex Mono", monospace',
                            fontSize: '0.875rem',
                            letterSpacing: '0.2em',
                            marginBottom: '1rem',
                            opacity: 0.8,
                            textShadow: '0 0 10px rgba(57, 255, 20, 0.5)' // Green glow
                        }}>
                            <ScrambleText text="////// SYSTEM_OVERRIDE" duration={0.8} />
                        </div>

                        <h1 style={{
                            color: 'white',
                            fontSize: '3.5rem', // Slightly smaller for better fit
                            fontWeight: '700',
                            lineHeight: '1.1',
                            letterSpacing: '-0.02em',
                            margin: '0', // Removed auto margin for left align
                            maxWidth: '100%',
                            textShadow: '0 0 20px rgba(255, 255, 255, 0.3)' // White glow
                        }}>
                            <ScrambleText text={title} duration={TITLE_DURATION} delay={TITLE_DELAY} />
                        </h1>
                    </div>

                    {/* Description */}
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        marginBottom: 'auto'
                    }}>
                        {descriptionLines.map((line, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: DESC_START_DELAY + (index * 0.2),
                                    ease: "easeOut"
                                }}
                                style={{
                                    color: '#9ca3af',
                                    fontSize: '1.125rem',
                                    lineHeight: '1.8',
                                    margin: 0,
                                    fontFamily: '"IBM Plex Mono", monospace',
                                    textShadow: '0 0 5px rgba(156, 163, 175, 0.2)', // Subtle text glow
                                    minHeight: '2rem' // Prevent layout shift
                                }}
                            >
                                <ScrambleText
                                    text={line}
                                    duration={1.5} // Slower, more elegant
                                    // Sync scramble start with fade start
                                    delay={DESC_START_DELAY + (index * 0.2)}
                                />
                            </motion.p>
                        ))}
                    </div>

                    {/* Footer / Decorative */}
                    <div style={{
                        marginTop: '6rem',
                        color: 'rgba(255, 255, 255, 0.3)',
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '0.75rem',
                        pointerEvents: 'none'
                    }}>
                        <ScrambleText
                            text="ID: 8472-9102-XK // SECURE CONNECTION"
                            duration={1}
                            delay={DESC_START_DELAY + 1.0}
                        />
                    </div>
                </div>
            </div>

        </motion.div>
    );
};

export default ModalOverlay;
