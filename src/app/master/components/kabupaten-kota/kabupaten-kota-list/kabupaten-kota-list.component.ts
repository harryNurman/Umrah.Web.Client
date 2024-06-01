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
import { FormBuilder } from '@angular/forms';
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
import {
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { ProvinceService } from 'src/app/service/province.service';
import { SearchColumn } from 'src/app/model/SearchColumn';
import { KabupatenKotaService } from 'src/app/service/kabupaten-kota.service';
import {
  KabuapatenKotaData,
  KabupatenKotaModel,
} from 'src/app/model/KabupatenKotaModel';
import { EditProvinsiComponent } from '../../provinsi/edit-provinsi/edit-provinsi.component';
import { FormControl } from '@angular/forms';
import { ProvinsiModel } from 'src/app/model/ProvinsiModel';
import { KabupatenKotaAddEditComponent } from '../kabupaten-kota-add-edit/kabupaten-kota-add-edit.component';

@Component({
  selector: 'app-kabupaten-kota-list',
  templateUrl: './kabupaten-kota-list.component.html',
  styleUrls: ['./kabupaten-kota-list.component.css'],
})
export class KabupatenKotaListComponent implements OnInit {
  value = 0;
  loading = true;

  pageNo: number = 1;
  pageSize: number = 10;
  modelList: KabupatenKotaModel[] = [];
  // provincesTable!: ProvinceData;
  displayedColumns: string[] = [
    'Id',
    'ProvinceName',
    'KabupatenCode',
    'KabupatenName',
    'Action',
  ];
  provinceCode: string = '';
  pageSizes = [3, 5, 7];
  totalData: number = 0;
  pageEvent: PageEvent;
  searchColumn: string = '';
  searchValue: string = '';
  selectedProvice: ProvinsiModel;

  data: KabuapatenKotaData;
  dataSource = new MatTableDataSource<KabupatenKotaModel>(this.modelList);

  kabupatenKotaForm = this.fb.group({
    provinsiLookup: '',
    searchKabupatenKotaBy: '',
    searchValueText: '',
  });

  confirmDialog: MatDialogRef<ConfirmationDialogComponent>;
  @ViewChild('paginator') paginator: MatPaginator;
  searchColumnsList: SearchColumn[] = [
    { value: 'Name', viewValue: 'Name' },
    { value: 'Code', viewValue: 'Code' },
  ];

  provinceLookup = new FormControl('');

  options = [];
  filteredProvinsi$: Observable<ProvinsiModel[]>;

  /**
   *
   */
  constructor(
    private kabupatenKotaService: KabupatenKotaService,
    private provinceService: ProvinceService,
    public dialog: MatDialog,
    private router: Router,
    public fb: FormBuilder
  ) {}

  lookup(val: string): Observable<ProvinsiModel[]> {
    var pageNo = 1;
    var pageSize = 20;
    let params = new HttpParams()
      .set('searchColumn', this.searchColumn.toString())
      .set('searchValue', val.toString())
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString());

    return this.provinceService.getList(params).pipe(
      map((response) =>
        response.Data.filter((option) => {
          return option;
        })
      )
    );
  }

  ngOnInit(): void {
    this.filteredProvinsi$ = this.provinceLookup.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((val) => {
        return this.lookup(val || '');
      })
    );
    this.initDataSource();
  }

  searchByValue(value: string) {
    //console.log(this.searchValue);
  }

  search(event: Event) {
    this.initDataSource();
  }

  initDataSource() {
    console.log(this.kabupatenKotaForm.value);
    var selectedProvice = this.kabupatenKotaForm.value.provinsiLookup;
    console.log(selectedProvice);

    if (this.kabupatenKotaForm.value.provinsiLookup != null) {
      this.selectedProvice = new ProvinsiModel(
        this.kabupatenKotaForm.value.provinsiLookup as unknown as ProvinsiModel
      );
    }

    //this.selectedProvice.Code = this.kabupatenKotaForm.value.provinsiLookup?.Code;
    if (selectedProvice != null || selectedProvice != undefined) {
      this.provinceCode = this.selectedProvice.Code;
    } else {
      this.provinceCode = '';
    }

    let params = new HttpParams()
      .set(
        'provinceCode',
        this.provinceCode == undefined ? '' : this.provinceCode.toString()
      )
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
          console.log(this.dataSource);
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

    const dialogRef = this.dialog.open(KabupatenKotaAddEditComponent, {
      minWidth: '300px',
      ariaModal: true,
      disableClose: true,
    });

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
    const dialogRef = this.dialog.open(KabupatenKotaAddEditComponent, {
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
  }

  displayFn(provinsi: ProvinsiModel): string {
    this.provinceCode = provinsi?.Code;
    this.selectedProvice = provinsi;
    console.log('Selected value ', this.provinceCode);
    return provinsi ? provinsi.Name : '';
  }
}
