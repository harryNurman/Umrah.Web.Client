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
import { EditProvinsiComponent } from '../edit-provinsi/edit-provinsi.component';
import { AddProvinsiComponent } from '../add-provinsi/add-provinsi.component';

@Component({
  selector: 'app-all-provinsi',
  templateUrl: './all-provinsi.component.html',
  styleUrls: ['./all-provinsi.component.css'],
})
export class AllProvinsiComponent implements OnInit, AfterViewInit {
  value = 0;
  loading = true;

  pageNo: number = 1;
  pageSize: number = 10;
  provinces: ProvinsiModel[] = [];
  // provincesTable!: ProvinceData;
  displayedColumns: string[] = ['Id', 'Code', 'Name', 'TimeZoneInfo', 'Action'];
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

  constructor(
    private provinceService: ProvinceService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  initDataSource() {
    this.provinceService
      .getListTable(
        this.searchColumn,
        this.searchValue,
        this.pageNo,
        this.pageSize
      )
      .pipe(
        //tap((provinces) => console.log(provinces)),
        map((provinceData: ProvinceData) => {
          console.log(provinceData);
          this.provinceData = provinceData;
          this.totalData = provinceData.TotalRows;
          this.pageSize = provinceData.PageSize;
          this.dataSource = new MatTableDataSource(provinceData.Data);
          //console.log(this.dataSource);
        })
      )
      .subscribe();
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let pageSize = event.pageSize;
    this.pageSize = pageSize;
    page = page + 1;

    this.provinceService
      .getListTable(this.searchColumn, this.searchValue, page, pageSize)
      .pipe(
        map((provinceResult: ProvinceData) => {
          this.provinceData = provinceResult;
          this.totalData = provinceResult.TotalRows;
          //console.log(this.provinceData);
          this.dataSource = new MatTableDataSource(provinceResult.Data);
        })
      )
      .subscribe();
  }
  ngAfterViewInit(): void {
    this.initDataSource();
  }

  ngOnInit(): void {
    this.initDataSource();
  }

  getRecord(model: any) {
    //alert(model.Id);
    var Id = model.Id.toString();
    this.router.navigateByUrl(`master/provinsi/edit/${Id}`);
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
        this.deleteProvice(model.Id, model.Name);
      }
    });
  }

  deleteProvice(id: number, name: string) {
    this.loading = true;
    this.provinceService.delete(id).subscribe({
      next: () => {
        this.loading = false;
        this.dialog.open(AlertDialogComponent, {
          data: {
            title: 'Success',
            message: `Province ${name} deleted successfully`,
            height: '200px',
            width: '350px',
            buttonText: {
              cancelButtonText: 'OK',
            },
          },
        });
        this.initDataSource();
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this.dialog.open(AlertDialogComponent, {
          data: {
            title: 'Error',
            message: e.message,
            height: '200px',
            width: '300px',
            buttonText: {
              cancelButtonText: 'OK',
            },
          },
        });
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  searchByCriteria($event: any, value: SearchColumn) {
    //console.log(this.searchColumn);
  }

  searchByValue(value: string) {
    //console.log(this.searchValue);
  }

  searchProvince(event: Event) {
    //console.log('search');
    this.initDataSource();
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

  openAddForm() {
    //console.log(data);
    const dialogRef = this.dialog.open(AddProvinsiComponent);

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        console.log(val);
        if (val) {
          this.initDataSource();
        }
      },
    });
  }
}
