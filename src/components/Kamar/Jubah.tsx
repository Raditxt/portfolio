// Dekorasi jubah bertudung ungu di gantungan emas, pojok dinding belakang.
import { DoubleSide } from "three";
import { PAL } from "@/kamar/palet";
import { Silinder } from "./bentuk";

function KainJubah() {
  return <meshStandardMaterial color={PAL.violetD} flatShading roughness={0.85} metalness={0} side={DoubleSide} />;
}

export function Jubah() {
  return (
    <group>
      <mesh position={[-4.1, 2.35, -4.92]} rotation={[0, -Math.PI / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.28, 0.62, 2.3, 7, 1, true, 0, Math.PI]} />
        <KainJubah />
      </mesh>
      <mesh position={[-4.1, 3.45, -4.92]} rotation={[0, -Math.PI / 2, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.33, 7, 5, 0, Math.PI, 0, Math.PI / 2]} />
        <KainJubah />
      </mesh>
      <Silinder atas={0.05} bawah={0.05} tinggi={0.25} warna={PAL.gold} position={[-4.1, 3.7, -4.9]} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  );
}
