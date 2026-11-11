// WITA = UTC+8 tanpa DST, jadi cukup aritmetika UTC.
// Sengaja tidak memakai Intl atau jam lokal: Fase selalu jam Makassar (ADR 0003).
export function jamWita(date: Date): { jam: number; menit: number } {
  return { jam: (date.getUTCHours() + 8) % 24, menit: date.getUTCMinutes() };
}
