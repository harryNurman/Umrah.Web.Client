import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ProvinceService } from 'src/app/service/province.service';
import { ProvinsiModel } from 'src/app/model/ProvinsiModel';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-province-lookup',
  exportAs: 'appProvinceLookup',
  templateUrl: './province-lookup.component.html',
  styleUrls: ['./province-lookup.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    CommonModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProvinceLookupComponent),
      multi: true,
    },
  ],
}) // OnDestroy,
export class ProvinceLookupComponent
  implements OnInit, ControlValueAccessor, OnDestroy
{
  @Output() selected = new EventEmitter<ProvinsiModel>();
  provinceLookup = new FormControl<ProvinsiModel | undefined>(undefined);
  items: ProvinsiModel[] = [];
  filteredItems: Observable<ProvinsiModel[]>;
  //provinceLookup = new FormControl('');
  searchColumn: string = '';
  private ngUnsubscribe = new Subject<void>();
  private _selectedProvince: ProvinsiModel;
  private _readOnly: boolean = false;
  private _disabled: boolean;
  //set accessor including call the onchange callback
  @Input()
  public set selectedProvince(v: ProvinsiModel) {
    if (v !== this._selectedProvince) {
      this._selectedProvince = v;
      console.log('Province Selected from Parent', v);
      this.onChangeCallback(v);
    }
  }
  public get selectedProvince(): ProvinsiModel {
    return this._selectedProvince;
  }

  @Input()
  public set isProvinceLookupReadOnly(v: boolean) {
    if (v !== this._readOnly) {
      this._readOnly = v;
    }
  }

  public get isProvinceLookupReadOnly(): boolean {
    //console.log('Is ReadOnly', this._readOnly);
    return this._readOnly;
  }

  /**
   *
   */
  constructor(private provinceService: ProvinceService) {}

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private onChangeCallback: (_: ProvinsiModel | undefined) => void = () => {};
  private onTouchedCallback: () => void = () => {};

  onOptionSelected(option: ProvinsiModel) {
    // console.log('on Option Selected', option);
    this.onChangeCallback(option);
  }

  writeValue(item: ProvinsiModel | undefined): void {
    this.provinceLookup.setValue(item);
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // console.log('isDisabled', isDisabled);
    // this._disabled = isDisabled;
  }

  ngOnInit(): void {
    this.filteredItems = this.provinceLookup.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((val) => {
        return this.lookup(val || '');
      })
    );
  }

  lookup(val: any): Observable<ProvinsiModel[]> {
    console.log(val);
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

  display(item: ProvinsiModel): string {
    return item ? item.Name : '';
  }
}
