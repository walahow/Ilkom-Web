# 🎓 Ilmu Komputer UNIMED - Igloo.inc Style Website

Website futuristik dan sinematik untuk Program Studi Ilmu Komputer Universitas Negeri Medan, terinspirasi dari animasi dan interaksi Igloo.inc.

## ✨ Fitur Utama

### 🌌 Single-Page 3D Experience
- **Satu halaman penuh** dengan 3D WebGL environment
- **Camera depth animation** - scroll menggerakkan kamera, bukan halaman
- **Dark green digital nebula** atmosphere dengan particle system
- **Smooth 60fps** rendering dengan optimasi performa

### 💻 3D Laptop Interaktif
- **Laptop 3D floating** sebagai objek utama (menggantikan "stone" Igloo)
- **Scroll-reactive**: Bergerak, berotasi, dan scale saat scroll
- **Click interaction**: Popup modal dengan typing effect
- **Glow effects**: Dynamic lighting dan sparkles
- **Fallback**: Geometric laptop jika model .glb tidak load

### 🎬 Animasi Smooth
- **Camera parallax**: Bergerak maju (Z-axis) dan naik (Y-axis) saat scroll
- **Continuous rotation**: Laptop berputar smooth tanpa henti
- **Floating motion**: Gerakan naik-turun dengan sine wave
- **Spring physics**: Modal popup dengan spring animation
- **Easing**: Cubic-bezier style interpolation (0.08 lerp)

### 🎨 Visual Effects
- **Bloom**: Glow effect untuk objek terang
- **Depth of Field**: Bokeh blur untuk realism
- **Vignette**: Dark edges untuk focus
- **Particle System**: 1800+ floating particles
- **Background Glow**: Atmospheric depth spheres

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm atau yarn

### Installation
```bash
# Clone repository
git clone https://github.com/walahow/Ilkom-Web.git

# Install dependencies
npm install

# Run development server
npm run dev
```

Server akan berjalan di `http://localhost:5173`

### Build Production
```bash
npm run build
npm run preview
```

## 📁 File Structure

```
Ilkom-Web-main/
├── public/
│   ├── Laptop.glb                          # 3D laptop model
│   └── Lambang_Universitas_Negeri_Medan.png # Logo UNIMED
├── src/
│   ├── components/
│   │   ├── IglooScene.jsx                  # Main 3D scene
│   │   └── IglooScene.css                  # Scene styles
│   ├── App.jsx                             # App entry
│   ├── App.css                             # Global styles
│   └── main.jsx                            # React entry
├── index.html                              # HTML template
└── package.json                            # Dependencies
```

## 🎮 Cara Menggunakan

### Scroll
- **Scroll down**: Camera bergerak maju, laptop turun dan mendekat
- **Scroll up**: Camera mundur, laptop naik dan menjauh
- Semua gerakan smooth dengan interpolation

### Interaksi
- **Hover laptop**: Glow intensity meningkat
- **Click laptop**: Buka modal popup dengan info
- **Click outside modal**: Tutup modal
- **Scroll indicator**: Hilang otomatis saat mulai scroll

## 🎨 Customization

### Mengubah Warna
Edit di `IglooScene.css`:
```css
/* Primary color */
#00ff80  /* Cyber green */

/* Secondary color */
#00cc66  /* Dark green */

/* Background */
#0a0a0a  /* Deep black */
```

### Mengubah Particle Count
Edit di `IglooScene.jsx`:
```jsx
<ParticleField count={1800} /> // Ubah angka ini
```

### Mengubah Camera Speed
Edit di `ScrollCamera` component:
```jsx
targetZ.current += (newZ - targetZ.current) * 0.08; // Ubah 0.08
```

## 📱 Responsive

- **Desktop**: Full effects, 1800 particles
- **Tablet**: Optimized effects, reduced particles
- **Mobile**: Touch-friendly, minimal particles, 60fps maintained

## 🔧 Tech Stack

- **React** 19.1.1
- **Three.js** 0.181.0
- **React Three Fiber** 9.4.0
- **React Three Drei** 10.7.6
- **Framer Motion** 12.23.24
- **Vite** 7.1.7

## 📖 Documentation

Lihat `FITUR_IGLOO.md` untuk dokumentasi lengkap fitur dan implementasi.

## 🐛 Troubleshooting

### Laptop tidak muncul
- Pastikan `Laptop.glb` ada di folder `/public/`
- Fallback geometric laptop akan muncul otomatis
- Cek browser console untuk errors

### Animasi lag
- Reduce particle count
- Disable post-processing effects
- Check GPU acceleration di browser

### Modal tidak muncul
- Pastikan click tepat di laptop
- Cek z-index di CSS
- Cek browser console

## 📄 License

 2025 SSO Universitas Negeri Medan. All Rights Reserved.

## 🙏 Credits

- **Design Inspiration**: [Igloo.inc](https://igloo.inc)
- **University**: Universitas Negeri Medan
- **Department**: Ilmu Komputer
- **Year**: 2025
