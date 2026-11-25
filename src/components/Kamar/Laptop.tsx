// Benda Laptop → Project. Meja milik Dekorasi (05b), jadi sementara Laptop melayang di y=2.39.
import { useMemo } from "react";
import { PAL } from "@/kamar/palet";
import { Kotak } from "./bentuk";
import { teksturKode } from "./tekstur";

const LOGAM = { metalness: 0.3, roughness: 0.5 };

export function Laptop() {
  const kode = useMemo(() => teksturKode(), []);
  return (
    <group position={[1.15, 2.39, -3.85]} rotation={[0, -0.12, 0]}>
      <Kotak ukuran={[1.35, 0.07, 0.92]} warna="#B9BCC4" opsi={LOGAM} position={[0, 0.035, 0]} />
      <Kotak ukuran={[1.15, 0.01, 0.45]} warna={PAL.iron} position={[0, 0.075, -0.1]} />
      <group position={[0, 0.07, -0.44]} rotation={[-0.22, 0, 0]}>
        <Kotak ukuran={[1.35, 0.88, 0.05]} warna="#B9BCC4" opsi={LOGAM} position={[0, 0.44, 0]} />
        <mesh position={[0, 0.45, 0.03]}>
          <planeGeometry args={[1.22, 0.76]} />
          <meshBasicMaterial map={kode} />
        </mesh>
      </group>
    </group>
  );
}
