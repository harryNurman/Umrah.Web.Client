import { NgModule } from '@angular/core';
import { MasterComponent } from './master.component';
import { ProvinsiComponent } from './components/provinsi/provinsi.component';
import { RouterModule } from '@angular/router';
import { KabupatenKotaComponent } from './components/kabupaten-kota/kabupaten-kota.component';
import { KecamatanComponent } from './components/kecamatan/kecamatan.component';
import { KelurahanComponent } from './components/kelurahan/kelurahan.component';
import { MasterRoutingModule } from './master-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProvinsiComponent } from './components/provinsi/add-provinsi/add-provinsi.component';
import { SharedModule } from '../shared/shared.module';
import { AllProvinsiComponent } from './components/provinsi/all-provinsi/all-provinsi.component';
import { MaterialModule } from '../shared/material.module';
import { ProvinceService } from '../service/province.service';
import { EditProvinsiComponent } from './components/provinsi/edit-provinsi/edit-provinsi.component';
import { KabupatenKotaListComponent } from './components/kabupaten-kota/kabupaten-kota-list/kabupaten-kota-list.component';
import { ProvinceLookupComponent } from '../shared/lookup/province-lookup/province-lookup.component';
import { KabupatenKotaAddEditComponent } from './components/kabupaten-kota/kabupaten-kota-add-edit/kabupaten-kota-add-edit.component';
import { MyTelInput } from '../shared/components/phone-number/phone-number.component';

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
    KabupatenKotaAddEditComponent,
  ],
  imports: [
    RouterModule,
    MasterRoutingModule,
    FormsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ProvinceLookupComponent,
    MyTelInput,
  ],
  exports: [],
  providers: [ProvinceService],
})
export class MasterModule {}
