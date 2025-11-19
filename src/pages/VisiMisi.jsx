import React, { useEffect, useRef, useState } from 'react';

import { 
    FaBrain,       
    FaRocket,     
    FaHandsHelping, 
    FaUniversity,  
    FaGlobe         
} from 'react-icons/fa';

import PieChartImage from "/src/assets/visimisi.png";

const vmCardConfig = [
    {
        id: 'vm-card-1',
        Icon: FaBrain,
        title: 'Pendidikan & Pembelajaran',
        description: 'Fokus pada Artificial Intelligence dan Sains Komputasi yang bermutu dan link and match.',
        style: { top: '10%', left: '15%' },
        accent: 'linear-gradient(180deg,#ff8a50,#ff6b2e)',
        borderColor: 'rgba(255,127,80,0.18)',
        shadow: '0 8px 30px rgba(255,127,80,0.08)',
    },
    {
        id: 'vm-card-2',
        Icon: FaRocket,
        title: 'Penelitian Inovatif',
        description: 'Penelitian AI dan Sains Komputasi yang inovatif, aplikatif, serta rekayasa industri kreatif.',
        style: { top: '10%', right: '15%' },
        accent: 'linear-gradient(180deg,#ff6b6b,#ff3b30)',
        borderColor: 'rgba(255,77,79,0.18)',
        shadow: '0 8px 30px rgba(255,77,79,0.08)',
    },
    {
        id: 'vm-card-3',
        Icon: FaHandsHelping,
        title: 'Pengabdian Masyarakat',
        description: 'Pemetaan kebutuhan dan permasalahan teknologi komputer di masyarakat.',
        style: { top: '45%', right: '5%' },
        accent: 'linear-gradient(180deg,#60a5fa,#3b82f6)',
        borderColor: 'rgba(59,130,246,0.18)',
        shadow: '0 8px 30px rgba(59,130,246,0.08)',
    },
    {
        id: 'vm-card-4',
        Icon: FaUniversity,
        title: 'Pengembangan Budaya',
        description: 'Mengembangkan budaya ilmiah, etnik, kewirausahaan, dan suasana akademik yang sehat.',
        style: { top: '45%', left: '5%' },
        accent: 'linear-gradient(180deg,#34d399,#10b981)',
        borderColor: 'rgba(46,204,113,0.18)',
        shadow: '0 8px 30px rgba(46,204,113,0.08)',
    },
    {
        id: 'vm-card-5',
        Icon: FaGlobe,
        title: 'Kerjasama Berkelanjutan',
        description: 'Menjalin kerjasama di tingkat lokal, nasional, regional, dan internasional.',
        style: { bottom: '5%', left: '50%', transform: 'translateX(-50%)' },
        accent: 'linear-gradient(180deg,#f6d365,#f6c85f)',
        borderColor: 'rgba(246,200,95,0.18)',
        shadow: '0 8px 30px rgba(246,200,95,0.08)',
    },
];

const vmCardIds = vmCardConfig.map(card => card.id);

const VisiMisi = () => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const pieRef = useRef(null);
    const videoRef = useRef(null);
    const [lines, setLines] = useState([]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const compute = () => {
            const wrapper = contentRef.current;
            const pie = pieRef.current;
            if (!wrapper || !pie) return;

            const wrapperRect = wrapper.getBoundingClientRect();
            const pieRect = pie.getBoundingClientRect();

            const pieCenter = {
                x: pieRect.left - wrapperRect.left + pieRect.width / 2,
                y: pieRect.top - wrapperRect.top + pieRect.height / 2,
            };

            const newLines = [];

            vmCardIds.forEach((id) => {
                const el = document.getElementById(id);
                if (!el) return;
                const r = el.getBoundingClientRect();
                const cardCenter = {
                    x: r.left - wrapperRect.left + r.width / 2,
                    y: r.top - wrapperRect.top + r.height / 2,
                };

                newLines.push({ x1: pieCenter.x, y1: pieCenter.y, x2: cardCenter.x, y2: cardCenter.y });
            });

            setLines(newLines);
        };

        compute();
        const ro = new ResizeObserver(() => compute());
        const wrapperEl = contentRef.current || document.documentElement;
        ro.observe(wrapperEl);
        window.addEventListener('resize', compute);
        window.addEventListener('scroll', compute, { passive: true });

        const t = setTimeout(compute, 300);

        const pieEl = pieRef.current;
        if (pieEl && !pieEl.complete) {
            pieEl.addEventListener('load', compute);
        }

        const vid = videoRef.current;
        if (vid) {
            vid.addEventListener('loadedmetadata', compute);
            vid.addEventListener('loadeddata', compute);
        }

        return () => {
            ro.disconnect();
            window.removeEventListener('resize', compute);
            window.removeEventListener('scroll', compute);
            clearTimeout(t);
            if (pieEl && !pieEl.complete) pieEl.removeEventListener('load', compute);
            if (vid) {
                vid.removeEventListener('loadedmetadata', compute);
                vid.removeEventListener('loadeddata', compute);
            }
        };
    }, []);

    return (
        <div className="glass-page" ref={containerRef}>
            <div className="glass-video-bg-wrapper">
                <video ref={videoRef} autoPlay loop muted playsInline className="glass-video-bg">
                    <source src="/videos/background.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="glass-background-grid"></div>

            {/* Header */}
            <div className="glass-header">
                <div className="glass-header-left">
                    <img src="/Lambang_Universitas_Negeri_Medan.png" alt="Lambang Universitas Negeri Medan" className="glass-header-logo" />
                    <div className="glass-header-text">
                    Ilmu<br />Komputer
                    </div>
                </div>

                <h1 className="glass-title">VISI &amp; MISI</h1>

                <div className="glass-header-dots" aria-hidden>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            {}
            <div className="glass-content-wrapper" ref={contentRef}>
                <svg className="glass-lines-svg" aria-hidden="true">
                    {lines.map((ln, i) => (
                        <g key={i}>
                            <line
                                x1={ln.x1}
                                y1={ln.y1}
                                x2={ln.x2}
                                y2={ln.y2}
                                stroke="rgba(255,255,255,0.7)"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeDasharray="6 6"
                            />
                            <circle cx={ln.x2} cy={ln.y2} r={4} fill="rgba(255,255,255,0.9)" />
                        </g>
                    ))}
                </svg>
                
                <img ref={pieRef} src={PieChartImage} alt="Visi Misi Chart" className="glass-pie-chart" />

                {vmCardConfig.map((card) => {
                    const Icon = card.Icon;
                    return (
                        <div
                            key={card.id}
                            id={card.id}
                            className="glass-card-floating"
                            style={{ ...card.style, borderColor: card.borderColor, boxShadow: card.shadow }}
                        >
                            <span className="glass-card-accent" style={{ background: card.accent }} aria-hidden></span>
                            <div className="glass-card-icon"><Icon /></div>
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                        </div>
                    );
                })}

            </div>
            <button
                className="glass-back-bottom"
                onClick={() => {
                    if (typeof window !== "undefined") {
                        try {
                            if (window.history && window.history.length > 1) {
                                window.history.back();
                                return;
                            }
                        } catch (e) {}
                        window.location.hash = "#/home";
                    }
                }}
                aria-label="Kembali"
            >
                 Kembali
            </button>
        </div>
    );
}

export default VisiMisi;