export type Fase = "pagi" | "siang" | "sore" | "malam" | "tengah-malam";

export function phaseOf(jam: number, menit: number): Fase {
  const m = jam * 60 + menit;
  if (m < 5 * 60) return "tengah-malam";
  if (m < 10 * 60) return "pagi";
  if (m < 15 * 60) return "siang";
  if (m < 18 * 60 + 30) return "sore";
  if (m < 23 * 60) return "malam";
  return "tengah-malam";
}
