import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { sections } from "@/content";
import { inisial } from "./LogoInstitusi";

const logo = sections.flatMap((s) => {
  if (s.id === "tentang") return s.pendidikan.map((p) => p.logo);
  if (s.id === "pengalaman") return s.daftar.map((p) => p.logo);
  return [];
});

describe("inisial", () => {
  it.each([
    ["Politeknik Negeri Ujung Pandang", "PN"],
    ["SMK Telkom Makassar", "ST"],
    ["Asah led by Dicoding", "AD"],
    ["Metrotech Digital Asia", "MD"],
    ["Solo", "S"],
  ])("%s → %s", (nama, hasil) => {
    expect(inisial(nama)).toBe(hasil);
  });
});

describe("logo institusi", () => {
  it.each(logo.filter((l) => l !== undefined))("%s ada di public/", (l) => {
    expect(l).toMatch(/^\/logo\/[a-z0-9-]+\.(png|svg)$/);
    expect(existsSync(join(process.cwd(), "public", l))).toBe(true);
  });
});
