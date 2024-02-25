import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatRecycleRows } from '@angular/material/table';
import { ProvinsiModel } from 'src/app/model/ProvinsiModel';
import { ProvinsiService } from 'src/app/service/provinsi.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/shared/components/dialog/alert-dialog/alert-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/dialog/confirmation-dialog/confirmation-dialog.component';
import { NgForm } from '@angular/forms';

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
    private provinsiService: ProvinsiService,
    public dialog: MatDialog
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
      this.provinsiService.postProvince(this.province).subscribe(
        (response) => {
          console.log('POST call reponse', response);
          this.openAlertDialog('Save successfully');
        },
        (err: HttpErrorResponse) => {
          this.openAlertDialog(err.error);
          //console.log(err.error);
        }
      );
    } else {
      console.log(this.myForm);
      alert('Form is invalid');
    }
  }

  openAlertDialog(message: string) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        message: message,
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
