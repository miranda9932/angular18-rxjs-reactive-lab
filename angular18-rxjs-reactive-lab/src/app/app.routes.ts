import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'exercises/01-search' },

  {
    path: 'exercises/01-search',
    title: '01 · Buscador reactivo',
    loadComponent: () =>
      import('./exercises/01-search/exercise-01-search.component').then((m) => m.Exercise01SearchComponent)
  },
  {
    path: 'exercises/02-filters',
    title: '02 · Filtros combinados',
    loadComponent: () =>
      import('./exercises/02-filters/exercise-02-filters.component').then((m) => m.Exercise02FiltersComponent)
  },
  {
    path: 'exercises/03-cancel-requests',
    title: '03 · Cancelación de peticiones',
    loadComponent: () =>
      import('./exercises/03-cancel-requests/exercise-03-cancel-requests.component').then((m) => m.Exercise03CancelRequestsComponent)
  },
  {
    path: 'exercises/04-concurrency-modes',
    title: '04 · Modos de concurrencia',
    loadComponent: () =>
      import('./exercises/04-concurrency-modes/exercise-04-concurrency-modes.component').then((m) => m.Exercise04ConcurrencyModesComponent)
  },
  {
    path: 'exercises/05-request-state',
    title: '05 · Estado loading/data/error',
    loadComponent: () =>
      import('./exercises/05-request-state/exercise-05-request-state.component').then((m) => m.Exercise05RequestStateComponent)
  },
  {
    path: 'exercises/06-http-cache',
    title: '06 · Caché HTTP',
    loadComponent: () =>
      import('./exercises/06-http-cache/exercise-06-http-cache.component').then((m) => m.Exercise06HttpCacheComponent)
  },
  {
    path: 'exercises/07-pagination',
    title: '07 · Paginación reactiva',
    loadComponent: () =>
      import('./exercises/07-pagination/exercise-07-pagination.component').then((m) => m.Exercise07PaginationComponent)
  },
  {
    path: 'exercises/08-autocomplete',
    title: '08 · Autocompletado',
    loadComponent: () =>
      import('./exercises/08-autocomplete/exercise-08-autocomplete.component').then((m) => m.Exercise08AutocompleteComponent)
  },
  {
    path: 'exercises/09-cart',
    title: '09 · Carrito reactivo',
    loadComponent: () =>
      import('./exercises/09-cart/exercise-09-cart.component').then((m) => m.Exercise09CartComponent)
  },
  {
    path: 'exercises/10-dependent-form',
    title: '10 · Formulario dependiente',
    loadComponent: () =>
      import('./exercises/10-dependent-form/exercise-10-dependent-form.component').then((m) => m.Exercise10DependentFormComponent)
  },
  {
    path: 'exercises/11-autosave',
    title: '11 · Guardado automático',
    loadComponent: () =>
      import('./exercises/11-autosave/exercise-11-autosave.component').then((m) => m.Exercise11AutosaveComponent)
  },
  {
    path: 'exercises/12-final-app',
    title: '12 · Mini app final',
    loadComponent: () =>
      import('./exercises/12-final-app/exercise-12-final-app.component').then((m) => m.Exercise12FinalAppComponent)
  },
  { path: '**', redirectTo: 'exercises/01-search' }
];
