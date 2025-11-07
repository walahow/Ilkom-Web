import { useRef, useEffect, useState } from "react";

function useScrollY() {
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // Normalisasi scroll dari 0 ke 1
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      scrollY.current = window.scrollY / maxScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
}
