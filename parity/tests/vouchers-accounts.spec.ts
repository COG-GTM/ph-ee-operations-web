import { test, expect, RUN } from '../support/mock';

test('vouchers: list and pagination', async ({ page, calls, shot }) => {
  await page.goto('/dashboard/vouchers');
  await expect(page).toHaveURL(/\/dashboard\/vouchers\/voucher-management$/);
  const rows = page.locator('tr.mat-mdc-row, tr[mat-row]');
  await expect(rows).toHaveCount(10);
  await expect(page.getByText('1 – 10 of 12')).toBeVisible();
  await shot('vouchers');
  await page.getByRole('button', { name: 'Next page' }).click();
  await expect(rows).toHaveCount(2);
});

test('beneficiaries: list and pagination', async ({ page, calls, shot }) => {
  await page.goto('/dashboard/account-mapper');
  await expect(page).toHaveURL(/\/dashboard\/account-mapper\/beneficiaries$/);
  const rows = page.locator('tr.mat-mdc-row, tr[mat-row]');
  await expect(rows).toHaveCount(10);
  await expect(page.getByText(`PI-${RUN}-01`, { exact: true })).toBeVisible();
  await expect(page.getByText('1 – 10 of 14')).toBeVisible();
  await shot('beneficiaries');
  await page.getByRole('button', { name: 'Next page' }).click();
  await expect(rows).toHaveCount(4);
});
