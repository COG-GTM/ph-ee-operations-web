/** Angular Imports */
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/** Custom Services */
import { Logger } from '../../logger/logger.service';
import { AuthenticationService } from '../authentication.service';

/** Environment Configuration */
import { environment } from '../../../../environments/environment';

/** Initialize logger */
const log = new Logger('AuthenticationGuard');

/**
 * Route access authorization.
 */
export const authenticationGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authenticationService = inject(AuthenticationService);
  if (environment.auth.enabled === 'false') {
    return true;
  }
  if (authenticationService.isAuthenticated()) {
    return true;
  }

  log.debug('User not authenticated, redirecting to login...');
  authenticationService.logout();
  router.navigate(['/login'], { replaceUrl: true });
  return false;
};
