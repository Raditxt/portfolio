# Portfolio Raditxt

Portfolio 3D isometrik "Benteng Senja". Pemilik: Raditya (Raditxt). Kamu membantu menulis kode; dia yang memutuskan dan me-review.

## Baca dulu
- `CONTEXT.md`: glosarium. Pakai istilahnya untuk nama file, fungsi, dan tes. Istilah baru → tanya dulu.
- `docs/spec.md`: spesifikasi desain dan isi.
- `docs/prototype/kamar-raditya.html`: sumber angka (koordinat, warna, durasi). Salin dari sini, jangan menebak.
- `docs/adr/`: keputusan yang sudah diambil. Jangan dilanggar tanpa bertanya.
- Issue yang sedang dikerjakan di `docs/issues/`.

## Stack
Next.js (App Router) + TypeScript strict, React Three Fiber + drei, CSS variables untuk token Material 3, Vitest untuk logika, Playwright untuk e2e dan screenshot, deploy ke Vercel.

## Perintah
- `npm run dev`: dev server
- `npm test`: Vitest
- `npm run e2e`: Playwright (termasuk screenshot per fase)
- `npm run lint` dan `npm run typecheck`

## Cara kerja
1. Kerjakan satu issue saja. Sebutkan asumsimu sebelum mulai. Kalau ada dua tafsiran, tanyakan.
2. Sepakati seam tes dengan Raditya sebelum menulis tes.
3. TDD vertikal: satu tes gagal → implementasi minimal → lulus → ulangi. Refactor bukan bagian loop.
4. Logika murni (`src/time`, `src/hero`, `src/content`) tidak boleh mengimpor React atau three.
5. Adegan 3D diverifikasi dengan screenshot Playwright, bukan tes unit.
6. Selesai = semua kriteria di issue tercentang, `npm test`, `npm run e2e`, lint, dan typecheck lulus.

## Larangan
- Jangan commit, push, atau membuat PR. Raditya yang melakukannya.
- Jangan menambah fitur, opsi, atau abstraksi di luar issue.
- Jangan mengubah file di luar yang disebut issue. Kode mati yang kamu temukan: sebutkan, jangan hapus.
- Jangan memakai gradasi warna. Palet datar ada di `docs/spec.md`.
- Jangan memasukkan karakter, logo, atau aset dari anime mana pun. Semua benda adalah desain original.
