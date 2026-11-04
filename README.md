# PROYECTO - DWEC
**Aimar Moreno Fuentes - Asier Martín Jiménez**

# Biblioteca de Videojuegos

## Descripción del proyecto

La aplicación consiste en una biblioteca de videojuegos que permite almacenar, consultar y gestionar información sobre diferentes videojuegos.

El proyecto está desarrollado en JavaScript y utiliza un array de objetos para almacenar los datos. Inicialmente, en el Sprint 0, las operaciones y los resultados se mostraban mediante la consola del navegador. Posteriormente, en el Sprint 1, hemos incorporado una interfaz gráfica desarrollada con HTML y CSS, que permite visualizar los videojuegos mediante tarjetas e interactuar con la colección.

La aplicación permite listar videojuegos, filtrarlos por disponibilidad y año de lanzamiento, contar videojuegos por género, buscar por título, ordenarlos por diferentes criterios, añadir nuevos videojuegos, eliminarlos mediante su identificador y calcular estadísticas.

Además, incorpora funcionalidades para trabajar con fechas y almacenar tanto los videojuegos como las preferencias de ordenación mediante cookies.

## Campos de los videojuegos

Cada videojuego tiene los siguientes campos:

- **`id`**: identificador único del videojuego.
- **`titulo`**: nombre del videojuego.
- **`genero`**: género al que pertenece, como Aventura, RPG, Acción o Deportes.
- **`plataforma`**: plataforma en la que se puede jugar, como PC, Nintendo Switch, PlayStation 5 o Xbox Series X.
- **`fecha`**: fecha de lanzamiento del videojuego en formato `AAAA-MM-DD`.
- **`disponible`**: valor booleano (`true` o `false`) que indica si el videojuego está disponible en la biblioteca.

---

# Sprint 0 - Fundamentos de JavaScript y gestión de videojuegos

## ¿Qué se ha desarrollado?

En este sprint hemos creado la base de nuestra biblioteca de videojuegos utilizando JavaScript. Los datos se almacenan en un array de objetos y los resultados de las diferentes operaciones se muestran en la consola del navegador mediante funciones como `console.log()` y `console.table()`.

## Funcionalidades implementadas

### 1. Listar todos los videojuegos

La función `listarTodos(videojuegos)` recorre la colección y muestra los videojuegos con su identificador y título, indicando si son clásicos o recientes según el año de lanzamiento.

Se establece el año 2023 como límite para realizar esta clasificación.

### 2. Filtrar videojuegos

La función `filtrar(videojuegos, limite)` permite consultar los videojuegos disponibles hasta un año determinado y devuelve el número total de videojuegos encontrados.

### 3. Contar videojuegos por género

La función `contarPorCategoria(videojuegos)` recorre la colección y cuenta cuántos videojuegos pertenecen a cada género.

Se utilizan estructuras `switch` para clasificar los videojuegos en las categorías Aventura, RPG, Acción y Deportes. Los géneros que no están contemplados específicamente se contabilizan como otros.

### 4. Buscar videojuegos por texto

La función `buscarPorTexto(lista, texto)` busca videojuegos cuyo título contenga el texto indicado.

La búsqueda no distingue entre mayúsculas y minúsculas y devuelve un array con los videojuegos que coinciden con el texto buscado.

### 5. Añadir videojuegos

La función `anadir(lista, elemento)` incorpora un nuevo videojuego a la colección, asignándole automáticamente el siguiente identificador disponible.

Devuelve el ID asignado al nuevo videojuego.

### 6. Eliminar videojuegos

La función `eliminarPorId(lista, id)` elimina un videojuego a partir de su identificador.

Devuelve `true` si encuentra el videojuego y lo elimina, o `false` si no existe ningún videojuego con ese ID.

### 7. Calcular estadísticas

La función `estadisticas(lista)` realiza cálculos sobre el campo numérico `id` de los videojuegos:

