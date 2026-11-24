/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { FlexModule } from '@angular/flex-layout/flex';
import { FilterSelectorComponent } from './filter-selector/filter-selector.component';
import { RouterOutlet } from '@angular/router';

/**
 * Payment HUB component.
 */
@Component({
    selector: 'mifosx-paymenthubee',
    templateUrl: './paymenthub.component.html',
    styleUrls: ['./paymenthub.component.scss'],
    imports: [FlexModule, FilterSelectorComponent, RouterOutlet]
})
export class PaymentHubComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
