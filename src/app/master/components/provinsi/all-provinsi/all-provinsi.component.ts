import {
  AfterViewInit,
  Component,
  ComponentRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProvinsiModel } from 'src/app/model/ProvinsiModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AlertDialogComponent } from 'src/app/shared/components/dialog/alert-dialog/alert-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/dialog/confirmation-dialog/confirmation-dialog.component';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
} from '@angular/material/dialog';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { ProvinceService } from 'src/app/service/province.service';

@Component({
  selector: 'app-all-provinsi',
  templateUrl: './all-provinsi.component.html',
  styleUrls: ['./all-provinsi.component.css'],
})
export class AllProvinsiComponent implements OnInit, AfterViewInit {
  value = 0;
  loading = true;
  provinces: ProvinsiModel[] = [];
  displayedColumns: string[] = ['Id', 'Code', 'Name', 'TimeZoneInfo', 'Action'];

  dataSource = new MatTableDataSource<ProvinsiModel>(this.provinces);
  confirmDialog: MatDialogRef<ConfirmationDialogComponent> | undefined;

  // @ViewChild(MatPaginator)
  // set paginator(value: MatPaginator) {
  //   this.dataSource.paginator = value;
  // }

  constructor(
    private provinceService: ProvinceService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    //this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.getProvincesList();
  }

  getProvincesList() {
    this.loading = true;
    this.provinceService.getList(1, 1).subscribe({
      next: (response) => {
        this.value = this.value + 10;
        this.provinces = response;
        this.dataSource.data = this.provinces;
        this.loading = false;
        // setTimeout(() => {
        //   this.dataSource.paginator = this.paginator;
        //   console.log(this.dataSource);
        // });
        //console.log(this.provinces);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this.dialog.open(AlertDialogComponent, {
          data: {
            title: 'Error',
            message: e.message,
            height: '250px',
            width: '300px',
            buttonText: {
              cancelButtonText: 'OK',
            },
          },
        });
        //this.openAlertDialog(e.message);
      },
      complete: () => {},
    });
  }

  // getProvincesList() {
  //   this.loading = true;
  //   this.provinceService.getProvinces().subscribe({
  //     next: (response) => {
  //       this.value = this.value + 10;
  //       this.provinces = response;
  //       this.dataSource.data = this.provinces;
  //       this.loading = false;
  //       // setTimeout(() => {
  //       //   this.dataSource.paginator = this.paginator;
  //       //   console.log(this.dataSource);
  //       // });
  //       //console.log(this.provinces);
  //     },
  //     error: (e: HttpErrorResponse) => {
  //       this.loading = false;
  //       this.dialog.open(AlertDialogComponent, {
  //         data: {
  //           title: 'Error',
  //           message: e.message,
  //           height: '250px',
  //           width: '300px',
  //           buttonText: {
  //             cancelButtonText: 'OK',
  //           },
  //         },
  //       });
  //       //this.openAlertDialog(e.message);
  //     },
  //     complete: () => {},
  //   });
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //console.log(filterValue);

    this.dataSource.filter = filterValue.trim();
    //console.log(this.dataSource);
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
        this.getProvincesList();
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
}
