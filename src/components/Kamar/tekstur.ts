// Tekstur kanvas disalin dari docs/prototype/kamar-raditya.html (stoneTex, windowTex,
// codeTex, phoneTex, tekstur peta, panji, perisai, lingkaran sihir). Semua isian datar, tanpa gradasi.
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

/** Path lambang R (`LOGO_R` prototipe), kotak 240×240. */
const LOGO_R = "M84.9 71.8 C83.9 69.2 77.5 60.8 78.6 56.6 C79.8 52.5 88.1 46.1 91.8 47.0 C95.5 47.9 101.9 52.0 100.8 62.1 C99.8 72.2 91.8 90.8 85.3 107.6 C78.9 124.3 68.9 147.7 62.2 162.6 C55.5 177.5 44.9 198.4 45.0 197.0 C45.1 195.6 55.7 170.4 62.7 154.3 C69.6 138.3 78.2 116.0 86.8 100.7 C95.5 85.3 104.2 70.9 114.6 62.1 C125.0 53.4 139.4 48.4 149.3 48.4 C159.1 48.4 171.3 54.6 173.8 62.1 C176.2 69.7 171.2 85.3 164.1 93.8 C156.9 102.3 142.4 108.9 130.9 113.1 C119.5 117.2 101.6 118.1 95.3 118.6 C89.0 119.0 89.7 112.6 93.2 115.8 C96.6 119.0 107.9 128.9 115.8 137.8 C123.7 146.8 132.9 161.2 140.5 169.5 C148.1 177.7 155.1 183.7 161.4 187.4 C167.7 191.0 172.7 192.0 178.3 191.5 C183.9 191.0 192.2 185.8 195.0 184.6";

function crestR(g: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string, lw = 14) {
  g.save();
  g.translate(cx - size / 2, cy - size / 2);
  g.scale(size / 240, size / 240);
  g.strokeStyle = color;
  g.lineWidth = lw;
  g.lineCap = "round";
  g.lineJoin = "round";
  g.stroke(new Path2D(LOGO_R));
  g.restore();
}

export function teksturPanji(): CanvasTexture {
  return canvasTex(256, 512, (g, w, h) => {
    g.beginPath();
    g.moveTo(0, 0);
    g.lineTo(w, 0);
    g.lineTo(w, h);
    g.lineTo(w / 2, h - 70);
    g.lineTo(0, h);
    g.closePath();
    g.fillStyle = PAL.olive;
    g.fill();
    g.strokeStyle = PAL.gold;
    g.lineWidth = 12;
    g.stroke();
    crestR(g, w / 2, 200, 180, PAL.gold, 16);
  });
}

export function teksturPerisai(): CanvasTexture {
  return canvasTex(256, 256, (g, w) => {
    g.fillStyle = PAL.crimson;
    g.fillRect(0, 0, w, w);
    g.strokeStyle = PAL.silver;
    g.lineWidth = 10;
    g.beginPath();
    g.arc(w / 2, w / 2, 104, 0, 7);
    g.stroke();
    crestR(g, w / 2, w / 2, 160, PAL.silver, 16);
  });
}

/** Urutan panggilan rng(7) disalin persis dari prototipe supaya rune sama. */
export function teksturLingkaranSihir(): CanvasTexture {
  return canvasTex(1024, 1024, (g, w) => {
    g.translate(w / 2, w / 2);
    g.strokeStyle = PAL.gold;
    const ring = (rad: number, lw: number) => {
      g.lineWidth = lw;
      g.beginPath();
      g.arc(0, 0, rad, 0, Math.PI * 2);
      g.stroke();
    };
    ring(490, 7);
    ring(466, 3);
    ring(360, 5);
    ring(338, 2);
    ring(150, 4);
    const rr = rng(7);
    for (let i = 0; i < 64; i++) {
      g.save();
      g.rotate((i / 64) * Math.PI * 2);
      g.translate(0, -414);
      g.lineWidth = 3.5;
      g.beginPath();
      const t = Math.floor(rr() * 4);
      if (t === 0) {
        g.moveTo(-8, -14);
        g.lineTo(0, 14);
        g.lineTo(8, -14);
      } else if (t === 1) {
        g.moveTo(-10, 0);
        g.lineTo(10, 0);
        g.moveTo(0, -14);
        g.lineTo(0, 14);
      } else if (t === 2) {
        g.arc(0, 0, 10, 0, Math.PI * 1.5);
      } else {
        g.moveTo(-9, -12);
        g.lineTo(9, -12);
        g.lineTo(-9, 12);
        g.lineTo(9, 12);
      }
      g.stroke();
      g.restore();
    }
    g.lineWidth = 4;
    g.beginPath();
    for (let i = 0; i <= 7; i++) {
      const a = (((i * 3) % 7) / 7) * Math.PI * 2 - Math.PI / 2;
      if (i) g.lineTo(Math.cos(a) * 338, Math.sin(a) * 338);
      else g.moveTo(Math.cos(a) * 338, Math.sin(a) * 338);
    }
    g.stroke();
    crestR(g, 0, 0, 250, PAL.gold, 13);
  });
}
