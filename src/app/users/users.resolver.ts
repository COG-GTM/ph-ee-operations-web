/** Angular Imports */
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';


/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { KeycloakAdminService } from './services/users-keycloak.service';

/**
 * Users data resolver.
 */
export const usersResolver: ResolveFn<any> = () => {
  const keycloakAdminService = inject(KeycloakAdminService);
  return keycloakAdminService.getAllUsers();
};
