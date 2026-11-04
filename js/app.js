let  videojuegos = [
    {
        id: 1,
        titulo: "The Legend of Zelda: Echoes of Time",
        genero: "Aventura",
        plataforma: "Nintendo Switch",
        fecha: "2024-09-26",
        disponible: true
    },
    {
        id: 2,
        titulo: "Cyberpunk 2077",
        genero: "RPG",
        plataforma: "PC",
        fecha: "2020-12-10",
        disponible: true
    },
    {
        id: 3,
        titulo: "EA Sports FC 26",
        genero: "Deportes",
        plataforma: "PlayStation 5",
        fecha: "2025-09-26",
        disponible: true
    },
    {
        id: 4,
        titulo: "Minecraft",
        genero: "Sandbox",
        plataforma: "Xbox Series X",
        fecha: "2011-11-18",
        disponible: true
    },
    {
        id: 5,
        titulo: "Hades II",
        genero: "Acción",
        plataforma: "PC",
        fecha: "2025-09-25",
        disponible: true
    },
    {
        id: 6,
        titulo: "GTA VI",
        genero: "Acción",
        plataforma: "PlayStation 5",
        fecha: "2026-11-19",
        disponible: false
    },
    {
        id: 7,
        titulo: "Forza Horizon 5",
        genero: "Carreras",
        plataforma: "Xbox Series X",
        fecha: "2021-11-09",
        disponible: true
    },
    {
        id: 8,
        titulo: "Super Mario Bros. Wonder",
        genero: "Plataformas",
        plataforma: "Nintendo Switch",
        fecha: "2023-10-20",
        disponible: true
    },
    {
        id: 9,
        titulo: "Red Dead Redemption 2",
        genero: "Acción",
        plataforma: "PC",
        fecha: "2019-11-05",
        disponible: false
    },
    {
        id: 10,
        titulo: "Marvel's Spider-Man 2",
        genero: "Acción",
        plataforma: "PlayStation 5",
        fecha: "2023-10-20",
        disponible: true
    }
];

console.table(videojuegos);

/*
====================================================
Parte B . Reto 2 Fechas en tus tarjetas
====================================================
*/

/*
=================================
B2 Tres funciones para las fechas
=================================
*/

// Un videojuego se considerará reciente
// si fue lanzado hace menos de 365 días.
const DIAS_RECIENTE = 365;

function crearFecha(texto) {

    // T00:00 = medianoche local.
    return new Date(texto + "T00:00");
}

/*
----------------------------------------------------
Devuelve una fecha legible en español.
Ejemplo:
console.log(fechaLegible("2026-10-01"));
2026-10-01 -> 1 de octubre de 2026
----------------------------------------------------
*/
function fechaLegible(texto) {

    return crearFecha(texto).toLocaleDateString(
        "es-ES",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );
}

/*
----------------------------------------------------
Calcula cuántos días han pasado desde
la fecha indicada hasta hoy.
console.log(diasDesde("2026-10-01"));
----------------------------------------------------
*/
function diasDesde(texto) {

    const MS_DIA = 24 * 60 * 60 * 1000;

    const ms =
        Date.now() -
        crearFecha(texto).getTime();

    return Math.floor(ms / MS_DIA);
}


// ========== SESION 7 - PARTE B - RETO 2 ==========


//1.- Listar todo

// 1.- Listar todos los videojuegos
function listarTodos(videojuegos) {

    const LIMITE_ANIO = 2023;

    console.log("--- Todos los videojuegos ---");

    for (const videojuego of videojuegos) {

        // Extraemos el año de la fecha.
        const anio = Number(videojuego.fecha.substring(0, 4));

        // Comprobamos si es clásico o reciente.
        const etiqueta = anio <= LIMITE_ANIO
            ? "clásico"
            : "reciente";

        console.log(
            `${videojuego.id}. ${videojuego.titulo} - ${etiqueta}`
        );
    }
}
//2.- Filtrar

function filtrar(videojuegos, limite) {

    let encontrados = 0;

    console.log(`--- Videojuegos disponibles hasta ${limite} ---`);

    for (const videojuego of videojuegos) {

        const anio = Number(videojuego.fecha.substring(0, 4));

        if (videojuego.disponible && anio <= limite) {

            console.log(
                `${videojuego.id}. ${videojuego.titulo} - ${anio}`
            );

            encontrados++;
        }
    }

    return encontrados;
}

