import { NgModule } from '@angular/core';
import { MasterComponent } from './master.component';
import { ProvinsiComponent } from './components/provinsi/provinsi.component';
import { RouterModule } from '@angular/router';
import { KabupatenKotaComponent } from './components/kabupaten-kota/kabupaten-kota.component';
import { KecamatanComponent } from './components/kecamatan/kecamatan.component';
import { KelurahanComponent } from './components/kelurahan/kelurahan.component';
import { MasterRoutingModule } from './master-routing.module';

@NgModule({
  declarations: [MasterComponent, ProvinsiComponent, KabupatenKotaComponent, KecamatanComponent, KelurahanComponent],
  imports: [RouterModule, MasterRoutingModule],
})
export class MasterModule {}
