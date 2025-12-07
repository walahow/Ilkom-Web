import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import SoundToggle from '../components/UI/SoundToggle';
import { ScrambleText, HoverScrambleText } from '../components/UI/ScrambleText';
import audioManager from '../utils/AudioManager';

const newsItems = [
    {
        id: 1,
        title: 'Mahasiswa Informatika Juara Hackathon Nasional 2025',
        category: 'Prestasi',
        date: '19 Nov 2025',
        image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&w=900&q=80',
        excerpt:
            "Tim 'CodeWarrior' berhasil mengalahkan 50 universitas lain dalam ajang inovasi teknologi tahunan.",
        content:
            "Tim 'CodeWarrior' yang terdiri dari mahasiswa Informatika angkatan 2021 berhasil menorehkan prestasi gemilang sebagai Juara 1 Hackathon Nasional 2025. Kompetisi ini diikuti oleh lebih dari 50 universitas dengan fokus pada solusi digital untuk layanan publik. Solusi yang diusung berupa platform AI yang membantu pemerintah daerah memetakan kebutuhan infrastruktur secara real-time.\n\nJuri menilai tim ini unggul pada aspek ketepatan algoritma dan antarmuka pengguna yang sangat intuitif. Rektor menyampaikan apresiasi kepada tim dan berkomitmen memberi dukungan lanjutan agar inovasi mereka siap diadopsi secara luas.",
    },
    {
        id: 2,
        title: 'Pembangunan Gedung Laboratorium Baru Dimulai',
        category: 'Kampus',
        date: '15 Nov 2025',
        image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&w=900&q=80',
        excerpt:
            'Rektor meresmikan peletakan batu pertama untuk gedung laboratorium terpadu 7 lantai.',
        content:
            "Guna menunjang aktivitas riset yang semakin meningkat, pihak universitas resmi memulai pembangunan Gedung Laboratorium Terpadu. Gedung setinggi 7 lantai ini akan dilengkapi dengan fasilitas modern untuk berbagai disiplin ilmu, mulai dari bioteknologi hingga robotika.\n\nRektor Universitas, Prof. Dr. Setiawan, dalam sambutannya mengatakan, 'Kita ingin mahasiswa tidak hanya belajar teori, tapi juga memiliki fasilitas praktik kelas dunia.' Proyek ini diperkirakan selesai pada akhir tahun 2026.",
    },
    {
        id: 3,
        title: 'Seminar Internasional: Masa Depan AI dalam Pendidikan',
        category: 'Event',
        date: '10 Nov 2025',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&w=900&q=80',
        excerpt:
            'Menghadirkan pembicara dari Google dan MIT untuk membahas dampak AI bagi sistem pembelajaran.',
        content:
            "Fakultas Ilmu Komputer menyelenggarakan seminar internasional bertajuk 'AI for Future Education'. Acara ini menghadirkan pembicara dari Google Research dan MIT Media Lab yang memaparkan bagaimana AI dapat mempersonalisasi kurikulum dan meningkatkan akses pembelajaran.\n\nLebih dari 500 peserta hadir secara hibrida. Kegiatan ini diakhiri dengan sesi workshop mengenai pembuatan modul pembelajaran adaptif berbasis data mahasiswa.",
    },
    {
        id: 4,
        title: 'Ekspedisi Budaya: Kolaborasi Ilkom dengan Fakultas Sastra',
        category: 'Kolaborasi',
        date: '05 Nov 2025',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&w=900&q=80',
        excerpt:
            'Mahasiswa lintas fakultas mendokumentasikan warisan budaya Sumatera Utara dengan teknologi AR.',
        content:
            "Sebanyak 35 mahasiswa Ilmu Komputer berkolaborasi dengan Fakultas Sastra untuk mendokumentasikan warisan budaya Sumatera Utara menggunakan teknologi Augmented Reality. Ekspedisi ini menghasilkan prototipe aplikasi tur digital yang memungkinkan pengguna melihat informasi sejarah secara interaktif.\n\nProyek ini mendapat dukungan penuh dari pemerintah daerah dan akan dipamerkan dalam Festival Budaya Nusantara awal tahun depan.",
    },
];

