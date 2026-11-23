# 05 · Kamar statis

## Tujuan
Kamar, dinding, lantai, dan semua Benda dengan kamera ortografis isometrik seperti prototipe.

## Di luar scope
Belum ada klik, animasi, atau Karakter.

## Kriteria selesai
- [ ] Koordinat dan warna diambil dari prototipe
- [ ] Screenshot desktop dan HP mirip prototipe saat Fase Sore
- [ ] Kamera bisa diputar dalam batas yang sama dengan prototipe

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

**Tabel ukur** (diisi Raditya):

| Perangkat (model + browser) | Kondisi | FPS median | Sumber |
|---|---|---|---|
| HP kelas menengah: … | prototipe penuh | | fisik |
| HP kelas menengah: … | prototipe `?shadow=0` | | fisik |
| HP kelas menengah: … | `/spike` | | fisik |
| Laptop: … | prototipe penuh | | fisik |
| Laptop: … | `/spike` | | fisik |
| Tablet: … | prototipe penuh | | fisik |
| Fold (terlipat dan terbuka) | prototipe penuh, `/spike` | emulasi, layout saja, tanpa FPS | emulasi |
| Flip (layar luar dan dalam) | prototipe penuh, `/spike` | emulasi, layout saja, tanpa FPS | emulasi |

**Belum pasti:**
- **Versi three berbeda.** Prototipe r128 vs spike 0.187. three 0.187 sudah menghapus `PCFSoftShadowMap` (console: "Using PCFShadowMap instead"), jadi shadow di `/spike` adalah PCF, bukan PCF soft. Pengelolaan warna dan satuan intensitas cahaya juga berubah sejak r155. Dengan angka yang sama, `/spike` tampak jauh lebih gelap dan berwarna lain. Issue 05 perlu menghitung ulang intensitas, bukan sekadar menyalin.
- **Sun di belakang dinding.** Di (−4, 9, −12), sun membuat hampir seluruh lantai tertutup bayangan dinding. Prototipe tetap terang karena ada fill, spot, lentera, sconce, dan Fase yang menggeser sun. `/spike` gelap, dan ini bukan bug spike.
- **`/spike` jauh lebih ringan dari prototipe** (5 mesh berbanding seluruh Kamar). Selisih FPS-nya batas bawah overhead R3F, bukan overhead pada beban setara.
- **Fase prototipe mengikuti jam WITA.** Fase mengubah posisi sun dan lampu yang menyala, jadi ukur di Fase yang sama untuk ketiga ulangan dan catat Fase-nya.
- **Mengukur di Fold dan Flip.** Belum ada perangkat fisik. Emulasi DevTools hanya membuktikan layout.
- R3F memakai `THREE.Clock` yang deprecated di 0.187 (hanya peringatan).