//funcion para contar por categoria
function contarPorCategoria(videojuegos) {

    let aventura = 0; //declaramos los distintos tipos de videojuegos
    let rpg = 0;
    let accion = 0;
    let deportes = 0;
    let otros = 0;

    for (const videojuego of videojuegos) { //recorre cada videojuego

        switch (videojuego.genero) { //dependiendo de su genero lo contamos

            case "Aventura":
                aventura++;
                break;

            case "RPG":
                rpg++;
                break;

            case "Acción":
                accion++;
                break;

            case "Deportes":
                deportes++;
                break;

            default: //opcion por defecto
                console.log(`Género inesperado: ${videojuego.genero}`);
                otros++;
        }
    }

    console.log("--- Videojuegos por género ---");
    console.log(`Aventura: ${aventura}`);
    console.log(`RPG: ${rpg}`);
    console.log(`Acción: ${accion}`);
    console.log(`Deportes: ${deportes}`);
    console.log(`Otros: ${otros}`);
}

// ========== SESION 8 - PARTE B - RETO 2 ==========
//funcion para buscar un videojuego
function buscarPorTexto(lista, texto) {

    const buscado = texto.toLowerCase(); //recogemos el titulo
    const resultado = []; //creamos un array para guardar los titulos encontrados

    for (const elemento of lista) {

        // Si el título contiene el texto buscado, lo añadimos al resultado.
        if (elemento.titulo.toLowerCase().includes(buscado)) {
            resultado.push(elemento);
        }
    }

    return resultado;
}
//funcion para validar el patron del titulo
function validarTitulo(titulo) {

    /*
    ^ inicio del texto.
    $ final del texto.
    A-Z y a-z letras.
    0-9 números.
    \s espacios.
    {3,50} mínimo 3 caracteres y máximo 50.
    */
    const patron = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s:'-.]{3,50}$/;

    return patron.test(titulo);
}

/*
Función para guardar los videojuegos en una cookie.
Recibe la lista completa de videojuegos.
*/
function guardarVideojuegos(lista) {

    // Convierte el array de videojuegos en un texto JSON.
    const datos = JSON.stringify(lista);

    // Guarda los datos en una cookie durante un año.
    document.cookie = "videojuegos=" +
        encodeURIComponent(datos) +
        "; max-age=31536000; path=/";
}


/*
Función para recuperar los videojuegos guardados.
*/
function cargarVideojuegos() {

    // Busca la cookie que contiene los videojuegos.
    const cookie = document.cookie
        .split("; ")
        .find(fila => fila.startsWith("videojuegos="));

    // Si no existe la cookie, devuelve un array vacío.
    if (!cookie) return [];

    // Decodifica el contenido y lo convierte otra vez en un array.
    return JSON.parse(
        decodeURIComponent(cookie.substring("videojuegos=".length))
    );
}

//funcion para añadir un videojuego

function anadir(lista, elemento) {

    // Validar título.
    if (!validarTitulo(elemento.titulo)) {

        alert("El título debe tener entre 3 y 50 caracteres.");

        return false;
    }

    // Comprobar que los campos obligatorios están completos.
    if (
        !elemento.genero ||
        !elemento.plataforma ||
        !elemento.fecha
    ) {
        alert("Debes completar todos los campos.");
        return false;
    }

    // Buscar el ID más alto.
    let maxId = 0;

    for (const videojuego of lista) {

        if (videojuego.id > maxId) {
            maxId = videojuego.id;
        }
    }

    // Asignar nuevo ID.
    elemento.id = maxId + 1;

    // Añadir al array.
    lista.push(elemento);

    // Guardar en cookie.
    guardarVideojuegos(lista);

    // Actualizar la página.
    actualizar();
    mostrarResumen(lista);
    mostrarEstadisticasEnPagina(lista);

    return elemento.id;
}
//asignamos los videojuegos cargados para a poder añadir el juego
const videojuegosGuardados = cargarVideojuegos();

// Si hay videojuegos guardados, los recuperamos.
// Si no, mantenemos los videojuegos iniciales.
if (videojuegosGuardados.length > 0) {
    videojuegos = videojuegosGuardados;
}
//funcion para eliminar un videojuego por el id, actualizada para borrar con cookie
function eliminarPorId(lista, id) {

    for (let i = 0; i < lista.length; i++) {

        if (lista[i].id === id) {

            lista.splice(i, 1);

            // Guardamos los cambios.
            guardarVideojuegos(lista);

            // Actualizamos la página.
            actualizar();
            mostrarResumen(lista);
            mostrarEstadisticasEnPagina(lista);

            return true;
        }
    }

    return false;
}

