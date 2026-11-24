/** Angular Imports */
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

/** Custom Services */
import { SettingsService } from 'app/settings/settings.service';

/** External Imports */
import * as uuid from 'uuid';

/** Http request options headers. */
const httpOptions = {
  headers: {} as Record<string, any>
};

/** Key to store user data in storage. */
const oAuthUserDetailsStorageKey = 'pheeOAuthUserDetails';

function getStorageItem(key: string): string {
  return localStorage.getItem(key) || sessionStorage.getItem(key);
}

function getInstitueId(): string {
  const userData = JSON.parse(getStorageItem(oAuthUserDetailsStorageKey));
  return userData.govtId || userData.fspId || '';
}

function getUserType(): string {
  return JSON.parse(getStorageItem(oAuthUserDetailsStorageKey)).userType;
}

/**
 * Http Request interceptor to set the request headers.
 */
export const authenticationInterceptor: HttpInterceptorFn = (request, next) => {
  const settingsService = inject(SettingsService);
  delete httpOptions.headers['X-Correlation-ID'];
  if (settingsService.tenantIdentifier) {
    const url: string = request.url;
    if ((url.indexOf('/batches') > 0) || (url.indexOf('/transactions') > 0) || (url.indexOf('/transfers') > 0)) {
      httpOptions.headers['Platform-TenantId'] = settingsService.tenantIdentifier;
      if (!url.endsWith('/batches')) {
        httpOptions.headers['X-Correlation-ID'] = uuid.v4();
      }
      delete httpOptions.headers['x-registering-institution-id'];
      delete httpOptions.headers['X-CallbackURL'];
    }
    if ((url.indexOf('/vouchers') > 0) || (url.indexOf('/benefici') > 0)) {
      if(getUserType()==='Govt. Entity User') {
      httpOptions.headers['x-registering-institution-id'] = getInstitueId();
      }
      if(getUserType()==='FSP User') {
        httpOptions.headers['x-banking-institution-Code'] = getInstitueId();
      }
      delete httpOptions.headers['X-Correlation-ID'];
      delete httpOptions.headers['Platform-TenantId'];
    }
  } else {
    delete httpOptions.headers['Platform-TenantId'];
  }
  request = request.clone({ setHeaders: httpOptions.headers });
  return next(request);
};
