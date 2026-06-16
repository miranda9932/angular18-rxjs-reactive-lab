import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Exercise12FinalAppComponent } from './exercise-12-final-app.component';

describe('Exercise12FinalAppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exercise12FinalAppComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
  });

  it('loads cached categories and product page in the final app', fakeAsync(() => {
    const fixture = TestBed.createComponent(Exercise12FinalAppComponent);
    const component = fixture.componentInstance;
    const http = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
    component.reload();
    tick(500);

    const categoriesReq = http.expectOne('/api/categories');
    categoriesReq.flush([{ id: 'hardware', label: 'Hardware' }]);

    const productsReq = http.expectOne((request) => request.url === '/api/products/search' && request.params.get('page') === '1');
    productsReq.flush({ items: [{ id: 1, name: 'Angular Keyboard', categoryId: 'hardware', categoryLabel: 'Hardware', status: 'active', price: 99, stock: 10 }], page: 1, pageSize: 5, total: 1 });

    tick();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Hardware');
    expect(fixture.nativeElement.textContent).toContain('Angular Keyboard');
    http.verify();
  }));
});
