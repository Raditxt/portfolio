# 05 · Kamar statis

## Tujuan
Kamar, dinding, lantai, dan semua Benda dengan kamera ortografis isometrik seperti prototipe.

## Di luar scope
Belum ada klik, animasi, atau Karakter.

## Kriteria selesai
- [x] Koordinat dan warna diambil dari prototipe
- [x] Screenshot desktop dan HP mirip prototipe saat Fase Sore (05b, lihat Catatan sesi F2 s3)
- [x] Kamera bisa diputar dalam batas yang sama dengan prototipe

## Catatan
Isi saat grilling: keputusan, asumsi, dan seam yang disepakati.

### Spike G1 (sesi F2 s1a, 2026-11-23, branch `spike/r3f-g1`, tidak di-merge)

**Yang dibuktikan G1:** apakah Kamar 3D bisa jalan lancar di HP kelas menengah, dan berapa overhead R3F dibanding three.js murni. Gate ini menentukan apakah 3D penuh dipakai di semua perangkat.

**Ambang G1 (ditetapkan sebelum mengukur):**
- Metrik: median dari 3 kali ukur, masing-masing FPS rata-rata 10 detik sambil kamera diputar.
- Target: HP kelas menengah, prototipe penuh, shadow menyala.
- Prototipe penuh ≥ 30 → **LOLOS**.
- Prototipe penuh 20–29 dan prototipe `?shadow=0` ≥ 30 → **B1**: tier mobile (DPR maks 1.5, shadow mati atau di-bake).
- Prototipe `?shadow=0` < 30 → **B2**: HP default ke Daftar plus tombol "View 3D room", 3D penuh hanya di desktop.
- `/spike` hanya pembanding overhead R3F, bukan penentu gate.

**Keputusan grilling:**
1. G1 seperti di atas.
2. Canvas ada di route `/spike`: `src/app/spike/page.tsx` (client) memuat `SpikeScene` lewat `next/dynamic` dengan `ssr: false`. Semua kode spike ada di `src/app/spike/` saja, tanpa link dari halaman lain.
3. Isi adegan: lantai, dinding belakang dan kiri, dan Laptop (koordinat dan warna dari prototipe). Layar Laptop warna datar `obsidian`, tanpa `codeTex`, tanpa meja, jadi Laptop melayang di y=2.39.
4. Cahaya: DirectionalLight `#ffc58a` 1.6 di (−4, 9, −12) dengan shadow 1024, frustum ±9, bias −0.0008, ditambah HemisphereLight `#d8c8ff`/`#2a2018` 0.55.
5. Kamera ortografis menatap HOME (−0.3, 2.1, −0.4) dengan offset (13, 11, 13). Frustum memakai `resize()` prototipe (VIEW 11.5, potret ×1.18) dan dihitung ulang setiap ukuran Canvas berubah. OrbitControls: azimuth 0.08..π/2−0.08, polar 0.55..1.25, zoom 0.75..2.6, damping 0.08, rotateSpeed 0.6, tanpa pan. Tanpa intro.
6. three di prototipe tetap r128 (CDN). Perbedaan versinya dicatat di bawah, tidak disamakan.
7. Tidak ada tes e2e baru. Perubahan `docs/` ada di commit terpisah dari kode spike supaya bisa di-cherry-pick ke `main`.

**Alat ukur:**
- `/spike?fps=1`: overlay pojok kiri atas, dihitung lewat `useFrame`.
- `/spike/prototipe.html?fps=1`: overlay sama, dihitung lewat `requestAnimationFrame`. Prototipe merender sekali per rAF, jadi angkanya setara.
- `/spike/prototipe.html?shadow=0`: `renderer.shadowMap.enabled = false`.
- Salinan prototipe ada di `public/spike/prototipe.html`. File asli di `docs/` tidak diubah.
- DPR `min(devicePixelRatio, 2)` di kedua halaman. Canvas `100vw × 100dvh`, `touch-action: none`.

**Versi paket:** next 16.4.5, react/react-dom 19.3.1, @react-three/fiber 9.8.2 (peer react `>=19 <19.4`, three `>=0.156`), @react-three/drei 10.7.9, three 0.187.0, @types/three 0.187.0. Tidak ada konflik peer.

**Kondisi ukur:** battery saver mati, kecerahan normal, suhu HP normal (tidak panas, tidak sedang mengisi daya berat). Laptop dan HP di Wi-Fi yang sama, `npx next start -H 0.0.0.0 -p 3100`.

**Tabel ukur** (Fase Sore, via LAN):

