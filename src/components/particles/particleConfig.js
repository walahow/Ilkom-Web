// ==================== particleConfig.js ====================
// Configuration untuk particle system

export const PARTICLE_CONFIG = {
    // Default config untuk semua objek
    default: {
        count: 80,                    // Jumlah partikel
        size: 0.065,                   // Ukuran partikel
        color: 0x39ff14,              // Warna hijau neon
        opacity: 0.6,                 // Transparansi
        emissiveIntensity: 2.0,       // Kekuatan glow

        // Distribution mode: "volume", "surface", "edges"
        distributionMode: "volume",   // Distribusi dalam volume objek
        distributionScale: 1.0,       // Scale area distribusi (1.0 = pas objek, 1.5 = 50% lebih luas)

        // Floating animation (idle state) - MORE AGGRESSIVE!
        floatSpeed: 3.5,              // Increased from 0.5 - lebih cepat
        floatAmplitude: 0.25,         // Increased from 0.1 - gerakan lebih besar

        // Hover interaction - MORE VISIBLE!
        hoverMagnetStrength: 0.15,    // Increased from 0.15 - tarikan lebih kuat
        hoverRadius: 8.2,             // Increased from 0.8 - area deteksi lebih luas
        hoverAffectRatio: 10.6,        // Increased from 0.4 - 60% partikel bereaksi

        // Click animation - MORE DRAMATIC!
        burstSpeed: 9.0,              // Increased from 3.0 - burst lebih cepat
        burstDuration: 5.8,           // Increased from 0.6 - durasi lebih lama
        burstRadius: 10.8,             // Increased from 0.5 - burst lebih jauh

        // Performance
        updateFrequency: 1,           // Update setiap frame (1 = always)
    },

    // Custom config per objek (override default)
    LaptopBase: {
        count: 280                   // More particles untuk layar
    },

    Mug: {
        count: 60,
        distributionScale: 1.0
    },

    BookMeme: {
        count: 60
    },
    node_id293_Material_258_0: {
        count: 30,
        distributionScale: 1.0
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