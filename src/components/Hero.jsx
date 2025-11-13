import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ParallaxModel from "./ParallaxModel.jsx";


function GlobalVideoBG() {
  return (
    <div className="bg-video-fixed" aria-hidden>
      <video autoPlay loop muted playsInline className="bg-video-fixed__video">
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>
      <div className="bg-video-fixed__overlay" />
    </div>
  );
}

function HeroThreeInSection({ targetRef }) {
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"], 
  });

  // 
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  return (
    <motion.div
      className="hero-3d-wrapper"
      style={{ opacity }}
      aria-hidden
    >
      <ParallaxModel
        url="/models/mymodel.glb"
        initialRotation={[0, 0, 0]}
        position={[0, -40, 0]}
        scale={3}
        cameraZ={220}
        parallaxIntensity={10}
      />
    </motion.div>
  );
}

/*Section helper*/
function Section({ title, children, extraClass = "" }) {
  return (
    <section className={`section ${extraClass}`}>
      {title && <h2 className="section__title">{title}</h2>}
      <div className="section__content">{children}</div>
    </section>
  );
}

/* 
   Page
  */
export default function Hero() {
  const heroRef = useRef(null);

  return (
    <main className="page">
      {/* Video background tetap fixed */}
      <GlobalVideoBG />

      {/* HERO: 3D sekarang berada di dalam section ini */}
      <section className="hero-first-screen" ref={heroRef}>
        {/* 3D absolute di dalam hero, hilang setelah section lewat */}
        <HeroThreeInSection targetRef={heroRef} />

        {/* Konten hero */}
        <div className="hero-left">
          <div className="hero-brand">
            <img
              src="/Lambang_Universitas_Negeri_Medan.png"
              alt="Lambang Universitas Negeri Medan"
              className="hero-logo"
            />
            <div className="hero-title">
              <div>Ilmu</div>
              <div>komputer</div>
            </div>
          </div>

          <div className="hero-copy">
            <div className="hero-console">// Copyright @ 2025</div>
            <br />
            <div>SSO UNIVERSITAS NEGERI MEDAN.</div>
            <div>All Rights Reserved.</div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-console">//// console.log("Hello World!")</div>
          <div className="hero-paragraph">
            Kami Berkomitmen <br />
            mencetak lulusan yang <br />
            unggul dalam <br />
            teknologi, etika, dan <br />
            kolaborasi global.
          </div>
        </div>
      </section>

      {/* Halaman panjang */}
      <Section title="Profil Program Studi">
        <p>
          Ini konten panjang tentang profil prodi. Tambahkan teks/gambar sesuai kebutuhan
          untuk menguji scroll. Konten ini berjalan di atas video fixed; 3D hanya muncul di section pertama.
        </p>
      </Section>

      <Section title="Keunggulan">
        <ul>
          <li>Kurikulum update</li>
          <li>Kolaborasi industri</li>
          <li>Laboratorium modern</li>
          <li>Komunitas aktif</li>
          <li>Fasilitator berpengalaman</li>
        </ul>
      </Section>

      <Section title="Fasilitas">
        <p>
          Deskripsikan fasilitas di sini. Bisa tambahkan kartu/galeri. Tambahkan paragraf ekstra agar tinggi halaman makin panjang.
        </p>
      </Section>

      <Section title="Kontak" extraClass="section--mb">
        <p>Alamat, email, nomor telepon, dsb.</p>
      </Section>
    </main>
  );
}
