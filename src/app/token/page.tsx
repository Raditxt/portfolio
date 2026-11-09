import type { Metadata } from "next";
import s from "./token.module.css";

export const metadata: Metadata = {
  title: "Token · Raditxt",
};

const palet = ["obsidian", "ash", "stone", "olive", "silver", "gold", "violet", "crimson"];

const turunan = [
  "gold-ink",
  "violet-deep",
  "violet-pale",
  "crimson-deep",
  "crimson-pale",
  "ash-2",
  "ash-3",
  "ash-4",
  "silver-dim",
  "stone-light",
  "ash-line",
  "black",
];

// [role latar, role teks di atasnya]
const role: [string, string][] = [
  ["primary", "on-primary"],
  ["secondary-container", "on-secondary-container"],
  ["tertiary-container", "on-tertiary-container"],
  ["error-container", "on-error-container"],
  ["surface", "on-surface"],
  ["surface-container-low", "on-surface"],
  ["surface-container", "on-surface"],
  ["surface-container-high", "on-surface"],
  ["surface-container-highest", "on-surface"],
  ["surface", "on-surface-variant"],
  ["outline", "on-surface"],
  ["outline-variant", "on-surface"],
  ["scrim", "on-surface"],
];

const typeScale = [
  "headline-small",
  "title-medium",
  "title-small",
  "body-large",
  "body-medium",
  "label-large",
  "label-medium",
];

const shape = ["xs", "sm", "md", "lg", "xl", "full"];

export default function Token() {
  return (
    <main className={s.halaman}>
      <h1 className="headline-small">Token</h1>

      <section className={s.bagian}>
        <h2 className="title-medium">Palet</h2>
        <div className={s.kisi}>
          {palet.map((n) => (
            <div key={n} className={s.swatch} style={{ background: `var(--${n})` }}>
              <span className={s.kode} style={{ color: n === "silver" || n === "gold" ? "var(--obsidian)" : "var(--silver)" }}>
                --{n}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className={s.bagian}>
        <h2 className="title-medium">Turunan</h2>
        <div className={s.kisi}>
          {turunan.map((n) => (
            <div key={n} className={s.swatch} style={{ background: `var(--${n})` }}>
              <span className={s.kode} style={{ color: n.endsWith("-pale") || n === "silver-dim" ? "var(--obsidian)" : "var(--silver)" }}>
                --{n}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className={s.bagian}>
        <h2 className="title-medium">Color role</h2>
        <div className={s.kisi}>
          {role.map(([latar, teks]) => (
            <div
              key={`${latar}/${teks}`}
              className={s.swatch}
              style={{ background: `var(--md-${latar})`, color: `var(--md-${teks})` }}
            >
              <span className="label-medium">{latar}</span>
              <span className={s.kode}>{teks}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={s.bagian}>
        <h2 className="title-medium">Type scale</h2>
        {typeScale.map((n) => (
          <p key={n} className={n}>
            {n} · Benteng Senja
          </p>
        ))}
        <p className={s.kode}>Roboto Mono 500 · 18.30 WITA</p>
      </section>

      <section className={s.bagian}>
        <h2 className="title-medium">Shape</h2>
        <div className={s.kisi}>
          {shape.map((n) => (
            <div key={n} className={s.bentuk} style={{ borderRadius: `var(--shape-${n})` }}>
              <span className={s.kode}>--shape-{n}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={s.bagian}>
        <h2 className="title-medium">State layer</h2>
        <button type="button" className={`${s.sl} sl label-large`}>
          .sl
        </button>
      </section>
    </main>
  );
}
