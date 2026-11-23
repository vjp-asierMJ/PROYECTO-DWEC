/* =====================================================
   INTERFAZ DE LA BIBLIOTECA DE VIDEOJUEGOS

   Este módulo es el punto de entrada de la aplicación.
   Importa datos y lógica, trabaja con el DOM, gestiona cookies
   y conecta los eventos del buscador, los botones y el formulario.
   ===================================================== */

// Importamos los datos iniciales y las clases del proyecto.
import { datosVideojuegos } from "./datos.js";
import { Videojuego } from "./videojuego.js";
import { Biblioteca } from "./biblioteca.js";

// Importamos las funciones que trabajan con los datos.
import {
    fechaLegible,
    contarPorCategoria,
    estadisticas,
    ordenar
} from "./logica.js";

// Número de días que se utiliza para destacar un videojuego reciente.
const DIAS_RECIENTE = 30;

// Creamos la biblioteca convirtiendo los datos en instancias de Videojuego.
const biblioteca = Biblioteca.desdeDatos(datosVideojuegos);

// -----------------------------------------------------
// 1. ESTADO DE LA INTERFAZ
// -----------------------------------------------------

let textoBuscado = "";
let criterio = "ninguno";

// -----------------------------------------------------
// 2. FUNCIONES DE COOKIES
// -----------------------------------------------------

/* Guarda una cookie durante el número de días indicado. */
function guardarCookie(nombre, valor, dias) {
    const segundos = dias * 24 * 60 * 60;
    const texto = encodeURIComponent(valor);

    document.cookie = nombre + "=" + texto +
        "; max-age=" + segundos + "; path=/";
}

/* Busca una cookie por su nombre. Devuelve null si no existe. */
function leerCookie(nombre) {
    const partes = document.cookie.split("; ");

    for (const parte of partes) {
        const [clave, valor] = parte.split("=");

        if (clave === nombre) {
            return decodeURIComponent(valor);
        }
    }

    return null;
}

/* Elimina una cookie antigua solo si todavía existe. */
function eliminarCookie(nombre) {
    const partes = document.cookie.split("; ");

    for (const parte of partes) {
        const [clave] = parte.split("=");

        if (clave === nombre) {
            document.cookie = nombre + "=; max-age=0; path=/";
            return;
        }
    }
}

// -----------------------------------------------------
// 3. CREACIÓN Y PINTADO DE TARJETAS
// -----------------------------------------------------

/* Crea una tarjeta HTML para un videojuego y devuelve el article. */
function crearTarjeta(videojuego) {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta");

    const titulo = document.createElement("h2");
    titulo.textContent = videojuego.titulo;
    tarjeta.append(titulo);

    // El texto lo monta el método descripcion() de la clase.
    const descripcion = document.createElement("p");
    descripcion.textContent = videojuego.descripcion();
    tarjeta.append(descripcion);

    const fecha = document.createElement("p");
    fecha.classList.add("fecha");
    fecha.textContent = "Lanzamiento: " + fechaLegible(videojuego.fecha);

    // El método de la clase decide si la tarjeta se destaca como reciente.
    if (videojuego.esReciente(DIAS_RECIENTE)) {
        tarjeta.classList.add("reciente");
    }

    tarjeta.append(fecha);

    const estado = document.createElement("span");
    estado.classList.add("estado");

    if (videojuego.disponible) {
        estado.classList.add("disponible");
    } else {
        estado.classList.add("no-disponible");
    }

    // El getter estadoTexto se lee sin paréntesis.
    estado.textContent = videojuego.estadoTexto;
    tarjeta.append(estado);

    // El botón elimina este videojuego y actualiza la página.
    const botonEliminar = document.createElement("button");
    botonEliminar.type = "button";
    botonEliminar.classList.add("boton-eliminar");
    botonEliminar.textContent = "Eliminar";

    botonEliminar.addEventListener("click", function () {
        const eliminado = biblioteca.eliminar(videojuego.id);

        if (eliminado) {
            mostrarMensaje("Videojuego eliminado correctamente.", "correcto");
            actualizar();
        }
    });

    tarjeta.append(botonEliminar);

    return tarjeta;
}

/* Vacía el listado y pinta una tarjeta por cada videojuego recibido. */
function pintar(lista) {
    const listado = document.querySelector("#listado");
    listado.replaceChildren();

    if (lista.length === 0) {
        const mensajeVacio = document.createElement("p");
        mensajeVacio.classList.add("vacio");
        mensajeVacio.textContent = "No hay videojuegos para mostrar.";
        listado.append(mensajeVacio);
        return;
    }

    for (const videojuego of lista) {
        listado.append(crearTarjeta(videojuego));
    }
}

// -----------------------------------------------------
// 4. RESUMEN Y ESTADÍSTICAS EN LA PÁGINA
// -----------------------------------------------------

