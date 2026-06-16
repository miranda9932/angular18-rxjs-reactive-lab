import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { CartLine } from '../models/cart-line.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartStoreService {
  private readonly linesSubject = new BehaviorSubject<CartLine[]>([]);

  readonly lines$ = this.linesSubject.asObservable();

  readonly totalItems$: Observable<number> = of(0);
  readonly totalPrice$: Observable<number> = of(0);
  readonly summary$: Observable<{
    lines: CartLine[];
    totalItems: number;
    totalPrice: number;
  }> = of({
    lines: [],
    totalItems: 0,
    totalPrice: 0
  });

  add(product: Product): void {
    // TODO exercise-09: si ya existe, incrementa la cantidad; si no existe, crea una línea nueva.
    void product;
  }

  changeQuantity(productId: number, quantity: number): void {
    // TODO exercise-09: actualiza la cantidad y elimina la línea si quantity <= 0.
    void productId;
    void quantity;
  }

  remove(productId: number): void {
    // TODO exercise-09: elimina la línea correspondiente.
    void productId;
  }

  clear(): void {
    this.linesSubject.next([]);
  }
}
