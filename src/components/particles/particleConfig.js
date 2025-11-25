// ==================== particleConfig.js ====================
// Configuration untuk particle system

export const PARTICLE_CONFIG = {
    // Default config untuk semua objek
    default: {
        count: 80,                    // Jumlah partikel
        size: 0.03,                   // Ukuran partikel
        color: 0x39ff14,              // Warna hijau neon
        opacity: 0.6,                 // Transparansi
        emissiveIntensity: 2.0,       // Kekuatan glow

        // Distribution mode: "volume", "surface", "edges"
        distributionMode: "volume",   // Distribusi dalam volume objek
        distributionScale: 1.5,       // Scale area distribusi (1.0 = pas objek, 1.5 = 50% lebih luas)

        // Floating animation (idle state) - MORE AGGRESSIVE!
        floatSpeed: 1.2,              // Increased from 0.5 - lebih cepat
        floatAmplitude: 0.25,         // Increased from 0.1 - gerakan lebih besar

        // Hover interaction - MORE VISIBLE!
        hoverMagnetStrength: 0.35,    // Increased from 0.15 - tarikan lebih kuat
        hoverRadius: 1.2,             // Increased from 0.8 - area deteksi lebih luas
        hoverAffectRatio: 0.6,        // Increased from 0.4 - 60% partikel bereaksi

        // Click animation - MORE DRAMATIC!
        burstSpeed: 5.0,              // Increased from 3.0 - burst lebih cepat
        burstDuration: 0.8,           // Increased from 0.6 - durasi lebih lama
        burstRadius: 0.8,             // Increased from 0.5 - burst lebih jauh

        // Performance
        updateFrequency: 1,           // Update setiap frame (1 = always)
    },

    // Custom config per objek (override default)
    ScreenFace: {
        count: 120,                   // More particles untuk layar
        color: 0x39ff14,              // Hijau neon untuk layar
        size: 0.022,
        distributionMode: "surface",  // Partikel di permukaan layar
        distributionScale: 1.6,       // Extra luas
        floatSpeed: 1.5,              // Extra fast untuk screen
        floatAmplitude: 0.2,          // Gerakan lebih besar
        emissiveIntensity: 3.0,       // Extra glow
        hoverMagnetStrength: 0.4,     // Strong magnetic
        hoverRadius: 1.5,             // Wide detection
    },

    Mug: {
        count: 70,
        color: 0xff6b35,              // Orange untuk mug
        size: 0.035,
        distributionMode: "volume",   // Partikel mengisi volume mug
        distributionScale: 1.6,
        floatSpeed: 1.0,
        floatAmplitude: 0.28,         // Gerakan besar
        emissiveIntensity: 2.2,
        hoverMagnetStrength: 0.35,
    },

    BookMeme: {
        count: 80,
        color: 0x4ECDC4,              // Cyan untuk buku
        size: 0.03,
        distributionMode: "volume",
        distributionScale: 1.7,
        floatSpeed: 1.1,
        floatAmplitude: 0.25,
        emissiveIntensity: 2.5,
        hoverMagnetStrength: 0.38,
    },

    Poster: {
        count: 100,
        color: 0xFF6B9D,              // Pink untuk poster
        size: 0.026,
        distributionMode: "surface",  // Partikel di permukaan poster
        distributionScale: 1.8,       // Extra wide
        floatSpeed: 1.3,
        floatAmplitude: 0.22,
        emissiveIntensity: 2.8,
        hoverMagnetStrength: 0.42,    // Strongest magnetic
    }
};

// Helper function untuk get config
export function getParticleConfig(objectName) {
    return {
        ...PARTICLE_CONFIG.default,
        ...(PARTICLE_CONFIG[objectName] || {})
    };
}

// Debug mode
export const PARTICLE_DEBUG = false; // Set true untuk debug