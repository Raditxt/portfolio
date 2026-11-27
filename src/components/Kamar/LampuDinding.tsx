// Dekorasi dua lampu dinding (sconce): satu di dinding belakang, satu di dinding kiri.
// Pose diam: nyala api tidak berkedip.
import { PAL, WARNA_DEKORASI } from "@/kamar/palet";
import { Kotak, LampuTitik, Silinder } from "./bentuk";

/** [x, y, z, ox, oz] dari prototipe; (ox, oz) arah lengan menjauhi dinding. */
export const SCONCE = [
  [0.25, 3.9, -4.88, 0, 0.18],
  [-4.88, 3.9, 1.85, 0.18, 0],
] as const;

export function LampuDinding() {
  return (
    <group>
      {SCONCE.map(([x, y, z, ox, oz]) => (
        <group key={x} position={[x, y, z]}>
          <Kotak ukuran={[0.12, 0.5, 0.12]} warna={PAL.iron} position={[0, -0.2, 0]} />
          <Kotak ukuran={[0.3, 0.06, 0.3]} warna={PAL.iron} position={[ox, -0.42, oz]} />
          <Silinder atas={0.06} bawah={0.06} tinggi={0.26} segmen={8} warna={PAL.silver} position={[ox, -0.26, oz]} />
          <mesh position={[ox, -0.06, oz]} scale={[1, 1.6, 1]}>
            <sphereGeometry args={[0.06, 8, 6]} />
            <meshBasicMaterial color={WARNA_DEKORASI.api} />
          </mesh>
        </group>
      ))}
      {SCONCE.map(([x, y, z, ox, oz]) => (
        <LampuTitik key={x} warna={WARNA_DEKORASI.cahayaApi} intensitas={0.6} jarak={6} position={[x + ox * 2, y, z + oz * 2]} />
      ))}
    </group>
  );
}
