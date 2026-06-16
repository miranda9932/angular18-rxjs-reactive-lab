import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, of, startWith, switchMap } from 'rxjs';

import { Category } from '../../core/models/category.model';
import { PageResult } from '../../core/models/page-result.model';
import { Product, ProductStatus } from '../../core/models/product.model';
import { CatalogApiService } from '../../core/services/catalog-api.service';

@Component({
  selector: 'app-exercise-02-filters',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './exercise-02-filters.component.html',
  styleUrls: ['./exercise-02-filters.component.scss']
})
export class Exercise02FiltersComponent {
  private readonly api = inject(CatalogApiService);

  readonly form = new FormGroup({
    query: new FormControl('', { nonNullable: true }),
    category: new FormControl('', { nonNullable: true }),
    status: new FormControl<ProductStatus | ''>('', { nonNullable: true })
  });

  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  // TODO exercise-02: carga categorías desde el servicio.
  readonly categories$ = this.api.getCategories();

  // TODO exercise-02: combina los controles para pedir el listado con los valores actuales.
  readonly page$ = this.form.valueChanges.pipe(
    startWith(this.form.value),
    debounceTime(300),
    switchMap(response => this.api.searchProducts(response))
  );

  protected readonly serviceAvailable = this.api;
}