| Perangkat (model + browser) | Kondisi | FPS median | Sumber |
|---|---|---|---|
| Tablet Android `<model>`, Chrome | prototipe penuh | 58.7 / 61.1 (dua ukuran) | fisik |
| Tablet Android `<model>`, Chrome | prototipe `?shadow=0` | 58.4 | fisik |
| Tablet Android `<model>`, Chrome | `/spike` | 74.4 | fisik |
| HP kelas menengah | — | belum diukur: belum ada perangkat HP kelas menengah | — |
| Tablet Xiaomi Pad 7 (90 Hz), Chrome 158 | `/kamar` 05b sebelum lampu Dekorasi, preview Vercel | 80 (min 59) | fisik, sesi F2 s3 |
| Tablet Xiaomi Pad 7 (90 Hz), Chrome 158 | `/kamar` 05b sesudah lampu Dekorasi (`0e03fc7`), preview Vercel | 90 (min 60), mentok di refresh rate | fisik, sesi F2 s3 |
| Desktop | `/spike` | 36.9 (ukur pertama; diduga artefak 10 detik pertama) | fisik |
| Fold (terlipat dan terbuka) | prototipe penuh, `/spike` | emulasi, layout saja, tanpa FPS | emulasi |
| Flip (layar luar dan dalam) | prototipe penuh, `/spike` | emulasi, layout saja, tanpa FPS | emulasi |

**Keputusan G1: LOLOS** (ambang 30), diputuskan Raditya. Tidak ada rencana B, tidak ada ADR 0004. Di tablet, `/spike` lebih tinggi dari prototipe, jadi overhead R3F tidak terlihat. Catatan: ambang di atas menyebut HP kelas menengah, sedangkan baris HP masih kosong. Keputusan ini bersandar pada angka tablet.

**Temuan untuk issue 05:**
1. Cahaya harus dikalibrasi ulang untuk three 0.187. Angka intensitas prototipe (r128, cahaya legacy) tidak bisa disalin begitu saja.
2. `PCFSoftShadowMap` sudah dihapus di three 0.187. Tipe shadow perlu diputuskan.
3. Tablet potret: kamar dan label di tepi terpotong. Frustum potret (×1.18) perlu diperlebar.

**Belum pasti:**
- **Versi three berbeda.** Prototipe r128 vs spike 0.187. three 0.187 sudah menghapus `PCFSoftShadowMap` (console: "Using PCFShadowMap instead"), jadi shadow di `/spike` adalah PCF, bukan PCF soft. Pengelolaan warna dan satuan intensitas cahaya juga berubah sejak r155. Dengan angka yang sama, `/spike` tampak jauh lebih gelap dan berwarna lain. Issue 05 perlu menghitung ulang intensitas, bukan sekadar menyalin.
- **Sun di belakang dinding.** Di (−4, 9, −12), sun membuat hampir seluruh lantai tertutup bayangan dinding. Prototipe tetap terang karena ada fill, spot, lentera, sconce, dan Fase yang menggeser sun. `/spike` gelap, dan ini bukan bug spike.
- **`/spike` jauh lebih ringan dari prototipe** (5 mesh berbanding seluruh Kamar). Selisih FPS-nya batas bawah overhead R3F, bukan overhead pada beban setara.
- **Fase prototipe mengikuti jam WITA.** Fase mengubah posisi sun dan lampu yang menyala, jadi ukur di Fase yang sama untuk ketiga ulangan dan catat Fase-nya.
- **Mengukur di Fold dan Flip.** Belum ada perangkat fisik. Emulasi DevTools hanya membuktikan layout.
- R3F memakai `THREE.Clock` yang deprecated di 0.187 (hanya peringatan).

### Sesi F2 s2 (2026-11-25): 05a

**Keputusan grilling:**
1. Kamar ada di route sementara `/kamar` (`robots: noindex, nofollow`) dan tidak ditautkan. `/` tetap Daftar sampai issue 10.
2. Pipeline warna dan cahaya: ADR 0004 (`<Canvas legacy>` + ACES/sRGB, ×π, `decay 0`/`distance ×0.459`, PCF).
3. Beam jendela (beam, patch, spot) milik issue 08. Screenshot pembanding prototipe diambil dengan beam dimatikan.
4. `frustumIso` dihitung kontinu dari aspect. Tinggi minimal `VIEW` 11.5 (landscape sama dengan prototipe) dan melebar sampai kiri-kanan bbox shell Kamar muat (setengah lebar 7.354). Pojok atas dinding dan pojok depan lantai tetap terpotong di landscape, sama seperti prototipe.
5. "Dekorasi" masuk glosarium.
6. Seam: Vitest `frustumIso` (16:9, 1:1, 0.9, 0.46, 0.38). Playwright memakai sinyal `data-kamar-siap`, screenshot desktop 1280×720 dan Pixel 7 dengan `maxDiffPixelRatio` 0.01, plus satu smoke drag di `/kamar`. Mode tes `?tes=1` dihapus karena e2e berjalan di build produksi; tes clamp menunggu sampai pandangan berhenti (dua screenshot identik) dengan damping tetap menyala. Tes clamp terbukti gagal saat batas azimuth dibuang.
7. Sore memakai `PHASE_ENV.sore` setelah override baris 891: sun 1.0, bukan 1.6.

