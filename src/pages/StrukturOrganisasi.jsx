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
                <div className="unified-header-logo-container">
                    <img
                        src="/Lambang_Universitas_Negeri_Medan.png"
                        alt="Logo UNIMED"
                        className="unified-header-logo"
                    />
                    <div className="unified-header-text">
                        <div>Ilmu</div>
                        <div>Komputer</div>
                    </div>
                </div>

                {/* Title - Center Top */}
                <div className="unified-header-title-center">
                    <h1 className="unified-glass-title">STRUKTUR ORGANISASI</h1>
                </div>

                {/* Back Button - Top Right */}
                <div className="unified-back-button-container">
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