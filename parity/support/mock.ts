import { Page, Request, test as base, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { randomBytes } from 'crypto';

export const RUN = process.env.PARITY_RUN_ID || String(Date.now());
export const API = 'http://mock.api';
const DAY = 86_400_000;
const T0 = Date.UTC(2024, 0, 15, 10, 30, 0);

/** Runtime config normally produced from src/assets/env.template.js. */
const ENV_JS = `window.env = {
  authEnabled: 'false', oauthEnabled: 'false', oauthServerUrl: '${API}/auth',
  serverApiUrlOps: '${API}/api/v1', bulkConnectorOps: '${API}', signatureApiUrl: '${API}/sign',
  serverApiUrlVou: '${API}/api/v1', serverApiUrlAct: '${API}/api/v1', g2pProgramConfigApi: '${API}/g2p',
  platformTenantId: 'phdefault', platformTenantIds: 'phdefault', grafanaUrl: '',
  defaultLanguage: 'en', supportedLanguages: 'en,fr'
};`;

const statuses = ['COMPLETED', 'IN_PROGRESS', 'FAILED'];
const n = (i: number) => String(i + 1).padStart(2, '0');

export const data = {
  batches: Array.from({ length: 23 }, (_, i) => ({
    batchId: `B-${RUN}-${n(i)}`, requestFile: `file-${n(i)}.csv`,
    startedAt: T0 + i * DAY, completedAt: T0 + i * DAY + 3_600_000,
    registeringInstitutionId: i % 2 ? 'SocialWelfare' : 'Agriculture',
    sourceMinistry: i % 2 ? 'Ministry of Welfare' : 'Ministry of Agriculture',
    totalInstructionCount: 10 + i, totalAmount: 1000 * (i + 1), payerFsp: i % 3 ? 'gorilla' : 'lion',
    status: statuses[i % 3],
  })),
  transfers: Array.from({ length: 17 }, (_, i) => ({
    transactionId: `T-${RUN}-${n(i)}`, clientCorrelationId: `C-${RUN}-${n(i)}`, batchId: `B-${RUN}-01`,
    startedAt: T0 + i * DAY, completedAt: T0 + i * DAY + 60_000, date: T0 + i * DAY,
    amount: 50 * (i + 1), currency: 'USD', functionalId: `FID${n(i)}`,
    payerFsp: 'gorilla', payeeFsp: 'lion', status: statuses[i % 3], direction: 'OUTGOING',
  })),
  vouchers: Array.from({ length: 12 }, (_, i) => ({
    serialNumber: `V-${RUN}-${n(i)}`, createdDate: T0 + i * DAY,
    registeringInstitutionId: i % 2 ? 'SocialWelfare' : 'Agriculture',
    payeeFunctionalID: `PF${n(i)}`, status: i % 2 ? '01' : '02',
  })),
  beneficiaries: Array.from({ length: 14 }, (_, i) => ({
    registeringInstitutionId: i % 2 ? 'SocialWelfare' : 'Agriculture',
    bankingInstitutionCode: i % 2 ? 'gorilla' : 'lion', payeeIdentity: `PI-${RUN}-${n(i)}`,
    financialAddress: `ACC${String(100000000000 + i)}`, paymentModality: '00',
  })),
  govtEntities: [{ govInstId: 'GOV1', name: 'Ministry of Welfare' }, { govInstId: 'GOV2', name: 'Ministry of Agriculture' }],
  programs: [{ programId: 'P1', programName: 'Child Benefit' }, { programId: 'P2', programName: 'Farm Support' }],
  dfsps: [{ fspId: 'gorilla', name: 'Gorilla Bank' }, { fspId: 'lion', name: 'Lion Bank' }],
};
data['g2p'] = Array.from({ length: 3 }, (_, i) => ({
  configId: `CFG${i + 1}`, governmentEntity: data.govtEntities[i % 2], program: data.programs[i % 2],
  dfsp: data.dfsps[i % 2], account: String(400000000000 + i), status: i % 2 ? 'Inactive' : 'Active',
}));

export interface ApiCall { method: string; path: string; body: any }

/** Random per-run credential, never committed. */
export const randomPassword = () => 'Pw!' + randomBytes(9).toString('base64url');

async function installMocks(page: Page, calls: ApiCall[]) {
  await page.route('**/assets/env.js', r => r.fulfill({ contentType: 'application/javascript', body: ENV_JS }));
  // Google Fonts / Material Icons / particles.js CDN are blocked so both apps render identically offline.
  await page.route(/^https?:\/\/(fonts\.googleapis\.com|fonts\.gstatic\.com|cdn\.jsdelivr\.net)\//, r => r.abort());
  await page.route('**/authentication?**', (r, req) => {
    const u = new URL(req.url());
    calls.push({ method: req.method(), path: '/authentication', body: { username: u.searchParams.get('username') } });
    r.fulfill({ json: {
      username: u.searchParams.get('username'), authenticated: true, tenantId: 'phdefault',
      base64EncodedAuthenticationKey: 'dGVzdA==', permissions: ['ALL_FUNCTIONS'], roles: [],
      shouldRenewPassword: false, isTwoFactorAuthenticationRequired: false,
    } });
  });
  await page.route(`${API}/**`, (r, req: Request) => {
    const url = new URL(req.url());
    const p = url.pathname.replace(/^\/(api\/v1|g2p)/, '');
    const method = req.method();
    let body: any = null;
    try { body = req.postDataJSON(); } catch { body = req.postData(); }
    if (method !== 'OPTIONS') calls.push({ method, path: p, body });
    const json = (j: any) => r.fulfill({ json: j, headers: { 'access-control-allow-origin': '*' } });
    if (method === 'OPTIONS') return r.fulfill({ status: 204, headers: {
      'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': '*' } });
    // env.oauthEnabled is the string 'false', which the app treats as truthy -> Keycloak login flow.
    if (p.endsWith('/protocol/openid-connect/token')) return json({ access_token: 'tok', refresh_token: 'ref', expires_in: 300, token_type: 'Bearer' });
    if (p.endsWith('/protocol/openid-connect/userinfo')) return json({ sub: 'u', preferred_username: 'parity', userType: 'Admin' });
    if (method !== 'GET') return json({ status: 'OK' });
    if (p === '/batches') return json({ data: data.batches, totalBatches: data.batches.length });
    if (p === '/transfers') return json({ content: data.transfers, totalElements: data.transfers.length });
    if (p === '/vouchers') return json({ content: data.vouchers, totalElements: data.vouchers.length });
    if (p === '/beneficiaries') return json({ content: data.beneficiaries, totalElements: data.beneficiaries.length });
    if (p === '/g2pPaymentConfig') return json(data['g2p']);
    const cfg = p.match(/^\/g2pPaymentConfig\/(.+)$/);
    if (cfg) return json(data['g2p'].find((c: any) => c.configId === cfg[1]) || data['g2p'][0]);
    if (p === '/governmentEntity') return json(data.govtEntities);
    if (p === '/program') return json(data.programs);
    if (p === '/dfsp') return json(data.dfsps);
    return json([]);
  });
}

export const test = base.extend<{ calls: ApiCall[]; shot: (name: string) => Promise<void> }>({
  calls: async ({ page }, use) => {
    const calls: ApiCall[] = [];
    await page.clock.setFixedTime(new Date(Date.UTC(2024, 1, 1, 12, 0, 0)));
    // The HTTP interceptor reads the signed-in user's type from storage; seed a non-institution admin.
    await page.addInitScript(() => sessionStorage.setItem('pheeOAuthUserDetails', JSON.stringify({ userType: 'Admin' })));
    await installMocks(page, calls);
    await use(calls);
  },
  shot: async ({ page }, use, info) => {
    await use(async (name: string) => {
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);
      const dir = path.join(__dirname, '..', 'screenshots', info.project.name);
      fs.mkdirSync(dir, { recursive: true });
      await page.screenshot({ path: path.join(dir, `${name}.png`), fullPage: true, animations: 'disabled', caret: 'hide' });
    });
  },
});
export { expect };

/** Route helper: both apps use path routing, so logical route == URL path. */
export const go = async (page: Page, route: string) => { await page.goto(route); };
