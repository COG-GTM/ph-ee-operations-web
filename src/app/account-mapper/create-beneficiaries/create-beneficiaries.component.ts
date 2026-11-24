/** Angular Imports */
import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";

/** Custom Services */
import { G2PPaymentConfigService } from "app/configuration/services/g2p-payment-config.service";
import { AccountMapperService } from "../services/account-mapper.service";

/** Router Imports */
import { Router, RouterLink } from "@angular/router";
import { MatCard, MatCardContent, MatCardActions } from "@angular/material/card";
import { FlexModule } from "@angular/flex-layout/flex";
import { MatLabel, MatFormField, MatError } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatSelect } from "@angular/material/select";
import { MatOption } from "@angular/material/autocomplete";
import { MatButton } from "@angular/material/button";
import { TranslateModule } from "@ngx-translate/core";

/**
 * Create Beneficiaries Component
 */
@Component({
    selector: 'mifosx-create-beneficiaries',
    templateUrl: './create-beneficiaries.component.html',
    styleUrls: ['./create-beneficiaries.component.scss'],
    imports: [MatCard, ReactiveFormsModule, MatCardContent, FlexModule, MatLabel, MatFormField, MatInput, MatSelect, MatOption, MatError, MatCardActions, MatButton, RouterLink, TranslateModule]
})
export class CreateBeneficiariesComponent implements OnInit {
  private fb = inject(FormBuilder);
  private g2pPaymentService = inject(G2PPaymentConfigService);
  private accountMapperService = inject(AccountMapperService);
  private router = inject(Router);

  programForm: FormGroup;
  govtEntities: any[] = [];
  programs: any[] = [];
  dfsps: any[] = [];

  ngOnInit(): void {
    this.createProgramForm();
    this.loadDropdownData();
  }

  /**
   * Create the program form.
   */
  createProgramForm() {
    this.programForm = this.fb.group({
      requestId: [{ value: this.generateID(12), disabled: true }, Validators.required],
      sourceBBID: ["", Validators.required],
      payeeIdentity: ["", Validators.required],
      paymentModality: ["", Validators.required],
      financialAddress: ["", Validators.required],
      bankingInstitutionCode: ["", Validators.required],
    });
  }

  /**
   * Generate a random ID.
   * @param {number} n Number of digits.
   * @returns {string} Random ID.
   */
  generateID(n: number): string {
    const max = Math.pow(10, n);
    const min = max / 10;
    return Math.floor(Math.random() * (max - min) + min).toString();
  }
  

  /**
   * Load dropdown data.
   */
  loadDropdownData() {
    this.g2pPaymentService.getTemplateData().subscribe(
      (data: any) => {
        this.govtEntities = data.govtEntities;
        this.programs = data.programs;
        this.dfsps = data.payerDfsps;
      },
      (error: any) => {
        console.log('Error:', error);
      }
    );
  }

  /**
   * Submit the form.
   */
  submit() {
    if (this.programForm.valid) {
      const formData = this.programForm.getRawValue();
      const accountData = {
        requestID: formData.requestId,
        sourceBBID: formData.sourceBBID,
        beneficiaries: [
          {
            payeeIdentity: formData.payeeIdentity,
            paymentModality: formData.paymentModality,
            financialAddress: formData.financialAddress,
            bankingInstitutionCode: formData.bankingInstitutionCode
          }
        ]
      };

      this.accountMapperService.createAccount(accountData).subscribe(
        (response: any) => {
          //route to the program list page
          this.router.navigate(['dashboard/account-mapper/beneficiaries']);
        },
        (error: any) => {
          console.log('Error:', error);
        }
      );
    }
  }
}