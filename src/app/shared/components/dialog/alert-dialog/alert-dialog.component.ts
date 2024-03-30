import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css'],
})
export class AlertDialogComponent {
  title: string = '';
  message: string = '';
  cancelButtonText = 'Cancel';
  height: string = '';
  width: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AlertDialogComponent>
  ) {
    if (data) {
      this.title = data.title || this.title;
      this.message = data.message || this.message;
      console.log(data);
      if (data.buttonText.cancelButtonText) {
        this.cancelButtonText = this.data.buttonText.cancelButtonText;
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
    // console.log(this.width);
    // console.log(this.height);
    this.dialogRef.updateSize(this.width, this.height);
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
