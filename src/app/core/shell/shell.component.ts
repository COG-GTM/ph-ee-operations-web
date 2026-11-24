/** Angular Imports */
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

/** rxjs Imports */
import { map } from 'rxjs/operators';

/** Custom Services */
import { ProgressBarService } from '../progress-bar/progress-bar.service';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { NgClass } from '@angular/common';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from '../../shared/footer/footer.component';

/**
 * Shell component.
 */
@Component({
    selector: 'mifosx-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss'],
    imports: [MatSidenavContainer, MatSidenav, NgClass, ExtendedModule, SidenavComponent, MatSidenavContent, MatProgressBar, ToolbarComponent, ContentComponent, FooterComponent]
})
export class ShellComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private progressBarService = inject(ProgressBarService);

  /** Whether the viewport matches the handset breakpoint. */
  readonly isHandset = toSignal(
    this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches)),
    { initialValue: false }
  );
  /** Sets the initial state of sidenav as collapsed. Not collapsed if false. */
  readonly sidenavCollapsed = signal(false);
  /** Progress bar mode, driven by the progress bar service. */
  readonly progressBarMode = toSignal<string>(this.progressBarService.updateProgressBar);

  /**
   * Toggles the current collapsed state of sidenav according to the emitted event.
   * @param {boolean} $event denotes state of sidenav
   */
  toggleCollapse($event: boolean) {
    this.sidenavCollapsed.set($event);
  }

  sideNavControl(value: boolean): void {
    this.sidenavCollapsed.set(value);
  }

}
