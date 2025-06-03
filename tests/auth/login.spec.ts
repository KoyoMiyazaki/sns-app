import { test, expect } from "@playwright/test";

// ログインセッションを使わない
test.use({ storageState: undefined });

test("ログイン成功後にフィードページへ遷移する", async ({ page }) => {
  await page.goto("/login", { waitUntil: "networkidle" });

  const emailInput = page.getByRole("textbox", { name: "メールアドレス" });
  const passwordInput = page.getByRole("textbox", { name: "パスワード" });
  const loginButton = page.getByRole("button", {
    name: "メールアドレスでログイン",
  });

  await emailInput.waitFor({ timeout: 5000 });
  await emailInput.fill(process.env.E2E_EMAIL || "");
  await passwordInput.fill(process.env.E2E_PASSWORD || "");
  await loginButton.click();

  try {
    await expect(page).toHaveURL("/feed", { timeout: 5000 });
  } catch (error) {
    await page.screenshot({
      path: "test-results/screenshots/login-error.png",
      fullPage: true,
    });
    throw error;
  }
});

test("誤ったパスワードではログインできない", async ({ page }) => {
  await page.goto("/login", { waitUntil: "networkidle" });

  const emailInput = page.getByRole("textbox", { name: "メールアドレス" });
  const passwordInput = page.getByRole("textbox", { name: "パスワード" });
  const loginButton = page.getByRole("button", {
    name: "メールアドレスでログイン",
  });

  await emailInput.fill(process.env.E2E_EMAIL || "");
  await passwordInput.fill("wrongpassword123");
  await loginButton.click();

  await expect(page).toHaveURL("/login", { timeout: 5000 });
});
