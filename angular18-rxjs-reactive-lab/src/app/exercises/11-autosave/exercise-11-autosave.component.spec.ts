import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Exercise11AutosaveComponent } from './exercise-11-autosave.component';

describe('Exercise11AutosaveComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exercise11AutosaveComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
  });

  it('saves the draft after the user stops editing', fakeAsync(() => {
    const fixture = TestBed.createComponent(Exercise11AutosaveComponent);
    const component = fixture.componentInstance;
    const http = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
    component.form.controls.title.setValue('RxJS notes');
    component.form.controls.notes.setValue('Important draft');
    tick(1000);

    const req = http.expectOne('/api/drafts');
    expect(req.request.method).toBe('POST');
    req.flush({ id: 'draft-1', savedAt: '2026-06-15T10:00:00.000Z', payload: req.request.body });
    tick();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('2026-06-15');
    http.verify();
  }));
});
