import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Exercise08AutocompleteComponent } from './exercise-08-autocomplete.component';

describe('Exercise08AutocompleteComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exercise08AutocompleteComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
  });

  it('loads suggestions for enough text and renders them', fakeAsync(() => {
    const fixture = TestBed.createComponent(Exercise08AutocompleteComponent);
    const component = fixture.componentInstance;
    const http = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
    component.queryControl.setValue('auto');
    tick(400);

    const req = http.expectOne((request) => request.url === '/api/products/suggest' && request.params.get('q') === 'auto');
    req.flush(['Autocomplete Patterns']);
    tick();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Autocomplete Patterns');
    http.verify();
  }));
});
