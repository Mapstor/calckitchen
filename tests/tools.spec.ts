import { expect, test, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import { ALL_TOOLS } from "../src/data/site-nav";

// Every calculator: loads, no sideways scroll, readouts filled from the default inputs, a drawing on the page,
// every visible field on screen with the editable look, a new input changes the result, no page errors. Static pages: load and no sideways scroll.

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

    // Every visible field sits on screen (none hidden in a sideways-scrolling row) and wears the editable look.
    const fields = await page.locator("input.p-in:visible").evaluateAll((els) =>
      els.map((el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return { name: el.id || el.getAttribute("aria-label") || "field", left: r.left, right: r.right, vw: document.documentElement.clientWidth, bg: cs.backgroundColor, line: cs.borderBottomColor, off: (el as HTMLInputElement).disabled };
      }),
    );
    for (const f of fields) {
      expect(f.left, `${f.name} starts off screen`).toBeGreaterThanOrEqual(0);
      expect(f.right, `${f.name} runs off screen`).toBeLessThanOrEqual(f.vw);
      if (!f.off) {
        expect(f.bg, `${f.name} lacks the field fill`).toBe("rgb(255, 241, 232)");
        expect(f.line, `${f.name} lacks the write-in line`).toBe("rgb(194, 65, 12)");
      }
    }

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

test("about lists every source in the register, linked to the original", async ({ page }) => {
  const ids = readFileSync("research/data-sources.csv", "utf8").split(/\r?\n/).filter((l) => /^[A-Z][A-Z0-9-]+,/.test(l));
  await page.goto("/about");
  const links = page.locator("#all-sources li > a");
  await expect(links).toHaveCount(ids.length);
  const hrefs = await links.evaluateAll((els) => els.map((e) => e.getAttribute("href") || ""));
  for (const h of hrefs) expect(h, "source link is not an https URL").toMatch(/^https:\/\//);
  await expect(page.locator("#math table tbody tr")).toHaveCount(7);
  await expect(page.locator("main")).not.toContainText(/NaN|undefined/);
});

test("unknown address gets the 404 page", async ({ page }) => {
  const res = await page.goto("/no-such-page");
  expect(res?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText("That page isn't here.");
  expect(await page.locator(".p-404-list a").count()).toBe(ALL_TOOLS.length);
  await noSideways(page);
});
