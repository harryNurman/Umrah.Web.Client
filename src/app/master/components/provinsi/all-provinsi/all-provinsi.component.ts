import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProvinsiModel } from 'src/app/model/ProvinsiModel';
import { ProvinsiService } from 'src/app/service/provinsi.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AlertDialogComponent } from 'src/app/shared/components/dialog/alert-dialog/alert-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/dialog/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-provinsi',
  templateUrl: './all-provinsi.component.html',
  styleUrls: ['./all-provinsi.component.css'],
})
export class AllProvinsiComponent implements OnInit, AfterViewInit {
  value = 0;
  loading = true;
  provinces: ProvinsiModel[] = [];
  displayedColumns: string[] = ['id', 'code', 'name', 'timeZoneInfo', 'action'];

  dataSource = new MatTableDataSource<ProvinsiModel>(this.provinces);

  // @ViewChild(MatPaginator)
  // set paginator(value: MatPaginator) {
  //   this.dataSource.paginator = value;
  // }

  constructor(
    private provinceService: ProvinsiService,
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
    this.provinceService.getProvinces().subscribe({
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
        this.openAlertDialog(e.message);
      },
      complete: () => {},
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //console.log(filterValue);

    this.dataSource.filter = filterValue.trim();
    //console.log(this.dataSource);
  }

  getRecord(model: any) {
    alert(model.id);
    var id = model.id.toString();
    this.router.navigateByUrl(`master/provinsi/edit/${id}`);
  }

  deleteRecord(name: string) {
    alert(name);
  }

  openAlertDialog(message: string) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        message: message,
        height: '200px',
        buttonText: {
          cancel: 'OK',
        },
      },
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: '100px',
      width: '100px',
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Save',
          cancel: 'No',
        },
      },
    });
  }
}
