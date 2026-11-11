"use client";

import { useRef, useState } from "react";
import { Ikon } from "./Ikon";
import s from "./Daftar.module.css";

// Perilaku dari prototipe: ikon jadi centang 1,4 detik; kalau clipboard ditolak,
// teksnya diseleksi supaya pengunjung bisa menyalin manual.
export function TombolSalin({ teks, label }: { teks: string; label: string }) {
  const [tersalin, setTersalin] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  function seleksiTeks() {
    const code = ref.current?.parentElement?.querySelector("code");
    if (!code) return;
    const range = document.createRange();
    range.selectNodeContents(code);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  }

  async function salin() {
    try {
      await navigator.clipboard.writeText(teks);
      setTersalin(true);
      setTimeout(() => setTersalin(false), 1400);
    } catch {
      seleksiTeks();
    }
  }

  return (
    <button
      ref={ref}
      type="button"
      className={`${s.iconBtn} sl`}
      onClick={salin}
      aria-label={tersalin ? `${label} copied` : `Copy ${label}`}
    >
      <Ikon nama={tersalin ? "check" : "copy"} />
    </button>
  );
}
