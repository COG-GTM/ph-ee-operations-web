/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

/** rxjs Imports */
import { finalize } from 'rxjs/operators';

/** Custom Services */
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { environment } from 'environments/environment';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatLabel, MatFormField, MatError, MatSuffix } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Login form component.
 */
@Component({
    selector: 'mifosx-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    imports: [ReactiveFormsModule, FlexModule, MatLabel, MatFormField, MatSelect, MatOption, MatError, MatInput, MatButton, MatIconButton, MatSuffix, FaIconComponent, MatCheckbox, MatProgressSpinner, TranslateModule]
})
export class LoginFormComponent implements OnInit {

  /** Login form group. */
  loginForm: UntypedFormGroup;
  /** Password input field type. */
  passwordInputType: string;
  /** True if loading. */
  loading = false;

  tenantIdDefault: string = environment.tenant;
  tenantIdsDefault: string[] = environment.tenants.split(',');

  /**
   * @param {FormBuilder} formBuilder Form Builder.
   * @param {AuthenticationService} authenticationService Authentication Service.
   */
  constructor(private formBuilder: UntypedFormBuilder,
    private authenticationService: AuthenticationService) { }

  /**
   * Creates login form.
   *
   * Initializes password input field type.
   */
  ngOnInit() {
    this.createLoginForm();
    this.passwordInputType = 'password';
  }

  /**
   * Authenticates the user if the credentials are valid.
   */
  login() {
    this.loading = true;
    this.loginForm.disable();
    this.authenticationService.login(this.loginForm.value)
      .pipe(finalize(() => {
        this.loginForm.patchValue({
          'username': '',
          'password': ''
        });
        this.loginForm.markAsPristine();
        // Angular Material Bug: Validation errors won't get removed on reset.
        this.loginForm.enable();
        this.loading = false;
      })).subscribe();
  }

  /**
   * TODO: Decision to be taken on providing this feature.
   */
  forgotPassword() {
    console.log('Forgot Password feature currently unavailable.');
  }

  /**
   * Creates login form.
   */
  private createLoginForm() {
    this.loginForm = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
      'tenant': [this.tenantIdDefault, Validators.required],
      'remember': false
    });
  }

  tenantIdIsList(): boolean {
    return (this.tenantIdsDefault.length > 1);
  }

}
