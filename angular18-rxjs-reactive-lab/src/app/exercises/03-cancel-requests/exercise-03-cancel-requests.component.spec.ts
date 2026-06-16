import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Exercise03CancelRequestsComponent } from './exercise-03-cancel-requests.component';

describe('Exercise03CancelRequestsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exercise03CancelRequestsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
  });

  it('keeps the newest response when two searches are launched quickly', fakeAsync(() => {
    const fixture = TestBed.createComponent(Exercise03CancelRequestsComponent);
    const component = fixture.componentInstance;
    const http = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
    component.queryControl.setValue('Angular');
    tick(300);
    const slow = http.expectOne((req) => req.url === '/api/products/search' && req.params.get('q') === 'Angular');

    component.queryControl.setValue('RxJS');
    tick(300);
    const fast = http.expectOne((req) => req.url === '/api/products/search' && req.params.get('q') === 'RxJS');

    fast.flush({ items: [{ id: 2, name: 'RxJS Mouse', categoryId: 'hardware', categoryLabel: 'Hardware', status: 'active', price: 59, stock: 18 }], page: 1, pageSize: 5, total: 1 });
    slow.flush({ items: [{ id: 1, name: 'Angular Keyboard', categoryId: 'hardware', categoryLabel: 'Hardware', status: 'active', price: 99, stock: 10 }], page: 1, pageSize: 5, total: 1 });
    tick();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('RxJS Mouse');
    expect(fixture.nativeElement.textContent).not.toContain('Angular Keyboard');
    http.verify();
  }));
});
