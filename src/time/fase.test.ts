import { describe, expect, it } from "vitest";
import { phaseOf } from "./fase";

describe("phaseOf", () => {
  it("05.00 adalah Pagi", () => {
    expect(phaseOf(5, 0)).toBe("pagi");
  });

  it("04.59 masih Tengah malam", () => {
    expect(phaseOf(4, 59)).toBe("tengah-malam");
  });

  it("09.59 masih Pagi, 10.00 Siang", () => {
    expect(phaseOf(9, 59)).toBe("pagi");
    expect(phaseOf(10, 0)).toBe("siang");
  });

  it("14.59 masih Siang, 15.00 Sore", () => {
    expect(phaseOf(14, 59)).toBe("siang");
    expect(phaseOf(15, 0)).toBe("sore");
  });

  it("18.29 masih Sore, 18.30 Malam", () => {
    expect(phaseOf(18, 29)).toBe("sore");
    expect(phaseOf(18, 30)).toBe("malam");
  });

  it("22.59 masih Malam, 23.00 Tengah malam", () => {
    expect(phaseOf(22, 59)).toBe("malam");
    expect(phaseOf(23, 0)).toBe("tengah-malam");
  });

  it("00.00 dan 23.59 adalah Tengah malam", () => {
    expect(phaseOf(0, 0)).toBe("tengah-malam");
    expect(phaseOf(23, 59)).toBe("tengah-malam");
  });
});
