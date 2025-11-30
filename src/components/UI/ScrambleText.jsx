import React, { useState, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

export const ScrambleText = ({ text, duration = 0.8, delay = 0, className = "", onComplete }) => {
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
                    const revealCount = Math.floor(progress * length);

                    for (let i = 0; i < length; i++) {
                        if (i < revealCount) {
                            result += text[i];
                        } else if (text[i] === ' ') {
                            result += ' ';
                        } else {
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

export const HoverScrambleText = ({ text, trigger, duration = 0.4, className = "" }) => {
    const [displayText, setDisplayText] = useState(text);

    useEffect(() => {
        if (!trigger) {
            setDisplayText(text);
            return;
        }

        import("../../utils/AudioManager").then((module) => module.default.startScramble());

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
                import("../../utils/AudioManager").then((module) => module.default.stopScramble());
            }
        };

        frameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(frameId);
            import("../../utils/AudioManager").then((module) => module.default.stopScramble());
        };
    }, [trigger, text, duration]);

    return <span className={className}>{displayText}</span>;
};
