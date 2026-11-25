import type { Metadata } from "next";
import { KamarMuat } from "@/components/Kamar/KamarMuat";

// Route sementara sampai issue 10 menukar `/` ke Kamar. Tidak ditautkan dari mana pun.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function HalamanKamar() {
  return <KamarMuat />;
}
