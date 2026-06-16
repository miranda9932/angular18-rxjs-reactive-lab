import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Subject, of } from 'rxjs';

import { PageResult } from '../../core/models/page-result.model';
import { Product } from '../../core/models/product.model';
import { RequestState } from '../../core/models/request-state.model';
import { CatalogApiService } from '../../core/services/catalog-api.service';

@Component({
  selector: 'app-exercise-05-request-state',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './exercise-05-request-state.component.html',
  styleUrls: ['./exercise-05-request-state.component.scss']
})
export class Exercise05RequestStateComponent {
  private readonly api = inject(CatalogApiService);

  readonly reload$ = new Subject<{ forceError: boolean; empty: boolean }>();

  // TODO exercise-05: construye un único stream de vista con idle/loading/success/error.
  // TODO exercise-05: soporta reload normal, error forzado y lista vacía.
  readonly vm$ = of({
    status: 'idle',
    data: { items: [], page: 1, pageSize: 5, total: 0 },
    error: null
  } as RequestState<PageResult<Product>>);

  reload(): void {
    this.reload$.next({ forceError: false, empty: false });
  }

  loadEmpty(): void {
    this.reload$.next({ forceError: false, empty: true });
  }

  forceError(): void {
    this.reload$.next({ forceError: true, empty: false });
  }

  protected readonly serviceAvailable = this.api;
}
