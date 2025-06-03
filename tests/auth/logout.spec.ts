import { test, expect } from "@playwright/test";

test("ログアウト後、/feed にアクセスすると /login にリダイレクトされること", async ({
  page,
}) => {
  await page.goto("/feed");
  await page.getByRole("button", { name: "ログアウト" }).click();
  await expect(page).toHaveURL("/login");
});
