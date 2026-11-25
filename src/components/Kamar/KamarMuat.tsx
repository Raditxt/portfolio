"use client";

import dynamic from "next/dynamic";

// WebGL hanya ada di browser, jadi Kamar tidak dirender di server.
export const KamarMuat = dynamic(() => import("./Kamar"), { ssr: false });
