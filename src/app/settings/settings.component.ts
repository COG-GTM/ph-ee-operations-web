/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { FileUploadComponent } from '../shared/file-upload/file-upload.component';
import { ThemePickerComponent } from '../shared/theme-picker/theme-picker.component';

/**
 * Settings component.
 */
@Component({
    selector: 'mifosx-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    imports: [MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, FlexModule, MatFormField, MatLabel, MatInput, MatSelect, MatOption, FileUploadComponent, ThemePickerComponent]
})
export class SettingsComponent implements OnInit {

  /** Placeholder for languages. */
  languages: any;
  /** Placeholder for date formats. */
  dateFormats: any;
  /** Placeholder for fonts. */
  fonts: any;

  constructor() { }

  ngOnInit() {
  }

}
