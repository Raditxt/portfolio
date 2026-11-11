# 11 · Logo institusi di Pendidikan dan Pengalaman

## Tujuan
Ganti lingkaran tahun di Pendidikan dengan logo sekolah/kampus, dan tambahkan logo organisasi di card Pengalaman. Alasannya estetika: lingkaran tahun sesak dan mengulang periode yang sudah tertulis di sebelahnya.

## Di luar scope
Tidak ada logo di Project, Skill, Kontak, atau di Kamar 3D. Logo tidak menggantikan nama; nama tetap ditulis.

## Prasyarat
L2 (`l2-konten-fase`) sudah di-merge. Empat file logo resmi, warna tidak diubah, SVG atau PNG transparan ≥160×160, disimpan di `public/logo/`:
- [x] Politeknik Negeri Ujung Pandang
- [x] SMK Telkom Makassar
- [x] Metrotech Digital Asia
- [x] Asah (bukan Dicoding; programnya Asah)

## Kriteria selesai
- [x] Field `logo?: string` di `Pendidikan` dan `Peran` (`src/content/types.ts`)
- [x] Pendidikan: wadah lingkaran 40px berlatar silver (palet), logo `object-fit: contain`, padding ±6px
- [x] Pengalaman: wadah kotak membulat 40px (`--shape-sm`) berlatar silver di kiri atas card, judul dan organisasi di sebelahnya
- [x] Semua atau tidak sama sekali: item tanpa logo menampilkan inisial di wadah yang sama, jadi layout tidak loncat
- [x] `alt=""` (dekoratif, nama sudah tertulis), dimuat dengan `next/image`
- [x] Rapi di lebar 360px (patokan Sheet HP dan side sheet desktop) dan 1280px
- [x] Tes konten tetap lulus; baseline `daftar-chromium-win32.png` diperbarui dan dicek mata

## Catatan
Selesai 11 Nov, commit 7477b34, merge f0e65de. Kode dibuat di claude.ai sebagai patch.
- `.logo` wajib `box-sizing: border-box`; tanpa itu wadah jadi ±52px karena padding 6px.
- `LogoInstitusi.test.ts` mengecek setiap path logo di konten ada di `public/`: path salah tampil sebagai gambar rusak, bukan inisial.
- Inisial melewati kata sambung ("Asah led by Dicoding" → "AD").
- Logo Metrotech pakai versi obsidian, Asah hanya simbol; alternatif disimpan di luar repo.
- Vitest 31/31, lint, typecheck, e2e 5/5 di Windows; deploy Vercel hijau.
