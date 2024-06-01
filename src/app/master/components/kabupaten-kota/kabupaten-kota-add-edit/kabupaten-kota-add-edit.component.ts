import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-kabupaten-kota-add-edit',
  templateUrl: './kabupaten-kota-add-edit.component.html',
  styleUrls: ['./kabupaten-kota-add-edit.component.css'],
})
export class KabupatenKotaAddEditComponent implements OnInit {
  provinceLookup = new FormControl('');
  /**
   *
   */
  constructor(
    public fb: FormBuilder,
    private _dialogRef: MatDialogRef<KabupatenKotaAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    console.log(this.data);
  }

  kabupatenKotaAddEditForm = this.fb.group({
    provinsiLookup: '',
    code: '',
    name: '',
  });

  save() {
    if (this.kabupatenKotaAddEditForm.valid) {
      if (this.data) {
        //Update
      } else {
        //New
        console.log(this.kabupatenKotaAddEditForm.value);
      }
      this._dialogRef.close(true);
    }
  }
}
