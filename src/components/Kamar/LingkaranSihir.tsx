// Dekorasi lingkaran sihir emas di lantai (tempat Pemanggilan). Pose diam: tidak berputar,
// opacity akhir intro prototipe (0.9).
import { useMemo } from "react";
import { teksturLingkaranSihir } from "./tekstur";

export const PUSAT_LINGKARAN = [0.5, 0, 1.7] as const;

export function LingkaranSihir() {
  const garis = useMemo(() => teksturLingkaranSihir(), []);
  return (
    <mesh position={[PUSAT_LINGKARAN[0], 0.02, PUSAT_LINGKARAN[2]]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[3.4, 3.4]} />
      <meshBasicMaterial map={garis} transparent depthWrite={false} opacity={0.9} />
    </mesh>
  );
}
