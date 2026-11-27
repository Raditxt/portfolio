// Dekorasi meja: papan, empat kaki, laci dengan pegangan emas, lentera, jam pasir, cangkir.
// Laptop dan HP berdiri di atasnya (y=2.39). Pose diam: api dan pasir tidak bergerak.
import { PAL, WARNA_DEKORASI } from "@/kamar/palet";
import { Kotak, Silinder } from "./bentuk";

const BESI = { metalness: 0.6 };
const TIANG_LENTERA: [number, number][] = [
  [-0.15, -0.15],
  [0.15, -0.15],
  [-0.15, 0.15],
  [0.15, 0.15],
];

const KAKI: [number, number][] = [
  [-0.4, -4.75],
  [3.6, -4.75],
  [-0.4, -3.25],
  [3.6, -3.25],
];

export function Meja() {
  return (
    <group>
      <Kotak ukuran={[4.2, 0.18, 1.7]} warna={PAL.woodL} position={[1.6, 2.3, -4.0]} />
      {KAKI.map(([x, z]) => (
        <Kotak key={`${x},${z}`} ukuran={[0.14, 2.21, 0.14]} warna={PAL.woodD} position={[x, 1.1, z]} />
      ))}
      <Kotak ukuran={[1.4, 0.9, 1.4]} warna={PAL.woodD} position={[3.0, 1.0, -4.05]} />
      <Kotak ukuran={[1.2, 0.04, 0.02]} warna={PAL.gold} position={[3.0, 1.2, -3.34]} />
      <group position={[3.15, 2.39, -4.4]}>
        <Kotak ukuran={[0.34, 0.05, 0.34]} warna={PAL.iron} opsi={BESI} position={[0, 0.03, 0]} />
        <Kotak ukuran={[0.34, 0.05, 0.34]} warna={PAL.iron} opsi={BESI} position={[0, 0.55, 0]} />
        {TIANG_LENTERA.map(([x, z]) => (
          <Kotak key={`${x},${z}`} ukuran={[0.03, 0.5, 0.03]} warna={PAL.iron} position={[x, 0.3, z]} />
        ))}
        <mesh position={[0, 0.28, 0]} scale={[1, 1.5, 1]}>
          <sphereGeometry args={[0.09, 8, 6]} />
          <meshBasicMaterial color={WARNA_DEKORASI.api} />
        </mesh>
        <mesh position={[0, 0.68, 0]} rotation={[0, Math.PI / 4, 0]} castShadow receiveShadow>
          <coneGeometry args={[0.26, 0.22, 4]} />
          <meshStandardMaterial color={PAL.iron} flatShading roughness={0.85} metalness={0.6} />
        </mesh>
      </group>
      <group position={[2.15, 2.39, -4.55]}>
        <Silinder atas={0.17} bawah={0.17} tinggi={0.04} warna={PAL.woodD} position={[0, 0.02, 0]} />
        <Silinder atas={0.17} bawah={0.17} tinggi={0.04} warna={PAL.woodD} position={[0, 0.5, 0]} />
        {(
          [
            [0.13, 0.015, 0.37],
            [0.015, 0.13, 0.15],
          ] as const
        ).map(([atas, bawah, y]) => (
          <mesh key={y} position={[0, y, 0]}>
            <cylinderGeometry args={[atas, bawah, 0.22, 8]} />
            <meshStandardMaterial
              color={WARNA_DEKORASI.kacaJamPasir}
              flatShading
              roughness={0.85}
              metalness={0}
              transparent
              opacity={0.45}
            />
          </mesh>
        ))}
        <Silinder atas={0.01} bawah={0.1} tinggi={0.09} segmen={8} warna={PAL.gold} position={[0, 0.09, 0]} />
      </group>
      <Silinder atas={0.14} bawah={0.13} tinggi={0.3} warna={PAL.crimson} position={[2.45, 2.54, -3.45]} />
    </group>
  );
}
