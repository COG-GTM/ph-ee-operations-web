import { Component, OnInit, inject } from '@angular/core';
import { UntypedFormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { PasswordsUtility } from 'app/core/utils/passwords-utility';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatLabel, MatFormField, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';


@Component({
    selector: 'mifosx-update-password-dialog',
    templateUrl: './update-password-dialog.component.html',
    styleUrls: ['./update-password-dialog.component.scss'],
    imports: [MatDialogTitle, ReactiveFormsModule, FlexModule, MatLabel, MatFormField, MatInput, MatError, MatDialogActions, MatButton, MatDialogClose, TranslateModule]
})
export class UpdatePasswordDialogComponent implements OnInit {
  dialogRef = inject<MatDialogRef<UpdatePasswordDialogComponent>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);
  private formBuilder = inject(UntypedFormBuilder);
  private passwordsUtility = inject(PasswordsUtility);


  /** Change Password Form */
  changePasswordForm: any;

  ngOnInit() {
    this.createChangePasswordForm();
  }

  /** Change Password form */
  createChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      'password': ['', this.passwordsUtility.getPasswordValidators()],
      'repeatPassword': ['', [Validators.required, this.confirmPassword('password')]]
    });
  }

  /**
   * Confirm Change Password of Users
   * @param controlNameToCompare Form Control Name to be compared.
   */
  confirmPassword(controlNameToCompare: string): ValidatorFn {
    return (c: AbstractControl): ValidationErrors|null => {
        if (c.value == null || c.value.length === 0) {
            return null;
        }
        const controlToCompare = c.root.get(controlNameToCompare);
        if (controlToCompare) {
            const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
                c.updateValueAndValidity();
                subscription.unsubscribe();
            });
        }
        return controlToCompare && controlToCompare.value !== c.value ? {'notequal': true} : null;
    };
  }

}

