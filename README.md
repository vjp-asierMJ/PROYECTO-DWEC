# Biblioteca de Videojuegos - Proyecto DWEC

**Autores:** Aimar Moreno Fuentes y Asier Martín Jiménez.

## Descripción del proyecto

La aplicación es una biblioteca de videojuegos desarrollada con HTML, CSS y JavaScript. Permite consultar una colección, buscar títulos, ordenar los resultados, añadir videojuegos, eliminarlos y consultar información general de la biblioteca.

Los datos iniciales se guardan en un array de objetos. Cada videojuego contiene los siguientes campos:

- **`id`**: identificador único.
- **`titulo`**: nombre del videojuego.
- **`genero`**: género al que pertenece.
- **`plataforma`**: plataforma en la que se puede jugar.
- **`fecha`**: fecha de lanzamiento en formato `AAAA-MM-DD`.
- **`disponible`**: valor `true` o `false` que indica su disponibilidad.

## Sprint 0 - Fundamentos de JavaScript

En el primer sprint se creó la colección de videojuegos y se practicó el trabajo con arrays, objetos, funciones, bucles y condicionales.

Las funciones principales de esta parte son:

- **`listarTodos(lista)`**: recorre y muestra los videojuegos, indicando si son clásicos o recientes según el año de lanzamiento.
- **`filtrar(lista, limite)`**: muestra los videojuegos disponibles hasta el año indicado y devuelve cuántos ha encontrado.
- **`contarPorCategoria(lista)`**: cuenta cuántos videojuegos hay de cada género y devuelve un objeto con los resultados.
- **`buscarPorTexto(lista, texto)`**: devuelve los videojuegos cuyo título contiene el texto indicado, sin distinguir mayúsculas y minúsculas.
- **`anadir(lista, elemento)`**: valida los datos, asigna el siguiente identificador y añade el videojuego.
- **`eliminarPorId(lista, id)`**: elimina el videojuego que tiene ese identificador. Devuelve `true` si lo encuentra y `false` si no existe.
- **`estadisticas(lista)`**: devuelve un objeto con el total de videojuegos, el número de disponibles y no disponibles, el año medio de lanzamiento y los videojuegos más antiguo y más reciente.

## Sprint 1 - Interfaz web y fechas

En este sprint se incorporó una interfaz gráfica con HTML y CSS. Los videojuegos se muestran en tarjetas creadas desde JavaScript y se añadieron controles para buscar y ordenar la colección.

También se incorporaron funciones para trabajar con fechas:

- **`crearFecha(texto)`**: convierte una fecha en un objeto `Date`.
- **`fechaLegible(texto)`**: muestra la fecha en un formato legible en español.
- **`diasDesde(texto)`**: calcula los días transcurridos desde una fecha.
- **`formatearFecha(fecha)`**: cambia el formato `AAAA-MM-DD` a `DD/MM/AAAA`.

La ordenación se realiza por título, identificador o fecha de lanzamiento. La función `ordenar(lista, criterio)` trabaja sobre una copia para no cambiar el orden original del array.

## Sprint 2 - Correcciones y organización del código

En este sprint se han aplicado las siguientes mejoras:

### 1. Inicio sin errores cuando no hay cookies

Se han quitado las llamadas de prueba que eliminaban videojuegos al cargar la página. Esas pruebas modificaban la colección y podían ejecutar funciones antes de que estuviera preparado el estado del buscador. La aplicación ahora configura primero sus variables y eventos y realiza una única carga inicial.

### 2. La cookie guarda únicamente la ordenación

Las funciones `guardarCookie(nombre, valor, dias)` y `leerCookie(nombre)` se utilizan para guardar y recuperar la preferencia de ordenación. La cookie se llama `orden` y puede contener `nombre`, `numero` o `fecha`.

La cookie antigua `videojuegos`, que almacenaba toda la colección, se elimina al iniciar la aplicación. La colección ya no se guarda en cookies: los videojuegos añadidos o eliminados permanecen en memoria mientras la página está abierta y se recuperan los datos iniciales al recargarla.

### 3. Estadísticas con datos útiles

La función `estadisticas(lista)` ya no suma identificadores. Calcula datos relacionados con la colección: cantidad total, disponibilidad, año medio de lanzamiento y videojuegos con la fecha más antigua y más reciente. Devuelve todos estos resultados dentro de un objeto mediante `return`.

### 4. Actualización centralizada y sin ventanas emergentes

Se han eliminado los `alert()`. Los mensajes de validación, confirmación y eliminación aparecen en la propia página.

La función `renderizarAplicacion()` es el único punto que actualiza las tarjetas, el resumen y las estadísticas. Las funciones que añaden y eliminan elementos se ocupan de modificar el array y devolver el resultado; después, el evento correspondiente solicita el repintado.

### 5. Uso de conceptos trabajados en clase

Se ha simplificado el código para evitar los métodos y recursos indicados como no vistos en clase: `map`, `find`, `Object.entries`, `JSON`, `dataset`, `substring`, `join` y `startsWith`.

En su lugar se utilizan arrays, objetos, funciones, bucles, condicionales, `switch`, `push`, `splice`, `sort`, `includes`, `split`, `indexOf`, `slice`, manipulación del DOM y eventos.

### 6. Gestión desde la interfaz

Cada tarjeta dispone de un botón **Eliminar**. Al pulsarlo, se elimina ese videojuego por su identificador y se actualiza la página. El formulario comprueba el título y los campos obligatorios antes de añadir un nuevo elemento.

## Cómo ejecutar el proyecto

1. Descargar o clonar la carpeta del proyecto.
2. Abrir la carpeta en Visual Studio Code.
3. Iniciar la página con un servidor local, por ejemplo, mediante la extensión **Live Server**.
4. Abrir la dirección local que proporciona el servidor.
5. Probar el buscador, los tres botones de ordenación, el formulario y los botones de eliminación.
6. Recargar la página para comprobar que se conserva la preferencia de ordenación. Los cambios realizados en la colección durante la sesión no se guardan al recargar.
7. Abrir las herramientas de desarrollador con **F12** y revisar la pestaña **Console** para comprobar que no aparecen errores.

## Tecnologías y conceptos utilizados

- **HTML5:** estructura de la página, controles, formulario y listado.
- **CSS3:** diseño de las tarjetas, cuadrícula adaptable, etiquetas y mensajes.
- **JavaScript:** arrays, objetos, funciones, bucles, condicionales, ordenación y validación.
- **DOM y eventos:** creación de tarjetas, actualización del contenido y respuesta a las acciones del usuario.
- **Fechas:** objetos `Date` y formato de fechas.
- **Cookies:** almacenamiento del criterio de ordenación durante 30 días.
- **Consola del navegador:** comprobación y depuración.

## Estructura del proyecto

```text
PROYECTO-DWEC/
├── index.html
├── README.md
├── css/
│   └── estilos.css
└── js/
    ├── datos.js
    ├── interfaz.js
    └── logica.js

```

## Uso de herramientas de inteligencia artificial

Se ha utilizado ChatGPT como herramienta de apoyo durante la revisión del proyecto. Se le ha pedido ayuda para localizar los problemas indicados en la corrección del Sprint 1, reorganizar las funciones, simplificar el código para ajustarlo a los contenidos trabajados en clase y revisar la documentación del README.

La herramienta se ha utilizado como apoyo para proponer y revisar cambios, no como sustituto del trabajo de los autores. Los autores deben revisar el resultado, probar el funcionamiento de la aplicación y comprender las funciones utilizadas para poder explicar las decisiones tomadas durante la defensa del proyecto.
