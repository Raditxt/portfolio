# 04 · Fase waktu

## Tujuan
Fungsi murni `phaseOf(jam, menit)` untuk lima Fase WITA.

## Di luar scope
Belum ada Transisi atau tampilan.

## Kriteria selesai
- [x] Seam disepakati: `phaseOf(jam, menit) → Fase`
- [x] Tes di setiap batas: 05.00, 10.00, 15.00, 18.30, 23.00, dan tepat sebelumnya
- [x] Tidak membaca jam sistem di dalam fungsi

## Catatan
Isi saat grilling: keputusan, asumsi, dan seam yang disepakati.

Sesi L2 (2026-11-11).

**Keputusan**
- `src/time/fase.ts`: `type Fase = "pagi" | "siang" | "sore" | "malam" | "tengah-malam"` (istilah CONTEXT.md; label Inggris dibuat saat HUD). `phaseOf(jam, menit)` menghitung dalam menit bulat, bukan `jam + menit/60` seperti prototipe. Input di luar rentang tidak divalidasi.
- `src/time/jamWita.ts`: `jamWita(date) → { jam, menit }` dengan aritmetika UTC+8 (WITA tanpa DST). Sengaja tanpa `Intl` dan tanpa fallback ke jam lokal; fallback di prototipe melanggar ADR 0003.
- `src/example.test.ts` dibuang (sesuai catatan F1).

**Seam**
- Vitest `fase.test.ts`: 05.00, 04.59, 09.59/10.00, 14.59/15.00, 18.29/18.30, 22.59/23.00, plus 00.00 dan 23.59.
- Vitest `jamWita.test.ts`: UTC+8, melewati tengah malam UTC, Date dengan offset lain.
