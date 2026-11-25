// "static shell" prototipe: lantai, papan lantai, dua dinding batu, plint, balok.
import { useMemo } from "react";
import { PAL } from "@/kamar/palet";
import { Kotak } from "./bentuk";
import { teksturBatu } from "./tekstur";

export function Shell() {
  const batu = useMemo(() => teksturBatu(), []);
  const BALOK = PAL.woodD;
  return (
    <group>
      <Kotak ukuran={[10, 0.4, 10]} warna={PAL.wood} position={[0, -0.2, 0]} />
      {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((i) => (
        <Kotak key={i} ukuran={[0.03, 0.01, 10]} warna={PAL.woodD} position={[i * 1.1, 0.005, 0]} />
      ))}
      <Kotak ukuran={[10, 6, 0.3]} warna={PAL.stone} position={[0, 3, -5.15]} />
      <Kotak ukuran={[0.3, 6, 10.3]} warna={PAL.stoneD} position={[-5.15, 3, -0.15]} />
      {(
        [
          [[0, 3, -4.996], 0],
          [[-4.996, 3, 0], Math.PI / 2],
        ] as const
      ).map(([pos, ry]) => (
        <mesh key={ry} position={pos} rotation={[0, ry, 0]} receiveShadow>
          <planeGeometry args={[10, 6]} />
          <meshStandardMaterial map={batu} roughness={0.95} />
        </mesh>
      ))}
      <Kotak ukuran={[10, 0.25, 0.06]} warna={PAL.woodD} position={[0, 0.125, -4.98]} />
      <Kotak ukuran={[0.06, 0.25, 10]} warna={PAL.woodD} position={[-4.98, 0.125, 0]} />
      <Kotak ukuran={[0.22, 6, 0.1]} warna={BALOK} position={[-4.85, 3, -4.97]} />
      <Kotak ukuran={[0.22, 6, 0.1]} warna={BALOK} position={[4.85, 3, -4.97]} />
      <Kotak ukuran={[0.22, 6, 0.1]} warna={BALOK} position={[-0.3, 3, -4.97]} />
      <Kotak ukuran={[10, 0.22, 0.1]} warna={BALOK} position={[0, 5.05, -4.97]} />
      <Kotak ukuran={[0.1, 6, 0.22]} warna={BALOK} position={[-4.97, 3, 4.85]} />
      <Kotak ukuran={[0.1, 0.22, 10]} warna={BALOK} position={[-4.97, 5.05, 0]} />
    </group>
  );
}