const BeritaKampus = () => {
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState(null);
    const [isBackHovered, setIsBackHovered] = useState(false);
    const [isCloseHovered, setIsCloseHovered] = useState(false);

    const filteredNews = useMemo(() => {
        if (!query.trim()) return newsItems;
        const q = query.toLowerCase();
        return newsItems.filter(
            (item) =>
                item.title.toLowerCase().includes(q) ||
                item.excerpt.toLowerCase().includes(q) ||
                item.category.toLowerCase().includes(q)
        );
    }, [query]);

    // Play modal sound
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
        <div className="glass-page news-page" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
            <div className="glass-video-bg-wrapper">
                <video autoPlay loop muted playsInline className="glass-video-bg">
                    <source src="/videos/background.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="glass-background-grid"></div>

            {/* Header Layer */}
            <div className="glass-header">
                <div className="glass-header-left">
                    <img
                        src="/Lambang_Universitas_Negeri_Medan.png"
                        alt="Lambang Universitas Negeri Medan"
                        className="glass-header-logo"
                    />
                    <div className="glass-header-text">
                        Ilmu<br />Komputer
                    </div>
                </div>

                <h1 className="glass-title">KAMPUS NEWS</h1>


            </div>

            {/* Back Button (Absolute Top Right) */}
            <div style={{ position: 'absolute', top: '3rem', right: '3rem', zIndex: 100 }}>
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

            <section className="news-header">
                <div>
                    <p className="news-subtitle">Berita Terkini</p>
                    {/* Only main headlines might not need scramble if user just said 'modal news' needs it. Keeping standard for now. */}
                    <h2>Highlight Kampus & Prestasi</h2>
                    <p className="news-lead">
                        Kabarkan aktivitas terbaru seputar riset, prestasi, dan event yang memperkuat ekosistem
                        teknologi kampus.
                    </p>
                </div>
                <label className="news-search">
                    <span role="img" aria-label="Cari berita">
                        🔍
                    </span>
                    <input
                        type="text"
                        placeholder="Cari berita..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </label>
            </section>

            <div className="news-grid" style={{ marginBottom: '100px' }}>
                {filteredNews.map((item) => (
                    <article
                        key={item.id}
                        className="glass-panel news-card"
                        onClick={() => {
                            audioManager.playClick();
                            setSelected(item);
                        }}
                        onMouseEnter={() => audioManager.playHover()}
                    >
                        <div className="news-card-image">
                            <img src={item.image} alt={item.title} />
                            <span className="news-card-date">{item.date}</span>
                        </div>
                        <div className="news-card-body">
                            <span className="news-card-category">{item.category}</span>
                            <h3>{item.title}</h3>
                            <p>{item.excerpt}</p>
                            <button className="news-card-link" type="button">
                                Baca Selengkapnya →
                            </button>
                        </div>
                    </article>
                ))}

                {filteredNews.length === 0 && (
                    <div className="news-empty glass-panel">
                        Tidak ditemukan berita untuk kata kunci <strong>{query}</strong>.
                    </div>
                )}
            </div>

            {/* Sound Toggle */}
            <div style={{ position: 'fixed', bottom: '30px', left: '30px', zIndex: 100 }}>
                <SoundToggle />
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {selected && (
                    <div className="news-modal-overlay" role="dialog" aria-modal="true" onClick={() => setSelected(null)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="glass-panel news-modal"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                                onClick={() => {
                                    audioManager.playClick();
                                    setSelected(null);
                                }}
                                onMouseEnter={() => setIsCloseHovered(true)}
                                onMouseLeave={() => setIsCloseHovered(false)}
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
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transition: "opacity 0.3s" }}>[</span>
                                <HoverScrambleText text="CLOSE" trigger={isCloseHovered} />
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transition: "opacity 0.3s" }}>]</span>
                            </button>

                            <div className="news-modal-image">
                                <img src={selected.image} alt={selected.title} />
                                <div className="news-modal-meta">
                                    <span>📅 <ScrambleText text={selected.date} delay={0.2} /></span>
                                    <span>🏷 <ScrambleText text={selected.category} delay={0.3} /></span>
                                </div>
                            </div>

                            <div className="news-modal-body">
                                <h2><ScrambleText text={selected.title} delay={0.1} /></h2>
                                {selected.content.split('\n\n').map((para, idx) => (
                                    <p key={idx}>
                                        <ScrambleText text={para} delay={0.4 + (idx * 0.2)} duration={1} />
                                    </p>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BeritaKampus;
