import { test, expect } from "@playwright/test";

test("Successfully submit the rating", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/interactive/gi);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  const firstRadio = page.getByRole("radio").first();
  const selectedRating = await firstRadio.inputValue();
  await firstRadio.isChecked();

  await page.getByRole("button", { name: /submit/i }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /thank you/i
  );

  await expect(page.getByTestId("rating-text")).toHaveText(
    `You selected ${selectedRating} out of 5`
  );
});