- **Total:** suma de todos los identificadores.
- **Media:** promedio de los identificadores, con un decimal mediante `toFixed(1)`.
- **Valor más alto:** identifica el videojuego con el ID más alto.
- **Lista vacía:** muestra un aviso y finaliza sin realizar cálculos.

## Tecnologías y conceptos trabajados

- **JavaScript:** almacenamiento de datos, funciones y gestión de videojuegos.
- **Arrays y objetos:** organización de la información.
- **Bucles:** recorrido de las colecciones.
- **Condicionales:** comprobaciones y toma de decisiones.
- **Estructuras `switch`:** clasificación de los videojuegos por género.
- **Métodos de arrays:** búsqueda, incorporación y eliminación de elementos.
- **Consola del navegador:** visualización de resultados y tablas.

## Objetivo del Sprint 0

Practicar los fundamentos de JavaScript en el contexto de una biblioteca de videojuegos, utilizando arrays, objetos, funciones, bucles, condicionales, estructuras `switch`, métodos de arrays y operaciones estadísticas.

---

# Sprint 1 - Interfaz web y funcionalidades interactivas

## ¿Qué se ha añadido?

En este sprint hemos ampliado la biblioteca de videojuegos del Sprint 0, pasando de mostrar los resultados únicamente por la consola del navegador a disponer de una interfaz gráfica desarrollada con HTML, CSS y JavaScript.

Ahora los videojuegos se muestran en tarjetas dentro de la página web y el usuario puede buscar, ordenar y añadir videojuegos. También hemos incorporado nuevas funciones para trabajar con las fechas y guardar información mediante cookies.

## Funcionalidades implementadas

### 1. Interfaz gráfica con HTML y CSS

Hemos creado una interfaz para mostrar la biblioteca de videojuegos de una forma más visual.

Las principales partes de la página son:

- **Buscador:** permite localizar videojuegos escribiendo parte de su título.
- **Botones de ordenación:** permiten ordenar los videojuegos por nombre, identificador o fecha de lanzamiento.
- **Formulario:** permite introducir los datos de un nuevo videojuego.
- **Listado de videojuegos:** muestra cada videojuego en una tarjeta individual.
- **Resumen:** muestra información sobre los videojuegos que aparecen en el listado o sobre la disponibilidad de la colección.
- **Estadísticas:** muestra la cantidad de videojuegos que hay de cada género.

También hemos añadido estilos CSS para mejorar la presentación, utilizando una cuadrícula adaptable, tarjetas individuales, etiquetas de disponibilidad y diferentes estilos según el estado de cada videojuego.

### 2. Mostrar los videojuegos en tarjetas

Hemos incorporado varias funciones para generar el contenido de la página mediante JavaScript:

- **`crearTarjeta(videojuego)`:** crea una tarjeta HTML con el título, género, plataforma, fecha de lanzamiento y disponibilidad de un videojuego.
- **`pintar(lista)`:** recorre una lista de videojuegos y muestra sus tarjetas en el apartado correspondiente de la página. Si no hay resultados, muestra un mensaje.
- **`mostrarResumen(lista)`:** calcula el número total de videojuegos, los disponibles y los no disponibles.
- **`mostrarEstadisticasEnPagina(lista)`:** cuenta los videojuegos de cada género y muestra los resultados directamente en la página.

### 3. Nuevas funciones para trabajar con fechas

Hemos añadido funciones para facilitar el tratamiento y la presentación de las fechas de lanzamiento.

- **`crearFecha(texto)`:** convierte una fecha en formato `AAAA-MM-DD` en un objeto `Date`.
- **`fechaLegible(texto)`:** transforma una fecha en un formato más fácil de leer en español. Por ejemplo, `2026-10-01` se muestra como `1 de octubre de 2026`.
- **`diasDesde(texto)`:** calcula cuántos días han pasado desde la fecha indicada hasta el día actual.
- **`formatearFecha(fecha)`:** convierte una fecha del formato `AAAA-MM-DD` al formato `DD/MM/AAAA`.

