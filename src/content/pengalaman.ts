import type { Pengalaman } from "./types";

// Freelance belum masuk: belum ada order dibayar (per 10 Nov 2026).
export const pengalaman: Pengalaman = {
  id: "pengalaman",
  judul: "Experience",
  daftar: [
    {
      peran: "AI Engineer Cohort",
      organisasi: "Asah led by Dicoding",
      periode: "Aug 2026 – present",
      lokasi: "Remote",
      deskripsi:
        "Intensive program covering machine learning, deep learning, and AI application development.",
    },
    {
      peran: "Junior Web Developer (Intern)",
      organisasi: "Metrotech Digital Asia",
      periode: "Mar – Jun 2022",
      lokasi: "Makassar",
      deskripsi:
        "Built responsive pages and components for the company blog with React and Tailwind CSS.",
    },
  ],
};
