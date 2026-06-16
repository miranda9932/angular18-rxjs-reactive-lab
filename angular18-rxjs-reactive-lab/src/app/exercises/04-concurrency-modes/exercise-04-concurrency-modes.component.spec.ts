import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Exercise04ConcurrencyModesComponent } from './exercise-04-concurrency-modes.component';

describe('Exercise04ConcurrencyModesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exercise04ConcurrencyModesComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
  });

  it('sends actions when buttons are clicked', fakeAsync(() => {
    const fixture = TestBed.createComponent(Exercise04ConcurrencyModesComponent);
    const component = fixture.componentInstance;
    const http = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
    component.submit('A');
    tick();

    const req = http.expectOne((request) => request.url.startsWith('/api/actions/submit'));
    req.flush({ requestId: '1', label: 'A', receivedAt: 'now' });
    http.verify();
  }));
});
