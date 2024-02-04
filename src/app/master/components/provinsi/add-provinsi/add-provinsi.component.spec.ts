import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProvinsiComponent } from './add-provinsi.component';

describe('AddProvinsiComponent', () => {
  let component: AddProvinsiComponent;
  let fixture: ComponentFixture<AddProvinsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProvinsiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProvinsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
