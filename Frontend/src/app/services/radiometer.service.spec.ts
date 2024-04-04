import { TestBed } from '@angular/core/testing';

import { RadiometerService } from './radiometer.service';

describe('RadiometerService', () => {
  let service: RadiometerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RadiometerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