//funcion para mostrar las estadisticas

function estadisticas(lista) {

    // Comprobamos si la lista está vacía.
    if (lista.length === 0) {
        console.log("La lista de videojuegos está vacía.");
        return;
    }

    let total = 0;
    let maximo = lista[0];

    // Recorremos la lista.
    for (const videojuego of lista) {

        // Sumamos los ID.
        total += videojuego.id;

        // Buscamos el ID más alto.
        if (videojuego.id > maximo.id) {
            maximo = videojuego;
        }
    }

    // Calculamos la media.
    const media = total / lista.length;

    // Mostramos los resultados.
    console.log("--- Estadísticas de videojuegos ---");
    console.log("Total de los ID:", total);
    console.log("Media de los ID:", media.toFixed(1));
    console.log("Videojuego con el ID más alto:", maximo.titulo);
    console.log("Valor más alto:", maximo.id);
}

// Función para convertir una fecha de AAAA-MM-DD a DD/MM/AAAA
function formatearFecha(fecha) {
    const partes = fecha.split("-");

    return partes[2] + "/" + partes[1] + "/" + partes[0];
}

/*
====================================================
APARTADO B - FUNCIONES PARA MOSTRAR EL CONTENIDO
EN LA PÁGINA WEB
====================================================
*/


// B1. Crear una tarjeta para un videojuego
function crearTarjeta(videojuego) {

    // Creamos un artículo que será la tarjeta.
    const tarjeta = document.createElement("article");

    // Añadimos la clase CSS.
    tarjeta.classList.add("tarjeta");

    // Guardamos el ID en la tarjeta para identificarla.
    tarjeta.dataset.id = videojuego.id;


    // Creamos y mostramos el título del videojuego.
    const titulo = document.createElement("h2");
    titulo.textContent = videojuego.titulo;



    tarjeta.append(titulo);


    // Creamos un párrafo para el género.
    const genero = document.createElement("p");
    genero.textContent = "Género: " + videojuego.genero;

    tarjeta.append(genero);


    // Creamos un párrafo para la plataforma.
    const plataforma = document.createElement("p");
    plataforma.textContent = "Plataforma: " + videojuego.plataforma;

    tarjeta.append(plataforma);


    //MODIFICACION DE LA SESION 12 - B3
    // Creamos un párrafo para la fecha.
    const fecha = document.createElement("p");

    fecha.classList.add("fecha");

    fecha.textContent =
        "Lanzamiento: " +
        fechaLegible(videojuego.fecha);

    // Si se lanzó hace menos de 30 días,
    // añadimos la clase "reciente".
    if (diasDesde(videojuego.fecha) <= DIAS_RECIENTE) {
        tarjeta.classList.add("reciente");
    }

    tarjeta.append(fecha);


    // Creamos la etiqueta del estado de disponibilidad.
    const estado = document.createElement("span");

    // Aplicamos una clase dependiendo de si está disponible.
    estado.classList.add(
        "estado",
        videojuego.disponible
            ? "disponible"
            : "no-disponible"
    );

    // Mostramos el texto correspondiente.
    estado.textContent = videojuego.disponible
        ? "Disponible"
        : "No disponible";

    tarjeta.append(estado);


    // Devolvemos la tarjeta completa.
    return tarjeta;
}


// B2. Pintar una lista de videojuegos
function pintar(lista) {

    // Seleccionamos el contenedor de las tarjetas.
    const listado = document.querySelector("#listado");

    // Vaciamos el contenedor para evitar duplicados.
    listado.replaceChildren();

    // Si la lista está vacía, mostramos un mensaje.
    if (lista.length === 0) {
        const mensaje = document.createElement("p");

        mensaje.classList.add("vacio");
        mensaje.textContent = "No hay videojuegos para mostrar.";

        listado.append(mensaje);
        return;
    }

    // Recorremos cada videojuego.
    for (const videojuego of lista) {

        // Creamos su tarjeta y la añadimos al contenedor.
        listado.append(crearTarjeta(videojuego));
    }
}


// B3. Mostrar el resumen de la colección
function mostrarResumen(lista) {

    const resumen = document.querySelector("#resumen");

    // Contamos los videojuegos disponibles.
    let disponibles = 0;

    for (const videojuego of lista) {
        if (videojuego.disponible) {
            disponibles++;
        }
    }

    // Calculamos cuántos no están disponibles.
    const noDisponibles = lista.length - disponibles;

    // Mostramos el resumen.
    resumen.textContent =
        "Total de videojuegos: " + lista.length +
        " | Disponibles: " + disponibles +
        " | No disponibles: " + noDisponibles;
}


