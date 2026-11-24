import { test, expect, data, RUN } from '../support/mock';

test('batches: list, pagination, filter', async ({ page, calls, shot }) => {
  await page.goto('/dashboard/paymenthub/batches');
  const rows = page.locator('tr.mat-mdc-row, tr[mat-row]');
  await expect(rows).toHaveCount(10);
  await expect(page.getByText(`B-${RUN}-01`, { exact: true })).toBeVisible();
  await expect(page.getByText('1 – 10 of 23')).toBeVisible();
  expect(calls.some(c => c.method === 'GET' && c.path === '/batches')).toBe(true);
  await shot('batches');

  await page.getByRole('button', { name: 'Next page' }).click();
  await expect(page.getByText('11 – 20 of 23')).toBeVisible();
  await expect(page.getByText(`B-${RUN}-11`, { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Last page' }).click();
  await expect(rows).toHaveCount(3);
  await page.getByRole('button', { name: 'First page' }).click();
  await expect(page.getByText('1 – 10 of 23')).toBeVisible();
});

test('transfers: list and pagination', async ({ page, calls, shot }) => {
  await page.goto('/dashboard/paymenthub/transfers');
  const rows = page.locator('tr.mat-mdc-row, tr[mat-row]');
  await expect(rows).toHaveCount(10);
  await expect(page.getByText('1 – 10 of 17')).toBeVisible();
  await expect(page.getByText(data.transfers[0].transactionId, { exact: true }).first()).toBeVisible();
  await shot('transfers');
  await page.getByRole('button', { name: 'Next page' }).click();
  await expect(rows).toHaveCount(7);
  // Request headers set by the authentication interceptor.
  const transferCall = calls.find(c => c.method === 'GET' && c.path === '/transfers');
  expect(transferCall?.headers?.['platform-tenantid']).toBeTruthy();
  expect(transferCall?.headers?.['x-correlation-id']).toMatch(/^[0-9a-f-]{36}$/);
});

test('bulk import page', async ({ page, calls, shot }) => {
  await page.goto('/dashboard/paymenthub/bulk-import');
  await expect(page.getByText('Download Template')).toBeVisible();
  await expect(page.getByText(/Select voucher file from your system/)).toBeVisible();
  await shot('bulk-import');
});
