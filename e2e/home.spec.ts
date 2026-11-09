import { expect, test } from "@playwright/test";

test("halaman utama terbuka", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("Raditxt");
});
