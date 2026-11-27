// Dekorasi kasur dengan sandaran kepala bertepi emas, bantal, dan selimut terlipat di kaki kasur.
import { PAL, WARNA_DEKORASI } from "@/kamar/palet";
import { Kotak } from "./bentuk";

const KAKI: [number, number][] = [
  [-1, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
];

export function Kasur() {
  return (
    <group>
      <Kotak ukuran={[2.2, 0.42, 4.1]} warna={PAL.woodD} position={[3.7, 0.29, 2.45]} />
      {KAKI.map(([a, b]) => (
        <Kotak key={`${a},${b}`} ukuran={[0.16, 0.1, 0.16]} warna={PAL.iron} position={[3.7 + a * 1.0, 0.05, 2.45 + b * 1.95]} />
      ))}
      <Kotak ukuran={[2.0, 0.34, 3.9]} warna={PAL.silver} position={[3.7, 0.67, 2.5]} />
      <Kotak ukuran={[2.3, 1.7, 0.16]} warna={PAL.wood} position={[3.7, 0.85, 0.36]} />
      <Kotak ukuran={[2.34, 0.1, 0.2]} warna={PAL.gold} position={[3.7, 1.72, 0.36]} />
      <Kotak ukuran={[1.2, 0.22, 0.6]} warna={WARNA_DEKORASI.bantal} position={[3.7, 0.95, 0.95]} />
      <Kotak ukuran={[2.06, 0.1, 0.8]} warna={PAL.violet} position={[3.7, 0.9, 3.95]} />
      <Kotak ukuran={[2.06, 0.08, 0.7]} warna={PAL.violetD} position={[3.7, 1.0, 3.92]} />
    </group>
  );
}
