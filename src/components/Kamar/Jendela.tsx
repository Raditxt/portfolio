// Benda Jendela → Tentang. Langit statis Fase Sore; lapisan langit, matahari, dan bulan
// milik issue 08.
import { useMemo } from "react";
import { PAL } from "@/kamar/palet";
import { Kotak } from "./bentuk";
import { teksturJendelaSore } from "./tekstur";

export function Jendela() {
  const langit = useMemo(() => teksturJendelaSore(), []);
  const FR = PAL.woodD;
  return (
    <group position={[-2.1, 3.55, -4.98]}>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[2.4, 2.0]} />
        <meshBasicMaterial map={langit} />
      </mesh>
      <Kotak ukuran={[2.6, 0.12, 0.14]} warna={FR} position={[0, 1.06, 0.06]} />
      <Kotak ukuran={[2.6, 0.12, 0.14]} warna={FR} position={[0, -1.06, 0.06]} />
      <Kotak ukuran={[0.12, 2.24, 0.14]} warna={FR} position={[-1.26, 0, 0.06]} />
      <Kotak ukuran={[0.12, 2.24, 0.14]} warna={FR} position={[1.26, 0, 0.06]} />
      <Kotak ukuran={[0.06, 2.0, 0.08]} warna={FR} position={[0, 0, 0.05]} />
      <Kotak ukuran={[2.4, 0.06, 0.08]} warna={FR} position={[0, 0.1, 0.05]} />
      <Kotak ukuran={[2.9, 0.1, 0.42]} warna={FR} position={[0, -1.17, 0.2]} />
    </group>
  );
}
