import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './public/components/home/home.component';
import { PublicComponent } from './public/public.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, children:[
    {path: '',component:HomeComponent}
  ] },
  { path: 'Home', component: HomeComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
