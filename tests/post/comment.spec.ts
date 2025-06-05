import { test, expect } from "@playwright/test";

test("コメント投稿ができる", async ({ page }) => {
  // 投稿作成
  await page.goto("/feed/new");
  await page
    .getByRole("textbox", { name: "内容" })
    .fill("コメントテスト用投稿");
  await page
    .getByRole("button", {
      name: "投稿する",
    })
    .click();

  // 投稿詳細ページに遷移
  await page.getByRole("link", { name: "コメントテスト用投稿" }).click();

  await page.getByRole("textbox", { name: "内容" }).fill("テストコメント");
  await page.getByRole("button", { name: "コメントする" }).click();

  await expect(page.getByText("テストコメント")).toBeVisible();
});
