import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-kabupaten-kota-add-edit',
  templateUrl: './kabupaten-kota-add-edit.component.html',
  styleUrls: ['./kabupaten-kota-add-edit.component.css'],
})
export class KabupatenKotaAddEditComponent {
  provinceLookup = new FormControl('');
  /**
   *
   */
  constructor(public fb: FormBuilder) {}

  kabupatenKotaAddEditForm = this.fb.group({
    provinsiLookup: '',
    searchKabupatenKotaBy: '',
    searchValueText: '',
  });
}
