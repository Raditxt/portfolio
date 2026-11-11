import Image from "next/image";
import s from "./Daftar.module.css";

const KATA_SAMBUNG = new Set(["led", "by", "of", "and", "the"]);

/** "Politeknik Negeri Ujung Pandang" → "PN"; "Asah led by Dicoding" → "AD". */
export function inisial(nama: string): string {
  return nama
    .split(/\s+/)
    .filter((k) => k !== "" && !KATA_SAMBUNG.has(k.toLowerCase()))
    .slice(0, 2)
    .map((k) => k[0]!.toUpperCase())
    .join("");
}

// Dekoratif: nama institusi selalu tertulis di sebelahnya, jadi alt kosong
// dan inisial disembunyikan dari pembaca layar.
export function LogoInstitusi({
  nama,
  logo,
  bentuk,
}: {
  nama: string;
  logo?: string;
  bentuk: "bulat" | "kotak";
}) {
  return (
    <span className={`${s.logo} ${bentuk === "bulat" ? s.logoBulat : s.logoKotak}`} aria-hidden="true">
      {logo ? <Image src={logo} alt="" width={28} height={28} /> : inisial(nama)}
    </span>
  );
}
