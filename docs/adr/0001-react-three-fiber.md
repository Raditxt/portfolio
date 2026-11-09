# 0001 · React Three Fiber, bukan Three.js langsung

Status: diterima · 2026-11-06

## Konteks
Prototipe ditulis dengan Three.js imperatif dalam satu file. Versi produksi memakai Next.js dan React.

## Keputusan
Kamar dibangun dengan React Three Fiber + drei. Setiap Benda jadi komponen.

## Alasan
State UI (Sheet, Fase, Pratinjau) sudah ada di React, jadi adegan 3D bisa membaca state yang sama tanpa jembatan manual. Komponen per Benda memudahkan slice kecil dan review.

## Konsekuensi
Angka dari prototipe harus dipindahkan ke props atau konstanta. Animasi per frame memakai `useFrame`, bukan loop sendiri.
