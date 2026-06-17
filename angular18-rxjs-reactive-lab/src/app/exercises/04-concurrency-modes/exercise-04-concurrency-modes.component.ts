import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  Subject,
  concatMap,
  exhaustMap,
  finalize,
  mergeMap,
  scan,
  startWith,
  switchMap,
  type OperatorFunction
} from 'rxjs';

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
  private activeRequests = 0;

  private runAction(label: string) {
    this.activeRequests += 1;
    this.pending.set(true);

    return this.api.submitAction(label).pipe(
      finalize(() => {
        this.activeRequests = Math.max(0, this.activeRequests - 1);
        this.pending.set(this.activeRequests > 0);
      })
    );
  }

  private submitWithMode(mode: ConcurrencyMode): OperatorFunction<string, ActionResult> {
    switch (mode) {
      case 'replace':
        return switchMap((label) => this.runAction(label));

      case 'queue':
        return concatMap((label) => this.runAction(label));

      case 'parallel':
        return mergeMap((label) => this.runAction(label));

      case 'ignoreWhilePending':
        return exhaustMap((label) => this.runAction(label));
    }

    const exhaustiveCheck: never = mode;
    return exhaustiveCheck;
  }

  readonly results$ = this.modeControl.valueChanges.pipe(
    startWith(this.modeControl.value),
    switchMap((mode) =>
      this.click$.pipe(
        this.submitWithMode(mode),
        scan((results, response) => [...results, response], [] as ActionResult[]),
        startWith([] as ActionResult[])
      )
    )
  );

  submit(label: string): void {
    this.click$.next(label);
  }

  protected readonly serviceAvailable = this.api;
  protected readonly destroyRefAvailable = this.destroyRef;
}
