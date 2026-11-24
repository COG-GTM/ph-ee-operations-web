import { Component } from '@angular/core';
import { FlexModule } from '@angular/flex-layout/flex';
import { VouchersSectionFilterComponent } from '../vouchers-section-filter/vouchers-section-filter.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'mifosx-vouchers',
    templateUrl: './vouchers.component.html',
    styleUrls: ['./vouchers.component.scss'],
    imports: [FlexModule, VouchersSectionFilterComponent, RouterOutlet]
})
export class VouchersComponent {

}
