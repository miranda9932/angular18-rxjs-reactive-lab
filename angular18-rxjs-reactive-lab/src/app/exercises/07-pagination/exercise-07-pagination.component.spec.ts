import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Exercise07PaginationComponent } from './exercise-07-pagination.component';

describe('Exercise07PaginationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exercise07PaginationComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
  });

  it('requests page 1 again when filters change', fakeAsync(() => {
    const fixture = TestBed.createComponent(Exercise07PaginationComponent);
    const component = fixture.componentInstance;
    const http = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
    component.nextPage();
    tick(100);
    component.form.controls.query.setValue('Angular');
    tick(500);

    const req = http.expectOne((request) => request.url === '/api/products/search' && request.params.get('page') === '1' && request.params.get('q') === 'Angular');
    req.flush({ items: [], page: 1, pageSize: 5, total: 0 });
    http.verify();
  }));
});
