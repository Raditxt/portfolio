import { expect, test } from "@playwright/test";

test("Daftar menampilkan lima Section berurutan", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#daftar section h2")).toHaveText([
    "Tentang",
    "Pengalaman",
    "Project",
    "Skill",
    "Kontak",
  ]);
});

test("Daftar sama dengan screenshot acuan", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveScreenshot("daftar.png", { fullPage: true });
});
