import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page } from "../support/browserContext";
import dotenv from "dotenv";

dotenv.config();
const baseURL = process.env.baseURL;
const standardUser = process.env.STANDARD_USER;
const password = process.env.PASSWORD;

Given("I am on the homepage", async () => {
  await page.goto(baseURL!);
  await page.waitForSelector('[data-test="username"]');
  await page.locator('[data-test="username"]').fill(standardUser!);
  await page.locator('[data-test="password"]').fill(password!);
  await page.locator('[data-test="login-button"]').click();
});

Given("I add 'Sauce Labs Onesie' to the cart", async () => {
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
});

When("I view the cart", async () => {
    await page.locator('[data-test="shopping-cart-link"]').click();
});

Then("I should see 'Sauce Labs Onesie' in the cart", async () => {
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Onesie");
});

When("I remove 'Sauce Labs Onesie' from the cart", async () => {
    await page.locator('[data-test="remove-sauce-labs-onesie"]').click();
});

Then("'Sauce Labs Onesie' should not be in the cart", async () => {
    await expect(page.locator('[data-test="inventory-item-name"]')).not.toBeVisible();
});
