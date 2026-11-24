import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatNavList, MatListItem } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatLine } from '@angular/material/grid-list';

@Component({
    selector: 'mifosx-system',
    templateUrl: './system.component.html',
    styleUrls: ['./system.component.scss'],
    imports: [MatCard, FlexModule, MatNavList, MatListItem, RouterLink, MatIcon, FaIconComponent, MatLine]
})
export class SystemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
