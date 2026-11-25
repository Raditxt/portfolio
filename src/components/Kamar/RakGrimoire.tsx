// Benda Rak grimoire → Skill. Rak di dinding kiri plus grimoire terbuka yang melayang
// (pose diam; gerak melayang milik issue animasi).
import { useMemo } from "react";
import { DECAY_R128, intensitasR128, jarakR128 } from "@/kamar/cahaya";
import type { V3 } from "@/kamar/kamera";
import { PAL, rng } from "@/kamar/palet";
import { Kotak } from "./bentuk";

const WARNA_BUKU = [PAL.olive, PAL.crimson, PAL.violet, PAL.gold, PAL.silver, PAL.oliveD, PAL.crimsonD, PAL.violetD];

type Buku = { ukuran: V3; warna: string; position: V3; miring: boolean };

/** Urutan panggilan rng(11) disalin persis dari prototipe supaya susunan buku sama. */
function susunBuku(): Buku[] {
  const r = rng(11);
  const hasil: Buku[] = [];
  for (const base of [0.1, 1.2, 2.3, 3.4]) {
    let z = -1.42;
    while (z < 1.3) {
      const w = 0.12 + r() * 0.11;
      const h = 0.62 + r() * 0.32;
      const d = 0.55 + r() * 0.15;
      if (r() < 0.12 && z > -1.2) {
        z += 0.25;
        continue;
      }
      const warna = WARNA_BUKU[Math.floor(r() * WARNA_BUKU.length)];
      const miring = r() < 0.08;
      hasil.push({ ukuran: [d, h, w], warna, position: [0.05, base + h / 2, z + w / 2 + (miring ? 0.08 : 0)], miring });
      z += w + 0.015;
    }
  }
  return hasil;
}

export function RakGrimoire() {
  const buku = useMemo(() => susunBuku(), []);
  const SH = PAL.wood;
  return (
    <group position={[-4.55, 0, -1.4]}>
      <Kotak ukuran={[0.9, 4.5, 0.1]} warna={SH} position={[0, 2.25, -1.55]} />
      <Kotak ukuran={[0.9, 4.5, 0.1]} warna={SH} position={[0, 2.25, 1.55]} />
      <Kotak ukuran={[0.06, 4.5, 3.1]} warna={PAL.woodD} position={[-0.42, 2.25, 0]} />
      {[0.05, 1.15, 2.25, 3.35, 4.45].map((y) => (
        <Kotak key={y} ukuran={[0.9, 0.1, 3.1]} warna={SH} position={[0, y, 0]} />
      ))}
      {buku.map((b, i) => (
        <Kotak key={i} ukuran={b.ukuran} warna={b.warna} position={b.position} rotation={b.miring ? [0.25, 0, 0] : undefined} />
      ))}
      <group position={[1.35, 3.05, 1.9]} rotation={[-0.5, 0.6, 0]}>
        <Kotak ukuran={[0.55, 0.05, 0.75]} warna={PAL.violetD} position={[-0.27, 0.07, 0]} rotation={[0, 0, -0.25]} />
        <Kotak ukuran={[0.55, 0.05, 0.75]} warna={PAL.violetD} position={[0.27, 0.07, 0]} rotation={[0, 0, 0.25]} />
        {(
          [
            [-0.25, -0.25],
            [0.25, 0.25],
          ] as const
        ).map(([x, rz]) => (
          <mesh key={x} position={[x, 0.12, 0]} rotation={[0, 0, rz]}>
            <boxGeometry args={[0.5, 0.06, 0.68]} />
            <meshStandardMaterial color={PAL.silver} emissive={PAL.goldD} emissiveIntensity={1} flatShading />
          </mesh>
        ))}
        <pointLight
          color={PAL.gold}
          intensity={intensitasR128(0.8)}
          distance={jarakR128(3)}
          decay={DECAY_R128}
          position={[0, 0.5, 0]}
        />
      </group>
    </group>
  );
}
