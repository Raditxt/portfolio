// Tekstur kanvas disalin dari docs/prototype/kamar-raditya.html (stoneTex, windowTex,
// codeTex, phoneTex, tekstur peta). Semua isian datar, tanpa gradasi.
import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from "three";
import { PAL, rng } from "@/kamar/palet";

type Gambar = (g: CanvasRenderingContext2D, w: number, h: number) => void;

function canvasTex(w: number, h: number, draw: Gambar, repeat?: [number, number]): CanvasTexture {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d");
  if (!g) throw new Error("Canvas 2D tidak tersedia");
  draw(g, w, h);
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  t.anisotropy = 4;
  if (repeat) {
    t.wrapS = t.wrapT = RepeatWrapping;
    t.repeat.set(repeat[0], repeat[1]);
  }
  return t;
}

export function teksturBatu(): CanvasTexture {
  return canvasTex(
    512,
    512,
    (g, w) => {
      g.fillStyle = PAL.stoneD;
      g.fillRect(0, 0, w, w);
      const r = rng(33);
      const rows = 10;
      const bh = w / rows;
      const tones = [PAL.stone, PAL.stoneL, "#433E39"];
      for (let y = 0; y < rows; y++) {
        let x = (y % 2) * -bh * 0.8;
        while (x < w) {
          const bw = bh * (1.3 + r() * 1.0);
          g.fillStyle = tones[Math.floor(r() * 3)];
          g.fillRect(x + 3, y * bh + 3, bw - 6, bh - 6);
          x += bw;
        }
      }
    },
    [2.4, 1.5],
  );
}

const BUKIT: [number, number][] = [
  [80, 0.58],
  [170, 0.63],
  [260, 0.55],
  [360, 0.61],
  [450, 0.56],
  [512, 0.6],
];

/** Langit jendela Fase Sore (`windowTex`). Langit dua lapis milik issue 08. */
export function teksturJendelaSore(): CanvasTexture {
  return canvasTex(512, 420, (g, w, h) => {
    const pita: [string, number, number][] = [
      [PAL.violetD, 0, 0.16],
      [PAL.violet, 0.16, 0.3],
      ["#8E4A6E", 0.3, 0.4],
      [PAL.crimson, 0.4, 0.5],
      ["#C2623A", 0.5, 0.58],
      [PAL.gold, 0.58, 0.66],
    ];
    pita.forEach(([c, a, b]) => {
      g.fillStyle = c;
      g.fillRect(0, h * a, w, h * (b - a) + 1);
    });
    g.fillStyle = PAL.silver;
    g.beginPath();
    g.arc(w * 0.62, h * 0.62, 42, Math.PI, 0);
    g.fill();
    g.fillStyle = PAL.silver;
    g.globalAlpha = 0.85;
    [
      [70, 70, 110],
      [300, 52, 150],
      [190, 120, 80],
    ].forEach(([x, y, l]) => g.fillRect(x, y, l, 5));
    g.globalAlpha = 1;
    g.fillStyle = PAL.olive;
    g.beginPath();
    g.moveTo(0, h * 0.64);
    BUKIT.forEach(([x, y]) => g.lineTo(x, h * y));
    g.lineTo(w, h);
    g.lineTo(0, h);
    g.fill();
    g.fillStyle = PAL.oliveD;
    g.fillRect(0, h * 0.7, w, h * 0.3);
    const r = rng(8);
    let x = 0;
    while (x < w) {
      const bw = 26 + r() * 30;
      const bh = 30 + r() * 40;
      const base = h * 0.8;
      g.fillStyle = PAL.obsidian;
      g.fillRect(x, base - bh, bw, bh + 200);
      g.beginPath();
      g.moveTo(x - 4, base - bh);
      g.lineTo(x + bw / 2, base - bh - 18 - r() * 12);
      g.lineTo(x + bw + 4, base - bh);
      g.fill();
      if (r() < 0.5) g.fillRect(x + bw * 0.7, base - bh - 20, 6, 14);
      if (r() < 0.7) {
        g.fillStyle = PAL.gold;
        g.fillRect(x + bw * 0.3, base - bh * 0.6, 5, 6);
      }
      x += bw + 4;
    }
    g.strokeStyle = PAL.obsidian;
    g.lineWidth = 2;
    [
      [150, 110],
      [175, 98],
      [330, 130],
    ].forEach(([bx, by]) => {
      g.beginPath();
      g.moveTo(bx - 8, by);
      g.quadraticCurveTo(bx - 4, by - 5, bx, by);
      g.quadraticCurveTo(bx + 4, by - 5, bx + 8, by);
      g.stroke();
    });
  });
}

