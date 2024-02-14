import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProvinsiService } from 'src/app/service/provinsi.service';

@Component({
  selector: 'app-add-provinsi',
  templateUrl: './add-provinsi.component.html',
  styleUrls: ['./add-provinsi.component.css'],
})
export class AddProvinsiComponent implements OnInit, AfterViewChecked {
  @ViewChild('myForms') myForm: ElementRef | undefined;

  /**
   *
   */
  constructor(private provinsiService: ProvinsiService) {}
  ngAfterViewChecked(): void {
    //console.log(this.myForm);
  }
  ngOnInit(): void {}
  saveProvinsi(myForm: any): void {
    console.log(myForm);
  }
}
