import { TestBed } from '@angular/core/testing';

import { RecherchesService } from './recherches.service';

describe('RecherchesService', () => {
  let service: RecherchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecherchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
