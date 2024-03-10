import { TestBed } from '@angular/core/testing';

import { ProvinsiService } from './provinsi_old.service';

describe('ProvinsiService', () => {
  let service: ProvinsiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvinsiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
