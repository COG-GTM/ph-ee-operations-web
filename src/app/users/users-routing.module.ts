/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Routing Imports */
import { Route } from '../core/route/route.service';

/** Custom Components */

/** Custom Resolvers */
import { usersResolver } from './users.resolver';
import { usersTemplateResolver } from './users-template.resolver';
import { userResolver } from './user.resolver';

/** Users Routes */
const routes: Routes = [
  Route.withShell([
    {
      path: 'users',
      data: { breadcrumb: 'Users', title: 'Users' },
      children: [
        {
          path: '',
          loadComponent: () => import('./users/users.component').then(m => m.UsersComponent),
          resolve: {
            users: usersResolver
          }
        },
        {
          path: 'create',
          loadComponent: () => import('./create-user/create-user.component').then(m => m.CreateUserComponent),
          data: { title: 'Create User', breadcrumb: 'Create' },
          resolve: {
            usersTemplate: usersTemplateResolver
          }
        },
        {
          path: "user-requests",
          loadComponent: () => import('./user-requests/user-requests.component').then(m => m.UserRequestsComponent),
          data: { title: "User Requests", breadcrumb: "User Requests" },
        },
        {
          path: ':id',
          data: { title: 'View User', breadcrumb:'View User' },
          resolve: {
            user: userResolver
          },
          children: [
            {
              path: '',
              loadComponent: () => import('./view-user/view-user.component').then(m => m.ViewUserComponent)
            }
          ]
        }
      ]
    }
  ])
];

/**
 * Users Routing Module
 *
 * Configures the users routes.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UsersRoutingModule { }
