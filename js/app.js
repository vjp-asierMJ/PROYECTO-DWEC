/* =====================================================
   BIBLIOTECA DE VIDEOJUEGOS

   Este archivo contiene toda la lógica de la aplicación:
   - Datos iniciales de la biblioteca.
   - Funciones para trabajar con fechas.
   - Búsqueda, ordenación y gestión de videojuegos.
   - Estadísticas de la colección.
   - Guardado del criterio de ordenación mediante cookies.
   - Creación y actualización del contenido de la página.
   - Eventos de los controles HTML.

   Se utilizan los recursos trabajados en las sesiones
   ===================================================== */


// =====================================================
// 1. DATOS INICIALES Y VARIABLES DE LA APLICACIÓN
// =====================================================

// Array principal. Cada posición contiene un objeto videojuego.
// Todos los videojuegos tienen los mismos campos.
let videojuegos = [
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

// Número de días que se utiliza para destacar un videojuego reciente.
const DIAS_RECIENTE = 30;

// Estado de la interfaz. Se modifica cuando el usuario escribe
// en el buscador o selecciona un criterio de ordenación.
let textoBuscado = "";
let criterio = "ninguno";


// =====================================================
// 2. FUNCIONES PARA TRABAJAR CON FECHAS
// =====================================================

/*
   crearFecha(texto)
   -----------------
   Convierte una fecha guardada como texto (AAAA-MM-DD)
   en un objeto Date.

   Se añade T00:00 para que la fecha se interprete a
   medianoche en la hora local.

   Parámetro:
   - texto: fecha en formato AAAA-MM-DD.

   Devuelve:
   - Un objeto Date.
*/
function crearFecha(texto) {
    return new Date(texto + "T00:00");
}

/*
   fechaLegible(texto)
   -------------------
   Convierte una fecha al formato habitual en español.
   Por ejemplo: 2026-10-01 se muestra como 1 de octubre de 2026.

   Parámetro:
   - texto: fecha en formato AAAA-MM-DD.

   Devuelve:
   - La fecha preparada como texto para mostrarla en una tarjeta.
*/
function fechaLegible(texto) {
    return crearFecha(texto).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

/*
   diasDesde(texto)
   ----------------
   Calcula los días transcurridos desde la fecha indicada
   hasta el momento actual.

   Parámetro:
   - texto: fecha en formato AAAA-MM-DD.

   Devuelve:
   - El número entero de días transcurridos.
*/
function diasDesde(texto) {
    const MS_DIA = 24 * 60 * 60 * 1000;
    const milisegundos = Date.now() - crearFecha(texto).getTime();

    return Math.floor(milisegundos / MS_DIA);
}


// =====================================================
// 3. FUNCIONES PARA CONSULTAR Y GESTIONAR VIDEOJUEGOS
// =====================================================

/*
   listarTodos(lista)
   ------------------
   Recorre la lista y escribe en la consola el título de
   cada videojuego. Clasifica como clásico los lanzados
   hasta 2023 y como reciente los posteriores.
*/
function listarTodos(lista) {
    const LIMITE_ANIO = 2023;

    console.log("--- Todos los videojuegos ---");

    for (const videojuego of lista) {
        const anio = crearFecha(videojuego.fecha).getFullYear();
        const etiqueta = anio <= LIMITE_ANIO ? "clásico" : "reciente";

        console.log(videojuego.id + ". " + videojuego.titulo + " - " + etiqueta);
    }
}

/*
   filtrar(lista, limite)
   ---------------------
   Cuenta los videojuegos disponibles cuyo año de lanzamiento
   es menor o igual que el límite recibido.

   Parámetros:
   - lista: array de videojuegos.
   - limite: último año que se quiere incluir.

   Devuelve:
   - La cantidad de videojuegos que cumplen las condiciones.
*/
function filtrar(lista, limite) {
    let encontrados = 0;

    console.log("--- Videojuegos disponibles hasta " + limite + " ---");

    for (const videojuego of lista) {
        const anio = crearFecha(videojuego.fecha).getFullYear();

        if (videojuego.disponible && anio <= limite) {
            console.log(videojuego.id + ". " + videojuego.titulo + " - " + anio);
            encontrados++;
        }
    }

    return encontrados;
}

/*
   contarPorCategoria(lista)
   ------------------------
   Cuenta cuántos videojuegos hay de cada género.

   Se utiliza un objeto como tabla de contadores:
   el nombre del género es la propiedad y su cantidad es el valor.
   El array nombresGeneros permite recorrer después los géneros
   en el mismo orden en el que aparecen por primera vez.

   Parámetro:
   - lista: array de videojuegos.

   Devuelve:
   - Un objeto con las cantidades y los nombres de los géneros.
*/
function contarPorCategoria(lista) {
    const generos = {};
    const nombresGeneros = [];

    for (const videojuego of lista) {
        const genero = videojuego.genero;

        // Si todavía no existe ese género, creamos su contador.
        if (generos[genero] === undefined) {
            generos[genero] = 0;
            nombresGeneros.push(genero);
        }

        // Sumamos uno al contador del género correspondiente.
        generos[genero]++;
    }

    return {
        cantidades: generos,
        nombres: nombresGeneros
    };
}

/*
   buscarPorTexto(lista, texto)
   ---------------------------
   Devuelve otro array con los títulos que contienen el texto buscado.

   Se usa split(texto) para comprobar si el título se puede separar
   por el texto introducido. Si el resultado tiene más de una parte,
   significa que el texto aparece en el título.

   La búsqueda distingue entre mayúsculas y minúsculas.

   Parámetros:
   - lista: array completo de videojuegos.
   - texto: texto escrito en el buscador.

   Devuelve:
   - Un array con los videojuegos encontrados.
*/
function buscarPorTexto(lista, texto) {
    const resultado = [];

    for (const videojuego of lista) {
        // Si el buscador está vacío, se incluye todo el catálogo.
        // Si no, se comprueba si el título contiene el texto.
        if (texto === "" || videojuego.titulo.split(texto).length > 1) {
            resultado.push(videojuego);
        }
    }

    return resultado;
}

/*
   validarTitulo(titulo)
   --------------------
   Comprueba que el título tenga entre 3 y 50 caracteres.
   La expresión regular permite letras, números, espacios y
   algunos signos de puntuación.

   Devuelve true si el título cumple el patrón y false si no.
*/
function validarTitulo(titulo) {
    const patron = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ0-9\s:'.,!?()-]{3,50}$/;
    return patron.test(titulo);
}

/*
   anadir(lista, elemento)
   ----------------------
   Valida los datos, calcula el siguiente identificador y añade
   el objeto al array recibido.

   No guarda la colección en cookies: la cookie se utiliza
   únicamente para recordar el criterio de ordenación.

   Parámetros:
   - lista: array donde se añadirá el videojuego.
   - elemento: objeto con los datos del videojuego nuevo.

   Devuelve:
   - El identificador nuevo si se añade correctamente.
   - false si los datos no son válidos.
*/
function anadir(lista, elemento) {
    // Comprobamos primero que el título cumple el patrón.
    if (!validarTitulo(elemento.titulo)) {
        return false;
    }

    // Comprobamos que los campos obligatorios no estén vacíos.
    if (elemento.genero === "" ||
        elemento.plataforma === "" ||
        elemento.fecha === "") {
        return false;
    }

    // Buscamos el ID más alto para no repetir identificadores.
    let maxId = 0;

    for (const videojuego of lista) {
        if (videojuego.id > maxId) {
            maxId = videojuego.id;
        }
    }

    // El nuevo identificador será el máximo más uno.
    elemento.id = maxId + 1;

    // Incorporamos el nuevo objeto al array.
    lista.push(elemento);

    return elemento.id;
}

/*
   eliminarPorId(lista, id)
   -----------------------
   Busca un videojuego por su identificador y lo elimina.

   Se utiliza splice(i, 1) para quitar un elemento en la posición i.
   La función termina inmediatamente después de eliminarlo, con return.

   Parámetros:
   - lista: array donde se busca el videojuego.
   - id: identificador que se quiere eliminar.

   Devuelve:
   - true si lo encuentra y lo elimina.
   - false si no existe ese identificador.
*/
function eliminarPorId(lista, id) {
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].id === id) {
            lista.splice(i, 1);
            return true;
        }
    }

    return false;
}

