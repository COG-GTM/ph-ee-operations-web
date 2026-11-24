/** Angular Imports */
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';

/** rxjs Imports */
import { Subscription } from 'rxjs';

/** Custom Models */
import { Alert } from '../core/alert/alert.model';

/** Custom Services */
import { AlertService } from '../core/alert/alert.service';
import { FlexModule } from '@angular/flex-layout/flex';
import { LanguageSelectorComponent } from '../shared/language-selector/language-selector.component';
import { MatIcon } from '@angular/material/icon';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { LoginFormComponent } from './login-form/login-form.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Login component.
 */
@Component({
    selector: 'mifosx-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [FlexModule, LanguageSelectorComponent, MatIcon, FaIconComponent, LoginFormComponent, ResetPasswordComponent, FooterComponent, TranslateModule]
})
export class LoginComponent implements OnInit, OnDestroy {
  private alertService = inject(AlertService);
  private router = inject(Router);


  /** True if password requires a reset. */
  resetPassword = false;
  /** True if user requires two factor authentication. */
  twoFactorAuthenticationRequired = false;
  /** Subscription to alerts. */
  alert$: Subscription;

  /**
   * Subscribes to alert event of alert service.
   */
  ngOnInit() {
    this.alert$ = this.alertService.alertEvent.subscribe((alertEvent: Alert) => {
      const alertType = alertEvent.type;
      if (alertType === 'Password Expired') {
        this.twoFactorAuthenticationRequired = false;
        this.resetPassword = true;
      } else if (alertType === 'Two Factor Authentication Required') {
        this.resetPassword = false;
        this.twoFactorAuthenticationRequired = true;
      } else if (alertType === 'Authentication Success') {
        this.resetPassword = false;
        this.twoFactorAuthenticationRequired = false;
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      }
    });
  }

  /**
   * Unsubscribes from alerts.
   */
  ngOnDestroy() {
    this.alert$.unsubscribe();
  }

}
