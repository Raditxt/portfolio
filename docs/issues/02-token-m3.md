# 02 · Token Material 3 dan palet

## Tujuan
Palet datar dan color role M3 sebagai CSS variables, type scale Roboto Flex + Roboto Mono, shape dan state layer.

## Di luar scope
Belum ada komponen selain halaman contoh token.

## Kriteria selesai
- [ ] Delapan warna palet persis sama dengan `docs/spec.md`
- [ ] Color role M3 hanya merujuk ke var palet atau var turunan; `tokens.css` tidak punya hex di luar blok palet dan blok turunan
- [ ] Tidak ada gradasi di CSS mana pun
- [ ] Screenshot halaman token disimpan di `e2e`

## Catatan
Isi saat grilling: keputusan, asumsi, dan seam yang disepakati.

Sesi F1 (2026-11-10).

**Keputusan**
- Kriteria color role diubah redaksinya. Prototipe memakai 12 hex di luar palet untuk role. Hex itu disalin apa adanya sebagai var turunan bernama, bukan dikarang ulang.
- `src/styles/tokens.css`: palet, turunan, role, shape (`--shape-xs…full`), easing (`--ease`, `--ease-decel`). Satu deklarasi per baris. Blok ditandai komentar `/* palet */`, `/* turunan */`, `/* role */`.
- Var turunan (`--<palet>-<sifat>`), masing-masing dengan komentar asal palet di `tokens.css`; tidak masuk `CONTEXT.md`:
  `--gold-ink` #1E1606, `--violet-deep` #3E3157, `--violet-pale` #E3D6F5, `--crimson-deep` #4A1A19, `--crimson-pale` #F6CFCB, `--ash-2` #24212A, `--ash-3` #2C2832, `--ash-4` #36313D, `--silver-dim` #B8B1A6, `--stone-light` #7A746C, `--ash-line` #3C3842, `--black` #000 (scrim, di luar palet).
- Role `--md-*` hanya bernilai `var(--…)` ke palet atau turunan. Prototipe tidak memakai `rgba()`/`color-mix()` di role (dicek).
- `src/styles/base.css`: body (margin 0, background obsidian, warna on-surface, font, antialiased, `color-scheme: dark`), tujuh class type scale prototipe + `.muted`, state layer `.sl` (0,08 hover; 0,12 focus/active; 200ms `--ease`), `:focus-visible` outline gold. `overflow: hidden` di body ditunda ke issue 05.
- Kedua file diimpor di `layout.tsx`. "Tanpa CSS global" di L1 berarti tanpa boilerplate `globals.css`; komponen lain memakai CSS Modules.
- Font lewat `next/font/google`: Roboto Flex variable font tanpa weight, `axes: ['opsz']`; Roboto Mono weight 500. Diekspos sebagai `--font` dan `--mono` dengan fallback stack prototipe.
- Halaman contoh token di `/token` (ikut ter-deploy): swatch palet, turunan, role, tujuh type scale, enam shape, satu kotak `.sl` dalam keadaan normal.
- Playwright `webServer` diganti dari `npm run dev` ke `npm run build && npm run start -- -p 3100`, `reuseExistingServer: false`, timeout 180 detik, supaya indikator dev tidak masuk screenshot dan dev server di port 3000 tidak pernah dipakai ulang.

**Asumsi (terverifikasi)**
- Next 16 menulis output dev ke `.next/dev`, jadi build e2e aman walau `npm run dev` sedang jalan. Dicek 2026-11-10: `next build` lulus saat `next dev` jalan, dan dev tetap merespons 200.

**Seam**
- Vitest `src/styles/tokens.test.ts`: blok palet berisi persis 8 var dengan hex sesuai `docs/spec.md`; setiap hex (3/4/6/8 digit, huruf besar/kecil) hanya muncul di blok palet atau turunan; setiap `--md-*` hanya `var()` ke var palet atau turunan.
- Vitest: pindai semua `*.css` dan `*.tsx` di `src/`, gagal kalau ada `gradient(`.
- Playwright `e2e/token.spec.ts`: `toHaveScreenshot()` halaman `/token`, Chromium Desktop 1280×720, `fullPage: true`. Baseline di `e2e/token.spec.ts-snapshots/` berakhiran `-chromium-win32.png`; CI Linux nanti butuh baseline sendiri.
