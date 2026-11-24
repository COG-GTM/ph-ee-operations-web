import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Section } from 'app/payment-hub/filter-selector/section-model';
import { FlexModule } from '@angular/flex-layout/flex';
import { NgClass } from '@angular/common';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatLine } from '@angular/material/grid-list';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'mifosx-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss'],
    imports: [FlexModule, NgClass, ExtendedModule, FaIconComponent, MatLine, TranslateModule]
})
export class ListItemComponent {
  private router = inject(Router);


  @Input() section: Section;
  @Input() classFormat: string;
  @Input() classFormatTitle: string;
  @Input() icon: string | null;
  @Output() sectionChange = new EventEmitter<Section>();

  goToRoute(): void {
    this.sectionChange.emit(this.section);
    this.router.navigate(this.section.routeTo, { replaceUrl: true });
  }

  isActive(): string {
    if (this.section.active) {
      return 'active';
    }
    return '';
  }

}
