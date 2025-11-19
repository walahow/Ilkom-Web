import React from 'react';
// 1. Impor file CSS baru yang akan kita buat
// 2. GANTI INI dengan path ke gambar diagram struktur organisasi Anda
import strukturOrganisasiImg from '/src/assets/struktur.png'; 

const StrukturOrganisasi = () => {
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
        <div className="glass-page">
            <div className="glass-video-bg-wrapper">
                <video autoPlay loop muted playsInline className="glass-video-bg">
                    <source src="/videos/background.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="glass-background-grid"></div>

            <div className="glass-header">
                <div className="glass-header-left">
                    <img src="/Lambang_Universitas_Negeri_Medan.png" alt="Lambang Universitas Negeri Medan" className="glass-header-logo" />
                    <div className="glass-header-text">
                        Ilmu<br />Komputer
                    </div>
                </div>

                <h1 className="glass-title">STRUKTUR ORGANISASI</h1>

                <div className="glass-header-dots" aria-hidden>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div style={{ width: '100%', flexGrow: 1, display: 'flex' }}>
                <div className="glass-panel" style={cardStyles}>
                    <h2 className="glass-panel-title">Bagan Struktur Organisasi Fakultas</h2>

                    <div className="glass-image-frame">
                        <img 
                            src={strukturOrganisasiImg} 
                            alt="Bagan Struktur Organisasi" 
                            className="glass-responsive-img" 
                        />
                    </div>

                </div>
            </div>

            {/* Tombol kembali di kiri bawah */}
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

export default StrukturOrganisasi;