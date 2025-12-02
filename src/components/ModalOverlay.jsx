import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { ScrambleText, HoverScrambleText } from "./UI/ScrambleText";

// ==========================================
// MODAL OVERLAY COMPONENT (FULLSCREEN REFINED)
// ==========================================
const ModalOverlay = ({ title, description, onClose }) => {
  // Split description into lines for per-line animation
  const descriptionLines = description
    .split("\n")
    .filter((line) => line.trim() !== "");

  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const [isMainHovered, setIsMainHovered] = useState(false);

  // Uppercase supaya mudah dicek
  const upperTitle = String(title).toUpperCase();

  // Deteksi jenis modal dari judul
  const isLaptopModal = upperTitle.includes("LAPTOP");          // LaptopBase
  const isBookModal = upperTitle.includes("KNOWLEDGE BASE");    // BookMeme
  const isPosterModal = upperTitle.includes("WALL ART");        // Poster
  const isMugModal = upperTitle.includes("COFFEE");             // Mug
  const isArduinoModal = upperTitle.includes("ARDUINO");        // node_id293_Material_258_0

  useEffect(() => {
    import("../utils/AudioManager").then((module) =>
      module.default.playModalOpen()
    );
  }, []);

  // Animation Config
  const TITLE_DURATION = 1.0;
  const TITLE_DELAY = 0.2;
  const DESC_START_DELAY = 0.3;

  // Helper untuk navigasi ke AppWan via hash
  const handleNavigate = (hash) => {
    import("../utils/AudioManager").then((module) =>
      module.default.playClick()
    );
    if (onClose) onClose();
    window.location.hash = hash;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: "rgba(5, 5, 5, 0.95)",
        backdropFilter: "blur(10px)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: '"IBM Plex Mono", monospace',
      }}
    >
      {/* Background Grid/Noise (Fixed) */}
      <div
        className="fixed inset-0 opacity-[0.05] pointer-events-none"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.03,
          pointerEvents: "none",
        }}
      />

      {/* Close Button - Fixed Position */}
      <div
        style={{
          position: "fixed",
          top: "3rem",
          right: "3rem",
          zIndex: 10000,
        }}
      >
        <button
          onClick={() => {
            import("../utils/AudioManager").then((module) =>
              module.default.playClick()
            );
            onClose();
          }}
          onMouseEnter={() => setIsCloseHovered(true)}
          onMouseLeave={() => setIsCloseHovered(false)}
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
          <HoverScrambleText text="CLOSE" trigger={isCloseHovered} />
          <span
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ transition: "opacity 0.3s" }}
          >
            ]
          </span>
        </button>
      </div>

      {/* Scrollable Content Container with Fade Mask */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: 10,
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 5%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 5%, black 90%, transparent 100%)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
            padding: "8rem 2rem 12rem 2rem",
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            textAlign: "left",
          }}
        >
          {/* Header / Label */}
          <div style={{ marginBottom: "3rem", width: "100%" }}>
            <div
              style={{
                color: "#39ff14",
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: "0.875rem",
                letterSpacing: "0.2em",
                marginBottom: "1rem",
                opacity: 0.8,
                textShadow: "0 0 10px rgba(57, 255, 20, 0.5)",
              }}
            >
              <ScrambleText
                text="////// SYSTEM_OVERRIDE"
                duration={0.8}
              />
            </div>

            <h1
              style={{
                color: "white",
                fontSize: "3.5rem",
                fontWeight: "700",
                lineHeight: "1.1",
                letterSpacing: "-0.02em",
                margin: "0",
                maxWidth: "100%",
                textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
              }}
            >
              <ScrambleText
                text={title}
                duration={TITLE_DURATION}
                delay={TITLE_DELAY}
              />
            </h1>
          </div>

          {/* Description */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              marginBottom: "auto",
            }}
          >
            {descriptionLines.map((line, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: DESC_START_DELAY + index * 0.2,
                  ease: "easeOut",
                }}
                style={{
                  color: "#9ca3af",
                  fontSize: "1.125rem",
                  lineHeight: "1.8",
                  margin: 0,
                  fontFamily: '"IBM Plex Mono", monospace',
                  textShadow:
                    "0 0 5px rgba(156, 163, 175, 0.2)",
                  minHeight: "2rem",
                }}
              >
                <ScrambleText
                  text={line}
                  duration={1.5}
                  delay={DESC_START_DELAY + index * 0.2}
                />
              </motion.p>
            ))}
          </div>

          {/* Tombol navigasi ke AppWan – style sama dengan CLOSE */}
          {(isLaptopModal ||
            isBookModal ||
            isPosterModal ||
            isMugModal ||
            isArduinoModal) && (
            <div
              style={{
                marginTop: "3rem",
                width: "100%",
              }}
            >
              {/* Laptop → Halaman Utama */}
              {isLaptopModal && (
                <button
                  onClick={() => handleNavigate("#/home")}
                  onMouseEnter={() => setIsMainHovered(true)}
                  onMouseLeave={() => setIsMainHovered(false)}
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
                  <HoverScrambleText
                    text="HALAMAN UTAMA"
                    trigger={isMainHovered}
                  />
                  <span
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ transition: "opacity 0.3s" }}
                  >
                    ]
                  </span>
                </button>
              )}

              {/* BookMeme → Profil Dosen */}
              {isBookModal && (
                <button
                  onClick={() => handleNavigate("#/dosen")}
                  onMouseEnter={() => setIsMainHovered(true)}
                  onMouseLeave={() => setIsMainHovered(false)}
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
                  <HoverScrambleText
                    text="PROFIL DOSEN"
                    trigger={isMainHovered}
                  />
                  <span
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ transition: "opacity 0.3s" }}
                  >
                    ]
                  </span>
                </button>
              )}

              {/* Poster → Sejarah */}
              {isPosterModal && (
                <button
                  onClick={() => handleNavigate("#/sejarah")}
                  onMouseEnter={() => setIsMainHovered(true)}
                  onMouseLeave={() => setIsMainHovered(false)}
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
                  <HoverScrambleText
                    text="SEJARAH"
                    trigger={isMainHovered}
                  />
                  <span
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ transition: "opacity 0.3s" }}
                  >
                    ]
                  </span>
                </button>
              )}

              {/* Mug → Berita Kampus */}
              {isMugModal && (
                <button
                  onClick={() => handleNavigate("#/berita")}
                  onMouseEnter={() => setIsMainHovered(true)}
                  onMouseLeave={() => setIsMainHovered(false)}
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
                  <HoverScrambleText
                    text="BERITA KAMPUS"
                    trigger={isMainHovered}
                  />
                  <span
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ transition: "opacity 0.3s" }}
                  >
                    ]
                  </span>
                </button>
              )}

              {/* Arduino (node_id293...) → Berita Kampus juga */}
              {isArduinoModal && (
                <button
                  onClick={() => handleNavigate("#/berita")}
                  onMouseEnter={() => setIsMainHovered(true)}
                  onMouseLeave={() => setIsMainHovered(false)}
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
                  <HoverScrambleText
                    text="BERITA KAMPUS"
                    trigger={isMainHovered}
                  />
                  <span
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ transition: "opacity 0.3s" }}
                  >
                    ]
                  </span>
                </button>
              )}
            </div>
          )}

          {/* Footer / Decorative */}
          <div
            style={{
              marginTop: "6rem",
              color: "rgba(255, 255, 255, 0.3)",
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: "0.75rem",
              pointerEvents: "none",
            }}
          >
            <ScrambleText
              text="ID: 8472-9102-XK // SECURE CONNECTION"
              duration={1}
              delay={DESC_START_DELAY + 1.0}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ModalOverlay;
