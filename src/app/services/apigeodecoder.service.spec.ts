import { TestBed } from '@angular/core/testing';

import { ApigeodecoderService } from './apigeodecoder.service';

describe('ApigeodecoderService', () => {
  let service: ApigeodecoderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApigeodecoderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
