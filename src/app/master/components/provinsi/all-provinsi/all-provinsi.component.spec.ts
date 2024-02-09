import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProvinsiComponent } from './all-provinsi.component';

describe('AllProvinsiComponent', () => {
  let component: AllProvinsiComponent;
  let fixture: ComponentFixture<AllProvinsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProvinsiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProvinsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
