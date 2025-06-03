import { test, expect } from "@playwright/test";

// ログインセッションを使わない
test.use({ storageState: undefined });

test("未ログイン時に /feed にアクセスすると /login にリダイレクトされる", async ({
  page,
}) => {
  await page.context().clearCookies();
  await page.goto("/feed");
  await expect(page).toHaveURL("/login");
});