/* Muestra cuántos videojuegos aparecen en el listado. */
function pintarResumen(mostrados) {
    const resumen = document.querySelector("#resumen");

    if (biblioteca.total === 0) {
        resumen.textContent = "La biblioteca está vacía.";
    } else if (mostrados === 0) {
        resumen.textContent =
            "No hay videojuegos que contengan '" + textoBuscado + "'.";
    } else {
        resumen.textContent = "Mostrando " + mostrados +
            " de " + biblioteca.total + " videojuegos.";
    }
}

/* Muestra los totales, las fechas y las cantidades por género. */
function pintarEstadisticas(lista) {
    const elementoEstadisticas = document.querySelector("#estadisticas");
    const datos = estadisticas(lista);
    const datosGeneros = contarPorCategoria(lista);

    let texto = "Total: " + datos.totalVideojuegos +
        " | Disponibles: " + datos.videojuegosDisponibles +
        " | No disponibles: " + datos.videojuegosNoDisponibles;

    if (datos.totalVideojuegos > 0) {
        const mediaRedondeada =
            Math.round(datos.anioMedioLanzamiento * 10) / 10;

        texto += " | Año medio de lanzamiento: " + mediaRedondeada;
        texto += " | Más reciente: " + datos.videojuegoMasReciente.titulo;
        texto += " | Más antiguo: " + datos.videojuegoMasAntiguo.titulo;
    }

    let textoGeneros = "";

    for (const genero of datosGeneros.nombres) {
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

/* Muestra mensajes de validación y confirmación en la página. */
function mostrarMensaje(texto, tipo) {
    const mensaje = document.querySelector("#mensaje");
    mensaje.textContent = texto;

    if (tipo === "error") {
        mensaje.style.color = "#a12323";
    } else {
        mensaje.style.color = "#176b30";
    }
}

/* Limpia los campos del formulario después de añadir un videojuego. */
function limpiarFormulario() {
    document.querySelector("#titulo").value = "";
    document.querySelector("#genero").value = "";
    document.querySelector("#plataforma").value = "";
    document.querySelector("#fecha").value = "";
    document.querySelector("#disponible").value = "true";
}

// -----------------------------------------------------
// 5. ACTUALIZACIÓN GENERAL DE LA INTERFAZ
// -----------------------------------------------------

/* Busca, ordena, pinta las tarjetas, el resumen y las estadísticas. */
function actualizar() {
    const encontrados = biblioteca.buscar(textoBuscado);
    const ordenados = ordenar(encontrados, criterio);

    pintar(ordenados);
    pintarResumen(ordenados.length);
    pintarEstadisticas(biblioteca.listar());
}

/* Cambia el criterio, actualiza la página y guarda únicamente el orden. */
function elegirOrden(nuevoCriterio) {
    criterio = nuevoCriterio;
    actualizar();
    guardarCookie("orden", criterio, 30);
}

// -----------------------------------------------------
// 6. EVENTOS E INICIO DE LA APLICACIÓN
// -----------------------------------------------------

function iniciarAplicacion() {
    // Elimina la antigua cookie que guardaba toda la colección, si existe.
    eliminarCookie("videojuegos");

    // Recupera y comprueba el criterio de ordenación guardado.
    const ordenGuardado = leerCookie("orden");

    if (
        ordenGuardado === "nombre" ||
        ordenGuardado === "numero" ||
        ordenGuardado === "fecha"
    ) {
        criterio = ordenGuardado;
    } else {
        criterio = "ninguno";
    }

    // Conectamos el buscador.
    const buscador = document.querySelector("#buscador");
    buscador.addEventListener("input", function () {
        textoBuscado = buscador.value;
        actualizar();
    });

    // Conectamos los tres botones de ordenación.
    document.querySelector("#ordenNombre").addEventListener("click", function () {
        elegirOrden("nombre");
    });

    document.querySelector("#ordenNumero").addEventListener("click", function () {
        elegirOrden("numero");
    });

    document.querySelector("#ordenFecha").addEventListener("click", function () {
        elegirOrden("fecha");
    });

    // El formulario utiliza submit para permitir también el envío con Enter.
    const formulario = document.querySelector("#formulario");
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        // Ahora el nuevo videojuego también es una instancia de la clase.
        // El id 1 es provisional: anadir() lo sustituye por el siguiente
        // identificador libre (y el setter comprueba que sea válido).
        const nuevoVideojuego = new Videojuego({
            id: 1,
            titulo: document.querySelector("#titulo").value,
            genero: document.querySelector("#genero").value,
            plataforma: document.querySelector("#plataforma").value,
            fecha: document.querySelector("#fecha").value,
            disponible: document.querySelector("#disponible").value === "true"
        });

        const nuevoId = biblioteca.anadir(nuevoVideojuego);

        if (nuevoId === false) {
            mostrarMensaje(
                "Revisa el título (3-50 caracteres) y completa todos los campos.",
                "error"
            );
            return;
        }
        //Al añadir el videojuego, limpia el formulario y muestra un mensaje
        limpiarFormulario();
        mostrarMensaje("Videojuego añadido correctamente.", "correcto");
        actualizar();
    });

    // Primera actualización al abrir la página.
    actualizar();
}

// Este módulo es el único que se carga desde index.html.
iniciarAplicacion();