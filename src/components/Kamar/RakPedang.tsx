// Dekorasi rak pedang (dua pedang) dan perisai crimson berlambang R di dinding kiri.
import { useMemo } from "react";
import { PAL, WARNA_DEKORASI } from "@/kamar/palet";
import { Kotak, Silinder } from "./bentuk";
import { teksturPerisai } from "./tekstur";

export function RakPedang() {
  const muka = useMemo(() => teksturPerisai(), []);
  return (
    <group>
      <group position={[-4.8, 0, 1.05]}>
        <Kotak ukuran={[0.12, 2.2, 0.1]} warna={PAL.woodD} position={[0, 1.1, -0.6]} />
        <Kotak ukuran={[0.12, 2.2, 0.1]} warna={PAL.woodD} position={[0, 1.1, 0.6]} />
        <Kotak ukuran={[0.14, 0.1, 1.4]} warna={PAL.woodD} position={[0.02, 1.6, 0]} />
        <Kotak ukuran={[0.2, 0.08, 1.4]} warna={PAL.woodD} position={[0.05, 0.3, 0]} />
        {[-0.3, 0.3].map((z) => (
          <group key={z} position={[0.12, 0, z]}>
            <Kotak ukuran={[0.03, 1.5, 0.1]} warna={WARNA_DEKORASI.bilahPedang} opsi={{ metalness: 0.8, roughness: 0.3 }} position={[0, 1.25, 0]} />
            <Kotak ukuran={[0.08, 0.06, 0.36]} warna={PAL.gold} opsi={{ metalness: 0.5, roughness: 0.4 }} position={[0, 0.48, 0]} />
            <Silinder atas={0.035} bawah={0.035} tinggi={0.3} segmen={6} warna={PAL.woodD} position={[0, 0.3, 0]} />
          </group>
        ))}
      </group>
      <group position={[-4.85, 3.35, 1.05]}>
        <Silinder atas={0.5} bawah={0.5} tinggi={0.08} segmen={20} warna={PAL.iron} opsi={{ metalness: 0.5 }} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} />
        <mesh position={[0.05, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <circleGeometry args={[0.44, 24]} />
          <meshStandardMaterial map={muka} roughness={0.7} metalness={0.2} />
        </mesh>
      </group>
    </group>
  );
}
