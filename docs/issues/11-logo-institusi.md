# 11 · Logo institusi di Pendidikan dan Pengalaman

## Tujuan
Ganti lingkaran tahun di Pendidikan dengan logo sekolah/kampus, dan tambahkan logo organisasi di card Pengalaman. Alasannya estetika: lingkaran tahun sesak dan mengulang periode yang sudah tertulis di sebelahnya.

## Di luar scope
Tidak ada logo di Project, Skill, Kontak, atau di Kamar 3D. Logo tidak menggantikan nama; nama tetap ditulis.

## Prasyarat
L2 (`l2-konten-fase`) sudah di-merge. Empat file logo resmi, warna tidak diubah, SVG atau PNG transparan ≥160×160, disimpan di `public/logo/`:
- [ ] Politeknik Negeri Ujung Pandang
- [ ] SMK Telkom Makassar
- [ ] Metrotech Digital Asia
- [ ] Asah (bukan Dicoding; programnya Asah)

## Kriteria selesai
- [ ] Field `logo?: string` di `Pendidikan` dan `Peran` (`src/content/types.ts`)
- [ ] Pendidikan: wadah lingkaran 40px berlatar silver (palet), logo `object-fit: contain`, padding ±6px
- [ ] Pengalaman: wadah kotak membulat 40px (`--shape-sm`) berlatar silver di kiri atas card, judul dan organisasi di sebelahnya
- [ ] Semua atau tidak sama sekali: item tanpa logo menampilkan inisial di wadah yang sama, jadi layout tidak loncat
- [ ] `alt=""` (dekoratif, nama sudah tertulis), dimuat dengan `next/image`
- [ ] Rapi di lebar 360px (patokan Sheet HP dan side sheet desktop) dan 1280px
- [ ] Tes konten tetap lulus; baseline `daftar-chromium-win32.png` diperbarui dan dicek mata

## Catatan
Keputusan (claude.ai, 2026-11-11): logo untuk estetika, bukan kredibilitas (audiens global tidak mengenal logo institusi lokal). Latar silver menyeragamkan logo di background gelap tanpa mengubah warna logo. Ukuran 40px dipilih supaya tidak perlu breakpoint.
