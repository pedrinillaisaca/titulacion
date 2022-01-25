import { TestBed } from '@angular/core/testing';

import { ServGeoWBoardDbService } from './serv-geo-wboard-db.service';

describe('ServGeoWBoardDbService', () => {
  let service: ServGeoWBoardDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServGeoWBoardDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
