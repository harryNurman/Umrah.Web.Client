import {
  AfterViewInit,
  Component,
  ComponentRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AlertDialogComponent } from 'src/app/shared/components/dialog/alert-dialog/alert-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/dialog/confirmation-dialog/confirmation-dialog.component';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
} from '@angular/material/dialog';
import {
  HttpErrorResponse,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, filter, map, startWith, switchMap, tap } from 'rxjs';
import { ProvinceService } from 'src/app/service/province.service';
import { SearchColumn } from 'src/app/model/SearchColumn';
import { KabupatenKotaService } from 'src/app/service/kabupaten-kota.service';
import {
  KabuapatenKotaData,
  KabupatenKotaModel,
} from 'src/app/model/KabupatenKotaModel';
import { AddKabupatenKotaComponent } from '../add-kabupaten-kota/add-kabupaten-kota.component';
import { EditProvinsiComponent } from '../../provinsi/edit-provinsi/edit-provinsi.component';

@Component({
  selector: 'app-kabupaten-kota-list',
  templateUrl: './kabupaten-kota-list.component.html',
  styleUrls: ['./kabupaten-kota-list.component.css'],
})
export class KabupatenKotaListComponent {
  value = 0;
  loading = true;

  pageNo: number = 1;
  pageSize: number = 10;
  modelList: KabupatenKotaModel[] = [];
  // provincesTable!: ProvinceData;
  displayedColumns: string[] = [
    'Id',
    'ProvinceName',
    'Code',
    'Name',
    'TimeZoneInfo',
    'Action',
  ];
  provinceCode: string = '';
  pageSizes = [3, 5, 7];
  totalData: number = 0;
  pageEvent: PageEvent;
  searchColumn: string = '';
  searchValue: string = '';

  data: KabuapatenKotaData;
  dataSource = new MatTableDataSource<KabupatenKotaModel>(this.modelList);

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

  searchByValue(value: string) {
    //console.log(this.searchValue);
  }

  search(event: Event) {
    //console.log('search');
    this.initDataSource();
  }

  initDataSource() {
    let params = new HttpParams()
      .set('provinceCode', this.provinceCode.toString())
      .set('searchColumn', this.searchColumn.toString())
      .set('searchValue', this.searchValue.toString())
      .set('pageNo', this.pageNo.toString())
      .set('pageSize', this.pageSize.toString());

    this.kabupatenKotaService
      .getList(params)
      .pipe(
        //tap((provinces) => console.log(provinces)),
        map((result: KabuapatenKotaData) => {
          //console.log(data);
          this.data = result;
          this.totalData = result.TotalRows;
          this.pageSize = result.PageSize;
          this.dataSource = new MatTableDataSource(result.Data);
          //console.log(this.dataSource);
        })
      )
      .subscribe();
  }

  deleteRecord(model: any) {
    //console.log(model.Name);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: `Delete province ${model.Name} ?`,
      width: '300px',
      height: '200px',
    };

    this.confirmDialog = this.dialog.open(
      ConfirmationDialogComponent,
      dialogConfig
    );

    this.confirmDialog.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.deleteRecord(model);
      }
    });
  }

  openAddForm() {
    //console.log(data);
    const dialogRef = this.dialog.open(AddKabupatenKotaComponent);

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        //console.log(val);
        if (val) {
          this.initDataSource();
        }
      },
    });
  }

  openEditForm(data: any) {
    //console.log(data);
    const dialogRef = this.dialog.open(EditProvinsiComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.initDataSource();
        }
      },
    });
  }

  searchByCriteria($event: any, value: SearchColumn) {
    //console.log(this.searchColumn);
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    page = page + 1;
    let pageSize = event.pageSize;
    this.pageSize = pageSize;
    this.pageNo = page;

    this.initDataSource();
    // let params = new HttpParams()
    //   .set('provinceCode', this.provinceCode.toString())
    //   .set('searchColumn', this.searchColumn.toString())
    //   .set('searchValue', this.searchValue.toString())
    //   .set('pageNo', this.pageNo.toString())
    //   .set('pageSize', this.pageSize.toString());

    // this.kabupatenKotaService
    //   .getList(params)
    //   .pipe(
    //     map((result: KabuapatenKotaData) => {
    //       this.data = result;
    //       this.totalData = result.TotalRows;
    //       //console.log(this.data);
    //       this.dataSource = new MatTableDataSource(result.Data);
    //     })
    //   )
    //   .subscribe();
  }
}
