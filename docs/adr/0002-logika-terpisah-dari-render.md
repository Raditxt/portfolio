# 0002 · Logika Fase dan Karakter terpisah dari render

Status: diterima · 2026-11-06

## Konteks
Fase waktu, Transisi, dan jadwal Aktivitas Karakter punya banyak kasus tepi (batas jam, pindah dari Rebah ke Berdiri). WebGL sulit dites secara otomatis.

## Keputusan
`src/time` dan `src/hero` berisi fungsi dan state machine murni tanpa React atau three. Komponen 3D hanya membaca hasilnya.

## Alasan
Logika bisa dites dengan Vitest secara cepat dan deterministik. Render cukup dicek dengan screenshot.

## Konsekuensi
Waktu diberikan sebagai argumen (bukan `Date.now()` di dalam fungsi), supaya tes bisa memakai jam mana pun.
