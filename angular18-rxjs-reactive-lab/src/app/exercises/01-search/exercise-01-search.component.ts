import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';

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
  readonly results$ = this.searchControl.valueChanges.pipe(
  // TODO exercise-01: evita trabajo innecesario mientras el usuario sigue escribiendo.
    debounceTime(300),
    map(search => search.trim()),
  // TODO exercise-01: no pintes respuestas antiguas cuando haya una búsqueda más reciente.
    distinctUntilChanged(),
    switchMap(query => this.api.searchProducts({ query })),
    map(response => response.items)
  );

  protected readonly serviceAvailable = this.api;
}
