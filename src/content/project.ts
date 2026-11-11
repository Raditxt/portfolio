import type { Project } from "./types";

export const project: Project = {
  id: "project",
  judul: "Projects",
  daftar: [
    {
      nama: "Waregos",
      status: "in-use",
      deskripsi:
        "The management system I built for my own grocery store and use there every day: point of sale (cash, QRIS, and store credit), restocking with moving-average cost and per-batch expiry dates, daily cash closing, and profit reports. It exists to stop the losses small shops usually don't see: expired stock, items that never sell, and cash discrepancies.",
      stack: ["Fastify", "Prisma", "PostgreSQL", "Next.js", "Turborepo", "Docker"],
      repo: { label: "github.com/Raditxt/waregos", href: "https://github.com/Raditxt/waregos" },
    },
    {
      nama: "TahuHak",
      status: "in-development",
      deskripsi:
        "A free web app that helps Indonesians find the laws that apply to everyday problems, explained in plain language. Answers are assembled from verified legal articles, never made up by AI. The ingestion pipeline for three national regulations (PDF extraction and OCR) is done and tested.",
      stack: ["TypeScript", "Node.js", "PostgreSQL", "Drizzle", "Vitest", "Next.js"],
      repo: { label: "github.com/Raditxt/TahuHak", href: "https://github.com/Raditxt/TahuHak" },
    },
    {
      nama: "Finance Tracker",
      status: "in-development",
      deskripsi:
        "A personal finance tracker inspired by The Psychology of Money. The REST API and frontend are built separately from scratch: transactions, custom categories, and a monthly savings-rate dashboard.",
      stack: ["Bun", "Hono", "SQLite", "Svelte 5", "TypeScript"],
      repo: {
        label: "github.com/Raditxt/finance-app",
        href: "https://github.com/Raditxt/finance-app",
      },
    },
  ],
};
