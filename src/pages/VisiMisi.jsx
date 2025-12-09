import React, { useState } from 'react';
import {
    FaBrain,
    FaRocket,
    FaHandsHelping,
    FaUniversity,
    FaGlobe
} from 'react-icons/fa';

import PieChartImage from "/src/assets/visimisi.png";
import SoundToggle from '../components/UI/SoundToggle';
import { HoverScrambleText } from '../components/UI/ScrambleText';
import audioManager from '../utils/AudioManager';

const vmCardConfig = [
    {
        id: 'vm-card-1',
        Icon: FaBrain,
        title: 'Pendidikan & Pembelajaran',
        description: 'Fokus pada Artificial Intelligence dan Sains Komputasi yang bermutu dan link and match.',
        style: { top: '20%', left: '8%' },
        accent: 'linear-gradient(180deg,#ff8a50,#ff6b2e)',
        borderColor: 'rgba(255,127,80,0.18)',
        shadow: '0 8px 30px rgba(255,127,80,0.08)',
    },
    {
        id: 'vm-card-2',
        Icon: FaRocket,
        title: 'Penelitian Inovatif',
        description: 'Penelitian AI dan Sains Komputasi yang inovatif, aplikatif, serta rekayasa industri kreatif.',
        style: { top: '20%', right: '8%' },
        accent: 'linear-gradient(180deg,#ff6b6b,#ff3b30)',
        borderColor: 'rgba(255,77,79,0.18)',
        shadow: '0 8px 30px rgba(255,77,79,0.08)',
    },
    {
        id: 'vm-card-3',
        Icon: FaHandsHelping,
        title: 'Pengabdian Masyarakat',
        description: 'Pemetaan kebutuhan dan permasalahan teknologi komputer di masyarakat.',
        style: { top: '65%', right: '5%' },
        accent: 'linear-gradient(180deg,#60a5fa,#3b82f6)',
        borderColor: 'rgba(59,130,246,0.18)',
        shadow: '0 8px 30px rgba(59,130,246,0.08)',
    },
    {
        id: 'vm-card-4',
        Icon: FaUniversity,
        title: 'Pengembangan Budaya',
        description: 'Mengembangkan budaya ilmiah, etnik, kewirausahaan, dan suasana akademik yang sehat.',
        style: { top: '65%', left: '5%' },
        accent: 'linear-gradient(180deg,#34d399,#10b981)',
        borderColor: 'rgba(46,204,113,0.18)',
        shadow: '0 8px 30px rgba(46,204,113,0.08)',
    },
    {
        id: 'vm-card-5',
        Icon: FaGlobe,
        title: 'Kerjasama Berkelanjutan',
        description: 'Menjalin kerjasama di tingkat lokal, nasional, regional, dan internasional.',
        style: { bottom: '-10%', left: '50%', transform: 'translateX(-50%)' },
        accent: 'linear-gradient(180deg,#f6d365,#f6c85f)',
        borderColor: 'rgba(246,200,95,0.18)',
        shadow: '0 8px 30px rgba(246,200,95,0.08)',
    },
];

const VisiMisi = () => {
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

    return (
        <div className="glass-page" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
            {/* Background Video */}
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
                    <h1 className="unified-glass-title">VISI &amp; MISI</h1>
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

            {/* Content Content - Cards */}
            <div className="glass-content-wrapper" style={{ marginTop: '0' }}>
                <img src={PieChartImage} alt="Visi Misi Chart" className="glass-pie-chart" style={{ marginTop: '50px' }} />

                {vmCardConfig.map((card) => {
                    const Icon = card.Icon;
                    return (
                        <div
                            key={card.id}
                            id={card.id}
                            className="glass-card-floating"
                            style={{ ...card.style, borderColor: card.borderColor, boxShadow: card.shadow }}
                            onMouseEnter={() => audioManager.playHover()}
                        >
                            <span className="glass-card-accent" style={{ background: card.accent }} aria-hidden></span>
                            <div className="glass-card-icon"><Icon /></div>
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                        </div>
                    );
                })}
            </div>

            {/* Sound Toggle - Bottom Left */}
            <div style={{ position: 'fixed', bottom: '30px', left: '30px', zIndex: 100 }}>
                <SoundToggle />
            </div>
        </div>
    );
}

export default VisiMisi;