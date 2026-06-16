import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { PRODUCTS } from '../../core/data/products.data';
import { Product } from '../../core/models/product.model';
import { CartStoreService } from '../../core/services/cart-store.service';

@Component({
  selector: 'app-exercise-09-cart',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './exercise-09-cart.component.html',
  styleUrls: ['./exercise-09-cart.component.scss']
})
export class Exercise09CartComponent {
  private readonly cart = inject(CartStoreService);

  readonly products = PRODUCTS.slice(0, 5);
  readonly summary$ = this.cart.summary$;

  add(product: Product): void {
    this.cart.add(product);
  }

  increase(product: Product): void {
    this.cart.add(product);
  }

  decrease(product: Product): void {
    // TODO exercise-09: usa el store para reducir cantidad del producto indicado.
    void product;
  }

  clear(): void {
    this.cart.clear();
  }
}
