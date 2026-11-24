/** TODO: Separate routing into feature modules for cleaner accounting module. */

/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Routing Imports */
import { Route } from '../core/route/route.service';

/** Custom Components */
import { TransactionDetailsComponent } from './transactions/transaction-details.component';

/** Custom Resolvers */
import { currenciesResolver } from './transactions/resolver/currencies.resolver';
import { transactionResolver } from './transactions/resolver/transaction.resolver';
import { dfspResolver } from './transactions/resolver/dfsp.resolver';

/** Payment HUB Routes */
const routes: Routes = [
  Route.withShell([
    {
      path: 'dashboard',
      children: [
        {
          path: 'paymenthub',
          loadComponent: () => import('./paymenthub.component').then(m => m.PaymentHubComponent),
          data: { title: 'Payment Hub EE', breadcrumb: 'Payment Hub EE' },
          children: [
            {
              path: '',
              redirectTo: 'batches',
              pathMatch: 'full',
            },
            {
              path: 'batches',
              data: { breadcrumb: { skip: true } },
              loadComponent: () => import('./batches/batches.component').then(m => m.BatchesComponent),
            },
            {
              path: 'bulk-import',
              data: { breadcrumb: { alias: 'Batch Bulk Import' } },
              loadComponent: () => import('./batches-bulk-import/batches-bulk-import.component').then(m => m.BatchesBulkImportComponent),
            },
            {
              path: 'sub-batches',
              data: { breadcrumb: { skip: true } },
              children: [
                {
                  path: '',
                  loadComponent: () => import('./sub-batches/sub-batches.component').then(m => m.SubBatchesComponent),
                },
                {
                  path: ':batchId',
                  data: { breadcrumb: { alias: 'SubBatches' } },
                  loadComponent: () => import('./sub-batches/sub-batches.component').then(m => m.SubBatchesComponent),
                },
              ],
            },
            {
              path: 'sub-batches',
              data: { breadcrumb: { skip: true } },
              children: [
                {
                  path: ':batchId',
                  data: { breadcrumb: { alias: 'SubBatches' } },
                  children: [
                    {
                      path: 'transfers',
                      data: { breadcrumb: { skip: true } },
                      children: [
                        {
                          path: '',
                          loadComponent: () => import('./transfers/transfers.component').then(m => m.TransfersComponent),
                        },
                        {
                          path: ':subBatchId',
                          data: { breadcrumb: { alias: 'Transactions' } },
                          loadComponent: () => import('./transfers/transfers.component').then(m => m.TransfersComponent),
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            {
              path: 'transfers',
              data: { breadcrumb: { skip: true } },
              loadComponent: () => import('./transfers/transfers.component').then(m => m.TransfersComponent),
            },
            {
              path: 'transactions',
              data: { breadcrumb: { skip: true } },
              loadComponent: () => import('./transfers/transfers.component').then(m => m.TransfersComponent),
            },
          ],
        },
      ],
    },
  ]),
];

/**
 * Payment HUB Routing Module
 *
 * Configures the payment hub routes.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class PaymentHubRoutingModule {}
