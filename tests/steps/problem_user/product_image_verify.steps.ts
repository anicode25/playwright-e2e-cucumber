import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page } from "../../support/browserContext";
import dotenv from "dotenv";

dotenv.config();
const baseURL = process.env.baseURL;
const problemUser = process.env.PROBLEM_USER;
const password = process.env.PASSWORD;
Given("I am logged in as a problem user", async () => {
  await page.goto(baseURL!);
  await page.waitForSelector('[data-test="username"]');
  await page.locator('[data-test="username"]').fill(problemUser!);
  await page.locator('[data-test="password"]').fill(password!);
  await page.locator('[data-test="login-button"]').click();
});

When("I navigate to the product page", async () => {
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await expect(page.locator('[data-test="title"]')).toHaveText("Products");
});

Then("I should see the product image displayed", async () => {
  await page.waitForSelector('[data-test="inventory-list"]');
  await expect(
    page.locator('[data-test="inventory-item-sauce-labs-backpack-img"]')
  ).toBeVisible();
});

Then(
  "The product image should not match the expected image and all products have the same image",
  async () => {
    const productImageSelectors = [
      '[data-test="inventory-item-sauce-labs-backpack-img"]',
      '[data-test="inventory-item-sauce-labs-bike-light-img"]',
      '[data-test="inventory-item-sauce-labs-bolt-t-shirt-img"]',
      '[data-test="inventory-item-sauce-labs-fleece-jacket-img"]',
      '[data-test="inventory-item-sauce-labs-onesie-img"]',
      '[data-test="inventory-item-test.allthethings()-t-shirt-(red)-img"]',
    ];

    const srcs: string[] = [];

    for (const selector of productImageSelectors) {
      const img = page.locator(selector);
      await expect(img).toHaveAttribute("src", /sl-404\.[a-z0-9]+\.jpg$/);

      const src = await img.getAttribute("src");
      if (src) srcs.push(src);
    }

    const firstSrc = srcs[0];
    for (const src of srcs) {
      expect(src).toBe(firstSrc);
    }
  }
);
