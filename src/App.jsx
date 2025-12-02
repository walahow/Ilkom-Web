// src/App.jsx
import React, { useEffect, useState } from "react";
import DeskApp from "./DeskApp.jsx";
import AppWan from "./Appwan.jsx";

function App() {
  // kalau ada hash (#/home, #/visimisi, dll) -> AppWan
  // kalau tidak ada hash -> DeskApp (meja 3D)
  const [mode, setMode] = useState(() =>
    window.location.hash.startsWith("#/") ? "appwan" : "desk"
  );

  useEffect(() => {
    const handleHashChange = () => {
      setMode(window.location.hash.startsWith("#/") ? "appwan" : "desk");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (mode === "appwan") {
    return <AppWan />;
  }

  return <DeskApp />;
}

export default App;
