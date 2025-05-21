import { TestBed } from '@angular/core/testing';

import { DecretService } from './decret.service';

describe('DecretService', () => {
  let service: DecretService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecretService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
