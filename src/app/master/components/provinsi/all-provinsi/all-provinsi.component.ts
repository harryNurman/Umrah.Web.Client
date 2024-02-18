import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProvinsiModel } from 'src/app/model/ProvinsiModel';
import { ProvinsiService } from 'src/app/service/provinsi.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-all-provinsi',
  templateUrl: './all-provinsi.component.html',
  styleUrls: ['./all-provinsi.component.css'],
})
export class AllProvinsiComponent implements OnInit, AfterViewInit {
  provinces: ProvinsiModel[] = [];
  displayedColumns: string[] = [
    'id',
    'code',
    'name',
    'timeZoneInfo',
    'getDetails',
  ];

  dataSource = new MatTableDataSource<ProvinsiModel>(this.provinces);

  // @ViewChild(MatPaginator)
  // set paginator(value: MatPaginator) {
  //   this.dataSource.paginator = value;
  // }

  constructor(private provinceService: ProvinsiService) {}

  ngAfterViewInit(): void {
    //this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.getProvincesList();
  }

  getProvincesList() {
    this.provinceService.getProvinces().subscribe((response) => {
      this.provinces = response;
      this.dataSource.data = this.provinces;
      // setTimeout(() => {
      //   this.dataSource.paginator = this.paginator;
      //   console.log(this.dataSource);
      // });
      //console.log(this.provinces);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);

    this.dataSource.filter = filterValue.trim();
    console.log(this.dataSource);
  }

  getRecord(name: string) {
    alert(name);
  }
}
