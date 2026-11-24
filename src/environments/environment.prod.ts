// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export let environment = {
  name: 'prod',
  production: true,
  version: "v1.26.0-gazelle-1.2.0-beta",
  backend: {
    operations: (window as any)['env']['serverApiUrlOps'] || 'http://ops.local/opsapp/api/v1',
    signatureApiUrl: (window as any)['env']['signatureApiUrl'] || 'http://ops.local/opsapp/api/v1',
    bulkConnectorOps: (window as any)['env']['bulkConnectorOps'] || 'https://bulk-connector-demo.sandbox.fynarfin.io',
    vouchers: (window as any)['env']['serverApiUrlVou'] || 'http://ops.local/opsapp/api/v1',
    voucherCallbackUrl: (window as any)['env']['callbackUrlVou'] || 'https://webhook.site/',
    account: (window as any)['env']['serverApiUrlAct'] || 'http://ops.local/opsapp/api/v1',
    registeringInstituionId: (window as any)['env']['registeringInstitutionId'] || 'default',
    g2pPaymentConfigApi: (window as any)['env']['g2pProgramConfigApi'] || 'http://localhost:8084',
  },
  oauth: {
    // For connecting to Mifos X using OAuth2 Authentication change the value to true
    enabled: (window as any)['env']['oauthEnabled'] || false,
    type: (window as any)['env']['oauthType'] || 'keycloak',
    serverUrl: (window as any)['env']['oauthServerUrl'] || 'http://keycloak.sandbox.fynarfin.io/auth',
    realm: (window as any)['env']['oauthRealm'] || 'paymenthub',
    clientId: (window as any)['env']['oauthClientId'] || 'opsapp',
    clientUUID: (window as any)['env']['oauthClientUUID'] || '',
    clientSecret: (window as any)['env']['oauthClientSecret'] || '',
    basicAuth: (window as any)['env']['oauthBasicAuth'] || true,
    basicAuthToken: (window as any)['env']['oauthBasicAuthToken'] || 'Y2xpZW50Og=='
  },
  jbpm:{
    jbpmApiUrl: (window as any)['env']['jbpmApiUrl'] || '',
    containerId: (window as any)['env']['jbpmContainerId'] || '',
    credentials: {
      adminMaker: (window as any)['env']['jbpmCredentialsAdminMaker'] || '',
      adminChecker: (window as any)['env']['jbpmCredentialsAdminChecker'] || '',
      both: (window as any)['env']['jbpmCredentialsBoth'] || ''
    }
  },
  grafana: {
    url: (window as any)['env']['grafanaUrl'] || '',
  },
  auth: {
    enabled: (window as any)['env']['authEnabled'] || false,
  },
  tenant: (window as any)['env']['platformTenantId'] || 'phdefault',
  tenants: (window as any)['env']['platformTenantIds'] || 'phdefault',
  defaultLanguage: (window as any)['env']['defaultLanguage'] || 'en',
  supportedLanguages: (window as any)['env']['supportedLanguages'] || ['en', 'fr']
};
