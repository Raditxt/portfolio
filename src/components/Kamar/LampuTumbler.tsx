// Dekorasi lampu tumbler (string lights): 15 bohlam di dinding belakang, 12 di dinding kiri.
// Pose diam Sore: prototipe mencampur warna mati→nyala sebesar min(1, fairy/1.4)·(0.85 + 0.15·sin),
// dengan fairy Sore 0.7 dan sin = 0, jadi 0.425 untuk semua bohlam.
import { useMemo } from "react";
import { Color } from "three";
import type { V3 } from "@/kamar/kamera";
import { WARNA_DEKORASI } from "@/kamar/palet";
import { LampuTitik } from "./bentuk";

const FAIRY_SORE = 0.7;
const CAMPUR_SORE = Math.min(1, FAIRY_SORE / 1.4) * 0.85;

/** Tiga fairyLights prototipe, intensitas fairy·0.55. Jarak di-tune 7 → 10 (ADR 0004, addendum 05b). */
const CAHAYA: V3[] = [
  [-2.4, 4.5, -4.3],
  [2.4, 4.5, -4.3],
  [-4.3, 4.5, 1.5],
];

function letakBohlam(): V3[] {
  const hasil: V3[] = [];
  for (let i = 0; i < 15; i++) {
    const t = i / 14;
    hasil.push([-4.6 + t * 9.2, 4.86 - Math.sin(t * Math.PI * 3) ** 2 * 0.25, -4.86]);
  }
  for (let i = 0; i < 12; i++) {
    const t = i / 11;
    hasil.push([-4.86, 4.86 - Math.sin(t * Math.PI * 2.5) ** 2 * 0.25, -4.6 + t * 8.6]);
  }
  return hasil;
}

export function LampuTumbler() {
  const bohlam = useMemo(() => letakBohlam(), []);
  const warna = useMemo(
    () => new Color(WARNA_DEKORASI.bohlamMati).lerp(new Color(WARNA_DEKORASI.bohlamNyala), CAMPUR_SORE),
    [],
  );
  return (
    <group>
      {bohlam.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.06, 6, 6]} />
          <meshBasicMaterial color={warna} />
        </mesh>
      ))}
      {CAHAYA.map((p) => (
        <LampuTitik key={p.join()} warna={WARNA_DEKORASI.bohlamNyala} intensitas={FAIRY_SORE * 0.55} jarak={10} position={p} />
      ))}
    </group>
  );
}
