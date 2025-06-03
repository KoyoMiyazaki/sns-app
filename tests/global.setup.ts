import { chromium } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000/login");
  await page
    .getByRole("textbox", { name: "メールアドレス" })
    .fill(process.env.E2E_EMAIL || "");
  await page
    .getByRole("textbox", { name: "パスワード" })
    .fill(process.env.E2E_PASSWORD || "");
  await page.getByRole("button", { name: "メールアドレスでログイン" }).click();

  await page
    .getByRole("heading", { name: "投稿一覧" })
    .waitFor({ timeout: 10000 });

  await page.context().storageState({ path: "tests/.auth/storage.json" });
  await browser.close();
}
export default globalSetup;
