import { Component, OnInit, inject, input } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { AlertService } from 'app/core/alert/alert.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ExternalIdentifierPipe } from '../../pipes/external-identifier.pipe';

@Component({
    selector: 'mifosx-identifier',
    templateUrl: './identifier.component.html',
    styleUrls: ['./identifier.component.scss'],
    imports: [FaIconComponent, ExternalIdentifierPipe]
})
export class IdentifierComponent  implements OnInit {
  private clipboard = inject(Clipboard);
  private alertService = inject(AlertService);

  readonly identifier = input<string>(undefined);
  readonly completed = input(false);
  readonly display = input('right');

  iconVisible = false;
  displayL = false;
  displayR = true;
  emptyValue = false;

  ngOnInit(): void {
    const identifier = this.identifier();
    this.emptyValue = (!identifier || identifier === '');
    this.displayL = (this.display() === 'left');
    this.displayR = (this.display() === 'right');
  }

  isLongValue(): boolean {
    const identifier = this.identifier();
    if (identifier == null) {
      return false;
    }
    return (identifier.length > 15);
  }

  copyValue(): void {
    const identifier = this.identifier();
    this.clipboard.copy(identifier);
    this.alertService.alert({ type: 'Clipboard', message: 'Copied: ' + identifier });
  }

  mouseEnter() {
    this.iconVisible = true;
  }

  mouseLeave() {
    this.iconVisible = false;
  }
}