/*
   estadisticas(lista)
   -------------------
   Calcula estadísticas útiles de la colección. No suma los ID:
   trabaja con los años de lanzamiento de los videojuegos.

   Devuelve un objeto con:
   - Total de videojuegos.
   - Número de disponibles y no disponibles.
   - Año medio de lanzamiento.
   - Videojuego más reciente.
   - Videojuego más antiguo.

   Si la lista está vacía, los videojuegos más reciente y más
   antiguo quedan a null y el año medio también queda a null.
*/
function estadisticas(lista) {
    let disponibles = 0;
    let sumaAnios = 0;
    let masReciente = null;
    let masAntiguo = null;

    for (const videojuego of lista) {
        const fecha = crearFecha(videojuego.fecha);
        const anio = fecha.getFullYear();

        // Sumamos años de lanzamiento para calcular la media.
        sumaAnios += anio;

        // Contamos los videojuegos que están disponibles.
        if (videojuego.disponible) {
            disponibles++;
        }

        // Comparamos fechas para encontrar el lanzamiento más reciente.
        if (masReciente === null || fecha > crearFecha(masReciente.fecha)) {
            masReciente = videojuego;
        }

        // Comparamos fechas para encontrar el lanzamiento más antiguo.
        if (masAntiguo === null || fecha < crearFecha(masAntiguo.fecha)) {
            masAntiguo = videojuego;
        }
    }

    // Evitamos dividir entre cero cuando no hay videojuegos.
    let anioMedioLanzamiento = null;

    if (lista.length > 0) {
        anioMedioLanzamiento = sumaAnios / lista.length;
    }

    // Se devuelve un objeto para que otras funciones utilicen los datos.
    return {
        totalVideojuegos: lista.length,
        videojuegosDisponibles: disponibles,
        videojuegosNoDisponibles: lista.length - disponibles,
        anioMedioLanzamiento: anioMedioLanzamiento,
        videojuegoMasReciente: masReciente,
        videojuegoMasAntiguo: masAntiguo
    };
}


