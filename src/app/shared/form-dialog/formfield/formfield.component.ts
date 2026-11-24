import { Component, OnInit, Input, input } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';

import { FormfieldBase } from './model/formfield-base';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatFormField, MatLabel, MatError, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
    selector: 'mifosx-formfield',
    templateUrl: './formfield.component.html',
    styleUrls: ['./formfield.component.scss'],
    imports: [FlexModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatSelect, MatOption, MatError, MatDatepickerInput, MatDatepickerToggle, MatSuffix, MatDatepicker, MatCheckbox]
})
export class FormfieldComponent implements OnInit {

  readonly form = input<UntypedFormGroup>(undefined);
  @Input() formfield: FormfieldBase;

  constructor() { }

  ngOnInit() {
  }

}
