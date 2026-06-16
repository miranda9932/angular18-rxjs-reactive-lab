# 07 · Paginación reactiva

## Enunciado

Mezcla búsqueda, filtros y página actual. Si cambia un filtro, la página debe volver al inicio.

## Criterios para comprobar si funciona

- La petición debe incluir página y tamaño.
- Los botones anterior/siguiente deben respetar límites.
- Carga, error y vacío deben estar visibles.
- Los tests del ejercicio deben pasar cuando completes los TODO.
- El ejercicio debe poder abrirse directamente desde su ruta.

## Pistas graduales

1. Identifica primero cuál es la fuente de eventos del ejercicio.
2. Después decide qué datos deben vivir como estado derivado y qué debe pedirse al servicio.
3. Reserva las suscripciones manuales para efectos inevitables y ciérralas correctamente.

## Casos que debes contemplar

- Caso con datos.
- Caso de lista vacía cuando aplique.
- Caso de error cuando aplique.
- Estado de carga mientras se espera respuesta.

## Normas

- No uses `subscribe()` manual para pintar datos en el HTML si puedes usar `AsyncPipe`.
- Si hay una suscripción manual para un efecto, usa `takeUntilDestroyed`.
- Completa los TODO sin modificar la intención de los tests.
