import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, of } from 'rxjs';

import { Category } from '../../core/models/category.model';
import { PageResult } from '../../core/models/page-result.model';
import { Product, ProductStatus } from '../../core/models/product.model';
import { CatalogApiService } from '../../core/services/catalog-api.service';

interface FinalAppViewModel {
  categories: Category[];
  page: PageResult<Product>;
  loading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-exercise-12-final-app',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './exercise-12-final-app.component.html',
  styleUrls: ['./exercise-12-final-app.component.scss']
})
export class Exercise12FinalAppComponent {
  private readonly api = inject(CatalogApiService);

  readonly form = new FormGroup({
    query: new FormControl('', { nonNullable: true }),
    category: new FormControl('', { nonNullable: true }),
    status: new FormControl<ProductStatus | ''>('', { nonNullable: true })
  });

  readonly page = signal(1);
  readonly pageSize = 5;
  readonly reload$ = new Subject<void>();

  // TODO exercise-12: combina categorías cacheadas, filtros, página y recarga manual.
  // TODO exercise-12: la vista debe incluir loading, error, datos y vacío.
  // TODO exercise-12: no uses subscribe manual para pintar la tabla.
  readonly vm$ = of({
    categories: [],
    page: { items: [], page: 1, pageSize: this.pageSize, total: 0 },
    loading: false,
    error: null
  } as FinalAppViewModel);

  reload(): void {
    this.reload$.next();
  }

  nextPage(): void {
    // TODO exercise-12: avanzar página.
  }

  previousPage(): void {
    // TODO exercise-12: retroceder página.
  }

  invalidateCategories(): void {
    this.api.invalidateCategoriesCache();
    this.reload();
  }
}
