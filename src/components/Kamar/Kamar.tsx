"use client";

// Kamar statis (issue 05a/05b): shell, lima Benda, Dekorasi, kamera isometrik, cahaya Fase Sore.
// Angka dari docs/prototype/kamar-raditya.html; pipeline warna dan cahaya: ADR 0004.
// Deep import: barrel drei tidak ter-tree-shake dan menyeret stats.js ke bundle production.
import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { useLayoutEffect, useRef, useState } from "react";
import { ACESFilmicToneMapping, type OrthographicCamera } from "three";
import { intensitasR128 } from "@/kamar/cahaya";
import { frustumIso, HOME, OFFSET_KAMERA } from "@/kamar/kamera";
import { PAL } from "@/kamar/palet";
import { HP } from "./HP";
import { Jendela } from "./Jendela";
import { Jubah } from "./Jubah";
import { Kasur } from "./Kasur";
import { Kursi } from "./Kursi";
import { LampuDinding } from "./LampuDinding";
import { LampuTumbler } from "./LampuTumbler";
import { Laptop } from "./Laptop";
import { LingkaranSihir } from "./LingkaranSihir";
import { Meja } from "./Meja";
import { Panji } from "./Panji";
import { PetaEkspedisi } from "./PetaEkspedisi";
import { PotHerba } from "./PotHerba";
import { RakGrimoire } from "./RakGrimoire";
import { RakPedang } from "./RakPedang";
import { Shell } from "./Shell";
import { TongkatKristal } from "./TongkatKristal";
import { TongPeti } from "./TongPeti";

/**
 * Pengukur FPS (issue 05b), hanya di preview Vercel. Di build lain kondisinya
 * konstan false, jadi import Stats terbuang dan tidak masuk bundle production.
 */
const StatsPreview =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? dynamic(() => import("@react-three/drei/core/Stats").then((m) => m.Stats), { ssr: false })
    : null;

/** `PHASE_ENV.sore` setelah override baris 891 prototipe. */
const SORE = {
  sun: "#FFC58A",
  sunI: 1.0,
  sunPos: [-4, 9, -12] as const,
  langit: "#D8C8FF",
  tanah: "#2A2018",
  hemi: 0.55,
  exposure: 1.05,
};

function KameraIso() {
  const get = useThree((s) => s.get);
  const { width, height } = useThree((s) => s.size);
  useLayoutEffect(() => {
    const camera = get().camera as OrthographicCamera;
    Object.assign(camera, frustumIso(width, height));
    camera.updateProjectionMatrix();
  }, [get, width, height]);
  return null;
}

/** Menandai Canvas siap setelah dua frame tergambar (sinyal untuk e2e, bukan timeout). */
function TandaSiap({ siap }: { siap: () => void }) {
  const frame = useRef(0);
  useFrame(() => {
    frame.current += 1;
    if (frame.current === 2) siap();
  });
  return null;
}

export default function Kamar() {
  const [siap, setSiap] = useState(false);
  return (
    <div
      aria-label="Kamar 3D Raditya di benteng saat senja. Seret untuk memutar."
      data-kamar-siap={siap ? "" : undefined}
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100dvh", touchAction: "none", background: PAL.obsidian }}
    >
      <Canvas
        legacy
        orthographic
        shadows="percentage"
        dpr={[1, 2]}
        camera={{
          position: [HOME[0] + OFFSET_KAMERA[0], HOME[1] + OFFSET_KAMERA[1], HOME[2] + OFFSET_KAMERA[2]],
          near: 0.1,
          far: 100,
          manual: true,
        }}
        gl={{ antialias: true, alpha: true, toneMapping: ACESFilmicToneMapping, toneMappingExposure: SORE.exposure }}
      >
        <KameraIso />
        <OrbitControls
          makeDefault
          target={HOME}
          enableDamping
          dampingFactor={0.08}
          enablePan={false}
          minAzimuthAngle={0.08}
          maxAzimuthAngle={Math.PI / 2 - 0.08}
          minPolarAngle={0.55}
          maxPolarAngle={1.25}
          minZoom={0.75}
          maxZoom={2.6}
          rotateSpeed={0.6}
        />
        <hemisphereLight args={[SORE.langit, SORE.tanah, intensitasR128(SORE.hemi)]} />
        <directionalLight
          color={SORE.sun}
          intensity={intensitasR128(SORE.sunI)}
          position={SORE.sunPos}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-9}
          shadow-camera-right={9}
          shadow-camera-top={9}
          shadow-camera-bottom={-9}
          shadow-camera-near={1}
          shadow-camera-far={40}
          shadow-bias={-0.0008}
        />
        <directionalLight color="#b9a7ff" intensity={intensitasR128(0.4)} position={[10, 8, 8]} />
        <Shell />
        <Jendela />
        <PetaEkspedisi />
        <Meja />
        <Kursi />
        <Laptop />
        <HP />
        <RakGrimoire />
        <Panji />
        <RakPedang />
        <Jubah />
        <TongkatKristal />
        <TongPeti />
        <PotHerba />
        <LingkaranSihir />
        <LampuDinding />
        <LampuTumbler />
        <Kasur />
        <TandaSiap siap={() => setSiap(true)} />
      </Canvas>
      {StatsPreview && <StatsPreview />}
    </div>
  );
}
