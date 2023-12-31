import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './master.component';
import { ProvinsiComponent } from './components/provinsi/provinsi.component';
import { KabupatenKotaComponent } from './components/kabupaten-kota/kabupaten-kota.component';
import { KecamatanComponent } from './components/kecamatan/kecamatan.component';
import { KelurahanComponent } from './components/kelurahan/kelurahan.component';
import { ErrorComponent } from '../error/error.component';

const appRoutes: Routes = [
  {
    path: 'master',
    component: MasterComponent,
    children: [
      { path: 'provinsi', component: ProvinsiComponent },
      { path: 'kabupaten', component: KabupatenKotaComponent },
      { path: 'kecamatan', component: KecamatanComponent },
      { path: 'kelurahan', component: KelurahanComponent },
    ],
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
})
export class MasterRoutingModule {}
