import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { Product } from '../../core/models/product.model';
import { CatalogApiService } from '../../core/services/catalog-api.service';

@Component({
  selector: 'app-exercise-03-cancel-requests',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './exercise-03-cancel-requests.component.html',
  styleUrls: ['./exercise-03-cancel-requests.component.scss']
})
export class Exercise03CancelRequestsComponent {
  private readonly api = inject(CatalogApiService);

  readonly queryControl = new FormControl('', { nonNullable: true });
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly logs = signal<string[]>([]);

  // TODO exercise-03: lanza peticiones desde el input y evita que respuestas antiguas ganen la pantalla.
  // TODO exercise-03: registra en logs cuándo se inicia y termina cada búsqueda.
  readonly results$ = of([] as Product[]);

  protected readonly serviceAvailable = this.api;
}
