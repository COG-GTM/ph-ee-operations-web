import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatNavList, MatListItem, MatListItemIcon, MatListItemTitle, MatListItemLine } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'mifosx-system',
    templateUrl: './system.component.html',
    styleUrls: ['./system.component.scss'],
    imports: [MatCard, FlexModule, MatNavList, MatListItem, RouterLink, MatIcon, FaIconComponent, MatListItemIcon, MatListItemTitle, MatListItemLine]
})
export class SystemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
