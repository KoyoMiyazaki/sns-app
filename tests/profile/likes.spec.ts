import { test, expect } from "@playwright/test";

// ログインセッションを使わない
test.use({ storageState: undefined });

test("いいね一覧でいいねした投稿が表示される", async ({ page }) => {
  // 他ユーザーでログイン
  await page.goto("/login");
  await page
    .getByRole("textbox", { name: "メールアドレス" })
    .fill(process.env.E2E_OTHER_EMAIL || "");
  await page
    .getByRole("textbox", { name: "パスワード" })
    .fill(process.env.E2E_OTHER_PASSWORD || "");
  await page.getByRole("button", { name: "メールアドレスでログイン" }).click();

  // 投稿作成
  await page.goto("/feed/new");
  await page
    .getByRole("textbox", { name: "内容" })
    .fill("いいね一覧確認用投稿");
  await page.getByRole("button", { name: "投稿する" }).click();
  await page.waitForLoadState("networkidle");

  // テストユーザーでログイン
  await page.getByRole("button", { name: "ログアウト" }).click();
  await page.goto("/login");
  await page
    .getByRole("textbox", { name: "メールアドレス" })
    .fill(process.env.E2E_EMAIL || "");
  await page
    .getByRole("textbox", { name: "パスワード" })
    .fill(process.env.E2E_PASSWORD || "");
  await page.getByRole("button", { name: "メールアドレスでログイン" }).click();

  // 投稿にいいねをする
  await page.getByRole("link", { name: /いいね一覧確認用投稿/ }).click();
  await page.getByRole("button", { name: "いいね！" }).click();

  // プロフィール画面
  await page.goto("/profile");
  await page.getByRole("tab", { name: "いいね一覧" }).click();
  await expect(
    page.getByRole("link", { name: /いいね一覧確認用投稿/ })
  ).toBeVisible();
});
