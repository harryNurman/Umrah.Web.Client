import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule],
  exports: [MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule],
})
export class SharedModule {}
