import { NgModule } from '@angular/core';
import { MasterComponent } from './master.component';
import { ProvinsiComponent } from './components/provinsi/provinsi.component';
import { RouterModule } from '@angular/router';
import { KabupatenKotaComponent } from './components/kabupaten-kota/kabupaten-kota.component';
import { KecamatanComponent } from './components/kecamatan/kecamatan.component';
import { KelurahanComponent } from './components/kelurahan/kelurahan.component';
import { MasterRoutingModule } from './master-routing.module';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AddProvinsiComponent } from './components/provinsi/add-provinsi/add-provinsi.component';
import { SharedModule } from '../shared/shared.module';
import { AllProvinsiComponent } from './components/provinsi/all-provinsi/all-provinsi.component';
import { MaterialModule } from '../shared/material.module';
import { ProvinceService } from '../service/province.service';
import { EditProvinsiComponent } from './components/provinsi/edit-provinsi/edit-provinsi.component';
import { KabupatenKotaListComponent } from './components/kabupaten-kota/kabupaten-kota-list/kabupaten-kota-list.component';
import { AddKabupatenKotaComponent } from './components/kabupaten-kota/add-kabupaten-kota/add-kabupaten-kota.component';
import { EditKabupatenKotaComponent } from './components/kabupaten-kota/edit-kabupaten-kota/edit-kabupaten-kota.component';

@NgModule({
  declarations: [
    MasterComponent,
    ProvinsiComponent,
    KabupatenKotaComponent,
    KecamatanComponent,
    KelurahanComponent,
    AddProvinsiComponent,
    AllProvinsiComponent,
    EditProvinsiComponent,
    KabupatenKotaListComponent,
    AddKabupatenKotaComponent,
    EditKabupatenKotaComponent,
  ],
  imports: [
    RouterModule,
    MasterRoutingModule,
    FormsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [],
  providers: [ProvinceService],
})
export class MasterModule {}
