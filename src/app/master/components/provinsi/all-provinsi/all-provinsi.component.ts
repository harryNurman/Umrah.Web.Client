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

@Component({
  selector: 'app-all-provinsi',
  templateUrl: './all-provinsi.component.html',
  styleUrls: ['./all-provinsi.component.css'],
})
export class AllProvinsiComponent implements OnInit, AfterViewInit {
  value = 0;
  loading = true;
  searchColumn: string = '';
  searchValue: string = '';
  pageNo: number = 1;
  pageSize: number = 10;
  provinces: ProvinsiModel[] = [];
  // provincesTable!: ProvinceData;
  displayedColumns: string[] = ['Id', 'Code', 'Name', 'TimeZoneInfo', 'Action'];
  pageSizes = [3, 5, 7];
  totalData: number = 0;
  pageEvent: PageEvent;

  //dataSource = new MatTableDataSource<ProvinsiModel>(this.provinces);
  provinceData: ProvinceData;
  dataSource = new MatTableDataSource<ProvinsiModel>(this.provinces);

  confirmDialog: MatDialogRef<ConfirmationDialogComponent>;
  @ViewChild('paginator') paginator: MatPaginator;
  searchColumns = [
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
      .getListTable('', '', this.pageNo, this.pageSize)
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
      .getListTable('', '', page, pageSize)
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
    //console.log(this.searchColumns);
    // this.getProvincesList$(
    //   this.searchColumn,
    //   this.searchValue,
    //   this.pageNo,
    //   this.pageSize
    // );
  }

  // getProvincesList$(
  //   searchColumn: string,
  //   searchValue: string,
  //   pageNumber: number,
  //   pageSize: number
  // ) {
  //   this.loading = true;
  //   this.provinceService
  //     .getListTable(searchColumn, searchValue, pageNumber, pageSize)
  //     .subscribe({
  //       next: (response) => {
  //         console.log(response);
  //         this.value = this.value + 10;
  //         this.provinces = response.Data;
  //         this.dataSource.data = this.provinces;
  //         this.loading = false;
  //         // setTimeout(() => {
  //         //   this.dataSource.paginator = this.paginator;
  //         //   console.log(this.dataSource);
  //         // });
  //         //console.log(this.provinces);
  //       },
  //       error: (e: HttpErrorResponse) => {
  //         this.loading = false;
  //         this.dialog.open(AlertDialogComponent, {
  //           data: {
  //             title: 'Error',
  //             message: e.message,
  //             height: '250px',
  //             width: '300px',
  //             buttonText: {
  //               cancelButtonText: 'OK',
  //             },
  //           },
  //         });
  //         //this.openAlertDialog(e.message);
  //       },
  //       complete: () => {},
  //     });
  // }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   //console.log(filterValue);

  //   this.dataSource.filter = filterValue.trim();
  //   //console.log(this.dataSource);
  // }

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
            width: '300px',
            buttonText: {
              cancelButtonText: 'OK',
            },
          },
        });
        //this.getProvincesList$();
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

  searchProvinceBy(value: string) {}
}
