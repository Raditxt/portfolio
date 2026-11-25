// Angka dari docs/prototype/kamar-raditya.html (HOME, offset kamera, VIEW, shell).
export type V3 = [number, number, number];
export type Frustum = { left: number; right: number; top: number; bottom: number };

/** Titik yang ditatap kamera saat tidak ada Section terbuka. */
export const HOME: V3 = [-0.3, 2.1, -0.4];
/** Posisi kamera relatif ke HOME. */
export const OFFSET_KAMERA: V3 = [13, 11, 13];
/** Tinggi pandangan ortografis prototipe (`VIEW`). */
const VIEW = 11.5;
/** Kotak pembatas shell Kamar: lantai (y −0.4..0) sampai puncak dinding (y 6). */
const BBOX_KAMAR: { min: V3; max: V3 } = { min: [-5.3, -0.4, -5.3], max: [5, 6, 5] };

function setengahLebarKamar(): number {
  // Sumbu kanan kamera = normalize(cross(atas, arah ke kamera)), arah ke kamera = OFFSET_KAMERA.
  const [ox, , oz] = OFFSET_KAMERA;
  const panjang = Math.hypot(oz, ox);
  const kanan: V3 = [oz / panjang, 0, -ox / panjang];
  let maks = 0;
  for (const x of [BBOX_KAMAR.min[0], BBOX_KAMAR.max[0]])
    for (const z of [BBOX_KAMAR.min[2], BBOX_KAMAR.max[2]]) {
      const proyeksi = (x - HOME[0]) * kanan[0] + (z - HOME[2]) * kanan[2];
      maks = Math.max(maks, Math.abs(proyeksi));
    }
  return maks;
}

const SETENGAH_LEBAR = setengahLebarKamar();

/**
 * Frustum ortografis untuk ukuran Canvas tertentu. Tinggi minimal VIEW (landscape sama
 * dengan prototipe), dan melebar kontinu saat layar sempit supaya kiri-kanan Kamar muat.
 */
export function frustumIso(lebar: number, tinggi: number): Frustum {
  const a = lebar / tinggi;
  const h = Math.max(VIEW, (2 * SETENGAH_LEBAR) / a);
  return { left: (-h * a) / 2, right: (h * a) / 2, top: h / 2, bottom: -h / 2 };
}
