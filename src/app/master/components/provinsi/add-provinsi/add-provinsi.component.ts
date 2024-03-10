import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatRecycleRows } from '@angular/material/table';
import { ProvinsiModel } from 'src/app/model/ProvinsiModel';
import { AlertDialogComponent } from 'src/app/shared/components/dialog/alert-dialog/alert-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/dialog/confirmation-dialog/confirmation-dialog.component';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProvinceService } from 'src/app/service/province.service';

@Component({
  selector: 'app-add-provinsi',
  templateUrl: './add-provinsi.component.html',
  styleUrls: ['./add-provinsi.component.css'],
})
export class AddProvinsiComponent implements OnInit, AfterViewChecked {
  @ViewChild('myForm') myForm: NgForm | undefined;
  province = <ProvinsiModel>{};
  /**
   *
   */
  constructor(
    private provinsiService: ProvinceService,
    public dialog: MatDialog,
    private router: Router
  ) {}
  ngAfterViewChecked(): void {
    //console.log(this.myForm);
  }
  ngOnInit(): void {}

  saveProvinsi(myForm: any): void {
    if (this.myForm?.valid) {
      this.province.Code = myForm.code.toString();
      this.province.Name = myForm.name;
      this.province.TimeZoneInfo = myForm.timeZoneInfo;
      console.log(this.province);
      this.provinsiService.add(this.province).subscribe({
        next: (response) => {
          //console.log('POST call reponse', response);
          //this.openAlertDialog('Save successfully');
          this.dialog.open(AlertDialogComponent, {
            data: {
              title: 'Success',
              message: 'Saved successfully',
              width: '200px',
              height: '300px',
              buttonText: {
                cancel: 'OK',
              },
            },
          });
          this.router.navigateByUrl(`master/provinsi`);
        },
        error: (e) => {
          this.dialog.open(AlertDialogComponent, {
            data: {
              title: 'Error',
              message: e.error,
              width: '300px',
              height: '200px',
              buttonText: {
                cancel: 'OK',
              },
            },
          });
        },
        complete: () => {},
      });
    } else {
      console.log(this.myForm);
      alert('Form is invalid');
    }
  }
}
