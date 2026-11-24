/** Angular Imports */
import { Component, OnInit } from '@angular/core';

/** Environment Configuration */
import { environment } from 'environments/environment';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatDivider } from '@angular/material/divider';

/**
 *  Footer component.
 */
@Component({
    selector: 'mifosx-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    imports: [FlexModule, MatDivider]
})
export class FooterComponent implements OnInit {

  /** Mifos X version. */
  version: string = environment.version;

  constructor() { }

  ngOnInit() {
  }

}
