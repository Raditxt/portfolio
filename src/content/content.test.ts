import { describe, expect, it } from "vitest";
import { profil, sections, type Section } from "./index";

function jumlahIsi(s: Section): number {
  switch (s.id) {
    case "tentang":
      return s.pendidikan.length + (s.ringkasan ? 1 : 0);
    case "pengalaman":
    case "project":
      return s.daftar.length;
    case "skill":
      return s.grup.length;
    case "kontak":
      return s.tautan.length + (s.email ? 1 : 0);
  }
}

const semuaTeks = JSON.stringify({ profil, sections });

describe("sections", () => {
  it.each(sections)("Section $id punya judul dan minimal satu isi", (s) => {
    expect(s.judul.trim()).not.toBe("");
    expect(jumlahIsi(s)).toBeGreaterThan(0);
  });

  it("tidak ada penanda [NEEDED] yang terbawa", () => {
    expect(semuaTeks).not.toContain("NEEDED");
  });

  it("tidak ada nomor HP Indonesia", () => {
    expect(semuaTeks).not.toMatch(/(\+62|\b08)[\d\s-]{8,}/);
  });

  it("lima Section berurutan Tentang, Pengalaman, Project, Skill, Kontak", () => {
    expect(sections.map((s) => s.id)).toEqual([
      "tentang",
      "pengalaman",
      "project",
      "skill",
      "kontak",
    ]);
  });
});
