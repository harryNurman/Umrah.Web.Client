import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent {
  title: string = 'Please confirm';
  message: string = 'Are you sure?';
  confirmButtonText = 'Yes';
  cancelButtonText = 'No';
  width = '200px';
  height = '200px';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {
    if (data) {
      this.title = data.title || this.title;
      this.message = data.message || this.message;

      if (data.width) {
        this.width = data.width;
      }

      if (data.height) {
        this.height = data.height;
      }

      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }

      dialogRef.updateSize(this.width, this.height);
    }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
