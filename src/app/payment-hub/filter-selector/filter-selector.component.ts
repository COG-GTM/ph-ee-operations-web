import { Component, OnInit, inject, input } from '@angular/core';
import { Section } from './section-model';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { FlexModule } from '@angular/flex-layout/flex';
import { ListItemComponent } from '../../shared/list-item/list-item.component';

@Component({
    selector: 'mifosx-filter-selector',
    templateUrl: './filter-selector.component.html',
    styleUrls: ['./filter-selector.component.scss'],
    imports: [FlexModule, ListItemComponent]
})
export class FilterSelectorComponent implements OnInit {
  private router = inject(Router);


  readonly currentSection = input<string>(undefined);
  sections: Section[];

  ngOnInit(): void {
    this.sections = [
      { label: 'Main Batches', routeTo: ['/dashboard', 'paymenthub', 'batches'], active: false, disabled: false },
      { label: 'Sub Batches', routeTo: ['/dashboard', 'paymenthub', 'sub-batches'], active: false, disabled: true },
      { label: 'Transfers', routeTo: ['/dashboard', 'paymenthub', 'transactions'], active: false, disabled: false }
    ];

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url.indexOf('/sub-batches') > 0 && event.url.indexOf('/transfers') > 0) {
        this.markActiveSection('Transfers');
      } else if (event.url.indexOf('/sub-batches') > 0) {
        this.markActiveSection('Sub Batches');
      }
    });
  }

  setActive(s: Section): void {
    this.markActiveSection(s.label);
  }

  markActiveSection(name: string): void {
    this.sections.forEach((section: Section) => {
      section.active = false;
      if (section.label === name) {
        section.active = true;
      }
    });
  }
}
