import { expect, test } from "@playwright/test";

// D-11: the analytics bar shows to European time zones only; Allow stores the choice; Cookie settings reopens it.

test.describe("European visitor", () => {
  test.use({ timezoneId: "Europe/Ljubljana" });
  test("bar shows, Allow stores consent, Cookie settings reopens it", async ({ page }) => {
    await page.goto("/air-fryer-converter");
    const bar = page.locator(".p-consent");
    await expect(bar).toBeVisible();
    await bar.getByRole("button", { name: "Allow" }).click();
    await expect(bar).toHaveCount(0);
    expect(await page.evaluate(() => localStorage.getItem("ck-consent"))).toBe("granted");
    await page.reload();
    await expect(page.locator(".p-consent")).toHaveCount(0);
    await page.locator(".p-consent-link").click();
    await expect(page.locator(".p-consent")).toBeVisible();
    await page.getByRole("button", { name: "No thanks" }).click();
    expect(await page.evaluate(() => localStorage.getItem("ck-consent"))).toBe("denied");
  });
});

test.describe("US visitor", () => {
  test.use({ timezoneId: "America/New_York" });
  test("no bar", async ({ page }) => {
    await page.goto("/air-fryer-converter");
    await page.waitForTimeout(300);
    await expect(page.locator(".p-consent")).toHaveCount(0);
  });
});
