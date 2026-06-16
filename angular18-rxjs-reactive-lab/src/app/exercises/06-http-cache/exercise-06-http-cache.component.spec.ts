import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Exercise06HttpCacheComponent } from './exercise-06-http-cache.component';

describe('Exercise06HttpCacheComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exercise06HttpCacheComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
  });

  it('shares one categories request between both consumers', () => {
    const fixture = TestBed.createComponent(Exercise06HttpCacheComponent);
    const http = TestBed.inject(HttpTestingController);

    fixture.detectChanges();

    const req = http.expectOne('/api/categories');
    req.flush([{ id: 'hardware', label: 'Hardware' }]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Hardware');
    http.verify();
  });
});