**Hasil pembanding (desktop, titik yang tidak terpengaruh lampu Dekorasi):** dinding kiri 25 vs 27, lantai kiri depan 155 vs 162 (rata-rata R, Kamar vs prototipe). Bingkai jendela, rangka laptop, dan sisi rak lebih gelap dari prototipe karena sconce, lentera, dan tongkat kristal belum ada. Tuning setelah konversi ditunda sampai lampu itu ada (05b).

**Kenapa "mirip prototipe" belum dicentang:** prototipe Sore diterangi juga oleh lentera, sconce, lampu tumbler, tongkat kristal, dan lingkaran sihir, yang semuanya Dekorasi. Tanpa lampu itu, Benda di dekatnya lebih gelap dari prototipe, dan tuning sekarang hanya akan diulang di 05b. Geometri dan framing kamera sudah sama.

**Sisa untuk 05b (Dekorasi):** meja dan laci, kursi, lentera dan cahayanya, jam pasir, cangkir, panji, rak pedang dan perisai, jubah, tongkat kristal dan cahayanya, tong dan peti, pot herba, kasur dan selimut, lingkaran sihir dan cahayanya, sconce dan lampu tumbler dan cahayanya, motes dalam pose diam. Setelah itu tuning cahaya via screenshot dan buat ulang baseline `kamar-*.png`. Laptop dan HP sementara melayang karena mejanya ada di 05b.

**Belum beres:**
- Baseline screenshot `*-chromium-win32.png` di-commit (keputusan Lead). Baseline Linux dibuat saat CI ada.
- three 0.187 masih mencetak peringatan `THREE.Clock` deprecated dari R3F (sudah tercatat di G1).

### Handoff 05a → 05b (2026-11-25)

**Status:** 05a selesai di branch `feat/05a-kamar` (belum di-merge). `npm test` (36), `npm run e2e` (11), lint, dan typecheck lulus. Dua dari tiga kriteria tercentang; "mirip prototipe" ditunda ke 05b (alasan di atas).

**Preview Vercel:** https://portfolio-nqa498jz8-radityas-projects-0ae5d960.vercel.app/kamar (dilindungi Vercel Authentication, login dulu). Inspector: https://vercel.com/radityas-projects-0ae5d960/portfolio/F4kSphREVMcgQyn89y1fossi7wHu

**File kunci:**
- `src/kamar/kamera.ts`: `HOME`, `OFFSET_KAMERA`, `frustumIso` (logika murni, dites di `kamera.test.ts`).
- `src/kamar/cahaya.ts`: `intensitasR128`, `jarakR128`, `DECAY_R128`. Semua cahaya baru wajib lewat sini.
- `src/kamar/palet.ts`: `PAL` dan `rng` prototipe.
- `src/components/Kamar/Kamar.tsx`: Canvas (`legacy`, ACES 1.05, PCF), kamera, OrbitControls, cahaya Sore, sinyal `data-kamar-siap`.
- `src/components/Kamar/{Shell,Jendela,PetaEkspedisi,Laptop,HP,RakGrimoire}.tsx`, `bentuk.tsx` (`Kotak`, `Silinder`), `tekstur.ts`.
- `src/app/kamar/page.tsx`: route noindex.
- `e2e/kamar.spec.ts` dan baseline `kamar-{desktop,hp}-chromium-win32.png`.

**Keputusan yang mengikat 05b:** ADR 0004 (pipeline warna dan cahaya r128). Tidak ada mode tes di kode produksi; e2e menunggu pandangan diam lewat screenshot.

**Lingkup 05b:** sisa Dekorasi (daftar di atas) termasuk meja, sehingga Laptop dan HP berhenti melayang. Lalu tuning lampu Dekorasi berdampingan dengan prototipe (beam mati, jam 16:00 WITA, reduced-motion), centang "mirip prototipe", dan perbarui baseline `kamar-*.png`.

### Sesi F2 s3 (2026-11-27): 05b

