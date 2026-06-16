import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { City, Country } from '../models/location.model';

@Injectable({ providedIn: 'root' })
export class ReferenceDataService {
  private readonly http = inject(HttpClient);

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>('/api/countries');
  }

  getCities(countryCode: string): Observable<City[]> {
    return this.http.get<City[]>('/api/cities', {
      params: new HttpParams().set('country', countryCode)
    });
  }
}
