import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { PublicComponent } from './public.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomeComponent,
    PublicComponent
  ],
  imports: [
    RouterModule
  ]
})
export class PublicModule { }
