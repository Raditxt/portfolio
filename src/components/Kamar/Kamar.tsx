"use client";

// Kamar statis (issue 05a): shell, lima Benda, kamera isometrik, cahaya Fase Sore.
// Angka dari docs/prototype/kamar-raditya.html; pipeline warna dan cahaya: ADR 0004.
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useRef, useState } from "react";
import { ACESFilmicToneMapping, type OrthographicCamera } from "three";
import { intensitasR128 } from "@/kamar/cahaya";
import { frustumIso, HOME, OFFSET_KAMERA } from "@/kamar/kamera";
import { PAL } from "@/kamar/palet";
import { HP } from "./HP";
import { Jendela } from "./Jendela";
import { Laptop } from "./Laptop";
import { PetaEkspedisi } from "./PetaEkspedisi";
import { RakGrimoire } from "./RakGrimoire";
import { Shell } from "./Shell";

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
        <Laptop />
        <HP />
        <RakGrimoire />
        <TandaSiap siap={() => setSiap(true)} />
      </Canvas>
    </div>
  );
}
