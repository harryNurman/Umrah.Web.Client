import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css'],
})
export class AlertDialogComponent {
  message: string = '';
  cancelButtonText = 'Cancel';
  height: string = '';
  width: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AlertDialogComponent>
  ) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
      if (data.height) {
        this.height = data.height;
      }

      if (data.width) {
        this.width = data.width;
      }
    }
    this.height = this.height === '' ? '150px' : this.height;
    this.width = this.width === '' ? '300px' : this.width;
    console.log(this.width);
    console.log(this.height);
    this.dialogRef.updateSize(this.width, this.height);
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
