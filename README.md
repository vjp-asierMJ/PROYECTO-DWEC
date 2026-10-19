# PROYECTO - DWEC

**Aimar Moreno Fuentes - Asier Martín Jiménez**

# Biblioteca de Videojuegos

## ¿Qué hará la aplicación?

La aplicación consiste en una biblioteca de videojuegos que permite almacenar, consultar y gestionar información sobre diferentes videojuegos.

El proyecto está desarrollado en JavaScript y utiliza un array de objetos para almacenar los datos. Los resultados se muestran en la consola del navegador mediante funciones como `console.log()`, `console.table()` y `console.warn()`.

La aplicación permite listar todos los videojuegos, filtrarlos por disponibilidad y año de lanzamiento, contar videojuegos por género, buscar por título, añadir nuevos videojuegos, eliminarlos mediante su identificador y calcular estadísticas de la colección.

## Campos de los videojuegos

Cada videojuego tiene los siguientes campos:

- **`id`**: identificador único del videojuego.
- **`titulo`**: nombre del videojuego.
- **`genero`**: género al que pertenece, como Aventura, RPG, Acción o Deportes.
- **`plataforma`**: plataforma en la que se puede jugar, como PC, Nintendo Switch, PlayStation 5 o Xbox Series X.
- **`fecha`**: fecha de lanzamiento del videojuego en formato `AAAA-MM-DD`.
- **`disponible`**: valor booleano (`true` o `false`) que indica si el videojuego está disponible en la biblioteca.

## Funcionalidades implementadas

### 1. Listar todos los videojuegos

La función `listarTodos(videojuegos)` recorre la colección y muestra los videojuegos con su identificador y título, indicando si son clásicos o recientes según el año de lanzamiento.

### 2. Filtrar videojuegos

La función `filtrar(videojuegos, limite)` permite consultar los videojuegos disponibles hasta un año determinado y devuelve el número de videojuegos encontrados.

### 3. Contar videojuegos por género

La función `contarPorCategoria(videojuegos)` recorre la colección y cuenta cuántos videojuegos pertenecen a cada género. Los géneros que no están contemplados específicamente se contabilizan como otros.

### 4. Buscar videojuegos por texto

La función `buscarPorTexto(lista, texto)` busca videojuegos cuyo título contenga el texto indicado. La búsqueda no distingue entre mayúsculas y minúsculas.

### 5. Añadir videojuegos

La función `anadir(lista, elemento)` incorpora un nuevo videojuego a la colección, asignándole automáticamente el siguiente identificador disponible, y devuelve el ID asignado.

### 6. Eliminar videojuegos

La función `eliminarPorId(lista, id)` elimina un videojuego a partir de su identificador. Devuelve `true` si lo encuentra y lo elimina, o `false` si no existe ningún videojuego con ese ID.

### 7. Calcular estadísticas

La función `estadisticas(lista)` realiza cálculos sobre el campo numérico `id` de los videojuegos:

- **Total:** suma de todos los identificadores.
- **Media:** promedio de los identificadores, con un decimal mediante `toFixed(1)`.
- **Valor más alto:** identifica el videojuego con el ID más alto.
- **Lista vacía:** muestra un aviso y finaliza sin realizar cálculos.

## ¿Cómo se ejecuta?

1. Clonar o descargar el proyecto.
2. Abrir la carpeta del proyecto con Visual Studio Code.
3. Abrir el archivo `index.html` en un navegador.
4. Abrir las herramientas de desarrollador del navegador pulsando **F12**.
5. Entrar en la pestaña **Console**.
6. Comprobar que se muestra la tabla de videojuegos mediante `console.table()` y que aparecen los resultados de las diferentes funciones sin errores en rojo.

## Tecnologías utilizadas

- **HTML5:** estructura del proyecto.
- **JavaScript:** almacenamiento de datos, recorrido de arrays, búsquedas, filtros, gestión de videojuegos y estadísticas.
- **Consola del navegador:** visualización de tablas, resultados y avisos.

## Estructura del proyecto

```text
biblioteca-videojuegos/
├── index.html
├── README.md
└── js/
    └── app.js
```

## Objetivo del proyecto

Practicar los fundamentos de JavaScript en el contexto de una biblioteca de videojuegos, utilizando arrays, objetos, funciones, bucles, condicionales, estructuras `switch`, métodos de arrays y operaciones estadísticas.
