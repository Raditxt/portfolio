import { describe, expect, it } from "vitest";
import { jamWita } from "./jamWita";

describe("jamWita", () => {
  it("menambah 8 jam ke UTC", () => {
    expect(jamWita(new Date("2026-11-11T05:30:00Z"))).toEqual({ jam: 13, menit: 30 });
  });

  it("melewati tengah malam UTC ke hari berikutnya", () => {
    expect(jamWita(new Date("2026-11-11T17:45:00Z"))).toEqual({ jam: 1, menit: 45 });
  });

  it("tidak terpengaruh zona waktu pengunjung", () => {
    const date = new Date("2026-11-11T05:30:00-05:00");
    expect(jamWita(date)).toEqual({ jam: 18, menit: 30 });
  });
});
