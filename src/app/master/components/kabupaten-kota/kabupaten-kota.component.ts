import {
  AfterViewInit,
  Component,
  ComponentRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProvinceData, ProvinsiModel } from 'src/app/model/ProvinsiModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AlertDialogComponent } from 'src/app/shared/components/dialog/alert-dialog/alert-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/dialog/confirmation-dialog/confirmation-dialog.component';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
} from '@angular/material/dialog';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, filter, map, startWith, switchMap, tap } from 'rxjs';
import { ProvinceService } from 'src/app/service/province.service';
import { SearchColumn } from 'src/app/model/SearchColumn';
import { KabupatenKotaService } from 'src/app/service/kabupaten-kota.service';

@Component({
  selector: 'app-kabupaten-kota',
  templateUrl: './kabupaten-kota.component.html',
  styleUrls: ['./kabupaten-kota.component.css'],
})
export class KabupatenKotaComponent {
  value = 0;
  loading = true;

  pageNo: number = 1;
  pageSize: number = 10;
  provinces: ProvinsiModel[] = [];
  // provincesTable!: ProvinceData;
  displayedColumns: string[] = [
    'Id',
    'ProvinceName',
    'Code',
    'Name',
    'TimeZoneInfo',
    'Action',
  ];
  pageSizes = [3, 5, 7];
  totalData: number = 0;
  pageEvent: PageEvent;
  searchColumn: string = '';
  searchValue: string = '';

  //dataSource = new MatTableDataSource<ProvinsiModel>(this.provinces);
  provinceData: ProvinceData;
  dataSource = new MatTableDataSource<ProvinsiModel>(this.provinces);

  confirmDialog: MatDialogRef<ConfirmationDialogComponent>;
  @ViewChild('paginator') paginator: MatPaginator;
  searchColumnsList: SearchColumn[] = [
    { value: 'Name', viewValue: 'Name' },
    { value: 'Code', viewValue: 'Code' },
  ];

  /**
   *
   */
  constructor(
    private kabupatenKotaService: KabupatenKotaService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let pageSize = event.pageSize;
    this.pageSize = pageSize;
    page = page + 1;

    // this.kabupatenKotaService
    //   .getListTable(this.searchColumn, this.searchValue, page, pageSize)
    //   .pipe(
    //     map((provinceResult: ProvinceData) => {
    //       this.provinceData = provinceResult;
    //       this.totalData = provinceResult.TotalRows;
    //       //console.log(this.provinceData);
    //       this.dataSource = new MatTableDataSource(provinceResult.Data);
    //     })
    //   )
    //   .subscribe();
  }
}
