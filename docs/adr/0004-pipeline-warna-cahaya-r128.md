# 0004 · Pipeline warna dan cahaya Kamar meniru three r128

Status: diterima · 2026-11-25

## Konteks
Prototipe (sumber angka) memakai three r128: warna hex masuk tanpa konversi, cahaya legacy, ACES dengan exposure per Fase, output sRGB. Kamar produksi memakai three 0.187. Di versi ini warna dikelola (hex sRGB dikonversi ke linear), cahaya fisik (tanpa faktor π, point light inverse-square), dan `PCFSoftShadowMap` sudah dihapus. Kalau angka prototipe disalin apa adanya, hasilnya jauh lebih gelap dan warnanya bergeser (spike G1).

## Keputusan
- `<Canvas legacy>`. R3F menulis ulang `ColorManagement.enabled = !legacy` di setiap konfigurasi, jadi mematikan ColorManagement secara manual akan tertimpa. Hex masuk mentah seperti di r128.
- Tone mapping ACES dan `toneMappingExposure` dari Fase lewat `gl`. Output tetap sRGB. Tekstur kanvas memakai `colorSpace = SRGBColorSpace`, padanan `sRGBEncoding` di r128.
- Intensitas semua cahaya dikali π (`intensitasR128`).
- Point light memakai `decay = 0` dan `distance = 0.459·d` (`jarakR128`). Ini fit kuadrat terkecil antara falloff legacy `(1 − r/d)²` dan falloff 0.187 `(1 − (r/d′)⁴)²`.
- Shadow memakai `PCFShadowMap` (`shadows="percentage"`).
- Setelah konversi, angka di-tune lewat screenshot berdampingan dengan prototipe (beam jendela dimatikan). Targetnya "cukup mirip", bukan identik per piksel. Tuning per Fase jatah A3.

## Pilihan yang ditolak
- **`<Canvas flat linear>`.** Di R3F 9, `flat` mematikan tone mapping dan `linear` mematikan encode sRGB, sedangkan prototipe memakai keduanya. Hasilnya lebih gelap dan kontrasnya berbeda.
- **Warna dikelola penuh lalu semua angka di-tune ulang.** Angka di prototipe tidak bisa lagi disalin langsung, dan setiap warna perlu dikalibrasi.
- **Menambal `getDistanceAttenuation` di ShaderChunk supaya sama persis dengan r128.** Ini memodifikasi three secara global dan rawan rusak saat three di-upgrade.

## Konsekuensi
- Warna dan cahaya yang ditambahkan ke Kamar harus lewat `intensitasR128`/`jarakR128`, dan warnanya hex mentah dari prototipe.
- Kurva falloff point light hanya mendekati r128. Lampu yang tampak beda di-tune per lampu, bukan dengan mengubah faktor 0.459.

## Addendum 05b (2026-11-27): lampu Dekorasi Fase Sore

Semua point light Dekorasi memakai `LampuTitik` (`bentuk.tsx`): `intensitasR128`, `jarakR128`, `decay = 0` (`DECAY_R128`), **tanpa shadow**. Lampu grimoire (05a) masih `<pointLight>` langsung di `RakGrimoire.tsx` dengan konversi yang sama. Prototipe juga tidak memberi shadow ke point light mana pun. Shadow map tetap satu, milik sun (1024², PCF).

| Lampu | Jumlah | Warna | Intensitas r128 (prototipe → dipakai) | `d` r128 (prototipe → dipakai) | `distance` 0.187 | Shadow |
|---|---|---|---|---|---|---|
| Lentera | 1 | `#FFB46B` | 1.8 → **1.5** | 7 → **9** | 4.13 | mati |
| Lingkaran sihir | 1 | `PAL.gold` | 1.0 → **0.8** | 6 → **10** | 4.59 | mati |
| Tongkat kristal | 1 | `PAL.violet` | 0.7 | 3 → **4.5** | 2.07 | mati |
| Lampu dinding (sconce) | 2 | `#FFB46B` | 0.6 | 6 | 2.75 | mati |
| Lampu tumbler | 3 | `#FFD38A` | 0.385 (fairy 0.7 × 0.55) | 7 → **10** | 4.59 | mati |
| Grimoire (Benda, 05a) | 1 | `PAL.gold` | 0.8 | 3 | 1.38 | mati |

Total 9 point light, 0 ber-shadow. Intensitas 0.187 = nilai r128 × π. Pose diam: suku sinus kedip prototipe dianggap 0.

**Kenapa di-tune:** fit `jarakR128` membuat point light terang rata lalu putus tajam, sedangkan falloff legacy `(1 − r/d)²` menurun pelan dengan ekor panjang. Dengan angka prototipe apa adanya, permukaan dekat lampu +8..+13 lebih terang dan permukaan jauh −10..−26 lebih gelap (kanal R, 0–255) dibanding prototipe. Contohnya sandaran kursi dan sisi bawah rak sama sekali tidak terjangkau. Memperbesar `d` dan sedikit menurunkan intensitas mengembalikan ekornya. Faktor 0.459 tidak diubah. Hasil ukur: jumlah |ΔR| di 15 titik pembanding turun dari 135 ke 80 (catatan sesi F2 s3 di issue 05).

**Warna:** hex prototipe yang tidak ada di `PAL` dinamai di `WARNA_DEKORASI` (`src/kamar/palet.ts`). Komponen Benda dan Dekorasi tidak menulis hex sendiri; `PAL` tetap cermin persis `PAL` prototipe. Sisa dari 05a yang belum dipindah (disebut, di luar scope 05b): warna cahaya Fase di `Kamar.tsx` (`SORE`, fill `#b9a7ff`) dan hex di dalam `tekstur.ts`.
