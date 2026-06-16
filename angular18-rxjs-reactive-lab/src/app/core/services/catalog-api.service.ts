import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ActionResult } from '../models/action-result.model';
import { Category } from '../models/category.model';
import { PageResult } from '../models/page-result.model';
import { Product } from '../models/product.model';
import { SearchProductsParams } from '../models/search-params.model';

@Injectable({ providedIn: 'root' })
export class CatalogApiService {
  private readonly http = inject(HttpClient);

  private categoriesCache$?: Observable<Category[]>;

  searchProducts(params: SearchProductsParams): Observable<PageResult<Product>> {
    let httpParams = new HttpParams();

    if (params.q) {
      httpParams = httpParams.set('q', params.q);
    }

    if (params.category) {
      httpParams = httpParams.set('category', params.category);
    }

    if (params.status) {
      httpParams = httpParams.set('status', params.status);
    }

    if (params.page) {
      httpParams = httpParams.set('page', String(params.page));
    }

    if (params.pageSize) {
      httpParams = httpParams.set('pageSize', String(params.pageSize));
    }

    if (params.latencyMs) {
      httpParams = httpParams.set('latency', String(params.latencyMs));
    }

    if (params.forceError) {
      httpParams = httpParams.set('forceError', 'true');
    }

    return this.http.get<PageResult<Product>>('/api/products/search', {
      params: httpParams
    });
  }

  getSuggestions(query: string, forceError = false): Observable<string[]> {
    let params = new HttpParams().set('q', query);

    if (forceError) {
      params = params.set('forceError', 'true');
    }

    return this.http.get<string[]>('/api/products/suggest', { params });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/categories');
  }

  getCategoriesCached(): Observable<Category[]> {
    // TODO exercise-06: devuelve una respuesta compartida entre varios consumidores.
    // TODO exercise-06: conserva la referencia hasta que se invalide manualmente.
    void this.categoriesCache$;
    return this.getCategories();
  }

  invalidateCategoriesCache(): void {
    // TODO exercise-06: limpia la referencia interna para que la siguiente lectura vuelva al backend.
  }

  submitAction(label: string, latencyMs = 800): Observable<ActionResult> {
    return this.http.post<ActionResult>(`/api/actions/submit?latency=${latencyMs}`, { label });
  }
}
