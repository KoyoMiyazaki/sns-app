import { test, expect } from "@playwright/test";

test("投稿一覧で投稿した投稿が表示される", async ({ page }) => {
  // 投稿作成
  await page.goto("/feed/new");
  await page.getByRole("textbox", { name: "内容" }).fill("プロフィール用投稿");
  await page.getByRole("button", { name: "投稿する" }).click();
  await page.waitForLoadState("networkidle");

  // プロフィール画面
  await page.goto("/profile");
  await page.getByRole("tab", { name: "投稿一覧" }).click();
  await expect(
    page.getByRole("link", { name: /プロフィール用投稿/ })
  ).toBeVisible();
});
