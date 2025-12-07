import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
    FaGraduationCap,
    FaFlask,
    FaQuoteLeft,
    FaEnvelope,
    FaBook,
    FaGoogle,
} from 'react-icons/fa';
import SoundToggle from '../components/UI/SoundToggle';
import { ScrambleText, HoverScrambleText } from '../components/UI/ScrambleText';
import audioManager from '../utils/AudioManager';

// Data Dosen
const lecturers = [
    {
        id: 1,
        name: 'Dr. Hermawan Syahputra, M.Si.',
        role: 'Lektor (III/c)',
        avatar: 'https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=GK5EHLYAAAAJ&citpid=2',
        tags: ['Image Processing', 'Pattern Recognition', 'Computer Vision'],
        education: [
            'S3 Ilmu Komputer – UGM',
            'S2 Ilmu Komputer – IPB',
            'S1 Matematika – USU'
        ],
        research: ['Image Processing', 'Pattern Recognition', 'Computer Vision'],
        bio: 'Dr. Hermawan Syahputra, M.Si. merupakan dosen dengan jabatan Lektor yang memiliki fokus keahlian mendalam di bidang Image Processing dan Computer Vision.',
        contacts: [
            { type: 'email', href: 'mailto:hermawan@unimed.ac.id', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=GK5EHLYAAAAJ&hl=en&oi=ao', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6011957', icon: <FaBook /> },
        ],
    },
    {
        id: 2,
        name: 'Said Iskandar Al Idrus, S.Si., M.Si.',
        role: 'Lektor (III/c)',
        avatar: 'https://web-prodi-sepia.vercel.app/said.jpg',
        tags: ['Computational Science'],
        education: [
            'S2 Sains Komputasi – ITB',
            'S1 Matematika – USU'
        ],
        research: ['Computational Science'],
        bio: 'Said Iskandar Al Idrus, S.Si., M.Si. aktif sebagai Lektor dengan spesialisasi di bidang Computational Science.',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=1VgpJpIAAAAJ&hl=en', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6016058', icon: <FaBook /> },
        ],
    },
    {
        id: 3,
        name: 'Zulfahmi Indra, S.Si., M.Cs.',
        role: 'Lektor (III/c)',
        avatar: 'https://web-prodi-sepia.vercel.app/zulfahmi.jpg',
        tags: ['Artificial Intelligence', 'Algoritma Genetika'],
        education: [
            'S2 Ilmu Komputer – UGM',
            'S1 Matematika – USU'
        ],
        research: ['Artificial Intelligence', 'Algoritma Genetika'],
        bio: 'Zulfahmi Indra, S.Si., M.Cs. memiliki keahlian khusus dalam Kecerdasan Buatan, khususnya pada penerapan Algoritma Genetika.',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=c2BJ__cAAAAJ&hl=en&oi=ao', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6026820', icon: <FaBook /> },
        ],
    },
    {
        id: 4,
        name: 'Dr. Arnita, M.Si.',
        role: 'Lektor (III/d)',
        avatar: 'https://web-prodi-sepia.vercel.app/arnita.jpg',
        tags: ['Statistic', 'Data Mining'],
        education: [
            'S3 Matematika – USU',
            'S2 Statistika – IPB',
            'S1 Matematika – USU'
        ],
        research: ['Statistic', 'Data Mining'],
        bio: 'Dr. Arnita, M.Si. adalah ahli di bidang Statistik dan Data Mining dengan latar belakang pendidikan doktor dari USU.',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=ih0EgWYAAAAJ&hl=en&oi=ao', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6101062', icon: <FaBook /> },
        ],
    },
    {
        id: 5,
        name: 'Yulita Molliq Rangkuti, S.Si., M.Sc., Ph.D.',
        role: 'Lektor Kepala (III/d)',
        avatar: 'https://web-prodi-sepia.vercel.app/yulita.jpg',
        tags: ['Mathematic Modelling'],
        education: [
            'S3 Matematika – Universiti Kebangsaan Malaysia',
            'S2 Matematika – Universiti Kebangsaan Malaysia',
            'S1 Matematika – USU'
        ],
        research: ['Mathematic Modelling'],
        bio: 'Yulita Molliq Rangkuti, Ph.D. menjabat sebagai Lektor Kepala dengan keahlian internasional di bidang Pemodelan Matematika.',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=Q6qWe3kAAAAJ&hl=en&oi=ao', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6007066', icon: <FaBook /> },
        ],
    },
    {
        id: 6,
        name: 'Kana Saputra S, S.Pd., M.Kom.',
        role: 'Asisten Ahli (III/b)',
        avatar: 'https://web-prodi-sepia.vercel.app/kana.jpg',
        tags: ['Bioinformatic', 'Data Mining'],
        education: [
            'S2 Ilmu Komputer – IPB',
            'S1 Pendidikan Matematika – UNSYIAH'
        ],
        research: ['Bioinformatic', 'Data Mining'],
        bio: 'Kana Saputra S, S.Pd., M.Kom. berfokus pada riset Bioinformatika dan penggalian data (Data Mining).',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=IDcIUS4AAAAJ&hl=en&oi=ao', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/5980636', icon: <FaBook /> },
        ],
    },
    {
        id: 7,
        name: 'Insan Taufik, M.Kom.',
        role: 'Asisten Ahli (III/b)',
        avatar: 'https://web-prodi-sepia.vercel.app/insan.jpg',
        tags: ['Web Programming', 'Image Processing'],
        education: [
            'S2 Ilmu Komputer – UPI',
            'S1 Ilmu Komputer'
        ],
        research: ['Web Programming', 'Image Processing'],
        bio: 'Insan Taufik, M.Kom. memiliki spesialisasi dalam pengembangan Web Programming dan Pengolahan Citra Digital.',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=5gvslm0AAAAJ&hl=en&oi=ao', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6732760', icon: <FaBook /> },
        ],
    },
    {
        id: 8,
        name: 'Debi Yandra Niska, M.Kom',
        role: 'Asisten Ahli (III/b)',
        avatar: '/Lambang_Universitas_Negeri_Medan.png', /* Placeholder until base64 is fixed */
        tags: ['Decision Support System'],
        education: [
            'S2 Ilmu Komputer – UPI',
            'S1 Ilmu Komputer – UPI'
        ],
        research: ['Decision Support System'],
        bio: 'Debi Yandra Niska, M.Kom berfokus pada pengembangan Sistem Pendukung Keputusan (Decision Support System).',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=fm-UV-0AAAAJ&hl=en&oi=ao', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6162023', icon: <FaBook /> },
        ],
    },
    {
        id: 9,
        name: 'Dr. Eng. Mansur As',
        role: 'Lektor (III/c)',
        avatar: 'https://web-prodi-sepia.vercel.app/mansur.jpg',
        tags: ['Data Mining', 'Artificial Intelligence'],
        education: [
            'S3 Dept. of Advanced IT – Kyushu University, Jepang',
            'S2 Teknik Informatika – UNHAS & Kyushu University',
            'S1 Teknik Informatika – STMIK Handayani Makassar'
        ],
        research: ['Data Mining', 'Artificial Intelligence'],
        bio: 'Dr. Eng. Mansur As adalah lulusan Kyushu University Jepang yang ahli dalam bidang Data Mining dan Kecerdasan Buatan.',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=1jPsRKAAAAAJ&hl=en&oi=ao', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6774720', icon: <FaBook /> },
        ],
    },
    {
        id: 10,
        name: 'Putri Harliana, S.T., M.Kom',
        role: 'Lektor (III/d)',
        avatar: 'https://web-prodi-sepia.vercel.app/putri.jpg',
        tags: ['Artificial Intelligence'],
        education: [
            'S2 Universitas Sumatera Utara',
            'S1 Sekolah Tinggi Teknik Harapan'
        ],
        research: ['Artificial Intelligence'],
        bio: 'Putri Harliana, S.T., M.Kom menjabat sebagai Lektor dengan fokus riset utama pada bidang Artificial Intelligence.',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=CG7og2UAAAAJ&hl=en&oi=ao', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6002359', icon: <FaBook /> },
        ],
    },
    {
        id: 11,
        name: 'Fanny Ramadhani, S.Kom., M.Kom',
        role: 'Asisten Ahli (III/b)',
        avatar: 'https://web-prodi-sepia.vercel.app/fanny.jpg',
        tags: ['Computer Science', 'Data Science'],
        education: [
            'S2 Teknik Informatika – USU',
            'S1 Teknik Informatika – USU'
        ],
        research: ['Computer Science', 'Data Science'],
        bio: 'Fanny Ramadhani, S.Kom., M.Kom aktif meneliti di bidang Computer Science dan Data Science.',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?hl=en&view_op=list_works&authuser=4&gmla=AJsN-F7BQzVynZA5WvF2t3RQpONZoiwkZJaF6JjkbTZu3AfEZq4DbN323OLnLvTMf9X5zW_DCe24tzz96YkKSLyK9QkXllsL-Q&user=xv03R9cAAAAJ', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6752703', icon: <FaBook /> },
        ],
    },
    {
        id: 12,
        name: 'Adidtya Perdana, S.T., M.Kom',
        role: 'Lektor (III/c)',
        avatar: 'https://web-prodi-sepia.vercel.app/adidtya.jpg',
        tags: ['Artificial Intelligence'],
        education: [
            'S2 Teknik Informatika – USU',
            'S1 Teknik Informatika – Sekolah Tinggi Teknik Harapan'
        ],
        research: ['Artificial Intelligence'],
        bio: 'Adidtya Perdana, S.T., M.Kom memiliki keahlian dalam bidang Kecerdasan Buatan dan menjabat sebagai Lektor.',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=kQKIiT0AAAAJ&hl=id&authuser=1', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/5979680', icon: <FaBook /> },
        ],
    },
    {
        id: 13,
        name: 'Sri Dewi, S.Kom., M.Kom',
        role: 'Asisten Ahli (III/b)',
        avatar: 'https://web-prodi-sepia.vercel.app/dewi.jpg',
        tags: ['Data Mining'],
        education: [
            'S2 Sistem Informasi – Universitas Putra Indonesia YPTK Padang',
            'S1 Sistem Informasi – Universitas Putra Indonesia YPTK Padang'
        ],
        research: ['Data Mining'],
        bio: 'Sri Dewi, S.Kom., M.Kom merupakan dosen yang fokus pada bidang Data Mining.',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=XwHiyxgAAAAJ&hl=en', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6835736', icon: <FaBook /> },
        ],
    },
    {
        id: 14,
        name: 'Dedy Kiswanto S.Kom., M.Kom',
        role: 'Asisten Ahli (III/b)',
        avatar: 'https://web-prodi-sepia.vercel.app/dedi.jpg',
        tags: ['Network Infrastructure', 'Cyber Security'],
        education: [
            'S2 Ilmu Komputer – IPB',
            'S1 Ilmu Komputer – IPB'
        ],
        research: ['Network Infrastructure', 'Cyber Security'],
        bio: 'Dedy Kiswanto S.Kom., M.Kom memiliki spesialisasi teknis dalam Infrastruktur Jaringan dan Keamanan Siber (Cyber Security).',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=_SKa-k0AAAAJ&hl=en&oi=ao', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6828715', icon: <FaBook /> },
        ],
    },
    {
        id: 15,
        name: 'Ichwanul Muslim Karo Karo, S.Kom, M.Kom',
        role: 'Asisten Ahli (III/b)',
        avatar: 'https://web-prodi-sepia.vercel.app/iwan.jpg',
        tags: ['Data Mining', 'Spatial Mining', 'Data Science'],
        education: [
            'S2 Informatika – Universitas Telkom',
            'S1 Ilmu Komputasi – Universitas Telkom'
        ],
        research: ['Data Mining', 'Spatial Mining', 'Data Science'],
        bio: 'Ichwanul Muslim Karo Karo, S.Kom, M.Kom memiliki keahlian luas dalam Data Science, termasuk Spatial Mining.',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.co.id/citations?user=LPPLLhMAAAAJ&hl=id', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6731973', icon: <FaBook /> },
        ],
    },
];

