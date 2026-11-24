/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

/**
 * Custom file upload component based on angular material.
 */
@Component({
    selector: 'mifosx-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss'],
    imports: [FlexModule, MatFormField, MatInput, MatButton, FaIconComponent]
})
export class FileUploadComponent implements OnInit {

  /** Name of file. */
  fileName = '';

  constructor() { }

  ngOnInit() {
  }

  /**
   * Uploads a file.
   * @param {any} event The file input change event.
   */
  onFileSelected($event: any) {
    this.fileName = $event.target.files[0].name;
  }

}
