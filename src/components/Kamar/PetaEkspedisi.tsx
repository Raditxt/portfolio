// Benda Peta ekspedisi → Pengalaman. Papan di dinding kiri dengan dua catatan dan pin.
import { useMemo } from "react";
import { PAL } from "@/kamar/palet";
import { Kotak } from "./bentuk";
import { teksturPeta } from "./tekstur";

const CATATAN: [number, number, number][] = [
  [0.5, -0.7, 0.05],
  [-0.45, 0.65, -0.06],
];

export function PetaEkspedisi() {
  const peta = useMemo(() => teksturPeta(), []);
  return (
    <group position={[-4.93, 3.45, 3.0]}>
      <Kotak ukuran={[0.08, 1.6, 2.0]} warna={PAL.woodD} position={[0, 0, 0]} />
      <mesh position={[0.05, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1.82, 1.42]} />
        <meshStandardMaterial map={peta} roughness={0.95} />
      </mesh>
      {CATATAN.map(([y, z, rx]) => (
        <group key={z}>
          <Kotak ukuran={[0.02, 0.42, 0.38]} warna={PAL.silver} position={[0.07, y, z]} rotation={[rx, 0, 0]} />
          <mesh position={[0.1, y + 0.16, z]}>
            <sphereGeometry args={[0.035, 6, 4]} />
            <meshStandardMaterial color={PAL.crimson} flatShading roughness={0.85} metalness={0} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
