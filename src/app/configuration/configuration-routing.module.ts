/** Angular Imports */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** Routing Imports */
import { Route } from 'app/core/route/route.service';

/** Custom Components */

/** Custom Resolvers */
import { viewPaymentConfigResolver } from './resolver/view-payment.resolver';
import { g2pTemplateResolver } from './resolver/template.resolver';
import { g2pPaymentConfigsResolver } from './resolver/g2p-payment-configs.resolver';


/**
 * Configuration Routes
 */
const routes: Routes = [
  Route.withShell([
    {
      path: "dashboard",
      children: [
        {
          path: "configuration",
          loadComponent: () => import('./configuration/configuration.component').then(m => m.ConfigurationComponent),
          data: { breadcrumb: { skip: true } },
          children: [
            {
              path: "",
              redirectTo: "g2p-payment-config",
              pathMatch: "full",
            },
            {
              path: "g2p-payment-config",

              data: { breadcrumb: "G2P Payment Config" },
              children: [
                {
                  path: "",
                  loadComponent: () => import('./g2p-payment/g2p-payment.component').then(m => m.G2pPaymentComponent),
                  resolve: {
                    g2pPayments: g2pPaymentConfigsResolver
                  },
                },
                {
                  path: ":id",
                  resolve: {
                    program: viewPaymentConfigResolver,
                    template: g2pTemplateResolver
                  },
                  loadComponent: () => import('./update-g2p-payment/update-g2p-payment.component').then(m => m.UpdateG2pPaymentComponent),
                  data: { breadcrumb: { skip: true } },
                }

              ]

            },
            {
              path: "create",
              loadComponent: () => import('./create-g2p-payment/create-g2p-payment.component').then(m => m.CreateG2pPaymentComponent),
              data: { breadcrumb: "Create"},
              resolve: {
                template: g2pTemplateResolver
              }
            },

          ],
        },
      ],
    },
  ])
];

/**
 * Configuration Routing Module
 * 
 * Configures the routes for the Configuration Module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ConfigurationRoutingModule { }
