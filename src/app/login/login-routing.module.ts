/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Custom Components */

/** Login Routes */
const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login.component').then(m => m.LoginComponent),
    data: { title: 'Login' }
  }
];

/**
 * Login Routing Module
 *
 * Configures the login routes.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LoginRoutingModule { }
