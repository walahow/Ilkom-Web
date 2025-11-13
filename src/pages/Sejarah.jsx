import React from 'react';
import './Sejarah.css'; 

import iconSejarah from '/src/assets/sejarah.png'; 

const Sejarah = () => {
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

                <h1 className="vm-title">SEJARAH</h1>

                <div className="vm-header-dots" aria-hidden>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            {/* Konten utama halaman sejarah */}
            <div className="sejarah-content">
                
                {/* Ini adalah "kartu kaca" utama yang membungkus semuanya */}
                <div className="sejarah-card">

                    {/* Bagian header di dalam kartu (untuk ikon + judul) */}
                    <div className="sejarah-card-header">
                        <img src={iconSejarah} alt="Ikon Sejarah" className="sejarah-icon" />
                        <h2>Perjalanan Kami Dimulai</h2>
                    </div>

                    {/* INI BAGIAN PENTING: Area Teks yang Bisa di-Scroll 
                      Ganti semua paragraf di bawah ini dengan 3.215 kata Anda
                    */}
                    <div className="sejarah-text-scrollbox">
                        <p>
                            Kebutuhan guru bidang studi matematika dan ilmu pengetahuan alam 
                            sangat mendesak pada tahun 1950-an menjadi faktor pendorong lahirnya 
                            FMIPA Unimed. Pada masa itu pertumbuhan sekolah mulai dari Sekolah Dasar 
                            hingga Sekolah Menengah sangat tinggi sehingga membutuhkan tenaga guru 
                            dengan jumlah yang sangat tinggi. Sejarah FMIPA Unimed dimulai pada tahun 
                            1957 dengan lahirnya Fakultas Keguruan dan Ilmu Pendidikan (FKIP) berdasarkan 
                            surat keputusan menteri PKK RI No 85254 tanggal 22 Agustus 1957 menjadi salah 
                            satu fakultas pada Universitas Sumatera Utara (USU). Pada tahun 1961, 
                            FKIP USU diberi kewenangan oleh menteri PKK untuk mendidik mahasiswa pada 
                            kursus B-1 untuk bidang ilmu pasti, ilmu alam dan ilmu kimia. Kemudian pada 
                            tanggal 23 Juni 1963 , FKIP USU 17 diubah menjadi IKIP Jakarta cabang Medan 
                            yang mencakup 4 fakultas, yang salah satunya adalah Fakultas Keguruan dan Ilmu 
                            Eksakta (FKIE). Fakultas ini mengasuh 5 jurusan, yakni Ilmu Pasti, Ilmu Kimia, 
                            Ilmu Hayat dan Ilmu Alam serta Teknik Sipil. Pada tahun 1965, IKIP Jakarta cabang Medan 
                            berubah menjadi IKIP Medan. Pada tahun 1979, FKIE IKIP membuka program D1 Matematika dan IPA,
                             D3, Akta-3 dan Program S1 untuk semua jurusan di FKIE IKIP Medan. Pada tahun 1983 FKIE berubah
                              nama menjadi Fakultas Pendidikan Matematika dan Ilmu Pengetahuan Alam (FPMIPA) IKIP Medan yang 
                                mengelola 4 Jurusan, yakni Pendidikan Matematika, Pendidikan Fisika, Pendidikan Kimia dan Pendidikan biologi.
                        </p>
                        
                        <p>
                            IKIP Medan resmi menjadi Universitas Negeri Medan (Unimed) melalui SK Presiden No 124 Tahun 1999 pada tanggal 26 Januari 2000. Hal ini terjadi sebagai upaya peningkatan mutu lulusan dalam menghadapi pembangunan Nasional. Perubahan ini mengakibatkan perubahan penamaan Jurusan, diantaranya adalah Jurusan Pendidikan Matematika menjadi Jurusan Matematika, Jurusan Pendidikan Fisika menjadi Jurusan Fisika, Jurusan Pendidikan Kimia menjadi Jurusan Kimia, dan Jurusan Pendidikan Biologi menjadi Jurusan Biologi sesuai SK Rektor Unimed No. 068/J39.KEP/KP.00.13/2004.
                        </p>
                        
                        <p>
                            Perubahan nama Jurusan ini berdampak pada munculnya prodi baru non kependidikan. Diantaranya adalah Prodi Matematika, Prodi Fisika, Prodi Kimia, Prodi Biologi. Sehingga jumlah prodi yang dikelola oleh FMIPA sebanyak 8 prodi. Tugas pokok dan fungsi dalam menyelenggarakan pendidikan akademik telah dilakukan FMIPA Unimed secara profesional. Secara stuktur organisasi dapat dilihat pada OTK Unimed Tahun 2014.
                        </p>

                        <p>
                            Selanjutnya, melihat perkembangan teknologi yang sangat pesat menuntut tenaga ahli di bidang IT dan produk layanan aplikasi berbasis IT sehingga memaksa Universitas Negeri Medan untuk dapat turut serta berkontribusi dalam penyediaan kebutuhan tersebut. Salah satu solusinya adalah dengan mendirikan program studi yang berhubungan dengan teknologi dan informasi. Berdasarkan kebutuhan tersebut, selanjutnya didaftarkannya Prodi ILKOM ke dalam daftar rencana pendirian Prodi di dalam Renstra Unimed 2016-2020. Renstra tersebut selanjutnya ditindaklanjuti oleh Dekan FMIPA untuk segera mendirikan Prodi ILKOM dan ditempatkan di Jurusan Matematika FMIPA Unimed. Izin Pembukaan Program Studi Ilmu Komputer Program Sarjana Pada Universitas Negeri Medan berdasarkan SK Menristekdikti Nomor 623/KPT/I/2017.
                        </p>
                    </div>

                </div>
            </div>
            {/* Tombol kembali di kiri bawah (sama seperti VisiMisi) */}
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

export default Sejarah;