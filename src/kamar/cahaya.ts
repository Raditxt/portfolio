// Konversi cahaya prototipe (three r128, cahaya legacy) ke three 0.187 (cahaya fisik).
// Alasan dan batasnya: docs/adr/0004-pipeline-warna-cahaya-r128.md.

/** r128 legacy mengalikan irradiance dengan π; cahaya fisik tidak. */
export function intensitasR128(i: number): number {
  return i * Math.PI;
}

/**
 * r128 legacy: falloff (1 − r/d)². 0.187 dengan decay 0: (1 − (r/d′)⁴)².
 * d′ = 0.459·d adalah fit kuadrat terkecil kedua kurva untuk r ∈ [0, 1.5d].
 */
export function jarakR128(d: number): number {
  return d * 0.459;
}

/** Decay yang dipakai bersama `jarakR128`. */
export const DECAY_R128 = 0;
