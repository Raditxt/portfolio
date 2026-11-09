# 01 · Scaffold project

## Tujuan
Next.js App Router + TypeScript strict, Vitest, Playwright, ESLint, deploy preview Vercel.

## Di luar scope
Tidak ada komponen 3D atau konten.

## Kriteria selesai
- [x] `npm run dev` membuka halaman kosong
- [x] `npm test` menjalankan satu tes contoh
- [x] `npm run e2e` membuka halaman dan lulus
- [x] `npm run lint` dan `npm run typecheck` lulus

## Catatan
Isi saat grilling: keputusan, asumsi, dan seam yang disepakati.

Sesi L1 (2026-11-09). Deploy preview Vercel belum dikerjakan; masih terbuka untuk sesi lain.

**Keputusan**
- Setup manual (tanpa `create-next-app`). Tanpa Tailwind, Prettier, atau CSS global.
- Versi: next/react terbaru (16.4 / 19.3). `typescript ~6.0.3` karena peer `typescript-eslint` `<6.1.0`. `eslint ^9` karena plugin bawaan `eslint-config-next` belum mendukung ESLint 10. `@types/node ^22` mengikuti Node lokal. `engines.node >=22.12` karena Vitest 5.
- `src/app/` untuk App Router; tes e2e di `e2e/`. Alias `@/*` → `src/*` di tsconfig dan `resolve.alias` manual di `vitest.config.ts`.
- TypeScript `strict: true` saja, tanpa flag tambahan.
- ESLint flat config (`core-web-vitals` + `typescript`), `lint` = `eslint .`. Mengabaikan `.next`, `test-results`, `playwright-report`, `node_modules`, `next-env.d.ts`.
- `typecheck` = `next typegen && tsc --noEmit`, sehingga lulus di clone bersih. `next-env.d.ts` di-gitignore.
- Halaman: `<html lang="id">`, title "Raditxt", `<main />` kosong.
- Playwright: Chromium saja, `webServer` = `npm run dev` di port 3000, `reuseExistingServer` di luar CI.
- `.gitattributes`: `* text=auto eol=lf`. Raditya menjalankan `git add --renormalize .` sebelum commit.
- `AGENTS.md` dibuat ulang otomatis oleh `next dev`, jadi dimasukkan ke `.gitignore`.
- `npm audit` melaporkan 8 kerentanan moderate, semuanya `minimatch` di devDependencies (lewat ESLint); produksi 0. Dibiarkan, tanpa `npm audit fix`.
- Script `build` (`next build`) dan `start` (`next start`) ditambahkan. `npm run build` lulus.

**Seam**
- Vitest: `src/**/*.test.ts`, environment `node`. `src/example.test.ts` adalah tes trivial dan dibuang saat issue 04 membawa tes asli.
- Playwright: `e2e/**`. `e2e/home.spec.ts` memeriksa status 200 dan title "Raditxt".
