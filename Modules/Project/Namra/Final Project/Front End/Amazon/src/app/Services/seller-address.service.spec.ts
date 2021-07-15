import { TestBed } from '@angular/core/testing';

import { SellerAddressService } from './seller-address.service';

describe('SellerAddressService', () => {
  let service: SellerAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
