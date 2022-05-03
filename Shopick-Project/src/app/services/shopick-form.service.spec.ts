import { TestBed } from '@angular/core/testing';

import { ShopickFormService } from './shopick-form.service';

describe('ShopickFormService', () => {
  let service: ShopickFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopickFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
