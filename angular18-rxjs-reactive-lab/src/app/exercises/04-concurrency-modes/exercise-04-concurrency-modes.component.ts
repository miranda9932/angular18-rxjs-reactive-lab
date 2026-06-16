import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, of } from 'rxjs';

import { ActionResult } from '../../core/models/action-result.model';
import { CatalogApiService } from '../../core/services/catalog-api.service';

type ConcurrencyMode = 'replace' | 'queue' | 'parallel' | 'ignoreWhilePending';

@Component({
  selector: 'app-exercise-04-concurrency-modes',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './exercise-04-concurrency-modes.component.html',
  styleUrls: ['./exercise-04-concurrency-modes.component.scss']
})
export class Exercise04ConcurrencyModesComponent {
  private readonly api = inject(CatalogApiService);
  private readonly destroyRef = inject(DestroyRef);

  readonly modeControl = new FormControl<ConcurrencyMode>('replace', { nonNullable: true });
  readonly click$ = new Subject<string>();
  readonly pending = signal(false);

  // TODO exercise-04: conecta click$ con el servicio y cambia el comportamiento según el modo seleccionado.
  // TODO exercise-04: si necesitas una suscripción manual para acumular logs, usa takeUntilDestroyed.
  readonly results$ = of([] as ActionResult[]);

  submit(label: string): void {
    this.click$.next(label);
  }

  protected readonly serviceAvailable = this.api;
  protected readonly destroyRefAvailable = this.destroyRef;
}
