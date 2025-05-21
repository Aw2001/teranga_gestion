import { TestBed } from '@angular/core/testing';

import { RecensementService } from './recensement.service';

describe('RecensementService', () => {
  let service: RecensementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecensementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
