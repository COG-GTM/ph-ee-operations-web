/** Angular Imports */
import { Component, OnInit } from '@angular/core';

/** Section Model */
import { Section } from 'app/payment-hub/filter-selector/section-model';
import { FlexModule } from '@angular/flex-layout/flex';
import { HasRoleDirective } from '../../directives/has-role/has-role.directive';
import { ListItemComponent } from '../../shared/list-item/list-item.component';

/**
 * Dashboard component.
 */
@Component({
    selector: 'mifosx-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [FlexModule, HasRoleDirective, ListItemComponent]
})
export class DashboardComponent implements OnInit {

  sections: Section[];

  ngOnInit() {
  }

  constructor( ) {
    this.sections = [
      {
        label: 'Payment Hub',
        routeTo: ['dashboard','paymenthub'],
        roleName: ['Normal User', 'Admin Maker', 'Admin Checker'],
        icon: 'money-bill-alt',
        active: false,
        disabled: false
      },
      {
        label: 'Vouchers',
        routeTo: ['dashboard','vouchers'],
        roleName: ['Normal User', 'Admin Maker', 'Admin Checker'],
        icon: 'ticket',
        active: false,
        disabled: false
      },
      {
        label: 'Account Mapper',
        routeTo: ['dashboard','account-mapper'],
        roleName: ['Normal User', 'Admin Maker', 'Admin Checker'],
        icon: 'users',
        active: false,
        disabled: false
      },
      {
        label:'Visualizations',
        routeTo: ['dashboard','visualizations'],
        roleName: ['Normal User', 'Admin Maker', 'Admin Checker'],
        icon: 'chart-line',
        active: false,
        disabled: false
      },
      {
        label: 'G2P Payment Config',
        routeTo: ['dashboard','configuration'],
        roleName: ['Normal User', 'Admin Maker', 'Admin Checker'],
        icon: 'file-alt',
        active: false,
        disabled: false
      }
    ];
  }
}


