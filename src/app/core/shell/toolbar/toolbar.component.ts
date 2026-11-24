/** Angular Imports */
import { Component, OnInit, inject, input, output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { style, animate, transition, trigger } from '@angular/animations';
import { Router, RouterLink } from '@angular/router';

/** rxjs Imports */
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/** Custom Services */
import { AuthenticationService } from '../../authentication/authentication.service';
import { LanguageSelectorComponent } from '../../../shared/language-selector/language-selector.component';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { TenantSelectorComponent } from '../../../shared/tenant-selector/tenant-selector.component';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatCard } from '@angular/material/card';
import { MatTooltip } from '@angular/material/tooltip';
import { MatFabButton } from '@angular/material/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Toolbar component.
 */
@Component({
    selector: 'mifosx-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate(500, style({ opacity: 1 }))
            ]),
            transition(':leave', [
                animate(500, style({ opacity: 0 }))
            ])
        ])
    ],
    imports: [LanguageSelectorComponent, ExtendedModule, TenantSelectorComponent, FlexModule, MatCard, MatTooltip, MatFabButton, FaIconComponent, MatMenuTrigger, MatMenu, MatMenuItem, RouterLink, MatIcon, TranslateModule]
})
export class ToolbarComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);
  private authenticationService = inject(AuthenticationService);


  credentials: any;

  /** Subscription to breakpoint observer for handset. */
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  /** Sets the initial visibility of search input as hidden. Visible if true. */
  searchVisible = false;
  /** Sets the initial state of sidenav as collapsed. Not collapsed if false. */
  sidenavCollapsed = true;

  /** Instance of sidenav. */
  readonly sidenav = input<MatSidenav>(undefined);
  /** Sidenav collapse event. */
  readonly collapse = output<boolean>();

  /**
   * Subscribes to breakpoint for handset.
   */
  ngOnInit() {
    this.isHandset$.subscribe(isHandset => {
      if (isHandset && this.sidenavCollapsed) {
        this.toggleSidenavCollapse(false);
      }
    });

    if (this.authenticationService.isOauthKeyCloak()) {
      this.credentials = this.authenticationService.userDetails;
    } else {
      this.credentials = this.authenticationService.getCredentials();
    }
  }

  displayUser(): string {
    if (this.authenticationService.isOauthKeyCloak()) {
      return this.credentials ? this.credentials.given_name : '';
    } else {
      return this.credentials ? this.credentials.username + '@' + this.credentials.tenantId : '';
    }
  }

  displayEmail(): string {
    if (this.authenticationService.isOauthKeyCloak()) {
      return this.credentials ? this.credentials.email : '';
    } else {
      return this.credentials ? this.credentials.username + '@' + this.credentials.tenantId : '';
    }
  }

  displayUserType(): string {
    if (this.authenticationService.isOauthKeyCloak()) {
      return this.credentials ? this.credentials.userType : '';
    } else {
      return this.credentials ? this.credentials.userType : '';
    }
  }

  displayInstituteName(): string {
    if (this.authenticationService.isOauthKeyCloak()) {
      return this.credentials ? this.credentials.govtName || this.credentials.fspName : ''; 
    } else {
      return this.credentials ? this.credentials.govtName || this.credentials.fspName : '';
    }
  };

  displayInstitueId(): string {
    if (this.authenticationService.isOauthKeyCloak()) {
      return this.credentials ? this.credentials.govtId || this.credentials.fspId : '';
    } else {
      return this.credentials ? this.credentials.govtId || this.credentials.fspId : '';
    }
  }

  /**
   * Toggles the current state of sidenav.
   */
  toggleSidenav() {
    this.sidenav().toggle();
  }

  /**
   * Toggles the current collapsed state of sidenav.
   */
  toggleSidenavCollapse(sidenavCollapsed?: boolean) {
    this.sidenavCollapsed = sidenavCollapsed || !this.sidenavCollapsed;
    this.collapse.emit(this.sidenavCollapsed);
  }

  /**
   * Toggles the visibility of search input with fadeInOut animation.
   */
  toggleSearchVisibility() {
    this.searchVisible = !this.searchVisible;
  }

  /**
   * Logs out the authenticated user and redirects to login page.
   */
  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

}
