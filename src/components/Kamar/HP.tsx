// Benda HP → Kontak. Tergeletak di atas Meja (permukaan y=2.39).
import { useMemo } from "react";
import { PAL } from "@/kamar/palet";
import { Kotak } from "./bentuk";
import { teksturLayarHP } from "./tekstur";

export function HP() {
  const layar = useMemo(() => teksturLayarHP(), []);
  return (
    <group position={[-0.1, 2.39, -3.45]} rotation={[0, 0.45, 0]}>
      <Kotak ukuran={[0.34, 0.05, 0.66]} warna={PAL.iron} position={[0, 0.025, 0]} />
      <mesh position={[0, 0.052, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.3, 0.6]} />
        <meshBasicMaterial map={layar} />
      </mesh>
    </group>
  );
}
