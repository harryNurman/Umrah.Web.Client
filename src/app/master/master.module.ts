import { NgModule } from '@angular/core';
import { MasterComponent } from './master.component';
import { ProvinsiComponent } from './components/provinsi/provinsi.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MasterComponent, ProvinsiComponent],
  imports: [RouterModule],
})
export class MasterModule {}
