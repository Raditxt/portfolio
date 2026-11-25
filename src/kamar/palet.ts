// `PAL` dari docs/prototype/kamar-raditya.html. Warna datar, tanpa gradasi.
export const PAL = {
  obsidian: "#15131A",
  stone: "#3B3733",
  stoneL: "#4A4540",
  stoneD: "#2E2A27",
  olive: "#4F5D3A",
  oliveD: "#3A4529",
  silver: "#E8E4DA",
  gold: "#C9A24A",
  goldD: "#8E7232",
  violet: "#7B5EA7",
  violetD: "#4A3A66",
  crimson: "#A3312F",
  crimsonD: "#6E2120",
  wood: "#6B4A35",
  woodD: "#4A3326",
  woodL: "#8A6247",
  iron: "#2A2A2E",
} as const;

/** PRNG `rng(seed)` prototipe (mulberry32), supaya susunan buku dan tekstur sama persis. */
export function rng(seed: number): () => number {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
