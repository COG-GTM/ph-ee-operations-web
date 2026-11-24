/** Angular Imports */
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';


/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { SystemService } from '../system.service';

/**
 * Roles and Permissions data resolver.
 */
export const rolesAndPermissionsResolver: ResolveFn<any> = () => {
  const systemService = inject(SystemService);
  return systemService.getRoles();
};
