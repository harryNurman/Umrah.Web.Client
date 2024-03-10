import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './master.component';
import { ProvinsiComponent } from './components/provinsi/provinsi.component';
import { KabupatenKotaComponent } from './components/kabupaten-kota/kabupaten-kota.component';
import { KecamatanComponent } from './components/kecamatan/kecamatan.component';
import { KelurahanComponent } from './components/kelurahan/kelurahan.component';
import { ErrorComponent } from '../error/error.component';
import { AddProvinsiComponent } from './components/provinsi/add-provinsi/add-provinsi.component';
import { AllProvinsiComponent } from './components/provinsi/all-provinsi/all-provinsi.component';
import { EditProvinsiComponent } from './components/provinsi/edit-provinsi/edit-provinsi.component';
import { KabupatenKotaListComponent } from './components/kabupaten-kota/kabupaten-kota-list/kabupaten-kota-list.component';
import { AddKabupatenKotaComponent } from './components/kabupaten-kota/add-kabupaten-kota/add-kabupaten-kota.component';
import { EditKabupatenKotaComponent } from './components/kabupaten-kota/edit-kabupaten-kota/edit-kabupaten-kota.component';

const appRoutes: Routes = [
  {
    path: 'master',
    component: MasterComponent,
    children: [
      {
        path: 'provinsi',
        component: ProvinsiComponent,
        children: [
          { path: '', component: AllProvinsiComponent },
          { path: 'new', component: AddProvinsiComponent },
          { path: 'edit/:id', component: EditProvinsiComponent },
        ],
      },
      {
        path: 'kabupaten',
        component: KabupatenKotaComponent,
        children: [
          { path: '', component: KabupatenKotaListComponent },
          { path: 'new', component: AddKabupatenKotaComponent },
          { path: 'edit/:id', component: EditKabupatenKotaComponent },
        ],
      },
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
