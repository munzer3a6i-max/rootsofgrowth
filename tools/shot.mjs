// Usage: node scripts-shot.mjs <url-path> <out.png> [width] [fullPage=1]
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { chromium } = require(require("child_process").execSync("npm root -g").toString().trim() + "/playwright");
const [, , path = "/ar", out = "shot.png", width = "1440", full = "1"] = process.argv;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: +width, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:" + (process.env.PORT || 3000) + path, { waitUntil: "networkidle" });
await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
await page.waitForTimeout(400);
await page.screenshot({ path: out, fullPage: full === "1" });
await browser.close();