**Alat ukur:** drei `<Stats>` di `/kamar`, dimuat lewat `next/dynamic` (`ssr: false`) hanya kalau `NEXT_PUBLIC_VERCEL_ENV === "preview"`. Diverifikasi lewat build: dengan `=production` tidak ada chunk berisi stats.js; dengan `=preview` ada. `OrbitControls` dan `Stats` di-import dari `@react-three/drei/core/*` karena barrel drei tidak ter-tree-shake (sebelumnya stats.js ikut di chunk Kamar 1,10 MB; sekarang 0,91 MB).

**FPS sebelum lampu Dekorasi** (Fase Sore, alias preview branch, tablet Xiaomi Pad 7 90 Hz, Chrome 158; metrik G1: 10 detik sambil memutar kamera):

| Run | Median | Min |
|---|---|---|
| 1 | 80 | 59 |
| 2 | 81 | 59 |
| 3 | 77 | 60 |
| **Median / min** | **80** | **59** |

**Ditunda:** FPS HP. Belum ada perangkat HP kelas menengah, jadi angka di atas dari tablet, bukan HP.

**FPS sesudah lampu Dekorasi** (commit `0e03fc7`, kondisi dan metrik sama dengan baseline):

| Run | Median | Min |
|---|---|---|
| 1 | 90 | 60 |
| 2 | 87 | 60 |
| 3 | 90 | 60 |
| **Median / min** | **90** | **60** |

Gate FPS lolos (keputusan Raditya). Kemungkinan variasi pengukuran manual; angka sesudah lampu mentok di refresh rate 90 Hz. Ini tidak berarti lampu tidak berbiaya. Di antara commit baseline (`70d8c5a`) dan `0e03fc7` tidak ada perubahan yang meringankan render: DPR, shadow map, material, dan frameloop tidak disentuh. Yang berubah hanya Dekorasi (lebih banyak mesh), 8 point light baru, dan deep import drei (bundle lebih kecil, tidak memengaruhi render). Draw call per frame: 405 (prototipe 459), termasuk pass shadow.

**Ditunda:** FPS HP sesudah lampu (alasan sama: belum ada perangkat HP kelas menengah).

**Metode pembanding cahaya (dipakai untuk addendum ADR 0004):**
- Kamar: build production (`next build` lalu `next start`, port 3200) atau `next dev` (port 3300) untuk iterasi tuning. Log server keduanya mencatat `Ready` dan `GET /kamar 200`. Exit 127 di log tugas muncul karena proses dihentikan paksa lewat `Stop-Process`, bukan karena server gagal jalan.
- Prototipe: salinan `docs/prototype/kamar-raditya.html` dengan beam, patch, dan spot dimatikan (`beamOp` 0, `spot` 0 di Sore dan di `ENV` awal). File asli tidak diubah.
- Playwright Chromium, 1280×720, `reducedMotion: reduce`, zona waktu Asia/Makassar, jam dipatok 16:00 WITA; screenshot 2,5 detik setelah `data-kamar-siap` (prototipe: 6 detik setelah load).
- 15 titik piksel yang sama di kedua gambar (framing identik), rata-rata patch 9×9, selisih kanal R. Angka: tanpa lampu 348, lampu dengan angka prototipe apa adanya 135, sesudah tuning 80. Angka 80 direproduksi ulang di build production bersih `0e03fc7` (`NEXT_PUBLIC_VERCEL_ENV=production`), dan build itu tidak memuat chunk stats.js.

**Nilai "mirip prototipe"** (Fase Sore, sudut kamera default, beam mati; desktop 1280×720 dan Pixel 7):
- [x] Laptop dan HP di atas meja.
- [x] Semua Dekorasi langkah 3 ada di posisi yang sama dengan prototipe: panji, rak pedang dan perisai, tongkat kristal, jubah, jam pasir, lentera, tong (dan peti), lingkaran sihir, grimoire, lampu dinding, lampu tumbler, kasur. Cangkir dan pot herba juga ada.
- [x] Bingkai jendela, rangka laptop, dan sisi rak tidak lagi jelas lebih gelap. Selisih R (Kamar − prototipe): bingkai jendela −2, rangka laptop +5, alas laptop +6, sisi rak atas +14, sisi rak bawah −10 (sebelumnya −26). Sisa selisih rak berasal dari bentuk falloff (lihat ADR 0004), bukan cahaya yang hilang.
- Selisih lain yang masih ada: lantai kiri depan −9, dinding kanan dekat lentera +5..+8. HP: framing lebih lebar dari prototipe (keputusan 05a #4, disengaja). Tidak ada di prototipe Kamar (di luar scope): Karakter, motes (Ditunda), beam jendela (issue 08), label/HUD (issue 06).
