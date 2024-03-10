import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKabupatenKotaComponent } from './add-kabupaten-kota.component';

describe('AddKabupatenKotaComponent', () => {
  let component: AddKabupatenKotaComponent;
  let fixture: ComponentFixture<AddKabupatenKotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddKabupatenKotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddKabupatenKotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
