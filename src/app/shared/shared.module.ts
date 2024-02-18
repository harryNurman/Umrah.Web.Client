import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './components/dialog/confirmation-dialog/confirmation-dialog.component';
import { MaterialModule } from './material.module';
import { AlertDialogComponent } from './components/dialog/alert-dialog/alert-dialog.component';

@NgModule({
  declarations: [ConfirmationDialogComponent, AlertDialogComponent],
  imports: [MaterialModule],
  exports: [CommonModule],
})
export class SharedModule {}
