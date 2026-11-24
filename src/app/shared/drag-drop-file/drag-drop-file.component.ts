import { Component, output } from '@angular/core';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { FlexModule } from '@angular/flex-layout/flex';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'mifosx-drag-drop-file',
    templateUrl: './drag-drop-file.component.html',
    styleUrls: ['./drag-drop-file.component.scss'],
    imports: [NgxFileDropModule, FlexModule, FaIconComponent, TranslateModule]
})
export class DragDropFileComponent {

  readonly onFileChange = output<File>();

  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          this.onFileChange.emit(file);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  public fileOver(event: any) { }

  public fileLeave(event: any) { }

}
