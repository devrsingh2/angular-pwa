import { TestBed } from '@angular/core/testing';

import { ProceedToPayService } from './proceed-to-pay.service';

describe('ProceedToPayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProceedToPayService = TestBed.get(ProceedToPayService);
    expect(service).toBeTruthy();
  });
});
