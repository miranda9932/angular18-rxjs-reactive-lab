# 01 · Búsqueda reactiva

## Enunciado

Implementa un buscador que reduzca trabajo mientras el usuario escribe, no repita búsquedas idénticas consecutivas y solo pinte la respuesta vigente.

## Criterios para comprobar si funciona

- Escribe en el input y comprueba que no se hace una llamada por cada tecla.
- Busca un término sin resultados y muestra el estado vacío.
- Fuerza un error desde el código y muestra un mensaje claro.
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
