// Dekorasi kursi di depan meja: dudukan, empat kaki, sandaran, bantal crimson.
import { PAL } from "@/kamar/palet";
import { Kotak } from "./bentuk";

const KAKI: [number, number][] = [
  [-0.42, -0.4],
  [0.42, -0.4],
  [-0.42, 0.4],
  [0.42, 0.4],
];

export function Kursi() {
  return (
    <group position={[1.4, 0, -2.3]} rotation={[0, -0.25, 0]}>
      <Kotak ukuran={[1.0, 0.12, 0.95]} warna={PAL.woodL} position={[0, 1.3, 0]} />
      {KAKI.map(([a, b]) => (
        <Kotak key={`${a},${b}`} ukuran={[0.09, 1.3, 0.09]} warna={PAL.woodD} position={[a, 0.65, b]} />
      ))}
      <Kotak ukuran={[1.0, 1.2, 0.09]} warna={PAL.woodL} position={[0, 2.0, 0.44]} />
      <Kotak ukuran={[0.86, 0.06, 0.82]} warna={PAL.crimson} position={[0, 1.39, 0]} />
    </group>
  );
}
