import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './components/dialog/confirmation-dialog/confirmation-dialog.component';
import { MaterialModule } from './material.module';
import { AlertDialogComponent } from './components/dialog/alert-dialog/alert-dialog.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [ConfirmationDialogComponent, AlertDialogComponent],
  imports: [MaterialModule, BrowserModule],
  exports: [CommonModule],
})
export class SharedModule {}
