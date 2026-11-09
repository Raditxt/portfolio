import { expect, test } from "@playwright/test";

test("halaman token sama dengan screenshot acuan", async ({ page }) => {
  const response = await page.goto("/token");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveScreenshot("token.png", { fullPage: true });
});
