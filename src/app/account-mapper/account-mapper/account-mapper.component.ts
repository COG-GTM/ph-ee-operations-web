import { Component } from '@angular/core';
import { FlexModule } from '@angular/flex-layout/flex';
import { FilterSelectorComponent } from '../filter-selector/filter-selector.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'mifosx-account-mapper',
    templateUrl: './account-mapper.component.html',
    styleUrls: ['./account-mapper.component.scss'],
    imports: [FlexModule, FilterSelectorComponent, RouterOutlet]
})
export class AccountMapperComponent {}
