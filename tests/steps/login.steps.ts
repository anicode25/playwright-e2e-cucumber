import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page } from "../support/browserContext";
import dotenv from "dotenv";

dotenv.config();
const baseURL = process.env.baseURL;
const standardUser = process.env.STANDARD_USER;
const password = process.env.PASSWORD;

Given("I am on the login page", async () => {
  await page.goto(baseURL!);
});

When("I enter valid credentials and click login", async () => {
  await page.waitForSelector('[data-test="username"]');
  await page.locator('[data-test="username"]').fill(standardUser!);
  await page.locator('[data-test="password"]').fill(password!);
  await page.locator('[data-test="login-button"]').click();
});

Then("I should be redirected to the products page", async () => {
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

Then("I should see the products displayed", async () => {
  await page.waitForSelector('[data-test="inventory-list"]');
  await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
});
