import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKabupatenKotaComponent } from './edit-kabupaten-kota.component';

describe('EditKabupatenKotaComponent', () => {
  let component: EditKabupatenKotaComponent;
  let fixture: ComponentFixture<EditKabupatenKotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditKabupatenKotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditKabupatenKotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
