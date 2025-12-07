import React, { useState } from 'react';
import strukturOrganisasiImg from '/src/assets/struktur.png';
import SoundToggle from '../components/UI/SoundToggle';
import { HoverScrambleText } from '../components/UI/ScrambleText';
import audioManager from '../utils/AudioManager';

const StrukturOrganisasi = () => {
    const [isBackHovered, setIsBackHovered] = useState(false);

    const handleBack = () => {
        audioManager.playClick();
        if (typeof window !== "undefined") {
            try {
                if (window.history && window.history.length > 1) {
                    window.history.back();
                    return;
                }
            } catch (e) { }
            window.location.hash = "#/home";
        }
    };

    const cardStyles = {
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        zIndex: 10,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
    };

    return (
        <div className="glass-page" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
            <div className="glass-video-bg-wrapper">
                <video autoPlay loop muted playsInline className="glass-video-bg">
                    <source src="/videos/background.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="glass-background-grid"></div>

            {/* Header Layer */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>
                {/* Logo - Top Left */}
                <div style={{ position: 'absolute', top: '2rem', left: '2rem', pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img
                        src="/Lambang_Universitas_Negeri_Medan.png"
                        alt="Logo UNIMED"
                        style={{ width: '64px', height: '64px', borderRadius: '50%', filter: 'drop-shadow(0 0 14px rgba(0, 157, 10, 0.45))' }}
                    />
                    <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '24px', fontWeight: 700, lineHeight: 1.1, color: '#FFFFFF', textShadow: '0 0 12px rgba(255, 255, 255, 0.35)' }}>
                        <div>Ilmu</div>
                        <div>Komputer</div>
                    </div>
                </div>

                {/* Title - Center Top */}
                <div style={{ position: 'absolute', top: '3rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                    <h1 className="glass-title" style={{ margin: 0, fontSize: '2.5rem', textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>STRUKTUR ORGANISASI</h1>
                </div>

                {/* Back Button - Top Right */}
                <div style={{ position: 'absolute', top: '3rem', right: '3rem', pointerEvents: 'auto' }}>
                    <button
                        onClick={handleBack}
                        onMouseEnter={() => setIsBackHovered(true)}
                        onMouseLeave={() => setIsBackHovered(false)}
                        className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                        style={{
                            background: "none",
                            border: "none",
                            color: "rgba(255, 255, 255, 0.7)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            fontFamily: '"IBM Plex Mono", monospace',
                            fontSize: "1rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                        }}
                    >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transition: "opacity 0.3s" }}>[</span>
                        <HoverScrambleText text="KEMBALI" trigger={isBackHovered} />
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transition: "opacity 0.3s" }}>]</span>
                    </button>
                </div>
            </div>

            {/* Content Content - Centered */}
            <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px', pointerEvents: 'none' }}>
                <div className="glass-panel" style={{ ...cardStyles, pointerEvents: 'auto', maxHeight: '80vh', overflowY: 'auto' }}>
                    <h2 className="glass-panel-title" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>Bagan Struktur Organisasi Fakultas</h2>

                    <div className="glass-image-frame">
                        <img
                            src={strukturOrganisasiImg}
                            alt="Bagan Struktur Organisasi"
                            className="glass-responsive-img"
                        />
                    </div>

                </div>
            </div>

            {/* Sound Toggle - Bottom Left */}
            <div style={{ position: 'fixed', bottom: '30px', left: '30px', zIndex: 100 }}>
                <SoundToggle />
            </div>
        </div>
    );
}

export default StrukturOrganisasi;