También hemos creado la constante `DIAS_RECIENTE`, con un valor de 365 días. Se utiliza para comprobar la antigüedad de los videojuegos y aplicar la clase CSS `reciente` a las tarjetas que cumplen esta condición, permitiendo destacarlas visualmente.

### 4. Validación de los títulos

Hemos incorporado la función `validarTitulo(titulo)` para comprobar que el título de un videojuego cumple un patrón establecido.

Se utiliza una expresión regular que permite letras, números, espacios y determinados signos de puntuación.

El título debe tener entre 3 y 50 caracteres. Si no cumple estas condiciones, se muestra un aviso y no se añade el videojuego.

Además, antes de añadir un videojuego se comprueba que los campos de género, plataforma y fecha estén completos.

### 5. Guardar y recuperar videojuegos mediante cookies

Hemos añadido un sistema de persistencia para conservar los videojuegos aunque se cierre o se actualice la página.

Para ello, hemos incorporado las siguientes funciones:

- **`guardarVideojuegos(lista)`:** convierte el array de videojuegos en formato JSON y lo guarda en una cookie con una duración de un año.
- **`cargarVideojuegos()`:** recupera los videojuegos guardados en la cookie y reconstruye el array mediante `JSON.parse()`.

Al iniciar la aplicación, se comprueba si existen videojuegos guardados. Si existen, se recupera la colección almacenada; en caso contrario, se utilizan los videojuegos iniciales.

También hemos creado las funciones generales `guardarCookie(nombre, valor, dias)` y `leerCookie(nombre)` para guardar y recuperar otros datos mediante cookies.

### 6. Buscador y ordenación de videojuegos

Hemos incorporado un buscador que permite filtrar los videojuegos según el texto introducido por el usuario.

La búsqueda se realiza mediante `buscarPorTexto(lista, texto)`, que compara el texto introducido con los títulos sin distinguir entre mayúsculas y minúsculas.

Además, hemos creado la función `ordenar(lista, criterio)`, que trabaja sobre una copia del array original para evitar modificar directamente la colección.

Los criterios de ordenación disponibles son:

- **Nombre:** orden alfabético de la A a la Z.
- **Identificador:** orden numérico ascendente según el ID.
- **Fecha:** muestra primero los videojuegos con la fecha de lanzamiento más reciente.

La función `actualizar()` combina la búsqueda y la ordenación para volver a pintar las tarjetas cada vez que cambia el contenido del buscador o el criterio seleccionado.

También hemos incorporado `pintarResumen(mostrados)`, que indica cuántos videojuegos se están mostrando respecto al total o informa de que no hay resultados para el texto buscado.

### 7. Guardar el criterio de ordenación

Hemos ampliado el funcionamiento de las cookies para recordar el último criterio de ordenación seleccionado.

La función `elegirOrden(nuevo)` actualiza el criterio, lo guarda en una cookie llamada `orden` con una duración de 30 días y refresca la lista.

Cuando se vuelve a cargar la página, se utiliza `leerCookie("orden")` para recuperar el último criterio seleccionado. De esta forma, la biblioteca mantiene la ordenación elegida anteriormente.

### 8. Gestión de videojuegos: añadir y eliminar

Hemos adaptado las funciones de gestión del Sprint 0 para que también trabajen con la nueva interfaz web.

**Añadir videojuegos**

La función `anadir(lista, elemento)` conserva la asignación automática del siguiente identificador disponible, pero ahora también:

- Comprueba que el título sea válido.
- Comprueba que los campos obligatorios estén completos.
- Incorpora el videojuego al array.
- Guarda los cambios en una cookie.
- Actualiza las tarjetas, el resumen y las estadísticas de la página.

El formulario HTML recoge los datos del nuevo videojuego y el botón `anadirJuego` ejecuta el proceso. Cuando el videojuego se añade correctamente, se muestra un mensaje de confirmación y se limpian los campos del formulario.

