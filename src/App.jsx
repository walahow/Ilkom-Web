import React, { useEffect, useState, lazy, Suspense } from "react";
import "./App.css";
import Hero from "./components/Hero.jsx";
import { AnimatePresence, motion } from "framer-motion";
const VisiMisi = lazy(() => import("./pages/VisiMisi.jsx"));
const Sejarah = lazy(() => import("./pages/Sejarah.jsx"));

function App() {
  const [route, setRoute] = useState(() => window.location.hash || "#/home");

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || "#/home");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // normalize route matching (case-insensitive, accept hashes like "#/visimisi" or "#visimisi")
  const isVisi = String(route).toLowerCase().includes("visimisi");
  const isSejarah = String(route).toLowerCase().includes("sejarah");

  // Use AnimatePresence to animate route changes
  return (
    <>
      {/* Global top-left logo and label */}
      
      <AnimatePresence mode="wait">
      {isVisi ? (
        <motion.div
          key="visimisi"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <Suspense
            fallback={
              <div style={{ padding: 24, color: "#fff", textAlign: "center" }}>
                Memuat halaman...
              </div>
            }
          >
            <VisiMisi />
          </Suspense>
        </motion.div>
      ) : isSejarah ? (
        <motion.div
          key="sejarah"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <Suspense
            fallback={
              <div style={{ padding: 24, color: "#fff", textAlign: "center" }}>
                Memuat halaman...
              </div>
            }
          >
            <Sejarah />
          </Suspense>
        </motion.div>
      ) : (
        <motion.div
          key="home"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <Hero />
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

export default App;