// =====================================================
// 4. FUNCIONES PARA GUARDAR EL CRITERIO DE ORDENACIÓN
// =====================================================

/*
   guardarCookie(nombre, valor, dias)
   ----------------------------------
   Guarda una cookie con el nombre y valor indicados.
   La duración se recibe en días y se convierte a segundos.

   En este proyecto se llama para guardar la cookie "orden".
   No se guarda el array de videojuegos.
*/
function guardarCookie(nombre, valor, dias) {
    const segundos = dias * 24 * 60 * 60;
    const texto = encodeURIComponent(valor);

    document.cookie = nombre + "=" + texto +
        "; max-age=" + segundos + "; path=/";
}

/*
   leerCookie(nombre)
   ------------------
   Lee las cookies disponibles y busca la que tenga el nombre recibido.

   Devuelve el valor de la cookie si la encuentra o null si no existe.
*/
function leerCookie(nombre) {
    const partes = document.cookie.split("; ");

    for (const parte of partes) {
        // Separamos el nombre y el valor de cada cookie.
        const [clave, valor] = parte.split("=");

        if (clave === nombre) {
            return decodeURIComponent(valor);
        }
    }

    return null;
}

/*
   eliminarCookie(nombre)
   ---------------------
   Borra una cookie asignándole una duración de cero segundos.
   Se utiliza para eliminar la antigua cookie "videojuegos" que
   guardaba la colección completa en versiones anteriores.
*/
function eliminarCookie(nombre) {
    // Primero comprobamos si la cookie existe.
    // Así no intentamos escribir una cookie cuando se abre la página
    // directamente como archivo (file://), donde el navegador puede
    // no permitir guardar cookies.
    const partes = document.cookie.split("; ");

    for (const parte of partes) {
        const [clave] = parte.split("=");

        if (clave === nombre) {
            document.cookie = nombre + "=; max-age=0; path=/";
            return;
        }
    }
}

