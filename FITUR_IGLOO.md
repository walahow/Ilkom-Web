# 🎬 Fitur Website Igloo.inc Style - Ilmu Komputer UNIMED

## ✨ Fitur Utama yang Sudah Diimplementasikan

### 1. **Single-Page 3D Scene** ✅
- Satu halaman penuh dengan 3D WebGL environment
- Tidak ada page switching, semua animasi dalam satu scene
- Background dark green digital nebula atmosphere

### 2. **3D Laptop Model** ✅
- Laptop 3D sebagai objek utama (menggantikan "stone" di Igloo)
- Animasi rotasi smooth dan continuous
- Floating motion dengan sine wave
- Sparkles effect di sekitar laptop
- Glow lights dengan intensitas dinamis
- Fallback geometric laptop jika model .glb tidak load

### 3. **Camera Depth Animation** ✅
- **PENTING**: Scroll menggerakkan CAMERA, bukan page
- Camera bergerak maju (Z-axis) saat scroll down
- Camera juga bergerak naik (Y-axis) untuk efek depth
- Smooth interpolation dengan easing
- Cubic-bezier style movement (0.08 lerp factor)

### 4. **Scroll-Reactive Laptop** ✅
- Laptop bergerak turun saat scroll
- Laptop bergerak lebih dekat ke viewer
- Rotasi bertambah dengan scroll
- Scale bertambah saat scroll
- Semua perubahan smooth dengan interpolation

