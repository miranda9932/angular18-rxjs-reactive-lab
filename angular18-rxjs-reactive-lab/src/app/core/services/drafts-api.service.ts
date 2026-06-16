import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { DraftPayload, DraftSaveResult } from '../models/draft.model';

@Injectable({ providedIn: 'root' })
export class DraftsApiService {
  private readonly http = inject(HttpClient);

  saveDraft(payload: DraftPayload): Observable<DraftSaveResult> {
    return this.http.post<DraftSaveResult>('/api/drafts', payload);
  }
}
