import { test, expect } from "@playwright/test";

test("投稿の検索ができる", async ({ page }) => {
  // 投稿作成
  await page.goto("/feed/new");
  await page.getByRole("textbox", { name: "内容" }).fill("検索用投稿");
  await page.getByRole("button", { name: "投稿する" }).click();
  await page.waitForLoadState("networkidle");

  await page.goto("/feed");
  const searchTextbox = page.getByRole("textbox", { name: "投稿を検索" });
  await searchTextbox.fill("検索用投稿");
  await searchTextbox.press("Enter");

  await expect(page).toHaveURL("/feed?q=検索用投稿");
  await expect(page.getByRole("link", { name: /検索用投稿/ })).toBeVisible();
});

test("存在しないキーワードで「投稿はありません」と表示", async ({ page }) => {
  await page.goto("/feed");
  const searchTextbox = page.getByRole("textbox", { name: "投稿を検索" });
  await searchTextbox.fill("存在しないキーワードです");
  await searchTextbox.press("Enter");

  await expect(
    page.locator("div").filter({ hasText: /^投稿はありません$/ })
  ).toBeVisible();
});