export function teksturKode(): CanvasTexture {
  return canvasTex(512, 320, (g, w, h) => {
    g.fillStyle = PAL.obsidian;
    g.fillRect(0, 0, w, h);
    g.fillStyle = "#24212A";
    g.fillRect(0, 0, w, 28);
    [PAL.crimson, PAL.gold, PAL.olive].forEach((c, i) => {
      g.fillStyle = c;
      g.beginPath();
      g.arc(18 + i * 18, 14, 5, 0, 7);
      g.fill();
    });
    const cols = [PAL.gold, PAL.silver, PAL.violet, "#8FA36A", PAL.crimson];
    let y = 50;
    const r = rng(3);
    while (y < h - 10) {
      let x = 34 + Math.floor(r() * 4) * 22;
      const n = 1 + Math.floor(r() * 4);
      for (let i = 0; i < n; i++) {
        const ww = 20 + r() * 80;
        g.fillStyle = cols[Math.floor(r() * 5)];
        g.fillRect(x, y - 7, ww, 7);
        x += ww + 10;
      }
      y += 19;
    }
  });
}

/** Layar HP tanpa jam (prototipe menggambar jam WITA; dibuang supaya screenshot deterministik). */
export function teksturLayarHP(): CanvasTexture {
  return canvasTex(160, 300, (g, w, h) => {
    g.fillStyle = PAL.violetD;
    g.fillRect(0, 0, w, h);
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 3; c++) {
        g.fillStyle = [PAL.gold, PAL.olive, PAL.crimson][(r + c) % 3];
        g.fillRect(22 + c * 42, 140 + r * 44, 30, 30);
      }
  });
}

export function teksturPeta(): CanvasTexture {
  return canvasTex(512, 400, (g, w, h) => {
    const pantai: [number, number][] = [
      [80, 320],
      [160, 300],
      [240, 340],
      [330, 310],
      [420, 330],
      [512, 300],
    ];
    g.fillStyle = "#D9C9A3";
    g.fillRect(0, 0, w, h);
    g.fillStyle = "#8FA3A8";
    g.beginPath();
    g.moveTo(0, 290);
    pantai.forEach(([x, y]) => g.lineTo(x, y));
    g.lineTo(w, h);
    g.lineTo(0, h);
    g.fill();
    g.strokeStyle = PAL.woodD;
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(0, 290);
    pantai.forEach(([x, y]) => g.lineTo(x, y));
    g.stroke();
    g.fillStyle = PAL.olive;
    [
      [120, 120],
      [150, 110],
      [180, 125],
      [360, 90],
      [390, 80],
    ].forEach(([x, y]) => {
      g.beginPath();
      g.moveTo(x - 14, y + 14);
      g.lineTo(x, y - 12);
      g.lineTo(x + 14, y + 14);
      g.fill();
    });
    g.strokeStyle = PAL.crimson;
    g.lineWidth = 3;
    g.setLineDash([8, 8]);
    g.beginPath();
    g.moveTo(90, 250);
    g.bezierCurveTo(180, 180, 250, 260, 300, 190);
    g.bezierCurveTo(340, 140, 400, 170, 430, 120);
    g.stroke();
    g.setLineDash([]);
    [
      [90, 250],
      [300, 190],
      [430, 120],
    ].forEach(([x, y]) => {
      g.lineWidth = 5;
      g.beginPath();
      g.moveTo(x - 10, y - 10);
      g.lineTo(x + 10, y + 10);
      g.moveTo(x + 10, y - 10);
      g.lineTo(x - 10, y + 10);
      g.stroke();
    });
    g.strokeStyle = PAL.woodD;
    g.lineWidth = 6;
    g.strokeRect(8, 8, w - 16, h - 16);
    g.translate(450, 60);
    g.fillStyle = PAL.woodD;
    for (let i = 0; i < 4; i++) {
      g.rotate(Math.PI / 2);
      g.beginPath();
      g.moveTo(0, -30);
      g.lineTo(7, 0);
      g.lineTo(-7, 0);
      g.fill();
    }
  });
}
