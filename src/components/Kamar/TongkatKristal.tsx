// Dekorasi tongkat kristal bersandar di pojok kiri. Pose diam: kristal tidak berputar.
import { PAL, WARNA_DEKORASI } from "@/kamar/palet";
import { Silinder } from "./bentuk";

/** [x, y, z, radius, skala y] dari prototipe. */
const KRISTAL = [
  [0, 3.8, 0, 0.16, 1.9],
  [0.12, 3.66, 0.05, 0.1, 1.5],
  [-0.1, 3.68, -0.05, 0.09, 1.4],
] as const;

export function TongkatKristal() {
  return (
    <group position={[-4.55, 0, 0.55]} rotation={[0.08, 0, -0.1]}>
      <Silinder atas={0.05} bawah={0.07} tinggi={1.4} segmen={5} warna={PAL.woodD} position={[0, 0.7, 0]} />
      <Silinder atas={0.045} bawah={0.05} tinggi={1.3} segmen={5} warna={PAL.woodD} position={[0.05, 2.0, 0]} rotation={[0, 0, -0.08]} />
      <Silinder atas={0.04} bawah={0.045} tinggi={1.0} segmen={5} warna={PAL.woodD} position={[0.03, 3.1, 0]} rotation={[0, 0, 0.1]} />
      {KRISTAL.map(([x, y, z, r, sy]) => (
        <mesh key={x} position={[x, y, z]} scale={[1, sy, 1]}>
          <octahedronGeometry args={[r, 0]} />
          <meshBasicMaterial color={WARNA_DEKORASI.kristal} />
        </mesh>
      ))}
    </group>
  );
}
