import React from 'react';
// 1. Impor file CSS baru yang akan kita buat
import './StrukturOrganisasi.css'; 

// 2. GANTI INI dengan path ke gambar diagram struktur organisasi Anda
import strukturOrganisasiImg from '/src/assets/struktur.png'; 

const StrukturOrganisasi = () => {
    return (
        <div className="vm-container">
            <div className="vm-video-bg-wrapper">
                <video autoPlay loop muted playsInline className="vm-video-bg">
                    <source src="/videos/background.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="vm-background-grid"></div>

            <div className="vm-header">
                <div className="vm-header-left">
                    <img src="/Lambang_Universitas_Negeri_Medan.png" alt="Lambang Universitas Negeri Medan" className="vm-univ-logo" />
                    <div className="vm-univ-text">
                        Ilmu<br />Komputer
                    </div>
                </div>

                <h1 className="vm-title">STRUKTUR ORGANISASI</h1>

                <div className="vm-header-dots" aria-hidden>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div className="struktur-organisasi-content">
                <div className="struktur-organisasi-card">
                    <h2>Bagan Struktur Organisasi Fakultas</h2>

                    <div className="struktur-img-wrapper">
                        <img 
                            src={strukturOrganisasiImg} 
                            alt="Bagan Struktur Organisasi" 
                            className="struktur-diagram-img" 
                        />
                    </div>

                </div>
            </div>

            {/* Tombol kembali di kiri bawah */}
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

export default StrukturOrganisasi;