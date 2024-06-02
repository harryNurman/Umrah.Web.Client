import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProvinsiModel } from 'src/app/model/ProvinsiModel';

@Component({
  selector: 'app-kabupaten-kota-add-edit',
  templateUrl: './kabupaten-kota-add-edit.component.html',
  styleUrls: ['./kabupaten-kota-add-edit.component.css'],
})
export class KabupatenKotaAddEditComponent implements OnInit {
  provinceLookup = new FormControl('');
  provinsi: ProvinsiModel;
  isReadOnly: boolean;
  title: string;
  /**
   *
   */
  constructor(
    public fb: FormBuilder,
    private _dialogRef: MatDialogRef<KabupatenKotaAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    //console.log(this.data);
    if (this.data) {
      this.title = 'Update';
      this.provinsi = {
        Id: 0,
        Code: this.data.ProvinceCode,
        Name: this.data.ProvinceName,
        TimeZoneInfo: '',
        CreatedAt: new Date(2000, 1, 1),
      };
      this.isReadOnly = true;
      //console.log('provinsi edit:', this.provinsi);

      this.kabupatenKotaAddEditForm.setValue({
        provinsiLookup: this.provinsi,
        code: this.data.Code,
        name: this.data.Name,
      });
    } else {
      this.title = 'Add';
    }
  }

  kabupatenKotaAddEditForm = this.fb.group({
    provinsiLookup: undefined,
    code: '',
    name: '',
  });

  save() {
    if (this.kabupatenKotaAddEditForm.valid) {
      if (this.data) {
        //Update
        console.log('Update', this.kabupatenKotaAddEditForm.value);
      } else {
        //New
        console.log('Save New');
        console.log(this.kabupatenKotaAddEditForm.value);
      }
      this._dialogRef.close(true);
    }
  }
}
