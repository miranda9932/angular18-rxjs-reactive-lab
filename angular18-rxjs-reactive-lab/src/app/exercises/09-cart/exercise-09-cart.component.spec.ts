import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { PRODUCTS } from '../../core/data/products.data';
import { CartStoreService } from '../../core/services/cart-store.service';

describe('CartStoreService', () => {
  let service: CartStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartStoreService);
  });

  it('increments quantity and derived totals when the same product is added twice', async () => {
    service.add(PRODUCTS[0]);
    service.add(PRODUCTS[0]);

    const summary = await firstValueFrom(service.summary$);

    expect(summary.lines.length).toBe(1);
    expect(summary.lines[0].quantity).toBe(2);
    expect(summary.totalItems).toBe(2);
    expect(summary.totalPrice).toBe(PRODUCTS[0].price * 2);
  });
});
