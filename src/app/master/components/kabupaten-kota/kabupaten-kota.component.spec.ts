import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KabupatenKotaComponent } from './kabupaten-kota.component';

describe('KabupatenKotaComponent', () => {
  let component: KabupatenKotaComponent;
  let fixture: ComponentFixture<KabupatenKotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KabupatenKotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KabupatenKotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
