# 03 · Konten CV dan halaman Daftar

## Tujuan
Isi lima Section sebagai data bertipe di `src/content`, dirender di tampilan Daftar.

## Di luar scope
Tidak ada 3D. Nomor HP dan alamat tidak dimasukkan.

## Kriteria selesai
- [x] Lima Section tampil di `#daftar` dengan urutan Tentang, Pengalaman, Project, Skill, Kontak
- [x] Tes: setiap Section punya judul dan minimal satu isi
- [x] Tombol salin di Kontak bekerja

## Catatan
Isi saat grilling: keputusan, asumsi, dan seam yang disepakati.

Sesi F1 (2026-11-10): kerangka saja. Data asli, tes konten, dan tombol salin masuk L2.

**Keputusan F1**
- `/` langsung merender Daftar di `<main id="daftar">`. Deteksi WebGL dan hash `#daftar` baru dibuat saat issue 05 membawa Kamar.
- `src/content` belum disentuh. `src/components/Daftar` memegang array sementara lima Section (`id`, `judul`, satu paragraf placeholder) dengan id `tentang`, `pengalaman`, `project`, `skill`, `kontak`, bertanda `// sementara, diganti di L2`.
- Kerangka minimal: header (nama, subjudul, catatan "Browser ini tidak bisa menampilkan kamar 3D…" dari prototipe), lalu lima `<section>` dengan `h2` dan `p.body-medium`. Judul Section memakai `label-large` berwarna `--md-primary` seperti prototipe (baris 272), bukan `title-medium` seperti usulan awal grilling. Angka kontainer dari `.fallback`/`.fallback-inner` prototipe, tanpa `position: fixed`. Card, chip, list, dan tombol salin masuk L2.

**Seam F1**
- Playwright `e2e/daftar.spec.ts`: lima heading Section di `/` berurutan Tentang, Pengalaman, Project, Skill, Kontak; plus `toHaveScreenshot()` Chromium Desktop 1280×720, `fullPage: true`.
- `e2e/home.spec.ts` (status 200, title "Raditxt") tetap.
- Vitest "setiap Section punya judul dan minimal satu isi" ditunda ke L2.

Sesi L2 (2026-11-11): data asli, tes konten, tombol salin, tombol CV.

**Keputusan L2**
- `src/content`: satu file per Section (`tentang.ts` … `kontak.ts`), plus `profil.ts` (nama, subjudul, catatan Daftar, link CV). `index.ts` mengekspor `sections` berurutan dan `profil`. Tipe di `types.ts` berupa union yang dibedakan lewat `id`, karena bentuk isi tiap Section berbeda.
- Teks diambil dari `docs/a1-konten.md`. Mulai sekarang `src/content` yang jadi sumber kebenaran.
- Semua teks untuk pengunjung berbahasa Inggris, termasuk judul Section (About, Experience, Projects, Skills, Contact) dan header Daftar. Id `<section>` tetap pakai istilah CONTEXT.md (`tentang`, …).
- Tombol CV di header: `profil.cv`. Untuk sementara href ke LinkedIn (disetujui Raditya); ganti ke `/cv.pdf` setelah CV bahasa Inggris ada di `public/`.
- Platform freelance tanpa href tidak dirender (Fastwork menunggu URL, Fiverr belum ada).
- Tombol salin (`TombolSalin.tsx`, client component) mengikuti prototipe: ikon jadi centang 1,4 detik; kalau clipboard ditolak, teks di `<code>` diseleksi.
- CSS card/chip/list/badge/btn disalin dari prototipe ke `Daftar.module.css`.

**Seam L2**
- Vitest `src/content/content.test.ts`: urutan lima id, setiap Section punya judul dan minimal satu isi, tidak ada `NEEDED`, tidak ada nomor HP Indonesia.
- Playwright `e2e/daftar.spec.ts`: heading bahasa Inggris berurutan; tombol "Copy email" menyalin `radityama8@gmail.com` ke clipboard.
- Baseline `daftar-chromium-win32.png` harus dibuat ulang di Windows (`npm run e2e -- --update-snapshots`), lalu dicek dengan mata.

**Untuk dicek nanti**
- `src/app/layout.tsx` masih `lang="id"`, padahal situs berbahasa Inggris. Di luar issue ini, jadi belum diubah.
- Hierarki judul Section (label-large) dipertahankan; tampak wajar dengan teks asli.
