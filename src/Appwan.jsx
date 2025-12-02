import React, { useEffect, useState, lazy, Suspense } from "react";
import "./Appwan.css";
import Hero from "./comp-info/Hero-main.jsx";
import { AnimatePresence, motion } from "framer-motion";

const VisiMisi = lazy(() => import("./pages/VisiMisi.jsx"));
const Sejarah = lazy(() => import("./pages/Sejarah.jsx"));
const ParallaxModel = lazy(() =>
  import("./comp-info/ParallaxModel-main.jsx")
);
const StrukturOrganisasi = lazy(() =>
  import("./pages/StrukturOrganisasi.jsx")
);
const DosenProfile = lazy(() => import("./pages/DosenProfile.jsx"));
const BeritaKampus = lazy(() => import("./pages/BeritaKampus.jsx"));

function AppWan() {
  const [route, setRoute] = useState(() => window.location.hash || "#/home");

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || "#/home");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const normalized = String(route).toLowerCase();
  const isVisi = normalized.includes("visimisi");
  const isSejarah = normalized.includes("sejarah");
  const isStruktur = normalized.includes("strukturorganisasi");
  const isDosen = normalized.includes("dosen");
  const isBerita = normalized.includes("berita");

  return (
    <>
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
                <div
                  style={{ padding: 24, color: "#fff", textAlign: "center" }}
                >
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
                <div
                  style={{ padding: 24, color: "#fff", textAlign: "center" }}
                >
                  Memuat halaman...
                </div>
              }
            >
              <Sejarah />
            </Suspense>
          </motion.div>
        ) : isStruktur ? (
          <motion.div
            key="struktur"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <Suspense
              fallback={
                <div
                  style={{ padding: 24, color: "#fff", textAlign: "center" }}
                >
                  Memuat halaman...
                </div>
              }
            >
              <StrukturOrganisasi />
            </Suspense>
          </motion.div>
        ) : isDosen ? (
          <motion.div
            key="dosen"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <Suspense
              fallback={
                <div
                  style={{ padding: 24, color: "#fff", textAlign: "center" }}
                >
                  Memuat halaman...
                </div>
              }
            >
              <DosenProfile />
            </Suspense>
          </motion.div>
        ) : isBerita ? (
          <motion.div
            key="berita"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <Suspense
              fallback={
                <div
                  style={{ padding: 24, color: "#fff", textAlign: "center" }}
                >
                  Memuat halaman...
                </div>
              }
            >
              <BeritaKampus />
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

export default AppWan;
