/** Angular Imports */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** Custom Services */
import { Route } from 'app/core/route/route.service';

/** Custom Components */

/**
 * Account Mapper Routes
 */
const routes: Routes = [
  Route.withShell([
    {
      path: 'dashboard',
      children: [
        {
          path: 'account-mapper',
          loadComponent: () => import('./account-mapper/account-mapper.component').then(m => m.AccountMapperComponent),
          data: { title: 'Account Mapper', breadcrumb: 'Account Mapper' },
          children: [
            {
              path: "",
              redirectTo: "beneficiaries",
              pathMatch: "full",
            },
            {
              path: "beneficiaries",
              loadComponent: () => import('./beneficiaries/beneficiaries.component').then(m => m.BeneficiariesComponent),
              data: { breadcrumb: { skip: true } },
            },
            {
              path: "create-beneficiaries",
              loadComponent: () => import('./create-beneficiaries/create-beneficiaries.component').then(m => m.CreateBeneficiariesComponent),
              data: { breadcrumb: { skip: true } },
            },
          ],
        },
      ],
    },
  ]),
];

/**
 * Account Mapper Routing Module
 * 
 * Configures the routes for the Account Mapper Module
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
    ],
})
export class AccountMapperRoutingModule { }

