import { test, expect } from '../support/mock';

test('dashboard: shell, sidenav and toolbar', async ({ page, calls, shot }) => {
  await page.goto('/dashboard');
  for (const t of ['Enterprise Edition', 'Payment Hub', 'Vouchers', 'Account Mapper', 'Visualizations', 'G2P Payment Config', 'phdefault']) {
    await expect(page.getByText(t, { exact: true }).first()).toBeVisible();
  }
  await shot('dashboard');
});

test('sidenav: navigate to Payment Hub', async ({ page, calls }) => {
  await page.goto('/dashboard');
  await page.getByText('Payment Hub', { exact: true }).first().click();
  await expect(page).toHaveURL(/\/dashboard\/paymenthub/);
  await expect(page.getByText('Main Batches').first()).toBeVisible();
});

test('settings page', async ({ page, calls, shot }) => {
  await page.goto('/settings');
  for (const t of ['Main Configuration', 'Images', 'Theme and Font', 'Contact Information']) {
    await expect(page.getByText(t).first()).toBeVisible();
  }
  await shot('settings');
});

test('system page', async ({ page, calls, shot }) => {
  await page.goto('/system');
  await expect(page.getByText('Manage Roles and Permissions')).toBeVisible();
  await expect(page.getByText('Audit Trails')).toBeVisible();
  await expect(page.getByText('Define or modify roles and associated permissions')).toBeVisible();
  await expect(page.getByText(/Audit logs of all the activities/)).toBeVisible();
  await expect(page.locator('mat-card mat-list-item fa-icon svg')).toHaveCount(2);
  for (const svg of await page.locator('mat-card mat-list-item fa-icon svg').all()) await expect(svg).toBeVisible();
  await shot('system');
});

test('visualizations page', async ({ page, calls, shot }) => {
  await page.goto('/dashboard/visualizations');
  await expect(page.getByText('User Management').first()).toBeVisible();
  await shot('visualizations');
});

test('unknown route shows 404', async ({ page, calls, shot }) => {
  await page.goto('/nope');
  await expect(page.getByText('404')).toBeVisible();
  await expect(page.getByText('Something went wrong.')).toBeVisible();
  await shot('not-found');
});
