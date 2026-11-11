import type { Skill } from "./types";

export const skill: Skill = {
  id: "skill",
  judul: "Skills",
  grup: [
    { nama: "Languages", item: ["TypeScript", "JavaScript", "Python", "SQL"] },
    {
      nama: "Backend",
      item: ["Node.js", "Fastify", "Hono", "Hapi", "REST APIs", "Prisma", "Drizzle"],
    },
    { nama: "Frontend", item: ["React", "Next.js", "Svelte", "Tailwind CSS"] },
    { nama: "Databases", item: ["PostgreSQL", "MySQL", "SQLite"] },
    {
      nama: "Tools & infrastructure",
      item: ["Docker", "Git", "GitHub Actions", "Vitest", "Postman", "Linux (Debian)", "AWS (EC2, S3)"],
    },
    { nama: "Networking", item: ["MikroTik", "LAN/WAN"] },
  ],
  penerbitSertifikasi: "Dicoding",
  // Nama kursus tetap bahasa Indonesia (nama resmi), dengan ringkasan bahasa Inggris.
  sertifikasi: [
    {
      nama: "Belajar Back-End Pemula dengan JavaScript",
      ringkas: "Back-end fundamentals with JavaScript",
      bulan: "Jun 2025",
    },
    {
      nama: "Belajar Dasar Pemrograman JavaScript",
      ringkas: "JavaScript programming fundamentals",
      bulan: "Jun 2025",
    },
    {
      nama: "Belajar Membuat Front-End Web untuk Pemula",
      ringkas: "Front-end web fundamentals",
      bulan: "Dec 2024",
    },
    {
      nama: "Spec-Driven Development dengan Kiro",
      ringkas: "Spec-driven development with Kiro",
      bulan: "Jun 2026",
    },
    {
      nama: "Belajar Dasar Cloud dan Gen AI di AWS",
      ringkas: "Cloud and generative AI fundamentals on AWS",
      bulan: "Jun 2026",
    },
  ],
  sertifikasiLain: [
    "Memulai Pemrograman dengan Python",
    "Belajar Dasar AI",
    "Prompt Engineering untuk Software Developer",
    "Belajar Penggunaan Generative AI",
    "AI Praktis untuk Produktivitas",
  ],
};
