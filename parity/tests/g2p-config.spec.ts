import { test, expect, data } from '../support/mock';

test('g2p config: list', async ({ page, calls, shot }) => {
  await page.goto('/dashboard/configuration');
  await expect(page).toHaveURL(/\/dashboard\/configuration\/g2p-payment-config$/);
  const rows = page.locator('tr.mat-mdc-row, tr[mat-row]');
  await expect(rows).toHaveCount(3);
  await expect(page.getByText(data['g2p'][0].account, { exact: true })).toBeVisible();
  await shot('g2p-config');
});

test('g2p config: create with validation', async ({ page, calls, shot }) => {
  const account = String(Date.now()).padEnd(12, '0').slice(0, 12);
  await page.goto('/dashboard/configuration/create');
  const submit = page.getByRole('button', { name: 'Submit' });
  await expect(submit).toBeDisabled();
  const acc = page.getByPlaceholder('Enter Account Number');
  await acc.fill('12ab');
  await acc.blur();
  await expect(page.getByText(/should be of 12 digits/)).toBeVisible();
  await shot('g2p-create-validation');

  const pick = async (placeholder: string, option: string) => {
    await page.locator(`mat-select[placeholder="${placeholder}"]`).click();
    await page.getByRole('option', { name: option, exact: true }).click();
  };
  await pick('Select government Entity', 'Ministry of Welfare');
  await pick('Select Programs', 'Child Benefit');
  await pick('Select Payer DFSP', 'Lion Bank');
  await pick('Select Status', 'Active');
  await acc.fill(account);
  await expect(submit).toBeEnabled();
  await submit.click();
  await expect(page).toHaveURL(/\/dashboard\/configuration\/g2p-payment-config$/);
  const post = calls.find(c => c.method === 'POST' && c.path === '/g2pPaymentConfig');
  expect(post?.body).toEqual({
    governmentEntity: { govInstId: 'GOV1' }, dfsp: { fspId: 'lion' }, program: { programId: 'P1' }, account, status: 'Active',
  });
});

test('g2p config: open row to edit', async ({ page, calls, shot }) => {
  await page.goto('/dashboard/configuration/g2p-payment-config');
  await page.getByText(data['g2p'][1].account, { exact: true }).click();
  await expect(page).toHaveURL(/\/g2p-payment-config\/CFG2/);
  await page.waitForLoadState('networkidle');
  expect(calls.some(c => c.method === 'GET' && c.path === '/g2pPaymentConfig/CFG2')).toBe(true);
  await shot('g2p-edit');
});
