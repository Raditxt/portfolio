// Dekorasi pot herba di pojok kanan belakang: daun olive dan 12 bunga kecil.
import { useMemo } from "react";
import type { V3 } from "@/kamar/kamera";
import { PAL, rng } from "@/kamar/palet";
import { Silinder } from "./bentuk";

/** [dx, y, dz, radius] dari prototipe. */
const DAUN = [
  [0, 1.4, 0, 0.55],
  [-0.3, 1.9, 0.2, 0.42],
  [0.25, 2.2, -0.15, 0.38],
  [-0.05, 2.6, 0, 0.3],
] as const;

const WARNA_BUNGA = [PAL.silver, PAL.gold, PAL.violet];

/** Urutan panggilan rng(4) disalin persis dari prototipe supaya letak bunga sama. */
function susunBunga(): V3[] {
  const rr = rng(4);
  const hasil: V3[] = [];
  for (let i = 0; i < 12; i++) {
    const a = rr() * Math.PI * 2;
    const r = 0.38 + rr() * 0.28;
    hasil.push([3.9 + Math.cos(a) * r, 1.5 + rr() * 1.35, -4.1 + Math.sin(a) * r * 0.8]);
  }
  return hasil;
}

function Ikosa({ r, warna, position }: { r: number; warna: string; position: V3 }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <icosahedronGeometry args={[r, 0]} />
      <meshStandardMaterial color={warna} flatShading roughness={0.85} metalness={0} />
    </mesh>
  );
}

export function PotHerba() {
  const bunga = useMemo(() => susunBunga(), []);
  return (
    <group>
      <Silinder atas={0.45} bawah={0.35} tinggi={0.8} warna={PAL.crimsonD} position={[3.9, 0.4, -4.1]} />
      {DAUN.map(([dx, y, dz, r]) => (
        <Ikosa key={y} r={r} warna={PAL.olive} position={[3.9 + dx, y, -4.1 + dz]} />
      ))}
      {bunga.map((p, i) => (
        <Ikosa key={i} r={0.09} warna={WARNA_BUNGA[i % 3]} position={p} />
      ))}
    </group>
  );
}
