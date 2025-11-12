import React from "react";
import "./App.css";
// Impor komponen preloader dan Hero
import LoadingOverlay from "./components/Loading/LoadingOverlay"; 
import Hero from "./components/Hero.jsx";

function App() {
  return (
    <>
      <LoadingOverlay 
        loadingDuration={1800} // Durasi progress bar 1 detik
        logoSrc="/Lambang_Universitas_Negeri_Medan.png"
      />
      <Hero />
    </>
  );
}

export default App;