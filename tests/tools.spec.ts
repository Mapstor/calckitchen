import { expect, test, type Page } from "@playwright/test";
import { ALL_TOOLS } from "../src/data/site-nav";

// Every calculator: loads, no sideways scroll, readouts filled from the default inputs, a drawing on the page,
// a new input changes the result, no page errors. Static pages: load and no sideways scroll.

const VISUALS = ".p-viz, .p-vbars, .p-split-w, .p-db, .p-st, .p-rr, .p-balls-w, .p-fig";

async function noSideways(page: Page) {
  const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(over, "page scrolls sideways").toBeLessThanOrEqual(0);
}

async function readouts(page: Page) {
  return (await page.locator(".p-reads li").allInnerTexts()).join(" | ");
}

for (const tool of ALL_TOOLS) {
  test(`${tool.name} (${tool.href})`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const res = await page.goto(tool.href);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    await noSideways(page);

    const reads = page.locator(".p-reads li");
    expect(await reads.count(), "no readouts").toBeGreaterThan(0);
    const first = (await reads.first().innerText()).trim();
    expect(first.length, "first readout empty").toBeGreaterThan(0);
    expect(first.startsWith("—"), "first readout has no value at the default inputs").toBe(false);
    expect(await page.locator(VISUALS).count(), "no drawing on the page").toBeGreaterThan(0);

    const input = page.locator('input.p-in[inputmode="decimal"], input.p-in[inputmode="numeric"]').first();
    if ((await input.count()) > 0) {
      const before = await readouts(page);
      const old = Number((await input.inputValue()).replace(/[^\d.]/g, "")) || 1;
      await input.fill(String(Math.max(1, Math.round(old * 2))));
      await expect.poll(() => readouts(page), { message: "result did not change after a new input" }).not.toBe(before);
      await noSideways(page);
    }
    expect(errors, "page errors").toEqual([]);
  });
}

for (const path of ["/", "/about", "/contact", "/privacy-policy", "/terms-of-use"]) {
  test(`static ${path}`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    await noSideways(page);
  });
}

test("unknown address gets the 404 page", async ({ page }) => {
  const res = await page.goto("/no-such-page");
  expect(res?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText("That page isn't here.");
  expect(await page.locator(".p-404-list a").count()).toBe(ALL_TOOLS.length);
  await noSideways(page);
});