/*
   elegirOrden(nuevoCriterio)
   -------------------------
   Cambia el criterio de ordenación, lo guarda durante 30 días
   y vuelve a actualizar el contenido de la página.
*/
function elegirOrden(nuevoCriterio) {
    criterio = nuevoCriterio;

    // Actualizamos primero la página para que la ordenación funcione
    // incluso si el navegador no permite guardar cookies.
    renderizarAplicacion();

    // La cookie solo recuerda la preferencia de ordenación.
    guardarCookie("orden", criterio, 30);
}

/*
   ordenar(lista, criterioOrden)
   ----------------------------
   Ordena una copia de la lista para no modificar el array original.

   Criterios disponibles:
   - nombre: orden alfabético A-Z.
   - numero: ID de menor a mayor.
   - fecha: fecha de lanzamiento más reciente primero.

   Devuelve el array ordenado.
*/
function ordenar(lista, criterioOrden) {
    const copia = [...lista];

    if (criterioOrden === "nombre") {
        copia.sort((a, b) => a.titulo.localeCompare(b.titulo));
    } else if (criterioOrden === "numero") {
        copia.sort((a, b) => a.id - b.id);
    } else if (criterioOrden === "fecha") {
        copia.sort((a, b) => crearFecha(b.fecha) - crearFecha(a.fecha));
    }

    return copia;
}


// =====================================================
// 5. FUNCIONES PARA MOSTRAR LOS VIDEOJUEGOS EN EL DOM
// =====================================================

/*
   crearTarjeta(videojuego)
   -----------------------
   Crea un article con los datos de un videojuego.
   También añade el botón que permite eliminarlo.

   Devuelve:
   - El elemento article creado y preparado para insertarlo en la página.
*/
function crearTarjeta(videojuego) {
    // Creamos el contenedor principal de la tarjeta.
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta");

    // Creamos el título.
    const titulo = document.createElement("h2");
    titulo.textContent = videojuego.titulo;
    tarjeta.append(titulo);

    // Creamos el texto del género.
    const genero = document.createElement("p");
    genero.textContent = "Género: " + videojuego.genero;
    tarjeta.append(genero);

    // Creamos el texto de la plataforma.
    const plataforma = document.createElement("p");
    plataforma.textContent = "Plataforma: " + videojuego.plataforma;
    tarjeta.append(plataforma);

    // Creamos la fecha con el formato legible en español.
    const fecha = document.createElement("p");
    fecha.classList.add("fecha");
    fecha.textContent = "Lanzamiento: " + fechaLegible(videojuego.fecha);

    // Destacamos los videojuegos lanzados en los últimos 30 días.
    const dias = diasDesde(videojuego.fecha);

    // La condición dias >= 0 evita destacar fechas que todavía no han llegado.
    if (dias >= 0 && dias <= DIAS_RECIENTE) {
        tarjeta.classList.add("reciente");
    }

    tarjeta.append(fecha);

    // Creamos la etiqueta de disponibilidad.
    const estado = document.createElement("span");
    estado.classList.add("estado");

    if (videojuego.disponible) {
        estado.classList.add("disponible");
    } else {
        estado.classList.add("no-disponible");
    }

    estado.textContent = videojuego.disponible ? "Disponible" : "No disponible";
    tarjeta.append(estado);

    // Creamos el botón de eliminación.
    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add("boton-eliminar");
    botonEliminar.textContent = "Eliminar";

    // Al pulsarlo, se elimina el videojuego y se repinta la aplicación.
    botonEliminar.addEventListener("click", function () {
        const eliminado = eliminarPorId(videojuegos, videojuego.id);

        if (eliminado) {
            mostrarMensaje("Videojuego eliminado correctamente.", "correcto");
            renderizarAplicacion();
        }
    });

    tarjeta.append(botonEliminar);

    return tarjeta;
}

/*
   pintar(lista)
   -------------
   Vacía el contenedor #listado y añade una tarjeta por cada
   videojuego de la lista recibida.

   Si la lista está vacía, muestra un mensaje en lugar de tarjetas.
*/
function pintar(lista) {
    const listado = document.querySelector("#listado");

    // Quitamos las tarjetas anteriores para evitar duplicados.
    listado.replaceChildren();

    if (lista.length === 0) {
        const mensajeVacio = document.createElement("p");
        mensajeVacio.classList.add("vacio");
        mensajeVacio.textContent = "No hay videojuegos para mostrar.";
        listado.append(mensajeVacio);
        return;
    }

    // Creamos e insertamos una tarjeta para cada videojuego.
    for (const videojuego of lista) {
        listado.append(crearTarjeta(videojuego));
    }
}