const DosenProfile = () => {
    const [selected, setSelected] = useState(null);
    const [isBackHovered, setIsBackHovered] = useState(false);
    const [isCloseHovered, setIsCloseHovered] = useState(false);

    // Play modal sound when selected changes to non-null
    useEffect(() => {
        if (selected) {
            audioManager.playModalOpen();
        }
    }, [selected]);

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
        // Root container - RELATIVE, FULL VIEWPORT, NO SCROLL
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', fontFamily: '"IBM Plex Mono", monospace' }}>

            {/* 1. BACKGROUND LAYER (Absolute/Fixed) */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <div className="glass-video-bg-wrapper" style={{ position: 'absolute', inset: 0 }}>
                    <video autoPlay loop muted playsInline className="glass-video-bg" style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                        <source src="/videos/background.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="glass-background-grid" style={{ position: 'absolute', inset: 0 }}></div>
                <div className="lecturer-orb orb-left" aria-hidden></div>
                <div className="lecturer-orb orb-right" aria-hidden></div>
            </div>

            {/* 2. MAIN SCROLLABLE CONTAINER */}
            <div style={{
                position: 'absolute',
                inset: 0,
                overflowY: 'auto',
                overflowX: 'hidden',
                zIndex: 10
            }}>
                {/* HEADER (Part of scrollable content now) */}
                <div style={{ position: 'relative', width: '100%', height: '150px', marginBottom: '2rem' }}>
                    {/* Logo */}
                    <div style={{ position: 'absolute', top: '2rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '16px', zIndex: 10 }}>
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

                    {/* Title */}
                    <div style={{ position: 'absolute', top: '3rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 1 }}>
                        <h1 className="glass-title" style={{ margin: 0 }}>PROFIL DOSEN</h1>
                    </div>

                    {/* Back Button */}
                    <div style={{ position: 'absolute', top: '3rem', right: '3rem', zIndex: 10 }}>
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
                            <span
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ transition: "opacity 0.3s" }}
                            >
                                [
                            </span>
                            <HoverScrambleText text="KEMBALI" trigger={isBackHovered} />
                            <span
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ transition: "opacity 0.3s" }}
                            >
                                ]
                            </span>
                        </button>
                    </div>
                </div>

                {/* CONTENT GRID */}
                <div className="lecturer-grid" style={{ padding: '0 20px 100px 20px' }}>
                    {lecturers.map((lecturer) => (
                        <article
                            key={lecturer.id}
                            className="glass-panel lecturer-card"
                            onMouseEnter={() => audioManager.playHover()}
                        >
                            <img src={lecturer.avatar} alt={lecturer.name} className="lecturer-avatar" />
                            <h3>{lecturer.name}</h3>
                            <p>{lecturer.role}</p>

                            <div className="lecturer-tags">
                                {lecturer.tags.slice(0, 3).map((tag) => (
                                    <span key={tag} className="lecturer-tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <button
                                className="lecturer-btn"
                                onClick={() => {
                                    audioManager.playClick();
                                    setSelected(lecturer);
                                }}
                                onMouseEnter={() => audioManager.playHover()}
                            >
                                Lihat Detail
                            </button>
                        </article>
                    ))}
                </div>
            </div>

            {/* 3. SOUND TOGGLE (Fixed Bottom Left) */}
            <div style={{ position: 'absolute', bottom: '30px', left: '30px', zIndex: 2000 }}>
                <SoundToggle />
            </div>

            {/* 4. MODAL OVERLAY (Fixed Full Screen) */}
            <AnimatePresence>
                {selected && (
                    <div
                        className="lecturer-modal-overlay"
                        role="dialog"
                        aria-modal="true"
                        onClick={() => setSelected(null)}
                        style={{ zIndex: 10001, position: 'fixed', inset: 0 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="glass-panel lecturer-modal"
                            onClick={(e) => e.stopPropagation()}
                            style={{ position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => {
                                    audioManager.playClick();
                                    setSelected(null);
                                }}
                                onMouseEnter={() => setIsCloseHovered(true)}
                                onMouseLeave={() => setIsCloseHovered(false)}
                                className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                                style={{
                                    position: 'absolute',
                                    top: '1.5rem',
                                    right: '1.5rem',
                                    background: "none",
                                    border: "none",
                                    color: "rgba(255, 255, 255, 0.7)",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    fontFamily: '"IBM Plex Mono", monospace',
                                    fontSize: "0.875rem",
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    zIndex: 10,
                                }}
                                aria-label="Tutup detail"
                            >
                                <span
                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ transition: "opacity 0.3s" }}
                                >
                                    [
                                </span>
                                <HoverScrambleText text="CLOSE" trigger={isCloseHovered} />
                                <span
                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ transition: "opacity 0.3s" }}
                                >
                                    ]
                                </span>
                            </button>

                            <div className="lecturer-modal__header">
                                <img src={selected.avatar} alt={selected.name} />
                                <div className="lecturer-modal__title">
                                    <h2>{selected.name}</h2>
                                    <p>{selected.role}</p>
                                </div>
                            </div>

                            <hr style={{ borderColor: 'rgba(255,255,255,0.08)' }} />

                            <div className="lecturer-modal__sections">
                                <div className="lecturer-modal__section">
                                    <h4><FaGraduationCap /> <ScrambleText text="Pendidikan" delay={0.2} duration={0.8} /></h4>
                                    <ul>
                                        {selected.education.map((item, index) => (
                                            <li key={item}>
                                                <ScrambleText text={item} delay={0.4 + (index * 0.1)} duration={0.8} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="lecturer-modal__section">
                                    <h4><FaFlask /> <ScrambleText text="Minat Penelitian" delay={0.6} duration={0.8} /></h4>
                                    <ul>
                                        {selected.research.map((item, index) => (
                                            <li key={item}>
                                                <ScrambleText text={item} delay={0.8 + (index * 0.1)} duration={0.8} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="lecturer-modal__section lecturer-modal__bio">
                                <h4><FaQuoteLeft /> <ScrambleText text="Biografi Singkat" delay={1.0} duration={0.8} /></h4>
                                <p><ScrambleText text={selected.bio} delay={1.2} duration={0.5} /></p>
                            </div>

                            {/* --- BAGIAN TOMBOL PUBLIKASI & SINTA --- */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '25px' }}>

                                {/* 1. Tombol Google Scholar (Biru Lebih Terang) */}
                                {selected.contacts
                                    .filter((c) => c.type === 'scholar')
                                    .map((contact, index) => (
                                        <a
                                            key={index}
                                            href={contact.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="lecturer-btn"
                                            onClick={() => audioManager.playClick()}
                                            onMouseEnter={() => audioManager.playHover()}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                textDecoration: 'none',
                                                textAlign: 'center',
                                                backgroundColor: 'rgba(66, 133, 244, 0.4)',
                                                border: '1px solid rgba(66, 133, 244, 0.8)',
                                                width: 'auto',
                                                color: '#fff',
                                                fontWeight: '600'
                                            }}
                                        >
                                            <FaGoogle /> Google Scholar
                                        </a>
                                    ))}

                                {/* 2. Tombol Sinta (Orange/Kuning) */}
                                {selected.contacts
                                    .filter((c) => c.type === 'sinta')
                                    .map((contact, index) => (
                                        <a
                                            key={index}
                                            href={contact.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="lecturer-btn"
                                            onClick={() => audioManager.playClick()}
                                            onMouseEnter={() => audioManager.playHover()}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                textDecoration: 'none',
                                                textAlign: 'center',
                                                backgroundColor: 'rgba(255, 165, 0, 0.2)',
                                                border: '1px solid rgba(255, 165, 0, 0.6)',
                                                color: '#ffb74d',
                                                width: 'auto'
                                            }}
                                        >
                                            <FaBook /> Profil Sinta
                                        </a>
                                    ))}
                            </div>

                            {/* --- KONTAK LAIN (Email, dll) --- */}
                            <div
                                className="lecturer-contact-links"
                                style={{ marginTop: '20px', justifyContent: 'center', display: 'flex', gap: '20px' }}
                            >
                                {selected.contacts
                                    .filter((contact) => contact.type !== 'sinta' && contact.type !== 'scholar')
                                    .map((contact, index) => (
                                        <a
                                            key={index}
                                            href={contact.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label={contact.type}
                                            onClick={() => audioManager.playClick()}
                                            onMouseEnter={() => audioManager.playHover()}
                                            style={{ fontSize: '1.5rem', opacity: 0.8, transition: '0.3s', cursor: 'pointer', color: 'inherit' }}
                                        >
                                            {contact.icon}
                                        </a>
                                    ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DosenProfile;