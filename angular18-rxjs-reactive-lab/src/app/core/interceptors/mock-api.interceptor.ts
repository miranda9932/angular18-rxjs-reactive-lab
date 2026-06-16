import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse
} from '@angular/common/http';
import { Observable, mergeMap, of, throwError, timer } from 'rxjs';

import { CATEGORIES } from '../data/categories.data';
import { CITIES } from '../data/cities.data';
import { COUNTRIES } from '../data/countries.data';
import { PRODUCTS } from '../data/products.data';
import { ActionResult } from '../models/action-result.model';
import { DraftPayload, DraftSaveResult } from '../models/draft.model';
import { PageResult } from '../models/page-result.model';
import { Product } from '../models/product.model';

interface RequestLike {
  url: string;
  method: string;
  body: unknown;
}

function buildPage<T>(items: T[], page: number, pageSize: number): PageResult<T> {
  const start = (page - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    page,
    pageSize,
    total: items.length
  };
}

function filterProducts(url: URL): Product[] {
  const q = (url.searchParams.get('q') ?? '').trim().toLowerCase();
  const category = url.searchParams.get('category') ?? '';
  const status = url.searchParams.get('status') ?? '';

  return PRODUCTS.filter((item) => {
    const matchesText = q.length === 0 || item.name.toLowerCase().includes(q);
    const matchesCategory = category.length === 0 || item.categoryId === category;
    const matchesStatus = status.length === 0 || item.status === status;

    return matchesText && matchesCategory && matchesStatus;
  });
}

function createId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);
}

function mockBody(req: RequestLike, url: URL): unknown {
  const pathname = url.pathname;

  if (pathname === '/api/categories' && req.method === 'GET') {
    return CATEGORIES;
  }

  if (pathname === '/api/products/search' && req.method === 'GET') {
    const page = Number(url.searchParams.get('page') ?? '1');
    const pageSize = Number(url.searchParams.get('pageSize') ?? '5');
    return buildPage(filterProducts(url), page, pageSize);
  }

  if (pathname === '/api/products/suggest' && req.method === 'GET') {
    const q = (url.searchParams.get('q') ?? '').trim().toLowerCase();

    return PRODUCTS
      .filter((item) => item.name.toLowerCase().includes(q))
      .slice(0, 5)
      .map((item) => item.name);
  }

  if (pathname === '/api/countries' && req.method === 'GET') {
    return COUNTRIES;
  }

  if (pathname === '/api/cities' && req.method === 'GET') {
    const code = url.searchParams.get('country') ?? '';
    return CITIES.filter((entry) => entry.countryCode === code);
  }

  if (pathname === '/api/actions/submit' && req.method === 'POST') {
    const label = String((req.body as { label?: string } | null)?.label ?? 'Acción');
    const result: ActionResult = {
      requestId: createId(),
      label,
      receivedAt: new Date().toISOString()
    };
    return result;
  }

  if (pathname === '/api/drafts' && req.method === 'POST') {
    const payload = req.body as DraftPayload;
    const result: DraftSaveResult = {
      id: createId(),
      savedAt: new Date().toISOString(),
      payload
    };
    return result;
  }

  throw new HttpErrorResponse({
    status: 404,
    statusText: 'Mock endpoint not found',
    url: req.url
  });
}

export const mockApiInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<unknown>> => {
  if (!req.url.startsWith('/api/')) {
    return next(req);
  }

  const url = new URL(req.urlWithParams, 'http://localhost');
  const latencyMs = Number(
    url.searchParams.get('latency') ?? req.headers.get('x-latency-ms') ?? '500'
  );
  const forceError =
    url.searchParams.get('forceError') === 'true' ||
    req.headers.get('x-force-error') === 'true' ||
    (url.pathname === '/api/products/suggest' && (url.searchParams.get('q') ?? '').includes('err'));

  return timer(latencyMs).pipe(
    mergeMap(() => {
      if (forceError) {
        return throwError(
          () =>
            new HttpErrorResponse({
              status: 500,
              statusText: 'Mock server error',
              url: req.url
            })
        );
      }

      const body = mockBody(
        {
          url: req.urlWithParams,
          method: req.method,
          body: req.body
        },
        url
      );

      return of(new HttpResponse({ status: 200, body }));
    })
  );
};
