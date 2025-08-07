import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page } from "../support/browserContext";
import dotenv from "dotenv";

dotenv.config();
const baseURL = process.env.baseURL;
const standardUser = process.env.STANDARD_USER;
const password = process.env.PASSWORD;

Given("I am logged in as standard user", async () => {
  await page.goto(baseURL!);
  await page.waitForSelector('[data-test="username"]');
  await page.locator('[data-test="username"]').fill(standardUser!);
  await page.locator('[data-test="password"]').fill(password!);
  await page.locator('[data-test="login-button"]').click();
});

When("I click on the menu button", async () => {
  await page.locator('#react-burger-menu-btn').click();
});

When("I select the logout option", async () => {
  await page.locator('[data-test="logout-sidebar-link"]').click();
});

Then("I should be redirected to the login page", async () => {
  await expect(page.getByText("Swag Labs")).toBeVisible();
  await expect(page.getByText("Swag Labs")).toHaveText("Swag Labs");
});

Then("I should see the login form displayed", async () => {
  await expect(page.locator('[data-test="username"]')).toBeVisible();
  await expect(page.locator('[data-test="password"]')).toBeVisible();
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});
