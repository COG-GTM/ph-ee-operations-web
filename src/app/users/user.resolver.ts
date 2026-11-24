/** Angular Imports */
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { UsersService } from './services/users.service';
import { KeycloakAdminService } from './services/users-keycloak.service';

/**
 * User data resolver.
 */
export const userResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const keycloakAdminService = inject(KeycloakAdminService);
  const userId = route.paramMap.get('id');
  return keycloakAdminService.getUserById(userId);
};
