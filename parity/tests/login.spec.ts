import { test, expect, randomPassword, RUN } from '../support/mock';

test('login: page renders, validation errors, sign in', async ({ page, calls, shot }) => {
  await page.goto('/login');
  await expect(page.getByText('Enter your login details below')).toBeVisible();
  const login = page.getByRole('button', { name: 'Login' });
  await expect(login).toBeDisabled();
  await shot('login');

  const user = page.locator('input[formcontrolname=username]');
  const pass = page.locator('input[formcontrolname=password]');
  await user.click(); await pass.click(); await user.click();
  await expect(page.locator('mat-error')).toHaveCount(2);
  await expect(page.locator('mat-error').first()).toContainText('required');
  await shot('login-validation');

  const username = `parity_${RUN}`;
  await user.fill(username);
  await pass.fill(randomPassword());
  // Press-and-hold password reveal button appears once a password is typed.
  const reveal = page.locator('mat-form-field').filter({ has: pass }).getByRole('button');
  await expect(reveal).toBeVisible();
  await reveal.hover(); await page.mouse.down();
  await expect(pass).toHaveAttribute('type', 'text');
  await page.mouse.up();
  await expect(pass).toHaveAttribute('type', 'password');
  // Material MDC (v15+) keeps a focused field's error until blur; legacy components cleared it on keystroke.
  await pass.blur();
  await expect(page.locator('mat-error')).toHaveCount(0);
  await expect(login).toBeEnabled();
  await login.click();
  await expect(page).toHaveURL(/\/dashboard$/);
  expect(calls.find(c => c.path.endsWith('/openid-connect/token'))?.body?.username).toBe(username);
});
