# A1 — Final content for the five Sections (draft, 10 Nov 2026)
> Bahan awal untuk L2. Setelah L2 selesai, `src/content` yang jadi sumber kebenaran. File ini tidak diperbarui lagi.

Sources: CV, LinkedIn (read 10 Nov), GitHub READMEs of Waregos, TahuHak, finance-app (10 Nov versions).
**Language: English only** (decided 10 Nov, for global reach). All visitor-facing text is English, including room UI (HUD, phase names, toasts, status bubbles, Daftar headings). Code and domain terms in CONTEXT.md may stay as they are.
**[NEEDED]** = data still missing; do not carry into L2 until filled in or removed.

---

## About (Window)

Computer and Network Engineering student (D4 / Bachelor of Applied Science) at Politeknik Negeri Ujung Pandang in Makassar, Indonesia. I learn by building complete systems, from the database schema up to the UI, and I write down the reasoning behind each technical decision. Currently in the AI Engineer Cohort at Asah led by Dicoding, and looking for a software engineering internship.

**Education**
- Politeknik Negeri Ujung Pandang — D4 (Bachelor of Applied Science) in Computer and Network Engineering, Department of Informatics and Computer Engineering · Sep 2023 – Jul 2027 · GPA 3.64/4.00
- SMK Telkom Makassar — Computer and Network Engineering · Jul 2020 – May 2023

---

## Experience (Expedition map)

**AI Engineer Cohort** — Asah led by Dicoding · Aug 2026 – present · Remote
Intensive program covering machine learning, deep learning, and AI application development.

**Junior Web Developer (Intern)** — Metrotech Digital Asia · Mar – Jun 2022 · Makassar
Built responsive pages and components for the company blog with React and Tailwind CSS.

(No Freelance entry: no paid orders yet as of 10 Nov 2026. Add it after the first completed order. Freelance availability is in Contact instead.)

---

## Projects (Laptop)

**Waregos** · In daily use at my store
The management system I built for my own grocery store and use there every day: point of sale (cash, QRIS, and store credit), restocking with moving-average cost and per-batch expiry dates, daily cash closing, and profit reports. It exists to stop the losses small shops usually don't see: expired stock, items that never sell, and cash discrepancies.
Fastify · Prisma · PostgreSQL · Next.js · Turborepo · Docker
github.com/Raditxt/waregos

**TahuHak** · In development
A free web app that helps Indonesians find the laws that apply to everyday problems, explained in plain language. Answers are assembled from verified legal articles, never made up by AI. The ingestion pipeline for three national regulations (PDF extraction and OCR) is done and tested.
TypeScript · Node.js · PostgreSQL · Drizzle · Vitest · Next.js
github.com/Raditxt/TahuHak

**Finance Tracker** · In development
A personal finance tracker inspired by *The Psychology of Money*. The REST API and frontend are built separately from scratch: transactions, custom categories, and a monthly savings-rate dashboard.
Bun · Hono · SQLite · Svelte 5 · TypeScript
github.com/Raditxt/finance-app

---

## Skills (Grimoire shelf)

- **Languages:** TypeScript, JavaScript, Python, SQL
- **Backend:** Node.js, Fastify, Hono, Hapi, REST APIs, Prisma, Drizzle
- **Frontend:** React, Next.js, Svelte, Tailwind CSS
- **Databases:** PostgreSQL, MySQL, SQLite
- **Tools & infrastructure:** Docker, Git, GitHub Actions, Vitest, Postman, Linux (Debian), AWS (EC2, S3)
- **Networking:** MikroTik, LAN/WAN

**Dicoding certifications (10)** — show the top 5. Course titles stay in Indonesian (official names), each with a short English gloss:
- Belajar Back-End Pemula dengan JavaScript — Back-end fundamentals with JavaScript (Jun 2025)
- Belajar Dasar Pemrograman JavaScript — JavaScript programming fundamentals (Jun 2025)
- Belajar Membuat Front-End Web untuk Pemula — Front-end web fundamentals (Dec 2024)
- Spec-Driven Development dengan Kiro — Spec-driven development with Kiro (Jun 2026)
- Belajar Dasar Cloud dan Gen AI di AWS — Cloud and generative AI fundamentals on AWS (Jun 2026)
- Others: Memulai Pemrograman dengan Python, Belajar Dasar AI, Prompt Engineering untuk Software Developer, Belajar Penggunaan Generative AI, AI Praktis untuk Produktivitas.

---

## Contact (Phone)

Open to software engineering internships. Email is the fastest way to reach me.
- Email: radityama8@gmail.com (copy button)
- LinkedIn: linkedin.com/in/raditya-mulya-akbar
- GitHub: github.com/Raditxt
- CV button in the header: [NEEDED: latest CV in English, with the same email and study program]

Also available for freelance work:
- Fastwork: [NEEDED: public profile URL]
- Freelancer: freelancer.co.id/u/raditxt
- Fiverr: add only after the first gig is published

---

## Room UI copy (English)

- Section names: About, Experience, Projects, Skills, Contact.
- Phases: Morning (05–10), Noon (10–15), Afternoon (15–18:30), Evening (18:30–23), Midnight (23–05). Times stay in WITA (UTC+8); show the time zone in the HUD.
- Phase toast: "Time changed · Morning → Noon".
- Character status bubbles: Morning "Having coffee", Noon "Coding", Afternoon "Reading", Evening "Dinner & code", Midnight "Sleeping".
- Project status labels: "In daily use", "In development".

---

## Notes for L2
- Project data needs a `status` field ("in-use" | "in-development") and an optional `demo` (currently empty for all three).
- Contact data needs an optional freelance-platform list; only render platforms that have a URL.
- Store name in Waregos is not shown. The data-mining internship is not included.
- F1's E2E test checks the order of the five Indonesian headings and the screenshot baseline; both must be updated to the English headings.
- Recheck Section title hierarchy (label-large vs title-medium): About and Projects have the longest text.
