import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { Product } from '../../core/models/product.model';
import { CatalogApiService } from '../../core/services/catalog-api.service';

@Component({
  selector: 'app-exercise-01-search',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './exercise-01-search.component.html',
  styleUrls: ['./exercise-01-search.component.scss']
})
export class Exercise01SearchComponent {
  private readonly api = inject(CatalogApiService);

  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  // TODO exercise-01: transforma cambios del input en llamadas al servicio.
  // TODO exercise-01: evita trabajo innecesario mientras el usuario sigue escribiendo.
  // TODO exercise-01: no pintes respuestas antiguas cuando haya una búsqueda más reciente.
  readonly results$ = of([] as Product[]);

  protected readonly serviceAvailable = this.api;
}
