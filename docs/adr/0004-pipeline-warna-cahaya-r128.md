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
