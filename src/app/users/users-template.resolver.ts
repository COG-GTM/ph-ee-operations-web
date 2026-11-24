/** Angular Imports */
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';


/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { UsersService } from './services/users.service';

/**
 * Users template data resolver.
 */
export const usersTemplateResolver: ResolveFn<any> = () => {
  const usersService = inject(UsersService);
  return usersService.getUsersTemplate();
};