### 5. **Particle System** ✅
- 1800+ floating particles
- Spherical distribution untuk depth
- Rotation pada X dan Y axis
- Additive blending untuk glow effect
- Cyber green color (#00ff80)

### 6. **Background Atmosphere** ✅
- 3 glowing spheres di background untuk depth
- Soft opacity untuk ambient feel
- Positioned at different depths (-40, -50, -60)
- Green nebula effect

### 7. **Click Interaction & Popup** ✅
- Klik laptop memunculkan modal
- Smooth scale-up animation (spring physics)
- Typing effect untuk console text
- Fade in transitions
- Backdrop blur effect
- Konten:
  - `console.log("Hello World!")`
  - Mission statement
  - Department info
  - Animated cursor blink

### 8. **Lighting System** ✅
- Ambient light (0.3 intensity)
- Directional light dengan cyber green
- Multiple point lights untuk rim lighting
- Dynamic light intensity saat hover
- Cast shadows enabled

### 9. **Post-Processing Effects** ✅
- **Bloom**: Glow effect untuk objek terang
- **Depth of Field**: Bokeh blur untuk realism
- **Vignette**: Dark edges untuk focus
- Semua optimized untuk 60fps

### 10. **UI Elements** ✅
- **Header**: Logo UNIMED dengan glow animation
- **Scroll Indicator**: Animated arrow dengan "scroll to explore"
- **Footer**: Copyright text
- Semua dengan fade-in animations

## 🎨 Styling & Aesthetic

### Color Scheme
- Primary: `#00ff80` (Cyber Green)
- Secondary: `#00cc66` (Dark Green)
- Background: `#0a0a0a` (Deep Black)
- Text: `#ffffff` dan `#e0e0e0`

### Typography
- Font: JetBrains Mono & IBM Plex Mono
- Monospace futuristic style
- Multiple weights (400, 500, 700)

### Animations
- Smooth easing: 0.08 lerp factor
- Spring physics untuk modal
- Continuous rotation dan floating
- Glow pulse animations

## 📱 Responsive Design

### Desktop (> 768px)
- Full particle count (1800)
- All effects enabled
- Large UI elements
- Full post-processing

### Mobile (< 768px)
- Reduced particle count
- Optimized effects
- Smaller UI elements
- Touch-friendly interactions
- Maintained smooth 60fps

## 🎮 Interaksi User

### Mouse/Touch
- **Hover laptop**: Glow intensity meningkat
- **Click laptop**: Buka modal popup
- **Click outside modal**: Tutup modal
- **Hover close button**: Rotate 90°

### Scroll
- **Scroll down**: 
  - Camera moves forward (Z-axis)
  - Camera moves up (Y-axis)
  - Laptop moves down
  - Laptop moves closer
  - Laptop rotates more
  - Laptop scales up
- **Smooth interpolation**: Tidak ada jump cuts

## 🔧 Technical Implementation

### File Structure
```
src/
├── components/
│   ├── IglooScene.jsx       # Main scene component
│   └── IglooScene.css       # Igloo-specific styles
├── App.jsx                  # App entry point
└── App.css                  # Global styles
```

### Key Components

#### 1. **ParticleField**
- 1800 particles dengan spherical distribution
- Rotation animation
- Additive blending

#### 2. **BackgroundGlow**
- 3 glowing spheres
- Different sizes dan positions
- Atmospheric depth

#### 3. **Laptop3D**
- Model loading dengan fallback
- Scroll-reactive animations
- Hover effects
- Click handler

#### 4. **ScrollCamera**
- Camera position controller
- Smooth lerp interpolation
- Z dan Y axis movement

#### 5. **InfoModal**
- Popup dengan spring animation
- Typing effect
- Backdrop blur

### Performance Optimizations
- `dpr={[1, 2]}` untuk retina displays
- `powerPreference: "high-performance"`
- Efficient particle system
- Suspense untuk lazy loading
- Smooth 60fps rendering

## 🚀 Cara Menggunakan

### Development
```bash
npm install
npm run dev
```

### Build Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## 📋 Checklist Fitur Igloo.inc

- ✅ Single-page 3D scene
- ✅ Camera depth animation (bukan page scroll)
- ✅ 3D floating object (laptop)
- ✅ Smooth rotation dan floating
- ✅ Scroll-reactive movement
- ✅ Particle system
- ✅ Background atmosphere
- ✅ Click interaction popup
- ✅ Typing effect
- ✅ Cyber green theme
- ✅ Monospace fonts
- ✅ Post-processing effects
- ✅ Smooth easing transitions
- ✅ Responsive design
- ✅ 60fps performance

## 🎯 Perbedaan dengan Igloo.inc

### Similarities (Sama)
- Single-page 3D experience
- Camera movement on scroll
- Floating central object
- Particle system
- Click interactions
- Smooth animations
- Dark theme dengan glow
- Monospace typography
- Post-processing effects

### Customizations (Disesuaikan)
- **Object**: Laptop (bukan ice/stone)
- **Color**: Cyber green (bukan blue/white)
- **Content**: Academic/tech focus
- **Branding**: UNIMED logo dan info
- **Language**: Bahasa Indonesia
- **Mission**: Educational institution

## 🐛 Troubleshooting

### Laptop tidak muncul?
- Cek apakah `Laptop.glb` ada di folder `/public/`
- Fallback geometric laptop akan muncul otomatis
- Cek console untuk error messages

### Animasi tidak smooth?
- Pastikan GPU acceleration enabled
- Cek browser support untuk WebGL
- Reduce particle count di mobile

### Modal tidak muncul?
- Pastikan klik tepat di laptop
- Cek z-index CSS
- Cek console untuk errors

## 📝 Notes

- Model 3D harus di `/public/Laptop.glb`
- Logo harus di `/public/Lambang_Universitas_Negeri_Medan.png`
- Fonts loaded dari Google Fonts
- Scroll height: 200vh untuk smooth scrolling

## 🎓 Credits

- **Design Inspiration**: Igloo.inc
- **University**: Universitas Negeri Medan
- **Department**: Ilmu Komputer
- **3D Library**: Three.js + React Three Fiber
- **Animation**: Framer Motion
- **Year**: 2025

---

**© 2025 SSO Universitas Negeri Medan. All Rights Reserved.**
