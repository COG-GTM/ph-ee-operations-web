import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Route } from "app/core/route/route.service";

/**
 * Visualizations Routes
 */
const routes: Routes = [
  Route.withShell([
    {
        path: "dashboard",
        children: [
          {
            path: "visualizations",
         
            data: { title: "Visualizations", breadcrumb: "Visualizations" },
            children: [
              {
                path: "",
                loadComponent: () => import('./visualizations-selector/visualizations-selector.component').then(m => m.VisualizationsSelectorComponent),
              },
              {
                path: "user-management",
                loadComponent: () => import('./visualizations/visualizations.component').then(m => m.VisualizationsComponent),
                data: { title: "Visualizations", breadcrumb: "User Management" },
              
              }
            ],
          },
        ],
      },
  ])
];

/**
  * Visualizations Routing Module
  * 
  * Configures the routes for the Visualizations Module
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
  })
  export class VisualizationsRoutingModule {}