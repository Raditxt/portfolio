// Padanan box() dan cyl() di prototipe: flatShading, roughness 0.85, metalness 0,
// cast dan receive shadow.
import type { ReactNode } from "react";
import { DECAY_R128, intensitasR128, jarakR128 } from "@/kamar/cahaya";
import type { V3 } from "@/kamar/kamera";

export type OpsiBahan = { metalness?: number; roughness?: number };

type Ruang = { position: V3; rotation?: V3; children?: ReactNode };

function Bahan({ warna, opsi }: { warna: string; opsi?: OpsiBahan }) {
  return <meshStandardMaterial color={warna} flatShading roughness={0.85} metalness={0} {...opsi} />;
}

export function Kotak({ ukuran, warna, opsi, position, rotation }: Ruang & { ukuran: V3; warna: string; opsi?: OpsiBahan }) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={ukuran} />
      <Bahan warna={warna} opsi={opsi} />
    </mesh>
  );
}

export function Silinder({
  atas,
  bawah,
  tinggi,
  segmen = 10,
  warna,
  opsi,
  position,
  rotation,
}: Ruang & { atas: number; bawah: number; tinggi: number; segmen?: number; warna: string; opsi?: OpsiBahan }) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <cylinderGeometry args={[atas, bawah, tinggi, segmen]} />
      <Bahan warna={warna} opsi={opsi} />
    </mesh>
  );
}

/** Padanan light() prototipe: point light tanpa shadow, angka r128 dikonversi (ADR 0004). */
export function LampuTitik({ warna, intensitas, jarak, position }: { warna: string; intensitas: number; jarak: number; position: V3 }) {
  return (
    <pointLight
      color={warna}
      intensity={intensitasR128(intensitas)}
      distance={jarakR128(jarak)}
      decay={DECAY_R128}
      position={position}
    />
  );
}
