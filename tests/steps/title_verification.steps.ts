import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from '../support/browserContext';
import dotenv from 'dotenv'; 


dotenv.config();
const baseURL = process.env.baseURL;

Given('I open the homepage', async () => {
  await page.goto(baseURL!);
});

Then('the title should be {string}', async (expectedTitle: string) => {
  await expect(page).toHaveTitle(expectedTitle);
});