// B4. Mostrar las estadísticas de géneros en la página
function mostrarEstadisticasEnPagina(lista) {

    const estadisticasPagina =
        document.querySelector("#estadisticas");

    // Creamos un objeto para contar cada género.
    const generos = {};

    // Recorremos los videojuegos.
    for (const videojuego of lista) {

        const genero = videojuego.genero;

        // Inicializamos el contador si el género no existe.
        if (generos[genero] === undefined) {
            generos[genero] = 0;
        }

        // Incrementamos el contador.
        generos[genero]++;
    }

    // Convertimos los resultados en una cadena de texto.
    const textoGeneros = Object.entries(generos)
        .map(([genero, cantidad]) => genero + ": " + cantidad)
        .join(" | ");

    // Mostramos los resultados en la página.
    estadisticasPagina.textContent =
        "Videojuegos por género: " + textoGeneros;
}





// LLAMADA DE FUNCIONES
console.log("========== RESULTADOS ==========");
//listar todo
listarTodos(videojuegos);

const resultado2021 = filtrar(videojuegos, 2021);
console.log(`Encontrados hasta 2021: ${resultado2021}`);

const resultado2023 = filtrar(videojuegos, 2023);
console.log(`Encontrados hasta 2023: ${resultado2023}`);

//contar por categoria
contarPorCategoria(videojuegos);

//LLAMADAS SESIÓN 8 - PARTE B - RETO 2
//llamada de buscarPorTexto
buscarPorTexto(videojuegos, "God of War");
buscarPorTexto(videojuegos, "mario");



//mostramos el array en modo tabla
console.table(videojuegos);


console.table(buscarPorTexto(videojuegos, "m"));

//llamada e eliminar por id
eliminarPorId(videojuegos, 3);  // true
eliminarPorId(videojuegos, 99); // false

//llamada a listar todo
listarTodos(videojuegos);

//llamada a la funcion de estadisticas
estadisticas(videojuegos);


// INICIO DE LA APLICACIÓN WEB


// Mostramos los 10 videojuegos originales en tarjetas.
pintar(videojuegos);

// Mostramos el resumen de disponibilidad.
mostrarResumen(videojuegos);

// Mostramos las cantidades por género.
mostrarEstadisticasEnPagina(videojuegos);

/*
===========================
SESIÓN 11 -  PARTE B/RETO 2
===========================
*/

//B2: ESTADO Y ACTUALIZAR
//Variables de estado
let textoBuscado = "";
let criterio = "ninguno";

//Ordena una COPIA de la lista según el criterio
function ordenar(lista, criterio) {

    //Copiar para no modificar el array original
    const copia = [...lista];

    if (criterio === "nombre") {
        //Texto: localeCompare
        copia.sort((a, b) => a.titulo.localeCompare(b.titulo));
    } else if (criterio === "numero") {
        //Número: resta
        copia.sort((a, b) => a.id - b.id);
    }
    //Modificacion Sesion 12 - 4B
    else if (criterio === "fecha") {

        // Más recientes primero
        copia.sort((a, b) =>
            crearFecha(b.fecha) - crearFecha(a.fecha));
    }

    //Con "ninguno" se devuelve la copia sin ordenar
    return copia;
}


//B3: EVENTOS
//Primero se cogen los elementos del HTML por su id
const buscador = document.querySelector("#buscador");
const botonNombre = document.querySelector("#ordenNombre");
const botonNumero = document.querySelector("#ordenNumero");
const botonFecha = document.querySelector("#ordenFecha");
const botonAnadir = document.querySelector("#anadirJuego");



botonFecha.addEventListener(
    "click",
    () => elegirOrden("fecha")
);

//Buscador: se ejecuta cada vez que escribes
buscador.addEventListener("input", function () {
    textoBuscado = buscador.value;
    actualizar();
});

botonAnadir.addEventListener("click", function () {

    const nuevoVideojuego = {
        titulo: document.querySelector("#titulo").value,
        genero: document.querySelector("#genero").value,
        plataforma: document.querySelector("#plataforma").value,
        fecha: document.querySelector("#fecha").value,
        disponible: document.querySelector("#disponible").checked
    };

    const nuevoId = anadir(videojuegos, nuevoVideojuego);

    if (nuevoId !== false) {
        alert("Videojuego añadido correctamente");

        // Limpiamos los campos.
        document.querySelector("#titulo").value = "";
        document.querySelector("#genero").value = "";
        document.querySelector("#plataforma").value = "";
        document.querySelector("#fecha").value = "";
    }
});

