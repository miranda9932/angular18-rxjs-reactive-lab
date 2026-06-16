import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Exercise01SearchComponent } from './exercise-01-search.component';

describe('Exercise01SearchComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exercise01SearchComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
  });

  it('launches one search request after the user pauses typing and renders the result', fakeAsync(() => {
    const fixture = TestBed.createComponent(Exercise01SearchComponent);
    const component = fixture.componentInstance;
    const http = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
    component.searchControl.setValue('Angular');
    tick(500);

    const request = http.expectOne((req) => req.url === '/api/products/search' && req.params.get('q') === 'Angular');
    request.flush({
      items: [{ id: 1, name: 'Angular Keyboard', categoryId: 'hardware', categoryLabel: 'Hardware', status: 'active', price: 99, stock: 10 }],
      page: 1,
      pageSize: 5,
      total: 1
    });
    tick();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Angular Keyboard');
    http.verify();
  }));
});
