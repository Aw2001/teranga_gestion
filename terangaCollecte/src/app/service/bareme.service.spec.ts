import { TestBed } from '@angular/core/testing';

import { BaremeService } from './bareme.service';

describe('BaremeService', () => {
  let service: BaremeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaremeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
