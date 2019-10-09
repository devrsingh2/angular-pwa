import { TestBed } from '@angular/core/testing';

import { PrecheckoutserviceService } from './precheckoutservice.service';

describe('PrecheckoutserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrecheckoutserviceService = TestBed.get(PrecheckoutserviceService);
    expect(service).toBeTruthy();
  });
});
