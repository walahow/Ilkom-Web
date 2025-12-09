import React, { useEffect, useState } from 'react';
import iconSejarah from '/src/assets/sejarah.png';
import SoundToggle from '../components/UI/SoundToggle';
import { ScrambleText, HoverScrambleText } from '../components/UI/ScrambleText';
import audioManager from '../utils/AudioManager';

const Sejarah = () => {
    const [isBackHovered, setIsBackHovered] = useState(false);

    // Play Modal Open sound on mount
    useEffect(() => {
        audioManager.playModalOpen();
    }, []);

    const cardWrapperStyles = {
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        zIndex: 10,
        // No extra padding on top here, we manage layout via flex/grid or absolute positioning wrapper
    };

    const scrollBoxStyles = {
        maxHeight: '60vh',
    };

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
            <div className="glass-video-bg-wrapper">
                <video autoPlay loop muted playsInline className="glass-video-bg">
                    <source src="/videos/background.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="glass-background-grid"></div>

            {/* Header Elements */}
            <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 20 }}>

                {/* 1. Logo Left Top */}
                {/* 1. Logo Left Top */}
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

                {/* 2. Title Centered Top */}
                {/* 2. Title Centered Top */}
                <div className="unified-header-title-center">
                    <h1 className="unified-glass-title">SEJARAH</h1>
                </div>

                {/* 3. Close/Back Button Right Top */}
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

                {/* Konten utama halaman sejarah - Positioned lower to avoid header */}
                <div style={{ width: '100%', zIndex: 10, padding: '0 2rem', boxSizing: 'border-box', position: 'absolute', top: '150px', left: 0, right: 0 }}>
                    <div className="glass-panel" style={cardWrapperStyles}>
                        <div className="glass-panel-header">
                            <img src={iconSejarah} alt="Ikon Sejarah" className="glass-panel-icon" />
                            <h2>
                                <ScrambleText text="Perjalanan Kami Dimulai" delay={0.2} duration={1.0} />
                            </h2>
                        </div>

                        <div className="glass-scrollbox" style={scrollBoxStyles}>
                            <p>
                                <ScrambleText
                                    text="Kebutuhan guru bidang studi matematika dan ilmu pengetahuan alam sangat mendesak pada tahun 1950-an menjadi faktor pendorong lahirnya FMIPA Unimed. Pada masa itu pertumbuhan sekolah mulai dari Sekolah Dasar hingga Sekolah Menengah sangat tinggi sehingga membutuhkan tenaga guru dengan jumlah yang sangat tinggi. Sejarah FMIPA Unimed dimulai pada tahun 1957 dengan lahirnya Fakultas Keguruan dan Ilmu Pendidikan (FKIP) berdasarkan surat keputusan menteri PKK RI No 85254 tanggal 22 Agustus 1957 menjadi salah satu fakultas pada Universitas Sumatera Utara (USU). Pada tahun 1961, FKIP USU diberi kewenangan oleh menteri PKK untuk mendidik mahasiswa pada kursus B-1 untuk bidang ilmu pasti, ilmu alam dan ilmu kimia. Kemudian pada tanggal 23 Juni 1963 , FKIP USU 17 diubah menjadi IKIP Jakarta cabang Medan yang mencakup 4 fakultas, yang salah satunya adalah Fakultas Keguruan dan Ilmu Eksakta (FKIE). Fakultas ini mengasuh 5 jurusan, yakni Ilmu Pasti, Ilmu Kimia, Ilmu Hayat dan Ilmu Alam serta Teknik Sipil. Pada tahun 1965, IKIP Jakarta cabang Medan berubah menjadi IKIP Medan. Pada tahun 1979, FKIE IKIP membuka program D1 Matematika dan IPA, D3, Akta-3 dan Program S1 untuk semua jurusan di FKIE IKIP Medan. Pada tahun 1983 FKIE berubah nama menjadi Fakultas Pendidikan Matematika dan Ilmu Pengetahuan Alam (FPMIPA) IKIP Medan yang mengelola 4 Jurusan, yakni Pendidikan Matematika, Pendidikan Fisika, Pendidikan Kimia dan Pendidikan biologi."
                                    delay={0.4}
                                    duration={0.5}
                                />
                            </p>

                            <p>
                                <ScrambleText
                                    text="IKIP Medan resmi menjadi Universitas Negeri Medan (Unimed) melalui SK Presiden No 124 Tahun 1999 pada tanggal 26 Januari 2000. Hal ini terjadi sebagai upaya peningkatan mutu lulusan dalam menghadapi pembangunan Nasional. Perubahan ini mengakibatkan perubahan penamaan Jurusan, diantaranya adalah Jurusan Pendidikan Matematika menjadi Jurusan Matematika, Jurusan Pendidikan Fisika menjadi Jurusan Fisika, Jurusan Pendidikan Kimia menjadi Jurusan Kimia, dan Jurusan Pendidikan Biologi menjadi Jurusan Biologi sesuai SK Rektor Unimed No. 068/J39.KEP/KP.00.13/2004."
                                    delay={0.6}
                                    duration={0.5}
                                />
                            </p>

                            <p>
                                <ScrambleText
                                    text="Perubahan nama Jurusan ini berdampak pada munculnya prodi baru non kependidikan. Diantaranya adalah Prodi Matematika, Prodi Fisika, Prodi Kimia, Prodi Biologi. Sehingga jumlah prodi yang dikelola oleh FMIPA sebanyak 8 prodi. Tugas pokok dan fungsi dalam menyelenggarakan pendidikan akademik telah dilakukan FMIPA Unimed secara profesional. Secara stuktur organisasi dapat dilihat pada OTK Unimed Tahun 2014."
                                    delay={0.8}
                                    duration={0.5}
                                />
                            </p>

                            <p>
                                <ScrambleText
                                    text="Selanjutnya, melihat perkembangan teknologi yang sangat pesat menuntut tenaga ahli di bidang IT dan produk layanan aplikasi berbasis IT sehingga memaksa Universitas Negeri Medan untuk dapat turut serta berkontribusi dalam penyediaan kebutuhan tersebut. Salah satu solusinya adalah dengan mendirikan program studi yang berhubungan dengan teknologi dan informasi. Berdasarkan kebutuhan tersebut, selanjutnya didaftarkannya Prodi ILKOM ke dalam daftar rencana pendirian Prodi di dalam Renstra Unimed 2016-2020. Renstra tersebut selanjutnya ditindaklanjuti oleh Dekan FMIPA untuk segera mendirikan Prodi ILKOM dan ditempatkan di Jurusan Matematika FMIPA Unimed. Izin Pembukaan Program Studi Ilmu Komputer Program Sarjana Pada Universitas Negeri Medan berdasarkan SK Menristekdikti Nomor 623/KPT/I/2017."
                                    delay={1.0}
                                    duration={0.5}
                                />
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Sound Toggle (Left Bottom) */}
            <div style={{ position: 'fixed', bottom: '30px', left: '30px', zIndex: 100 }}>
                <SoundToggle />
            </div>
        </div>

    );
}

export default Sejarah;