**Eliminar videojuegos**

La función `eliminarPorId(lista, id)` sigue permitiendo eliminar videojuegos mediante su identificador.

Ahora, cuando encuentra el ID, elimina el videojuego, guarda los cambios en la cookie y actualiza el contenido de la página.

Devuelve `true` si el videojuego se ha eliminado y `false` si no se encuentra el identificador.

Actualmente, la función está implementada en JavaScript, aunque todavía no se ha incorporado un botón específico para eliminar videojuegos desde la interfaz gráfica.

### 9. Tecnologías y conceptos trabajados

En este sprint hemos ampliado los conocimientos del Sprint 0 incorporando:

- **HTML5:** creación de la estructura de la página, formulario, buscador, botones y contenedores.
- **CSS3:** diseño de tarjetas, cuadrícula adaptable, clases de estado y estilos visuales.
- **JavaScript:** manipulación del DOM, creación dinámica de elementos y gestión de eventos.
- **Arrays y objetos:** búsqueda, ordenación y modificación de la colección.
- **Métodos de arrays:** uso de `sort()`, `push()`, `splice()`, `map()` y `Object.entries()`.
- **Fechas:** utilización de objetos `Date` y cálculos de tiempo.
- **Expresiones regulares:** validación de los títulos.
- **Cookies:** almacenamiento y recuperación de información.
- **JSON:** conversión de arrays a texto y recuperación de los datos mediante `JSON.stringify()` y `JSON.parse()`.

## Objetivo del Sprint 1

El objetivo de este sprint ha sido ampliar la biblioteca de videojuegos inicial mediante una interfaz web que permita visualizar y gestionar la colección de una forma más cómoda.

Además, hemos aprendido a manipular elementos HTML desde JavaScript, gestionar eventos del usuario, trabajar con fechas, validar datos y utilizar cookies para conservar la información y las preferencias de ordenación.

De esta manera, el proyecto evoluciona desde una aplicación basada en la consola del navegador hasta una biblioteca de videojuegos con una interfaz gráfica y funcionalidades interactivas.

---

# ¿Cómo se ejecuta el proyecto?

1. Clonar o descargar el proyecto.
2. Abrir la carpeta del proyecto con Visual Studio Code.
3. Abrir el archivo `index.html` en un navegador.
4. Visualizar la biblioteca de videojuegos y comprobar que aparecen las tarjetas.
5. Utilizar el buscador, los botones de ordenación y el formulario para probar las funcionalidades.
6. Abrir las herramientas de desarrollador del navegador pulsando **F12** y entrar en la pestaña **Console** para comprobar los resultados de las funciones y verificar que no aparecen errores en rojo.

# Tecnologías utilizadas

- **HTML5:** estructura y contenido de la página web.
- **CSS3:** diseño, presentación y adaptación de las tarjetas y los elementos de la interfaz.
- **JavaScript:** almacenamiento de datos, manipulación del DOM, búsquedas, ordenación, validaciones, fechas y gestión de videojuegos.
- **Cookies:** almacenamiento de la colección y de las preferencias de ordenación.
- **JSON:** conversión y recuperación de los datos almacenados.
- **Consola del navegador:** comprobación de resultados y depuración de la aplicación.

# Estructura del proyecto

```text
biblioteca-videojuegos/
├── index.html
├── README.md
├── css/
│   └── estilos.css
└── js/
    └── app.js
```

# Objetivo general del proyecto

El objetivo general del proyecto es desarrollar una biblioteca de videojuegos utilizando los conocimientos adquiridos durante la asignatura de DWEC.

A través de los diferentes sprints hemos evolucionado desde una aplicación basada en JavaScript y la consola del navegador hasta una aplicación web con una interfaz gráfica e interactiva.

Durante este desarrollo hemos practicado la gestión de arrays y objetos, la creación de funciones, la manipulación del DOM, el tratamiento de fechas, la validación de datos y el almacenamiento de información mediante cookies.