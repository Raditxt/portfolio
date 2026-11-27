// Dekorasi lingkaran sihir emas di lantai (tempat Pemanggilan). Pose diam: tidak berputar,
// opacity akhir intro prototipe (0.9).
import { useMemo } from "react";
import { PAL } from "@/kamar/palet";
import { LampuTitik } from "./bentuk";
import { teksturLingkaranSihir } from "./tekstur";

const PUSAT_LINGKARAN = [0.5, 0, 1.7] as const;

export function LingkaranSihir() {
  const garis = useMemo(() => teksturLingkaranSihir(), []);
  return (
    <group>
      <mesh position={[PUSAT_LINGKARAN[0], 0.02, PUSAT_LINGKARAN[2]]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.4, 3.4]} />
        <meshBasicMaterial map={garis} transparent depthWrite={false} opacity={0.9} />
      </mesh>
      {/* Di-tune (ADR 0004, addendum 05b): prototipe 1.0 / d 6. */}
      <LampuTitik warna={PAL.gold} intensitas={0.8} jarak={10} position={[PUSAT_LINGKARAN[0], 0.8, PUSAT_LINGKARAN[2]]} />
    </group>
  );
}
