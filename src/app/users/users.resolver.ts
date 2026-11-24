/** Angular Imports */
import { Injectable, inject } from '@angular/core';


/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { KeycloakAdminService } from './services/users-keycloak.service';

/**
 * Users data resolver.
 */
@Injectable()
export class UsersResolver  {
  private keycloakAdminService = inject(KeycloakAdminService);


  /**
   * Returns the users data.
   * @returns {Observable<any>}
   */
  resolve(): Observable<any> {
    return this.keycloakAdminService.getAllUsers();
  }

}
