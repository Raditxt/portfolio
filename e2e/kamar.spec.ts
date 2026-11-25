import { devices, expect, type Page, test } from "@playwright/test";

// Adegan 3D diverifikasi lewat screenshot (CLAUDE.md). Sinyal siap: atribut
// data-kamar-siap, dipasang Kamar setelah dua frame tergambar.
const SIAP = "[data-kamar-siap]";
const TOLERANSI = { maxDiffPixelRatio: 0.01 };

/** Screenshot setelah pandangan berhenti bergerak (damping selesai): dua tangkapan berturut-turut identik. */
async function screenshotDiam(page: Page): Promise<Buffer> {
  let sebelum = await page.screenshot();
  for (let i = 0; i < 60; i++) {
    await page.waitForTimeout(100);
    const sekarang = await page.screenshot();
    if (sekarang.equals(sebelum)) return sekarang;
    sebelum = sekarang;
  }
  throw new Error("Pandangan kamera tidak berhenti bergerak dalam 6 detik");
}

test("/kamar tidak diindeks mesin pencari", async ({ page }) => {
  await page.goto("/kamar");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
});

test("Kamar Fase Sore di desktop sama dengan screenshot acuan", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/kamar");
  await page.locator(SIAP).waitFor();
  await expect(page).toHaveScreenshot("kamar-desktop.png", TOLERANSI);
});

test.describe("HP", () => {
  const p7 = devices["Pixel 7"];
  test.use({ viewport: p7.viewport, deviceScaleFactor: p7.deviceScaleFactor, isMobile: p7.isMobile, hasTouch: p7.hasTouch, userAgent: p7.userAgent });

  test("Kamar Fase Sore di HP sama dengan screenshot acuan", async ({ page }) => {
    await page.goto("/kamar");
    await page.locator(SIAP).waitFor();
    await expect(page).toHaveScreenshot("kamar-hp.png", TOLERANSI);
  });
});

test("kamera berhenti di batas putar: drag lebih jauh tidak mengubah pandangan", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  test.setTimeout(60_000); // tiga kali menunggu damping selesai
  await page.goto("/kamar");
  await page.locator(SIAP).waitFor();
  const awal = await screenshotDiam(page);

  const drag = async () => {
    await page.mouse.move(100, 650);
    await page.mouse.down();
    await page.mouse.move(1200, 80, { steps: 12 });
    await page.mouse.up();
  };

  await drag();
  const diBatas = await screenshotDiam(page);
  expect(diBatas.equals(awal)).toBe(false);

  await drag();
  const lewatBatas = await screenshotDiam(page);
  expect(lewatBatas.equals(diBatas)).toBe(true);
});
