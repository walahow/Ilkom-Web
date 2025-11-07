🧠 CompSci Web

🚀 Tech Stack
- ⚛️ React 19 — Library utama UI
- ⚡ Vite — Build tool ringan dan cepat
- 🧩 @react-three/fiber — Renderer React untuk Three.js
- 🎨 @react-three/drei — Kumpulan helper siap pakai untuk Three.js
- 🎥 Framer Motion — Animasi interaktif (mouse & scroll parallax)
- 🌐 Three.js — Rendering model 3D di browser

web-prodi/
├── public/
│   ├── models/               # Model 3D (.glb / .gltf)
│   ├── videos/               # Background video
│   └── assets/               # Logo, ikon, dll
├── src/
│   ├── components/
│   │   ├── Hero.jsx          # Komponen utama hero section
│   │   └── ParallaxModel.jsx # Model 3D dengan efek parallax
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js

🛠️ Cara Menjalankan Proyek
git clone https://github.com/walahow/Ilkom-Web.git
cd Ilkom-Web

npm install
npm run dev
