import { defineConfig } from "@playwright/test";

// Tool tests (site-pipeline Stage 3): every calculator and static page at 390 and 1280 px, plus the consent bar.
// Run after a build: npm run build && npm run test:e2e. PW_CHROMIUM points at a local Chromium where Playwright's own
// download isn't available (cloud shell: /opt/pw-browsers/chromium-1243/chrome-linux64/chrome).
const port = Number(process.env.PW_PORT ?? 3400);

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  fullyParallel: true,
  workers: 4,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${port}`,
    launchOptions: process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {},
  },
  projects: [
    { name: "phone", use: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: false } },
    { name: "desktop", use: { viewport: { width: 1280, height: 900 } } },
  ],
  webServer: { command: `npx next start -p ${port}`, url: `http://localhost:${port}`, reuseExistingServer: true, timeout: 60_000 },
});
