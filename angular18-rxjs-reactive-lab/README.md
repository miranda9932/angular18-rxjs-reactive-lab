# Angular 18 RxJS Reactive Lab

Proyecto standalone para practicar RxJS, observables, formularios reactivos y componentes Angular 18 con una dificultad superior al primer bloque de ejercicios.

## Qué incluye

- Angular 18 standalone.
- TypeScript estricto.
- Reactive Forms.
- API simulada mediante interceptor funcional.
- 12 ejercicios progresivos.
- Componentes separados en `.ts`, `.html` y `.scss`.
- Enunciado por ejercicio en `exercise.md`.
- Código inicial incompleto con `TODO`.
- Tests iniciales que fallan hasta completar los ejercicios.
- Estados de carga, error y lista vacía cuando corresponde.

## Requisitos

- Node 20.11+ recomendado.
- npm 10+.
- Angular CLI 18 si quieres usar `ng` directamente.

## Instalación

```bash
npm install
```

## Arrancar

```bash
npm start
```

Abre `http://localhost:4200`.

## Tests

```bash
npm test
```

Para ejecutar solo un ejercicio:

```bash
npx ng test --watch=false --include "src/app/exercises/01-search/**/*.spec.ts"
```

## Cómo trabajar

1. Entra en la carpeta de un ejercicio.
2. Lee `exercise.md`.
3. Abre el `.component.ts`, `.component.html` y `.component.scss`.
4. Completa los `TODO`.
5. Ejecuta el test del ejercicio.
6. No uses `subscribe()` manual para pintar en HTML si puedes consumir el stream con `AsyncPipe`.
7. Si necesitas una suscripción manual para un efecto, protégela con `takeUntilDestroyed`.

## Rutas

- `/exercises/01-search`
- `/exercises/02-filters`
- `/exercises/03-cancel-requests`
- `/exercises/04-concurrency-modes`
- `/exercises/05-request-state`
- `/exercises/06-http-cache`
- `/exercises/07-pagination`
- `/exercises/08-autocomplete`
- `/exercises/09-cart`
- `/exercises/10-dependent-form`
- `/exercises/11-autosave`
- `/exercises/12-final-app`

## Nota importante

El código inicial está incompleto a propósito. Los tests deben empezar fallando. No es un error del proyecto: es parte del laboratorio.
