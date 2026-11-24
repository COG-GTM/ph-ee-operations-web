import { Component } from '@angular/core';
import { FlexModule } from '@angular/flex-layout/flex';
import { G2pSectionFilterComponent } from '../g2p-section-filter/g2p-section-filter.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'mifosx-configuration',
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss'],
    imports: [FlexModule, G2pSectionFilterComponent, RouterOutlet]
})
export class ConfigurationComponent {

}
