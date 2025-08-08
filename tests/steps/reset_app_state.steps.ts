import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page } from "../support/browserContext";
import dotenv from "dotenv";

dotenv.config();
const baseURL = process.env.baseURL;
const standardUser = process.env.STANDARD_USER;
const password = process.env.PASSWORD;

Given("I open the homepage first", async () => {
  await page.goto(baseURL!);
  await page.waitForSelector('[data-test="username"]');
  await page.locator('[data-test="username"]').fill(standardUser!);
  await page.locator('[data-test="password"]').fill(password!);
  await page.locator('[data-test="login-button"]').click();
});
Given("Add Sauce Labs Backpack to the cart", async () => {
  await page.waitForSelector('[data-test="title"]');
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
});
Given("Add the Sauce Labs Backpack to the cart", async () => {
  await page.waitForSelector('[data-test="title"]');
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
});

Given("Cart count should be 1", async () => {
  await page.waitForSelector('[data-test="shopping-cart-badge"]');
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText(
    "1"
  );
});

When("I reset the app state from menu", async () => {
  await page.locator("#react-burger-menu-btn").click();
  await page.locator('[data-test="reset-sidebar-link"]').click();
  await page.locator('[data-test="close-menu"]').click({ force: true });
});

Then("The app should be in its initial state", async () => {
  await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
});

Then("The title should be 'Swag Labs'", async () => {
    await expect(page.locator(".app_logo")).toHaveText("Swag Labs");
});
