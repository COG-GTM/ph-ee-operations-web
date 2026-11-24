/** Angular Imports */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

/** Custom Models */
import { Section } from 'app/payment-hub/filter-selector/section-model';
import { FlexModule } from '@angular/flex-layout/flex';
import { ListItemComponent } from '../../shared/list-item/list-item.component';

/**
 * Visualizations Selector Component
 *  
 * Contains the visualizations selector component.
 */
@Component({
    selector: 'mifosx-visualizations-selector',
    templateUrl: './visualizations-selector.component.html',
    styleUrls: ['./visualizations-selector.component.scss'],
    imports: [FlexModule, ListItemComponent]
})
export class VisualizationsSelectorComponent {

  sections: Section[];

  constructor() {
    this.sections = [
      {
        label: 'User Management',
        routeTo: ['dashboard','visualizations','user-management'],
        roleName: ['Normal User', 'Admin Maker', 'Admin Checker'],
        icon: 'users',
        active: false,
        disabled: false
      }
    ];
  }
}