import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface ExerciseLink {
  path: string;
  label: string;
  title: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly links: ExerciseLink[] = [
    { path: '/exercises/01-search', label: '01', title: 'Buscador' },
    { path: '/exercises/02-filters', label: '02', title: 'Filtros' },
    { path: '/exercises/03-cancel-requests', label: '03', title: 'Cancelación' },
    { path: '/exercises/04-concurrency-modes', label: '04', title: 'Concurrencia' },
    { path: '/exercises/05-request-state', label: '05', title: 'Estado' },
    { path: '/exercises/06-http-cache', label: '06', title: 'Caché' },
    { path: '/exercises/07-pagination', label: '07', title: 'Paginación' },
    { path: '/exercises/08-autocomplete', label: '08', title: 'Autocomplete' },
    { path: '/exercises/09-cart', label: '09', title: 'Carrito' },
    { path: '/exercises/10-dependent-form', label: '10', title: 'Formulario' },
    { path: '/exercises/11-autosave', label: '11', title: 'Autosave' },
    { path: '/exercises/12-final-app', label: '12', title: 'Final' }
  ];
}
