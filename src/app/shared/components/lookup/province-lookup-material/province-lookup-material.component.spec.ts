import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceLookupMaterialComponent } from './province-lookup-material.component';

describe('ProvinceLookupMaterialComponent', () => {
  let component: ProvinceLookupMaterialComponent;
  let fixture: ComponentFixture<ProvinceLookupMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvinceLookupMaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvinceLookupMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
