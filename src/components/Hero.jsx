// ==================== Hero.jsx ====================
import React, { useState } from "react";
import { motion } from "framer-motion";
import ParallaxModel from "./ParallaxModel";

const Z_INDEX = {
  BACKGROUND: 0,
  CANVAS: 1,
  TEXT: 2,
  POPUP_OVERLAY: 100,
  POPUP_CONTENT: 101,
};

function Popup({ objectName, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="popup-overlay"
      style={{ zIndex: Z_INDEX.POPUP_OVERLAY }}
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="popup-content"
        style={{ zIndex: Z_INDEX.POPUP_CONTENT }}
      >
        <div className="popup-label">Object Selected</div>
        <h2 className="popup-title">{objectName}</h2>
        <p className="popup-description">
          {objectName === "ScreenFace" 
            ? "Layar laptop berhasil diklik. Ini adalah area interaktif dari model 3D."
            : `Objek "${objectName}" berhasil diklik.`}
        </p>
        <button onClick={onClose} className="popup-button">
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const [selectedObject, setSelectedObject] = useState(null);

  return (
    <div className="hero-root">
      <ParallaxModel
        url="/models/Laptop.glb"
        onObjectClick={(name) => setSelectedObject(name)}
      />

      <div className="hero-grid" style={{ zIndex: Z_INDEX.TEXT, pointerEvents: 'none' }}>
        <div className="hero-left" style={{ pointerEvents: 'none' }}>
          <div className="hero-brand" style={{ pointerEvents: 'auto', width: 'fit-content' }}>
            <img 
              src="/Lambang_Universitas_Negeri_Medan.png"
              alt="Logo UNIMED"
              className="hero-logo"
            />
            <div className="hero-title glow-white">
              <div>Ilmu</div>
              <div>Komputer</div>
            </div>
          </div>

          <div className="hero-copy glow-white" style={{ pointerEvents: 'auto', width: 'fit-content' }}>
            <div className="hero-console glow-green">// Copyright @ 2025</div>
            <br />
            <div>SSO UNIVERSITAS NEGERI MEDAN.</div>
            <div>All Rights Reserved.</div>
          </div>
        </div>

        <div className="hero-right" style={{ pointerEvents: 'none' }}>
          <div className="hero-console glow-green" style={{ pointerEvents: 'auto', width: 'fit-content' }}>//// console.log("Hello World!")</div>
          <div className="hero-paragraph glow-white" style={{ pointerEvents: 'auto', width: 'fit-content' }}>
            Kami Berkomitmen <br />
            mencetak lulusan yang <br />
            unggul dalam <br />
            teknologi, etika, dan <br />
            kolaborasi global.
          </div>
        </div>
      </div>

      {selectedObject && (
        <Popup 
          objectName={selectedObject}
          onClose={() => setSelectedObject(null)}
        />
      )}
    </div>
  );
}
