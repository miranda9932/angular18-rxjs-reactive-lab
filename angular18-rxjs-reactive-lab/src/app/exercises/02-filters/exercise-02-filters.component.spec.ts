import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Exercise02FiltersComponent } from './exercise-02-filters.component';

describe('Exercise02FiltersComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exercise02FiltersComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
  });

  it('sends latest text, category and status when filters change', fakeAsync(() => {
    const fixture = TestBed.createComponent(Exercise02FiltersComponent);
    const component = fixture.componentInstance;
    const http = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
    component.form.controls.query.setValue('forms');
    component.form.controls.category.setValue('software');
    component.form.controls.status.setValue('active');
    tick(500);

    const req = http.expectOne((request) => {
      return request.url === '/api/products/search'
        && request.params.get('q') === 'forms'
        && request.params.get('category') === 'software'
        && request.params.get('status') === 'active';
    });

    req.flush({ items: [], page: 1, pageSize: 5, total: 0 });
    http.verify();
  }));
});
