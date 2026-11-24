import { NgModule } from '@angular/core';

/** Routing Imports */
import { Routes, RouterModule } from '@angular/router';
import { Route } from '../core/route/route.service';

/** Component Imports */

/** Custom Resolvers */
import { rolesAndPermissionsResolver } from './roles-and-permissions/roles-and-permissions.resolver';
import { auditTrailSearchTemplateResolver } from './audit-trails/audit-trail-search-template.resolver';
import { auditTrailResolver } from './audit-trails/view-audit/audit-trail.resolver';


const routes: Routes = [
  Route.withShell([
    {
      path: 'system',
      data: { title: 'System', breadcrumb: 'System' },
      children: [
        {
          path: '',
          loadComponent: () => import('./system.component').then(m => m.SystemComponent)
        },
        {
          path: 'roles-and-permissions',
          data: { title:  'Roles and Permissions', breadcrumb: 'Roles and Permissions' },
          children: [
            {
              path: '',
              loadComponent: () => import('./roles-and-permissions/roles-and-permissions.component').then(m => m.RolesAndPermissionsComponent),
              resolve: {
                roles: rolesAndPermissionsResolver
              }
            },
            {
              path: 'add',
              loadComponent: () => import('./roles-and-permissions/add-role/add-role.component').then(m => m.AddRoleComponent),
              data: { title: 'Add Role', breadcrumb: 'Add' }
            }
          ]
        },
        {
          path: 'audit-trails',
          data: { title: 'Audit Trails', breadcrumb: 'Audit Trails' },
          children: [
            {
              path: '',
              loadComponent: () => import('./audit-trails/audit-trails.component').then(m => m.AuditTrailsComponent),
              resolve: {
                auditTrailSearchTemplate: auditTrailSearchTemplateResolver
              }
            },
            {
             path: ':id',
             loadComponent: () => import('./audit-trails/view-audit/view-audit.component').then(m => m.ViewAuditComponent),
             data: { title: 'View Audit', routeParamBreadcrumb: 'id' },
             resolve: {
               auditTrail: auditTrailResolver
             }
            }
          ]
        }
      ]
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SystemRoutingModule { }
