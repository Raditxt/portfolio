import type { Kontak } from "./types";

// Tanpa nomor HP dan alamat (issue 03).
export const kontak: Kontak = {
  id: "kontak",
  judul: "Contact",
  ringkasan: "Open to software engineering internships. Email is the fastest way to reach me.",
  email: "radityama8@gmail.com",
  tautan: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/raditya-mulya-akbar" },
    { label: "GitHub", href: "https://github.com/Raditxt" },
  ],
  // Platform tanpa href tidak dirender. Fiverr ditambah setelah gig pertama terbit.
  freelance: [
    { nama: "Fastwork" },
    { nama: "Freelancer", href: "https://www.freelancer.co.id/u/raditxt" },
  ],
};
