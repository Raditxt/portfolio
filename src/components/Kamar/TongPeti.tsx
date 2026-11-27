// Dekorasi dua tong kayu bersabuk besi dan peti bertumpuk di lantai depan kiri.
import { PAL } from "@/kamar/palet";
import { Kotak, Silinder } from "./bentuk";

const TONG: [number, number][] = [
  [-2.9, 2.6],
  [-1.9, 3.2],
];

export function TongPeti() {
  return (
    <group>
      {TONG.map(([x, z]) => (
        <group key={x}>
          <Silinder atas={0.45} bawah={0.45} tinggi={1.05} segmen={12} warna={PAL.wood} position={[x, 0.53, z]} />
          {[0.2, 0.86].map((y) => (
            <mesh key={y} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
              <torusGeometry args={[0.455, 0.025, 4, 16]} />
              <meshStandardMaterial color={PAL.iron} flatShading roughness={0.85} metalness={0} />
            </mesh>
          ))}
        </group>
      ))}
      <Kotak ukuran={[0.8, 0.7, 0.8]} warna={PAL.woodL} position={[-2.7, 0.35, 1.5]} />
      <Kotak ukuran={[0.5, 0.45, 0.5]} warna={PAL.wood} position={[-2.6, 0.93, 1.55]} />
    </group>
  );
}
