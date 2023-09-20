import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

const googleUsername = "vanderlindel";
const googlePassword = "1234567890";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--no-sandbox",
      "--disable-gpu",
      "--enable-webgl",
      "--window-size=800,800",
      "--hide-crash-restore-bubble",
    ],
  });

  const loginUrl =
    "https://accounts.google.com/AccountChooser?service=mail&continue=https://google.com&hl=en";
  const ua =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36";
  const page = await browser.newPage();

  await page.setUserAgent(ua);
  await page.goto(loginUrl, { waitUntil: "networkidle2" });

  // enter username
  await page.type('input[type="email"]', googleUsername, { delay: 100 });
  await page.keyboard.press("Enter");

  // wait few seconds
  await new Promise((r) => setTimeout(r, 3000));

  // enter password
  await page.type('input[type="password"]', googlePassword, { delay: 100 });
  await page.keyboard.press("Enter");
})();
