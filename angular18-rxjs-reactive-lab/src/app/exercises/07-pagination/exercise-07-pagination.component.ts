import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { PageResult } from '../../core/models/page-result.model';
import { Product, ProductStatus } from '../../core/models/product.model';
import { CatalogApiService } from '../../core/services/catalog-api.service';

@Component({
  selector: 'app-exercise-07-pagination',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './exercise-07-pagination.component.html',
  styleUrls: ['./exercise-07-pagination.component.scss']
})
export class Exercise07PaginationComponent {
  private readonly api = inject(CatalogApiService);

  readonly form = new FormGroup({
    query: new FormControl('', { nonNullable: true }),
    category: new FormControl('', { nonNullable: true }),
    status: new FormControl<ProductStatus | ''>('', { nonNullable: true })
  });

  readonly page = signal(1);
  readonly pageSize = 5;
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  // TODO exercise-07: combina filtros y página para pedir datos.
  // TODO exercise-07: cuando cambien filtros, vuelve a página 1.
  readonly page$ = of({ items: [], page: 1, pageSize: this.pageSize, total: 0 } as PageResult<Product>);

  nextPage(): void {
    // TODO exercise-07: avanza página respetando el total.
  }

  previousPage(): void {
    // TODO exercise-07: retrocede página sin bajar de 1.
  }

  protected readonly serviceAvailable = this.api;
}
