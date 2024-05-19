import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceLookupComponent } from './province-lookup.component';

describe('ProvinceLookupComponent', () => {
  let component: ProvinceLookupComponent;
  let fixture: ComponentFixture<ProvinceLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvinceLookupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvinceLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
