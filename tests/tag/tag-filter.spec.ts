import { test, expect } from "@playwright/test";

test("タグで検索できる", async ({ page }) => {
  // 投稿作成
  await page.goto("/feed/new");
  await page.getByRole("textbox", { name: "内容" }).fill("タグ検索用投稿");
  await page
    .getByRole("textbox", { name: "タグ（カンマ区切り）" })
    .fill("filter_test");
  await page.getByRole("button", { name: "投稿する" }).click();
  await page.waitForLoadState("networkidle");

  await page.goto("/feed");
  await page.getByText("タグを選択").click();
  await page.getByRole("option", { name: "filter_test" }).click();
  await page.getByRole("button", { name: "検索" }).click();

  await expect(page).toHaveURL("/feed?tags=filter_test");
  await expect(
    page.getByRole("link", { name: /タグ検索用投稿/ })
  ).toBeVisible();
});
