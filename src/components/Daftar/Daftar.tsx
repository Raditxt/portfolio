import s from "./Daftar.module.css";

// sementara, diganti di L2
const sections = [
  { id: "tentang", judul: "Tentang", isi: "Isi Tentang menyusul." },
  { id: "pengalaman", judul: "Pengalaman", isi: "Isi Pengalaman menyusul." },
  { id: "project", judul: "Project", isi: "Isi Project menyusul." },
  { id: "skill", judul: "Skill", isi: "Isi Skill menyusul." },
  { id: "kontak", judul: "Kontak", isi: "Isi Kontak menyusul." },
];

export function Daftar() {
  return (
    <main id="daftar" className={s.daftar}>
      <div className={s.isi}>
        <div>
          <h1 className="headline-small">Raditya Mulya Akbar</h1>
          <p className="body-medium muted">Software engineer · Makassar, Sulawesi Selatan</p>
        </div>
        <p className={s.catatan}>
          Browser ini tidak bisa menampilkan kamar 3D, jadi isinya ditampilkan sebagai daftar.
        </p>
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className={`label-large ${s.judul}`}>{section.judul}</h2>
            <p className="body-medium">{section.isi}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
