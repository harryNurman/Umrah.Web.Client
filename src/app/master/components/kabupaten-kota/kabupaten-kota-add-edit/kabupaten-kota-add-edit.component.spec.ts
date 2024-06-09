import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KabupatenKotaAddEditComponent } from './kabupaten-kota-add-edit.component';

describe('KabupatenKotaAddEditComponent', () => {
  let component: KabupatenKotaAddEditComponent;
  let fixture: ComponentFixture<KabupatenKotaAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KabupatenKotaAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KabupatenKotaAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
