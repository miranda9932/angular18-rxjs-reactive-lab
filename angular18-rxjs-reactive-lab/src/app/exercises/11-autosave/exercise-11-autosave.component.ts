import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { DraftsApiService } from '../../core/services/drafts-api.service';

@Component({
  selector: 'app-exercise-11-autosave',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './exercise-11-autosave.component.html',
  styleUrls: ['./exercise-11-autosave.component.scss']
})
export class Exercise11AutosaveComponent {
  private readonly draftsApi = inject(DraftsApiService);
  private readonly destroyRef = inject(DestroyRef);

  readonly form = new FormGroup({
    title: new FormControl('', { nonNullable: true }),
    notes: new FormControl('', { nonNullable: true })
  });

  readonly saving = signal(false);
  readonly lastSavedAt = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);

  constructor() {
    // TODO exercise-11: escucha cambios del formulario y guarda tras una pausa de edición.
    // TODO exercise-11: evita guardar el mismo contenido dos veces seguidas.
    // TODO exercise-11: si necesitas subscribe manual, ciérralo con takeUntilDestroyed(this.destroyRef).
    void this.draftsApi;
    void this.destroyRef;
  }
}
