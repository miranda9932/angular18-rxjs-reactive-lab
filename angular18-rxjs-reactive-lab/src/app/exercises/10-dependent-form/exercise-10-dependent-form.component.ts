import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { City } from '../../core/models/location.model';
import { ReferenceDataService } from '../../core/services/reference-data.service';

@Component({
  selector: 'app-exercise-10-dependent-form',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './exercise-10-dependent-form.component.html',
  styleUrls: ['./exercise-10-dependent-form.component.scss']
})
export class Exercise10DependentFormComponent {
  private readonly referenceData = inject(ReferenceDataService);

  readonly form = new FormGroup({
    country: new FormControl('', { nonNullable: true }),
    city: new FormControl({ value: '', disabled: true }, { nonNullable: true })
  });

  readonly countries$ = this.referenceData.getCountries();
  readonly loadingCities = signal(false);
  readonly cityError = signal<string | null>(null);

  // TODO exercise-10: al cambiar país, resetea ciudad, carga opciones y habilita/deshabilita el control.
  readonly cities$ = of([] as City[]);
}