/*
   pintarResumen(mostrados)
   -----------------------
   Actualiza el párrafo #resumen.
   Informa de cuántos videojuegos se muestran o explica
   que la búsqueda no ha encontrado resultados.
*/
function pintarResumen(mostrados) {
    const resumen = document.querySelector("#resumen");

    if (videojuegos.length === 0) {
        resumen.textContent = "La biblioteca está vacía.";
    } else if (mostrados === 0) {
        resumen.textContent = "No hay videojuegos que contengan '" + textoBuscado + "'.";
    } else {
        resumen.textContent = "Mostrando " + mostrados +
            " de " + videojuegos.length + " videojuegos.";
    }
}

/*
   mostrarEstadisticasEnPagina(lista)
   ---------------------------------
   Obtiene las estadísticas y las cantidades por género.
   Después construye un texto y lo escribe en #estadisticas.
*/
function mostrarEstadisticasEnPagina(lista) {
    const elementoEstadisticas = document.querySelector("#estadisticas");
    const datos = estadisticas(lista);
    const datosGeneros = contarPorCategoria(lista);

    // Primera parte: totales y disponibilidad.
    let texto = "Total: " + datos.totalVideojuegos +
        " | Disponibles: " + datos.videojuegosDisponibles +
        " | No disponibles: " + datos.videojuegosNoDisponibles;

    // Si hay elementos, añadimos media, fecha más reciente y más antigua.
    if (datos.totalVideojuegos > 0) {
        const mediaRedondeada = Math.round(datos.anioMedioLanzamiento * 10) / 10;

        texto += " | Año medio de lanzamiento: " + mediaRedondeada;
        texto += " | Más reciente: " + datos.videojuegoMasReciente.titulo;
        texto += " | Más antiguo: " + datos.videojuegoMasAntiguo.titulo;
    }

    // Segunda parte: cantidades de cada género.
    let textoGeneros = "";

    for (const genero of datosGeneros.nombres) {
        // Añadimos el separador solo a partir del segundo género.
        if (textoGeneros !== "") {
            textoGeneros += " | ";
        }

        textoGeneros += genero + ": " + datosGeneros.cantidades[genero];
    }

    if (textoGeneros === "") {
        textoGeneros = "Sin géneros todavía";
    }

    elementoEstadisticas.textContent = texto +
        " | Videojuegos por género: " + textoGeneros;
}

/*
   mostrarMensaje(texto, tipo)
   --------------------------
   Escribe mensajes de validación o confirmación en el párrafo
   #mensaje. No utiliza alert(): el mensaje aparece dentro de la página.

   tipo puede ser "error" o "correcto".
*/
function mostrarMensaje(texto, tipo) {
    const mensaje = document.querySelector("#mensaje");
    mensaje.textContent = texto;

    if (tipo === "error") {
        mensaje.style.color = "#a12323";
    } else {
        mensaje.style.color = "#176b30";
    }
}

/*
   limpiarFormulario()
   -------------------
   Deja vacíos los campos de texto y fecha después de añadir
   un videojuego. La disponibilidad vuelve a "Disponible".
*/
function limpiarFormulario() {
    document.querySelector("#titulo").value = "";
    document.querySelector("#genero").value = "";
    document.querySelector("#plataforma").value = "";
    document.querySelector("#fecha").value = "";
    document.querySelector("#disponible").value = "true";
}

/*
   renderizarAplicacion()
   ---------------------
   Es el único punto general de actualización de la interfaz.
   1. Busca en la colección completa.
   2. Ordena los resultados.
   3. Pinta las tarjetas.
   4. Actualiza el resumen.
   5. Actualiza las estadísticas.

   Los eventos modifican el estado y llaman a esta función.
*/
function renderizarAplicacion() {
    const encontrados = buscarPorTexto(videojuegos, textoBuscado);
    const ordenados = ordenar(encontrados, criterio);

    pintar(ordenados);
    pintarResumen(ordenados.length);
    mostrarEstadisticasEnPagina(videojuegos);
}


