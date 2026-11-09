import type { Metadata } from "next";
import { Roboto_Flex, Roboto_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "@/styles/tokens.css";
import "@/styles/base.css";

const robotoFlex = Roboto_Flex({ subsets: ["latin"], axes: ["opsz"], variable: "--font-roboto-flex" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: "500", variable: "--font-roboto-mono" });

export const metadata: Metadata = {
  title: "Raditxt",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={`${robotoFlex.variable} ${robotoMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
