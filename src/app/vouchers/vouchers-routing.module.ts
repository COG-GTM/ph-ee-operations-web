/** Angular Imports */
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

/** Routing Imports */
import { Route } from "app/core/route/route.service";

/** Custom Components */


/**
 * Vouchers Routes
 */
const routes: Routes = [
  Route.withShell([
    {
      path: "dashboard",
      children: [
        {
          path: "vouchers",
          loadComponent: () => import('./vouchers/vouchers.component').then(m => m.VouchersComponent),
          data: {
            title: "Voucher Management",
            breadcrumb: "Voucher Management",
          },
          children: [
            {
              path: "",
              redirectTo: "voucher-management",
              pathMatch: "full",
            },
            {
              path: "voucher-management",
              loadComponent: () => import('./voucher-management/voucher-management.component').then(m => m.VoucherManagementComponent),
              data: { breadcrumb: { skip: true } },
            },
            {
              path: "bulk-import",
              loadComponent: () => import('./vouchers-bulk-import/vouchers-bulk-import.component').then(m => m.VouchersBulkImportComponent),
              data: { breadcrumb: { skip: true } },
            },
          ],
        },
      ],
    },
  ]),
];

/**
  * Vouchers Routing Module
  * 
  * Configures the routes for the Vouchers Module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class VouchersRoutingModule {}
