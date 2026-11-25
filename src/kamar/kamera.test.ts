import { describe, expect, it } from "vitest";
import { frustumIso } from "./kamera";

describe("frustumIso", () => {
  it("16:9 sama dengan prototipe: tinggi 11.5, lebar mengikuti aspect", () => {
    const f = frustumIso(1600, 900);
    expect(f.top).toBeCloseTo(5.75, 3);
    expect(f.bottom).toBeCloseTo(-5.75, 3);
    expect(f.right).toBeCloseTo(10.222, 3);
    expect(f.left).toBeCloseTo(-10.222, 3);
  });

  // Setengah lebar bbox shell Kamar dilihat dari HOME: pojok (−5.3, y, 5)
  // terproyeksi 7.354 ke kiri sumbu kanan kamera. Dihitung terpisah dari kode.
  const SETENGAH_LEBAR_KAMAR = 7.354;

  it.each([
    ["1:1", 1000, 1000],
    ["0.9", 900, 1000],
    ["0.46", 460, 1000],
    ["0.38", 380, 1000],
  ])("%s: kiri dan kanan Kamar pas di tepi layar", (_rasio, lebar, tinggi) => {
    const f = frustumIso(lebar, tinggi);
    expect(f.right).toBeCloseTo(SETENGAH_LEBAR_KAMAR, 2);
    expect(f.left).toBeCloseTo(-SETENGAH_LEBAR_KAMAR, 2);
    expect(f.top / f.right).toBeCloseTo(tinggi / lebar, 6);
  });
});
