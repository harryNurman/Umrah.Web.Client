import { Component, OnInit } from '@angular/core';
import { ProvinsiModel } from 'src/app/model/ProvinsiModel';
import { ProvinsiService } from 'src/app/service/provinsi.service';

@Component({
  selector: 'app-all-provinsi',
  templateUrl: './all-provinsi.component.html',
  styleUrls: ['./all-provinsi.component.css'],
})
export class AllProvinsiComponent implements OnInit {
  provinces: ProvinsiModel[] = [];

  constructor(private provinceService: ProvinsiService) {}
  ngOnInit(): void {
    this.getProvincesList();
  }

  getProvincesList() {
    this.provinceService.getProvinces().subscribe((response) => {
      this.provinces = response;
      console.log(this.provinces);
    });
  }
}
