# Spesifikasi · Portfolio Raditxt

_Disalin dari catatan progress 5 Nov 2026. Angka detail ada di `docs/prototype/kamar-raditya.html`._

## Status
Desain disetujui. Lanjut ke tahap develop. Sumber acuan utama: prototipe web (`docs/prototype/kamar-raditya.html`, juga artifact "Kamar Raditya", https://claude.ai/artifact/1ds1xKQRcc3ENv2sLiYjy6).

## Keputusan desain
- Konsep: satu kamar 3D isometrik "Benteng Senja", tanpa navbar, eksplorasi ala Bruno Simon (klik benda untuk membuka bagian).
- Benda → bagian: Jendela → Tentang, Peta ekspedisi → Pengalaman, Laptop → Project, Rak grimoire → Skill, HP → Kontak.
- Dekorasi original (bukan aset/karakter anime): panji & perisai berlambang R, rak pedang, tongkat kristal, jubah bertudung ungu, jam pasir, lentera, tong kayu, lingkaran sihir emas, grimoire melayang, lampu dinding, lampu tumbler, kasur dengan sandaran kepala.
- Animasi: kamera menyapu masuk, benda jatuh dan memantul, hover mengangkat benda, klik membuat benda melompat, signature menulis sendiri.
- Siklus waktu ikut jam WITA: pagi 05–10, siang 10–15, sore 15–18.30, malam 18.30–23, tengah malam 23–05. Jam di HUD bisa diklik untuk pratinjau fase.
- Transisi antar fase (sekitar 3 detik): matahari/bulan bergerak di jendela (matahari tenggelam di balik bukit, bulan terbit), langit crossfade, berkas cahaya jendela berputar halus, warna cahaya bergeser, toast M3 "Waktu berganti · A → B".
- Cahaya: pagi/siang/sore = berkas cahaya matahari masuk lewat jendela (warna & arah beda per fase). Malam/tengah malam = kamar tetap terang dari lampu dinding, lampu tumbler, lentera, lingkaran sihir, dan kristal.
- Karakter: Raditya versi low-poly (hoodie ungu, rambut hitam). Saat halaman dibuka dipanggil dari lingkaran sihir (di lantai kosong), lalu berjalan ke spot aktivitas. Saat fase berganti dia bangun/berdiri dari posisi sebelumnya lalu berjalan ke aktivitas berikutnya.
  - Pagi: ngopi di depan jendela
  - Siang: duduk ngoding di laptop
  - Sore: baca grimoire di depan rak
  - Malam: makan malam sambil ngoding di laptop (mangkuk di meja, sendok ke mulut)
  - Tengah malam: naik kasur dengan halus (berbalik, duduk di tepi, mengayun kaki sambil rebahan), tidur dengan "zzz"; urutan dibalik saat bangun. Selimut statis terlipat di ujung kasur, tanpa animasi.
  - Gelembung status kecil di atas kepala menampilkan aktivitasnya.
- Signature: opsi B "Bulat". Logo: R "Goresan" di kotak emas.
- Design system: Material 3 (type scale Roboto Flex + Roboto Mono, shape, state layer, side sheet di desktop, bottom sheet di HP, snackbar untuk toast).
- Palet datar, tanpa gradasi: obsidian #15131A, ash #1E1B23, stone #3B3733, olive #4F5D3A, silver #E8E4DA, gold #C9A24A (primary), violet #7B5EA7, crimson #A3312F.
- Fallback daftar otomatis kalau WebGL tidak ada (#daftar untuk melihatnya).

## Isi (dari CV)
- Tentang: ringkasan CV, PNUP (Sarjana Terapan Teknik Komputer dan Jaringan, Sep 2023 – Jul 2027, IPK 3,64), SMK Telkom Makassar (2020–2023).
- Pengalaman: Asah by Dicoding AI Engineer Cohort (Agu 2026–), Freelance, Metrotech Digital Asia Junior Web Developer (Mar–Jun 2022).
- Skill: TypeScript, JavaScript, React, Next.js, Node.js, Hapi, REST API, MySQL, PostgreSQL, AWS EC2/S3, Postman, Kiro, Debian/Linux, MikroTik, LAN/WAN + 5 sertifikasi Dicoding.
- Kontak: radityamulyaakbar2@gmail.com, linkedin.com/in/raditya-mulya-akbar, github.com/Raditxt (nomor HP & alamat sengaja tidak ditampilkan).

## Belum ada
- Link repo dan nama asli project (sementara 2 proyek akhir kelas Dicoding).
- Rincian tugas di Metrotech.

## Stack
Next.js + TypeScript, React Three Fiber untuk kamar 3D, token M3 sebagai CSS variables, deploy ke Vercel, repo `Raditxt/portfolio`.
