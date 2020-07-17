import { TestBed } from '@angular/core/testing';

import { UriProxyService } from './uri-proxy.service';

describe('UriProxyService', () => {
  let service: UriProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UriProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
