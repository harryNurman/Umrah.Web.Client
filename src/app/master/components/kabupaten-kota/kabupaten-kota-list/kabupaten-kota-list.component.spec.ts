import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KabupatenKotaListComponent } from './kabupaten-kota-list.component';

describe('KabupatenKotaListComponent', () => {
  let component: KabupatenKotaListComponent;
  let fixture: ComponentFixture<KabupatenKotaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KabupatenKotaListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KabupatenKotaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
