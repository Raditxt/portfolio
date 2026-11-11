import { profil, sections, type Section } from "@/content";
import { Ikon } from "./Ikon";
import { TombolSalin } from "./TombolSalin";
import s from "./Daftar.module.css";

const LABEL_STATUS = { "in-use": "In daily use", "in-development": "In development" } as const;

function tahun(periode: string) {
  return periode.match(/\d{4}/g) ?? [];
}

function Chips({ item, mono }: { item: string[]; mono?: boolean }) {
  return (
    <div className={s.chips}>
      {item.map((x) => (
        <span key={x} className={mono ? `${s.chip} ${s.mono}` : s.chip}>
          {x}
        </span>
      ))}
    </div>
  );
}

function IsiSection({ section }: { section: Section }) {
  switch (section.id) {
    case "tentang":
      return (
        <>
          <p className="body-large muted">{section.ringkasan}</p>
          <div className={s.list}>
            {section.pendidikan.map((p) => (
              <div key={p.sekolah} className={s.li}>
                <span className={`${s.lead} ${s.leadText}`}>
                  {tahun(p.periode).map((t, i) => (
                    <span key={i}>{t}</span>
                  ))}
                </span>
                <div className={s.txt}>
                  <span className="title-small">{p.sekolah}</span>
                  <span className="body-medium muted">
                    {[p.jurusan, p.periode, p.catatan].filter(Boolean).join(" · ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    case "pengalaman":
      return (
        <div className={s.stack}>
          {section.daftar.map((p) => (
            <div key={p.peran} className={s.card}>
              <span className="label-medium muted">
                {p.periode} · {p.lokasi}
              </span>
              <h3 className="title-medium">{p.peran}</h3>
              <p className="label-large">{p.organisasi}</p>
              <p className="body-medium muted">{p.deskripsi}</p>
            </div>
          ))}
        </div>
      );
    case "project":
      return (
        <div className={s.stack}>
          {section.daftar.map((p) => (
            <div key={p.nama} className={s.card}>
              <div className={s.cardTop}>
                <h3 className="title-medium">{p.nama}</h3>
                <span className={p.status === "in-use" ? s.badge : `${s.badge} ${s.done}`}>
                  {LABEL_STATUS[p.status]}
                </span>
              </div>
              <p className="body-medium muted">{p.deskripsi}</p>
              <Chips item={p.stack} mono />
              <div className={s.cardActions}>
                {[p.repo, p.demo].filter((t) => t !== undefined).map((t) => (
                  <a key={t.href} className={`${s.btn} ${s.text} sl`} href={t.href} target="_blank" rel="noopener">
                    <Ikon nama="open" />
                    {t.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    case "skill":
      return (
        <>
          {section.grup.map((g) => (
            <div key={g.nama} className={s.group}>
              <h3 className="title-small muted">{g.nama}</h3>
              <Chips item={g.item} />
            </div>
          ))}
          <div className={s.group}>
            <h3 className="title-small muted">Certifications · {section.penerbitSertifikasi}</h3>
            <div>
              {section.sertifikasi.map((c) => (
                <div key={c.nama} className={s.cert}>
                  <span className="title-small">{c.nama}</span>
                  <span className={s.bulan}>{c.bulan}</span>
                  <p className="body-medium muted">{c.ringkas}</p>
                </div>
              ))}
            </div>
            <p className="body-medium muted">Also: {section.sertifikasiLain.join(", ")}.</p>
          </div>
        </>
      );
    case "kontak": {
      const freelance = section.freelance.filter((f) => f.href !== undefined);
      return (
        <>
          <p className="body-large muted">{section.ringkasan}</p>
          <div className={s.list}>
            <div className={s.li}>
              <div className={s.txt}>
                <span className="label-medium muted">Email</span>
                <code>{section.email}</code>
              </div>
              <TombolSalin teks={section.email} label="email" />
            </div>
            {section.tautan.map((t) => (
              <div key={t.href} className={s.li}>
                <div className={s.txt}>
                  <span className="label-medium muted">{t.label}</span>
                  <code>{t.href.replace(/^https:\/\/(www\.)?/, "")}</code>
                </div>
                <a className={`${s.iconBtn} sl`} href={t.href} target="_blank" rel="noopener" aria-label={`Open ${t.label}`}>
                  <Ikon nama="open" />
                </a>
              </div>
            ))}
          </div>
          {freelance.length > 0 && (
            <div className={s.group}>
              <h3 className="title-small muted">Also available for freelance work</h3>
              <div className={s.cardActions}>
                {freelance.map((f) => (
                  <a key={f.nama} className={`${s.btn} ${s.text} sl`} href={f.href} target="_blank" rel="noopener">
                    <Ikon nama="open" />
                    {f.nama}
                  </a>
                ))}
              </div>
            </div>
          )}
        </>
      );
    }
  }
}

export function Daftar() {
  return (
    <main id="daftar" className={s.daftar}>
      <div className={s.isi}>
        <div className={s.cardTop}>
          <div>
            <h1 className="headline-small">{profil.nama}</h1>
            <p className="body-medium muted">{profil.subjudul}</p>
          </div>
          <a className={`${s.btn} ${s.tonal} sl`} href={profil.cv.href} target="_blank" rel="noopener">
            {profil.cv.label}
          </a>
        </div>
        <p className={s.catatan}>{profil.catatanDaftar}</p>
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className={`label-large ${s.judul}`}>{section.judul}</h2>
            <IsiSection section={section} />
          </section>
        ))}
      </div>
    </main>
  );
}
