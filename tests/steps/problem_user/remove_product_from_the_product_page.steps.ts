import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page } from "../../support/browserContext";
import dotenv from "dotenv";

dotenv.config();
const baseURL = process.env.baseURL;
const problemUser = process.env.PROBLEM_USER;
const password = process.env.PASSWORD;

Given("I log in with username and password", async () => {
  await page.goto(baseURL!);
  await page.waitForSelector('[data-test="username"]');
  await page.locator('[data-test="username"]').fill(problemUser!);
  await page.locator('[data-test="password"]').fill(password!);
  await page.locator('[data-test="login-button"]').click();
});

Given(
  "I add 'Sauce Labs Onesie' to the cart from the product page",
  async () => {
    await page.waitForSelector('[data-test="title"]');
    await expect(page.locator('[data-test="title"]')).toHaveText("Products");
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
  }
);

When(
  "I click the 'Remove' button for 'Sauce Labs Onesie' on the product page",
  async () => {
    await page.locator('[data-test="remove-sauce-labs-onesie"]').click();
  }
);

Then(
  "The 'Remove' button for 'Sauce Labs Onesie' should still be visible on the product page",
  async () => {
    await page.waitForSelector('[data-test="remove-sauce-labs-onesie"]');
    const removeButton = await page
      .locator('[data-test="remove-sauce-labs-onesie"]')
      .isVisible();
    expect(removeButton).toBe(true);
  }
);

Then("The cart badge count should remain the same", async () => {
  const cartBadge = await page
    .locator('[data-test="shopping-cart-badge"]')
    .textContent();
  expect(cartBadge).toBe("1");

  await page.locator("#react-burger-menu-btn").click();
  await page.locator('[data-test="reset-sidebar-link"]').click();
  await page.locator('[data-test="close-menu"]').click({ force: true });
});
