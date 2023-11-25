import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { MasterComponent } from './master/master.component';
import { ProvinsiComponent } from './master/components/provinsi/provinsi.component';
import { HomeComponent } from './public/components/home/home.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [{ path: '', component: HomeComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
