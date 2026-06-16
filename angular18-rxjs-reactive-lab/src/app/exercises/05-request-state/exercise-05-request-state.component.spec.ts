import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Exercise05RequestStateComponent } from './exercise-05-request-state.component';

describe('Exercise05RequestStateComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exercise05RequestStateComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
  });

  it('shows loading and then renders data after reload', fakeAsync(() => {
    const fixture = TestBed.createComponent(Exercise05RequestStateComponent);
    const component = fixture.componentInstance;
    const http = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
    component.reload();
    tick();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Cargando');

    const req = http.expectOne('/api/products/search?page=1&pageSize=5');
    req.flush({ items: [{ id: 1, name: 'Angular Keyboard', categoryId: 'hardware', categoryLabel: 'Hardware', status: 'active', price: 99, stock: 10 }], page: 1, pageSize: 5, total: 1 });
    tick();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Angular Keyboard');
    http.verify();
  }));
});