// =====================================================
// 6. INICIO DE LA APLICACIÓN Y CONEXIÓN DE EVENTOS
// =====================================================

/*
   iniciarAplicacion()
   -------------------
   Prepara la aplicación cuando el navegador ya ha leído el HTML.
   El archivo se carga con defer, por lo que los elementos del DOM
   ya existen cuando se ejecuta esta función.

   También recupera la cookie "orden", conecta los eventos de los
   controles y realiza el primer pintado.
*/
function iniciarAplicacion() {
    // Si existe la antigua cookie con la colección, la eliminamos.
    // Si no existe (por ejemplo, al abrir con file://), no intentamos escribir.
    eliminarCookie("videojuegos");

    // Recuperamos el criterio de ordenación guardado anteriormente.
    const ordenGuardado = leerCookie("orden");

    // Solo aceptamos los tres criterios que utiliza la aplicación.
    if (ordenGuardado === "nombre" ||
        ordenGuardado === "numero" ||
        ordenGuardado === "fecha") {
        criterio = ordenGuardado;
    } else {
        criterio = "ninguno";
    }

    // Pintamos la biblioteca al iniciar, antes de conectar los eventos.
    // Así las tarjetas aparecen aunque algún control del formulario
    // tenga un identificador incorrecto.
    renderizarAplicacion();

    // Seleccionamos los controles HTML que van a tener eventos.
    const buscador = document.querySelector("#buscador");
    const botonNombre = document.querySelector("#ordenNombre");
    const botonNumero = document.querySelector("#ordenNumero");
    const botonFecha = document.querySelector("#ordenFecha");
    const botonAnadir = document.querySelector("#anadirJuego");

    // BUSCADOR: se ejecuta cada vez que cambia el contenido del campo.
    buscador.addEventListener("input", function () {
        textoBuscado = buscador.value;
        renderizarAplicacion();
    });

    // ORDENACIÓN POR NOMBRE.
    botonNombre.addEventListener("click", function () {
        elegirOrden("nombre");
    });

    // ORDENACIÓN POR IDENTIFICADOR.
    botonNumero.addEventListener("click", function () {
        elegirOrden("numero");
    });

    // ORDENACIÓN POR FECHA DE LANZAMIENTO.
    botonFecha.addEventListener("click", function () {
        elegirOrden("fecha");
    });

    // FORMULARIO: recoge los valores y crea el objeto nuevo.
    botonAnadir.addEventListener("click", function () {
        const nuevoVideojuego = {
            titulo: document.querySelector("#titulo").value,
            genero: document.querySelector("#genero").value,
            plataforma: document.querySelector("#plataforma").value,
            fecha: document.querySelector("#fecha").value,
            // El desplegable devuelve texto; lo convertimos a booleano.
            disponible: document.querySelector("#disponible").value === "true"
        };

        // Validamos el título antes de llamar a la función de alta.
        if (!validarTitulo(nuevoVideojuego.titulo)) {
            mostrarMensaje(
                "El título debe tener entre 3 y 50 caracteres y utilizar caracteres válidos.",
                "error"
            );
            return;
        }

        // Comprobamos que los demás campos obligatorios estén completos.
        if (nuevoVideojuego.genero === "" ||
            nuevoVideojuego.plataforma === "" ||
            nuevoVideojuego.fecha === "") {
            mostrarMensaje("Debes completar todos los campos.", "error");
            return;
        }

        // anadir devuelve el nuevo ID o false si no se pudo añadir.
        const nuevoId = anadir(videojuegos, nuevoVideojuego);

        if (nuevoId !== false) {
            limpiarFormulario();
            mostrarMensaje("Videojuego añadido correctamente.", "correcto");
            renderizarAplicacion();
        }
    });

}


// =====================================================
// 7. EJECUCIÓN INICIAL
// =====================================================

// Esta llamada inicia la aplicación, conecta los eventos y pinta la lista.
iniciarAplicacion();
