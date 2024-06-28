// @ts-check
import { test, expect } from '@playwright/test';
const LOCALHOST_URL = 'http://localhost:5173';
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com';


test('app shows random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  const text = await page.getByRole('paragraph')
  const image = await page.getByRole('img')

  const textContent = await text.textContent()
  const imageSource = await image.getAttribute('src')

  // Expect a title "to contain" a substring.
  await expect(textContent?.length).toBeGreaterThan(0);
  await expect(imageSource?.length).toBeGreaterThan(0);
  await expect(imageSource?.startsWith(CAT_PREFIX_IMAGE_URL)).toBeTruthy();
})