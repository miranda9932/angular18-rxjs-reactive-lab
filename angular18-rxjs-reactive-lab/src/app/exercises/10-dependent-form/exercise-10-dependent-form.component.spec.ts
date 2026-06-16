import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Exercise10DependentFormComponent } from './exercise-10-dependent-form.component';

describe('Exercise10DependentFormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exercise10DependentFormComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
  });

  it('loads cities when country changes and resets city control', fakeAsync(() => {
    const fixture = TestBed.createComponent(Exercise10DependentFormComponent);
    const component = fixture.componentInstance;
    const http = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
    http.expectOne('/api/countries').flush([{ code: 'ES', label: 'España' }]);

    component.form.controls.city.enable();
    component.form.controls.city.setValue('old');
    component.form.controls.country.setValue('ES');
    tick();

    expect(component.form.controls.city.value).toBe('');
    const req = http.expectOne((request) => request.url === '/api/cities' && request.params.get('country') === 'ES');
    req.flush([{ id: 'bcn', countryCode: 'ES', label: 'Barcelona' }]);
    tick();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Barcelona');
    http.verify();
  }));
});
