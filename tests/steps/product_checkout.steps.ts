import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page } from "../support/browserContext";
import dotenv from "dotenv";

dotenv.config();
const baseURL = process.env.baseURL;
const standardUser = process.env.STANDARD_USER;
const password = process.env.PASSWORD;

Given("I am logged by standard user", async () => {
  await page.goto(baseURL!);
  await page.waitForSelector('[data-test="username"]');
  await page.locator('[data-test="username"]').fill(standardUser!);
  await page.locator('[data-test="password"]').fill(password!);
  await page.locator('[data-test="login-button"]').click();
});

When("I add a product to the cart", async () => {
  await page.waitForSelector('[data-test="title"]');
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
});

When("I proceed to checkout", async () => {
  await page.locator('[data-test="checkout"]').click();
});

When("I fill in the checkout information", async () => {
  await page.locator('[data-test="firstName"]').fill("John");
  await page.locator('[data-test="lastName"]').fill("Doe");
  await page.locator('[data-test="postalCode"]').fill("12345");
});

When("I complete the checkout process", async () => {
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
});

Then("I should see the order confirmation page", async () => {
  await expect(page.locator('[data-test="complete-header"]')).toHaveText(
    "Thank you for your order!"
  );
});

Then("Order status should be displayed correctly", async () => {
  await expect(page.locator('[data-test="complete-text"]')).toHaveText(
    "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
  );
});
