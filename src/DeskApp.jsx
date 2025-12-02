// src/DeskApp.jsx
import React from "react";
import "./App.css";
import LoadingOverlay from "./components/Loading/LoadingOverlay";
import Hero from "./components/Hero.jsx";

function DeskApp() {
  React.useEffect(() => {
    const handleInteraction = () => {
      import("./utils/AudioManager").then((module) => {
        module.default.startBGM();
      });
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("keydown", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  return (
    <>
      <LoadingOverlay logoSrc="/Lambang_Universitas_Negeri_Medan.png" />
      <Hero />
    </>
  );
}

export default DeskApp;
