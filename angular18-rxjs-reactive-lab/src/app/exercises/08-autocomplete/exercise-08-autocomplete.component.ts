import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { CatalogApiService } from '../../core/services/catalog-api.service';

@Component({
  selector: 'app-exercise-08-autocomplete',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './exercise-08-autocomplete.component.html',
  styleUrls: ['./exercise-08-autocomplete.component.scss']
})
export class Exercise08AutocompleteComponent {
  private readonly api = inject(CatalogApiService);

  readonly queryControl = new FormControl('', { nonNullable: true });
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  // TODO exercise-08: pide sugerencias solo cuando el texto tenga longitud suficiente.
  // TODO exercise-08: oculta resultados obsoletos y maneja errores sin romper el stream.
  readonly suggestions$ = of([] as string[]);

  protected readonly serviceAvailable = this.api;
}
