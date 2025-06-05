import { test, expect } from "@playwright/test";

test("いいね、いいね解除ができる", async ({ page }) => {
  // 投稿作成
  await page.goto("/feed/new");
  await page.getByRole("textbox", { name: "内容" }).fill("いいねテスト用投稿");
  await page
    .getByRole("button", {
      name: "投稿する",
    })
    .click();

  // 投稿詳細ページに遷移
  await page.getByRole("link", { name: "いいねテスト用投稿" }).click();

  // いいねをする
  await page.getByRole("button", { name: "いいね！" }).click();
  await expect(page.getByRole("button", { name: "いいね済み" })).toBeVisible();

  // いいね解除をする
  await page.getByRole("button", { name: "いいね済み" }).click();
  await expect(page.getByRole("button", { name: "いいね！" })).toBeVisible();
});
