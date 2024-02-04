import { NgModule } from '@angular/core';
import { MasterComponent } from './master.component';
import { ProvinsiComponent } from './components/provinsi/provinsi.component';
import { RouterModule } from '@angular/router';
import { KabupatenKotaComponent } from './components/kabupaten-kota/kabupaten-kota.component';
import { KecamatanComponent } from './components/kecamatan/kecamatan.component';
import { KelurahanComponent } from './components/kelurahan/kelurahan.component';
import { MasterRoutingModule } from './master-routing.module';
import { FormsModule } from '@angular/forms';
import { AddProvinsiComponent } from './components/provinsi/add-provinsi/add-provinsi.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MasterComponent,
    ProvinsiComponent,
    KabupatenKotaComponent,
    KecamatanComponent,
    KelurahanComponent,
    AddProvinsiComponent,
  ],
  imports: [RouterModule, MasterRoutingModule, FormsModule, SharedModule],
})
export class MasterModule {}
