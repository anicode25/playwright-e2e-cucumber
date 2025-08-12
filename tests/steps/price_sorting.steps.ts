import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page } from "../support/browserContext";
import dotenv from "dotenv";

dotenv.config();
const baseURL = process.env.baseURL;
const standardUser = process.env.STANDARD_USER;
const password = process.env.PASSWORD;

Given("I am on the product listing page", async () => {
  await page.goto(baseURL!);
  await page.waitForSelector('[data-test="username"]');
  await page.locator('[data-test="username"]').fill(standardUser!);
  await page.locator('[data-test="password"]').fill(password!);
  await page.locator('[data-test="login-button"]').click();
  await page.waitForSelector('[data-test="title"]');
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");
});

When("I select 'Price: Low to High' from the sorting options", async () => {
  await page.locator('[data-test="product-sort-container"]').click();
  await page.selectOption('[data-test="product-sort-container"]', "lohi");
});

Then("The products should be sorted by price in ascending order", async () => {
  await page.waitForTimeout(2000);
  const products = await page
    .locator('[data-test="inventory-item-price"]')
    .all();
  const prices = await Promise.all(
    products.map((product) => product.textContent())
  );
  const numericPrices = prices.map((price) =>
    parseFloat(price!.replace("$", ""))
  );
  const sortedPrices = [...numericPrices].sort((a, b) => a - b);
  expect(sortedPrices).toEqual(numericPrices);
});

When("I select 'Price: High to Low' from the sorting options", async () => {
  await page.locator('[data-test="product-sort-container"]').click();
  await page.selectOption('[data-test="product-sort-container"]', "hilo");
});

Then(
  "The products should be sorted by the price in descending order",
  async () => {
    await page.waitForTimeout(2000);
    const products = await page
      .locator('[data-test="inventory-item-price"]')
      .all();
    const prices = await Promise.all(
      products.map((product) => product.textContent())
    );
    const numericPrices = prices.map((price) =>
      parseFloat(price!.replace("$", ""))
    );
    const sortedPrices = [...numericPrices].sort((a, b) => b - a);
    expect(sortedPrices).toEqual(numericPrices);
  }
);
