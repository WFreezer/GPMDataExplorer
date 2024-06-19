import { TestBed } from '@angular/core/testing';

import { DownloadServiceService } from './download.service';

describe('DownloadServiceService', () => {
  let service: DownloadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
