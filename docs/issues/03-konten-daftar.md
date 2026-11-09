# 03 · Konten CV dan halaman Daftar

## Tujuan
Isi lima Section sebagai data bertipe di `src/content`, dirender di tampilan Daftar.

## Di luar scope
Tidak ada 3D. Nomor HP dan alamat tidak dimasukkan.

## Kriteria selesai
- [ ] Lima Section tampil di `#daftar` dengan urutan Tentang, Pengalaman, Project, Skill, Kontak
- [ ] Tes: setiap Section punya judul dan minimal satu isi
- [ ] Tombol salin di Kontak bekerja

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
