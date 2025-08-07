import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page } from "../support/browserContext";
import dotenv from "dotenv";

dotenv.config();
const baseURL = process.env.baseURL;
const standardUser = process.env.STANDARD_USER;
const password = process.env.PASSWORD;

Given("I am logged in as a standard user", async () => {
  await page.goto(baseURL!);
  await page.waitForSelector('[data-test="username"]');
  await page.locator('[data-test="username"]').fill(standardUser!);
  await page.locator('[data-test="password"]').fill(password!);
  await page.locator('[data-test="login-button"]').click();
});

When("I add the Sauce Labs Backpack to the cart", async () => {
  await page.waitForSelector('[data-test="title"]');
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
});

Then("the cart count should be 1", async () => {
  await page.waitForSelector('[data-test="shopping-cart-badge"]');
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
});

Then("the cart should contain Sauce Labs Backpack", async () => {
  await page.waitForSelector('[data-test="shopping-cart-link"]');
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.waitForSelector('[data-test="title"]');
  await expect(page.locator('[data-test="title"]')).toHaveText("Your Cart");
  const cartItem = await page
    .locator('[data-test="inventory-item-name"]')
    .textContent();
  expect(cartItem).toContain("Sauce Labs Backpack");
});
