import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

const css = readFileSync(fileURLToPath(new URL("./tokens.css", import.meta.url)), "utf8");

function blok(nama: string): string {
  const awal = css.indexOf(`/* ${nama} */`);
  expect(awal, `blok /* ${nama} */ tidak ada`).toBeGreaterThanOrEqual(0);
  const sisa = css.slice(awal + nama.length + 6);
  const akhir = sisa.search(/\/\* [a-z]+ \*\/|\}/);
  return akhir === -1 ? sisa : sisa.slice(0, akhir);
}

function deklarasi(isi: string): Record<string, string> {
  const hasil: Record<string, string> = {};
  for (const [, nama, nilai] of isi.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    hasil[nama] = nilai.trim();
  }
  return hasil;
}

test("blok palet berisi persis delapan warna dari docs/spec.md", () => {
  expect(deklarasi(blok("palet"))).toEqual({
    "--obsidian": "#15131A",
    "--ash": "#1E1B23",
    "--stone": "#3B3733",
    "--olive": "#4F5D3A",
    "--silver": "#E8E4DA",
    "--gold": "#C9A24A",
    "--violet": "#7B5EA7",
    "--crimson": "#A3312F",
  });
});

test("tokens.css tidak punya hex di luar blok palet dan turunan", () => {
  const sisa = css.replace(blok("palet"), "").replace(blok("turunan"), "");
  const hex = sisa.match(/#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})\b/gi);
  expect(hex).toBeNull();
});

test("setiap color role hanya merujuk ke var palet atau turunan", () => {
  const dikenal = new Set([
    ...Object.keys(deklarasi(blok("palet"))),
    ...Object.keys(deklarasi(blok("turunan"))),
  ]);
  const role = deklarasi(blok("role"));

  expect(Object.keys(role).sort()).toEqual(
    [
      "--md-primary",
      "--md-on-primary",
      "--md-secondary-container",
      "--md-on-secondary-container",
      "--md-tertiary-container",
      "--md-on-tertiary-container",
      "--md-error-container",
      "--md-on-error-container",
      "--md-surface",
      "--md-surface-container-low",
      "--md-surface-container",
      "--md-surface-container-high",
      "--md-surface-container-highest",
      "--md-on-surface",
      "--md-on-surface-variant",
      "--md-outline",
      "--md-outline-variant",
      "--md-scrim",
    ].sort(),
  );
  for (const [nama, nilai] of Object.entries(role)) {
    const rujukan = /^var\((--[\w-]+)\)$/.exec(nilai)?.[1];
    expect(rujukan && dikenal.has(rujukan), `${nama}: ${nilai}`).toBe(true);
  }
});