// Mostramos los videojuegos en tarjetas (con búsqueda y orden)
actualizar();

// Mostramos el resumen de disponibilidad.
mostrarResumen(videojuegos);

// Mostramos las cantidades por género.
mostrarEstadisticasEnPagina(videojuegos);

/*
===========================
SESIÓN 11 -  PARTE C/RETO 3
===========================
*/

function pintarResumen(mostrados) {
    const resumen = document.querySelector("#resumen");

    if (mostrados > 0) {
        //Hay resultados: "Mostrando 4 de 10 videojuegos"
        resumen.textContent =
            "Mostrando " + mostrados +
            " de " + videojuegos.length +
            " videojuegos";
    } else {
        //No hay resultados: mostraremos el texto buscado
        resumen.textContent =
            "No hay videojuegos que contengan <<" +
            textoBuscado + ">>";
    }
}

//LLamamos dentro de actualizar
function actualizar() {

    const encontrados = buscarPorTexto(
        videojuegos,
        textoBuscado
    );

    const ordenados = ordenar(
        encontrados,
        criterio
    );

    pintar(ordenados);

    pintarResumen(ordenados.length);
}

// Mostramos los videojuegos, con búsqueda, orden y resumen.
actualizar();

// Mostramos las cantidades por género.
mostrarEstadisticasEnPagina(videojuegos);

/*
====================================================
PARTE A - RETO 1
FUNCIONES PARA GUARDAR Y LEER COOKIES
====================================================
*/

// A1. Guardar una cookie
function guardarCookie(nombre, valor, dias) {

    // Convertimos los días a segundos.
    const segundos = dias * 24 * 60 * 60;

    // Codificamos el texto para evitar problemas
    // con espacios o caracteres especiales.
    const texto = encodeURIComponent(valor);

    // Creamos la cookie indicando:
    // nombre, valor, duración y ruta.
    document.cookie =
        `${nombre}=${texto}; max-age=${segundos}; path=/`;
}

/*
----------------------------------------------------
Lee una cookie según su nombre.
Devuelve el valor encontrado o null si no existe.
----------------------------------------------------
*/
function leerCookie(nombre) {

    // Obtenemos todas las cookies y las
    // convertimos en un array.
    const partes = document.cookie.split("; ");

    // Recorremos las cookies.
    for (const parte of partes) {

        // Separamos nombre y valor.
        const [clave, valor] = parte.split("=");

        // Si encontramos la cookie buscada...
        if (clave === nombre) {

            // Devolvemos el valor decodificado.
            return decodeURIComponent(valor);
        }
    }

    // Si no existe la cookie, devolvemos null.
    return null;
}


/*
====================================================
A2. GUARDAR EL ORDEN AL PULSAR UN BOTÓN
====================================================
*/

// Cambia el criterio de ordenación,
// lo guarda en una cookie y actualiza
// la interfaz. Al recargar la página 
// se quedara seleccionada segun el tipo de busqueda aplicada
function elegirOrden(nuevo) {

    // Actualizamos el criterio.
    criterio = nuevo;

    // Guardamos el criterio durante 30 días.
    guardarCookie("orden", criterio, 30);

    // Refrescamos la lista.
    actualizar();
}

/*
====================================================
EVENTOS DE LOS BOTONES DE ORDENACIÓN
====================================================
*/

// Botón para ordenar por nombre (A-Z).
document
    .querySelector("#ordenNombre")
    .addEventListener("click", () => elegirOrden("nombre"));

// Botón para ordenar por ID.
document
    .querySelector("#ordenNumero")
    .addEventListener("click", () => elegirOrden("numero"));

/*
====================================================
A3. APLICAR EL ORDEN AL CARGAR LA PÁGINA
====================================================

Prueba en la consola:

document.cookie = "tema=oscuro";

Después ejecuta:

console.log(document.cookie);

Deberías ver algo parecido a:

tema=oscuro; orden=nombre

o

tema=oscuro; orden=numero

Si has borrado la cookie "orden",
solamente aparecerá:

tema=oscuro

====================================================
RECUPERAR EL ÚLTIMO CRITERIO DE ORDENACIÓN
====================================================
*/

// Leemos la cookie "orden".
// Si no existe, usamos "ninguno".
criterio = leerCookie("orden") ?? "ninguno";

// Mostramos los videojuegos aplicando
// el orden guardado en la cookie.
actualizar();

