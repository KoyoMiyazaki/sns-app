import { test, expect } from "@playwright/test";

test("投稿の作成ができる", async ({ page }) => {
  await page.goto("/feed");
  await page.getByRole("button", { name: "新規投稿" }).click();

  await page.getByRole("textbox", { name: "内容" }).fill("テスト投稿です");
  await page
    .getByRole("textbox", { name: "タグ（カンマ区切り）" })
    .fill("test_tag_1,test_tag_2");
  await page
    .getByRole("button", {
      name: "投稿する",
    })
    .click();

  await expect(page).toHaveURL("/feed");
  await expect(
    page.getByRole("link", { name: "テスト投稿です" })
  ).toBeVisible();
});
