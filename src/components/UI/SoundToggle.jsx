import React, { useState, useEffect } from 'react';
import { HoverScrambleText } from './ScrambleText';
import audioManager from '../../utils/AudioManager';

const SoundToggle = ({ className = "", style = {} }) => {
    const [isMuted, setIsMuted] = useState(audioManager.isMuted);
    const [isHovered, setIsHovered] = useState(false);

    // Sync state with audio manager on mount (in case it changed elsewhere)
    useEffect(() => {
        setIsMuted(audioManager.isMuted);
    }, []);

    const handleToggle = () => {
        const newState = audioManager.toggleMute();
        setIsMuted(newState);
        // Play click sound on toggle (if unmuting, it will play; if muting, it won't)
        if (!newState) {
            audioManager.playClick();
        }
    };

    return (
        <button
            onClick={handleToggle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`flex items-center gap-3 text-white/50 hover:text-white transition-colors group ${className}`}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.5)',
                transition: 'color 0.3s',
                ...style
            }}
        >
            {/* Icon */}
            <div className="relative w-4 h-4" style={{ width: '1rem', height: '1rem', position: 'relative' }}>
                {isMuted ? (
                    // Muted Icon (X)
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
                        <path d="M11 5L6 9H2v6h4l5 4V5z" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                ) : (
                    // Sound On Icon (Speaker)
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                )}
            </div>

            {/* Text with Scramble Effect */}
            <div style={{ display: 'flex', gap: '0.5ch' }}>
                <span>SOUND:</span>
                <span className="text-white group-hover:text-[#39ff14] transition-colors" style={{ color: isHovered ? '#39ff14' : 'inherit' }}>
                    <HoverScrambleText
                        text={isMuted ? "OFF" : "ON"}
                        trigger={isHovered}
                        duration={0.4}
                    />
                </span>
            </div>
        </button>
    );
};

export default SoundToggle;
