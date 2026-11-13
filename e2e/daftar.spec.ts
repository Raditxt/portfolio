import { expect, test } from "@playwright/test";

test("Daftar menampilkan lima Section berurutan", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#daftar section h2")).toHaveText([
    "About",
    "Experience",
    "Projects",
    "Skills",
    "Contact",
  ]);
});

test("tombol salin di Kontak menyalin email", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: "Copy email" }).click();
  await expect(page.getByRole("button", { name: "email copied" })).toBeVisible();
  const isi = await page.evaluate(() => navigator.clipboard.readText());
  expect(isi).toBe("radityama8@gmail.com");
});

test("Daftar sama dengan screenshot acuan", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveScreenshot("daftar.png", { fullPage: true });
});

test("URL versi daftar /list tetap menampilkan daftar (kontrak lamaran)", async ({ page }) => {
  const res = await page.goto("/list");
  expect(res?.status()).toBe(200);
  await expect(page.locator("#daftar section h2")).toHaveText([
    "About",
    "Experience",
    "Projects",
    "Skills",
    "Contact",
  ]);
});

test("/list tidak menampilkan catatan fallback", async ({ page }) => {
  await page.goto("/list");
  await expect(page.getByText("can't display the 3D room")).toHaveCount(0);
});
