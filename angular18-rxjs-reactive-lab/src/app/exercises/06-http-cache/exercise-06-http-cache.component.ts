import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { CatalogApiService } from '../../core/services/catalog-api.service';

@Component({
  selector: 'app-exercise-06-http-cache',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './exercise-06-http-cache.component.html',
  styleUrls: ['./exercise-06-http-cache.component.scss']
})
export class Exercise06HttpCacheComponent {
  private readonly api = inject(CatalogApiService);

  // TODO exercise-06: después de completar el servicio, estos dos consumidores deben compartir una única lectura.
  readonly consumerA$ = this.api.getCategoriesCached();
  readonly consumerB$ = this.api.getCategoriesCached();

  invalidate(): void {
    this.api.invalidateCategoriesCache();
  }
}
