import React, { useEffect, useRef, useState } from 'react';
import './VisiMisi.css';

import { 
    FaBrain,       
    FaRocket,     
    FaHandsHelping, 
    FaUniversity,  
    FaGlobe         
} from 'react-icons/fa';

import PieChartImage from "/src/assets/visimisi.png";
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

            const cardIds = ['vm-card-1','vm-card-2','vm-card-3','vm-card-4','vm-card-5'];
            const newLines = [];

            cardIds.forEach((id) => {
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
        <div className="vm-container" ref={containerRef}>
            <div className="vm-video-bg-wrapper">
                <video ref={videoRef} autoPlay loop muted playsInline className="vm-video-bg">
                    <source src="/videos/background.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="vm-background-grid"></div>

            {/* Header */}
            <div className="vm-header">
                <div className="vm-header-left">
                    <img src="/Lambang_Universitas_Negeri_Medan.png" alt="Lambang Universitas Negeri Medan" className="vm-univ-logo" />
                    <div className="vm-univ-text">
                    Ilmu<br />Komputer
                    </div>
                </div>

                <h1 className="vm-title">VISI &amp; MISI</h1>

                <div className="vm-header-dots" aria-hidden>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            {}
            <div className="vm-content-wrapper" ref={contentRef}>
                <svg className="vm-lines-svg" aria-hidden="true">
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
                
                <img ref={pieRef} src={PieChartImage} alt="Visi Misi Chart" className="vm-pie-chart" />

                <div className="vm-card" id="vm-card-1">
                    <div className="vm-card-icon"><FaBrain /></div>
                    <h3>Pendidikan & Pembelajaran</h3>
                    <p>Fokus pada Artificial Intelegensi dan Sains Komputasi yang bermutu dan link and match.</p>
                </div>
                <div className="vm-card" id="vm-card-2">
                    <div className="vm-card-icon"><FaRocket /></div>
                    <h3>Penelitian Inovatif</h3>
                    <p>Penelitian AI dan Sains Komputasi yang inovatif, aplikatif, serta rekayasa industri kreatif.</p>
                </div>

                <div className="vm-card" id="vm-card-3">
                    <div className="vm-card-icon"><FaHandsHelping /></div>
                    <h3>Pengabdian Masyarakat</h3>
                    <p>Pemetaan kebutuhan dan permasalahan teknologi komputer di masyarakat.</p>
                </div>

                <div className="vm-card" id="vm-card-4">
                    <div className="vm-card-icon"><FaUniversity /></div>
                    <h3>Pengembangan Budaya</h3>
                    <p>Mengembangkan budaya ilmiah, etnik, kewirausahaan, dan suasana akademik yang sehat.</p>
                </div>

                <div className="vm-card" id="vm-card-5">
                    <div className="vm-card-icon"><FaGlobe /></div>
                    <h3>Kerjasama Berkelanjutan</h3>
                    <p>Menjalin kerjasama di tingkat lokal, nasional, regional, dan internasional.</p>
                </div>

            </div>
            <button
                className="vm-back-bottom"
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