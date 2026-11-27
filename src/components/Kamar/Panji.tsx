// Dekorasi panji olive berlambang R di dinding belakang, digantung di batang kayu. Pose diam.
import { useMemo } from "react";
import { DoubleSide } from "three";
import { PAL } from "@/kamar/palet";
import { Silinder } from "./bentuk";
import { teksturPanji } from "./tekstur";

export function Panji() {
  const kain = useMemo(() => teksturPanji(), []);
  return (
    <group>
      <mesh position={[4.2, 3.95, -4.95]}>
        <planeGeometry args={[1.1, 2.2]} />
        <meshStandardMaterial map={kain} transparent alphaTest={0.5} side={DoubleSide} roughness={0.9} />
      </mesh>
      <Silinder atas={0.04} bawah={0.04} tinggi={1.4} warna={PAL.woodD} position={[4.2, 5.08, -4.92]} rotation={[0, 0, Math.PI / 2]} />
    </group>
  );
}
