import { TestBed } from '@angular/core/testing';

import { ShopickService } from './shopick.service';

describe('ShopickService', () => {
  let service: ShopickService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopickService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
