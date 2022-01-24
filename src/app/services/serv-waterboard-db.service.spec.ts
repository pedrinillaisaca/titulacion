import { TestBed } from '@angular/core/testing';

import { ServWaterboardDbService } from './serv-waterboard-db.service';

describe('ServWaterboardDbService', () => {
  let service: ServWaterboardDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServWaterboardDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
