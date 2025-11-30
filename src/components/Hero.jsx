// ==================== Hero.jsx ====================
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParallaxModel from "./ParallaxModel";
import ModalOverlay from "./ModalOverlay";
import modalData from "../data/modalData";
import SoundToggle from "./UI/SoundToggle";

const Z_INDEX = {
  BACKGROUND: 0,
  CANVAS: 1,
  TEXT: 2,
  POPUP_OVERLAY: 100,
  POPUP_CONTENT: 101,
};

export default function Hero() {
  const [selectedObject, setSelectedObject] = useState(null);

  return (
    <div className="hero-root">
      <ParallaxModel
        url="/models/Laptop.glb"
        onObjectClick={(name) => setSelectedObject(name)}
      />

      <div className="hero-grid" style={{ zIndex: Z_INDEX.TEXT, pointerEvents: 'none' }}>
        <div className="hero-left" style={{ pointerEvents: 'none', height: '100%', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {/* Top Section: Brand + Copyright */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: 'fit-content' }}>
            <div className="hero-brand" style={{ pointerEvents: 'auto', width: 'fit-content', cursor: 'default', userSelect: 'none' }}>
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

            <div className="hero-copy glow-white" style={{ pointerEvents: 'auto', width: 'fit-content', cursor: 'default', userSelect: 'none' }}>
              <div className="hero-console glow-green">// Copyright @ 2025</div>
              <br />
              <div>SSO UNIVERSITAS NEGERI MEDAN.</div>
              <div>All Rights Reserved.</div>
            </div>
          </div>

          {/* Bottom Section: Sound Toggle */}
          <div style={{ pointerEvents: 'auto', width: 'fit-content' }}>
            <SoundToggle />
          </div>
        </div>

        <div className="hero-right" style={{ pointerEvents: 'none' }}>
          <div className="hero-console glow-green" style={{ pointerEvents: 'auto', width: 'fit-content', cursor: 'default', userSelect: 'none' }}>//// console.log("Hello World!")</div>
          <div className="hero-paragraph glow-white" style={{ pointerEvents: 'auto', width: 'fit-content', cursor: 'default', userSelect: 'none' }}>
            Kami Berkomitmen <br />
            mencetak lulusan yang <br />
            unggul dalam <br />
            teknologi, etika, dan <br />
            kolaborasi global.
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedObject && (
          <ModalOverlay
            title={modalData[selectedObject]?.title || selectedObject}
            description={
              modalData[selectedObject]?.description ||
              `Objek "${selectedObject}" berhasil diklik.`
            }
            onClose={() => setSelectedObject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}