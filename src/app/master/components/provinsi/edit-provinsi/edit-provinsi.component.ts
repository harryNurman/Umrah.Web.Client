import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProvinsiModel } from 'src/app/model/ProvinsiModel';
import { AlertDialogComponent } from 'src/app/shared/components/dialog/alert-dialog/alert-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/dialog/confirmation-dialog/confirmation-dialog.component';
import { NgForm } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ProvinceService } from 'src/app/service/province.service';

@Component({
  selector: 'app-edit-provinsi',
  templateUrl: './edit-provinsi.component.html',
  styleUrls: ['./edit-provinsi.component.css'],
})
export class EditProvinsiComponent implements OnInit {
  /**
   *
   */

  @ViewChild('myForm') myForm: NgForm | undefined;
  province = <ProvinsiModel>{};
  provinceId?: number = undefined;
  ProvinceName: String = '';
  Id?: number = undefined;

  constructor(
    private provinsiService: ProvinceService,
    private activatedRouter: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private dialogRef: MatDialogRef<EditProvinsiComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    if (this.data) {
      this.Id = this.data.Id;
      if (this.Id != undefined) {
        this.getProvince(this.Id);
        this.dialogRef.updateSize('400px', '450px');
      }
    }
    // this.activatedRouter.params.subscribe({
    //   next: (param) => {
    //     console.log(param);
    //     this.provinceId = param['id'];
    //     console.log(this.provinceId);
    //     if (this.provinceId != undefined) {
    //       this.getProvince(this.provinceId);
    //     }
    //   },
    // });
  }

  getProvince(id: number) {
    this.provinsiService.get(id).subscribe({
      next: (response) => {
        //console.log('Get call reponse', response);
        this.province = response;
        console.log(this.province);
        //console.log(this.myForm);
        if (this.myForm != undefined) {
          //console.log(this.myForm.value);
          //console.log(response.Code);
          this.myForm.value.code = this.province.Code;
          this.myForm.controls['code'].setValue(this.province.Code);
          this.myForm.controls['name'].setValue(this.province.Name);
          this.myForm.controls['timeZoneInfo'].setValue(
            this.province.TimeZoneInfo
          );
          console.log(this.myForm.value);
        }
      },
      error: (e) => this.openAlertDialog(e.error),
      complete: () => {},
    });
  }

  saveProvinsi(myForm: any): void {
    if (this.myForm?.valid && this.province != undefined) {
      this.province.Code = myForm.code.toString();
      this.province.Name = myForm.name;
      this.province.TimeZoneInfo = myForm.timeZoneInfo;
      console.log(this.province);
      this.provinsiService.update(this.province).subscribe({
        next: (response) => {
          //console.log('PUT call reponse', response);
          //this.openAlertDialog('Save successfully');
          this.dialog.open(AlertDialogComponent, {
            data: {
              message: 'Updated successfully',
              height: '200px',
              width: '300px',
              title: 'Success',
              buttonText: {
                cancel: 'OK',
              },
            },
          });
          this.router.navigateByUrl(`master/provinsi`);
        },
        error: (e) => this.openAlertDialog(e.error),
        complete: () => {},
      });
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
