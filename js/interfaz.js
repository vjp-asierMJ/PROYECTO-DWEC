/* =====================================================
   INTERFAZ DE LA BIBLIOTECA DE VIDEOJUEGOS

   Este módulo es el punto de entrada de la aplicación.
   Importa datos y lógica, trabaja con el DOM, gestiona cookies
   y conecta los eventos del buscador, los botones y el formulario.
   ===================================================== */

// Importamos los datos iniciales y las clases.
import { datosVideojuegos } from "./datos.js";
import { Videojuego } from "./videojuego.js";
import { Biblioteca } from "./biblioteca.js";

// Importamos las funciones de lógica.
import {
    fechaLegible,
    ordenar
} from "./logica.js";

// Días para destacar un videojuego reciente.
const DIAS_RECIENTE = 30;

// Creamos la biblioteca.
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

    fecha.textContent =
        "Lanzamiento: " + fechaLegible(videojuego.fecha);

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

    // Botón para eliminar el videojuego.
    const botonEliminar = document.createElement("button");

    botonEliminar.type = "button";
    botonEliminar.classList.add("boton-eliminar");
    botonEliminar.textContent = "Eliminar";

    botonEliminar.addEventListener("click", function () {

        const eliminado = biblioteca.eliminar(videojuego.id);

        if (eliminado) {

            mostrarMensaje(
                "Videojuego eliminado correctamente.",
                "correcto"
            );

            actualizar();
        }
    });

    tarjeta.append(botonEliminar);

    return tarjeta;
}


// Pinta las tarjetas de videojuegos.
function pintar(lista) {

    const listado = document.querySelector("#listado");

    listado.replaceChildren();

    if (lista.length === 0) {

        const mensajeVacio = document.createElement("p");

        mensajeVacio.classList.add("vacio");
        mensajeVacio.textContent =
            "No hay videojuegos para mostrar.";

        listado.append(mensajeVacio);

        return;
    }

    for (const videojuego of lista) {
        listado.append(crearTarjeta(videojuego));
    }
}


// -----------------------------------------------------
// 4. RESUMEN Y ESTADÍSTICAS
// -----------------------------------------------------

// Muestra cuántos videojuegos aparecen.
function pintarResumen(mostrados) {

    const resumen = document.querySelector("#resumen");

    if (biblioteca.total === 0) {

        resumen.textContent = "La biblioteca está vacía.";

    } else if (mostrados === 0) {

        resumen.textContent =
            "No hay videojuegos que contengan '" +
            textoBuscado + "'.";

    } else {

        resumen.textContent =
            "Mostrando " + mostrados +
            " de " + biblioteca.total + " videojuegos.";
    }
}


// Pinta las estadísticas de la biblioteca.
function pintarEstadisticas() {

    const panel = document.querySelector("#estadisticas");

    // Vacía el panel antes de actualizarlo.
    panel.replaceChildren();

    // La clase gestora calcula los datos.
    const datos = biblioteca.estadisticas();

    // Si no hay videojuegos, muestra un aviso.
    if (datos === null) {

        const aviso = document.createElement("li");

        aviso.textContent =
            "Todavía no hay estadísticas. Añade algún videojuego.";

        panel.append(aviso);

        return;
    }

    const anioMedio =
        Math.round(datos.anioMedioLanzamiento * 10) / 10;

    // Preparamos los datos que se mostrarán.
    const lineas = [

        "Total de videojuegos: " +
        datos.totalVideojuegos,

        "Disponibles: " +
        datos.videojuegosDisponibles,

        "No disponibles: " +
        datos.videojuegosNoDisponibles,

        "Año medio de lanzamiento: " +
        anioMedio,

        "Lanzamiento más reciente: " +
        datos.videojuegoMasReciente.titulo,

        "Lanzamiento más antiguo: " +
        datos.videojuegoMasAntiguo.titulo
    ];

    // Creamos un li por cada estadística.
    for (const linea of lineas) {

        const elemento = document.createElement("li");

        elemento.textContent = linea;

        panel.append(elemento);
    }
}


// -----------------------------------------------------
// 5. MENSAJES Y FORMULARIO
// -----------------------------------------------------

function mostrarMensaje(texto, tipo) {

    const mensaje = document.querySelector("#mensaje");

    mensaje.textContent = texto;

    if (tipo === "error") {

        mensaje.style.color = "#a12323";

    } else {

        mensaje.style.color = "#176b30";
    }
}


// Limpia los campos del formulario.
function limpiarFormulario() {

    document.querySelector("#titulo").value = "";
    document.querySelector("#genero").value = "";
    document.querySelector("#plataforma").value = "";
    document.querySelector("#fecha").value = "";
    document.querySelector("#disponible").value = "true";
}


// -----------------------------------------------------
// 6. ACTUALIZACIÓN GENERAL
// -----------------------------------------------------
/* Busca, ordena, pinta las tarjetas, el resumen y las estadísticas. */
function actualizar() {

    const encontrados = biblioteca.buscar(textoBuscado);

    const ordenados = ordenar(encontrados, criterio);

    pintar(ordenados);

    pintarResumen(ordenados.length);

    // También actualizamos el panel de estadísticas.
    pintarEstadisticas();
}


// Cambia el criterio de ordenación.
function elegirOrden(nuevoCriterio) {

    criterio = nuevoCriterio;

    actualizar();

    guardarCookie("orden", criterio, 30);
}


// -----------------------------------------------------
// 7. EVENTOS E INICIO DE LA APLICACIÓN
// -----------------------------------------------------

function iniciarAplicacion() {

    // Eliminamos una antigua cookie si existe.
    eliminarCookie("videojuegos");

    // Recuperamos el criterio de ordenación.
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


    // Buscador.
    const buscador = document.querySelector("#buscador");

    buscador.addEventListener("input", function () {

        textoBuscado = buscador.value;

        actualizar();
    });


    // Botón ordenar por nombre.
    document.querySelector("#ordenNombre")
        .addEventListener("click", function () {

            elegirOrden("nombre");
        });


    // Botón ordenar por número.
    document.querySelector("#ordenNumero")
        .addEventListener("click", function () {

            elegirOrden("numero");
        });


    // Botón ordenar por fecha.
    document.querySelector("#ordenFecha")
        .addEventListener("click", function () {

            elegirOrden("fecha");
        });


    // Formulario para añadir videojuegos.
    const formulario = document.querySelector("#formulario");

    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();

        // Creamos una instancia de Videojuego.
        const nuevoVideojuego = new Videojuego({

            id: 1,

            titulo: document.querySelector("#titulo").value,

            genero: document.querySelector("#genero").value,

            plataforma: document.querySelector("#plataforma").value,

            fecha: document.querySelector("#fecha").value,

            disponible:
                document.querySelector("#disponible").value === "true"
        });


        // Añadimos el videojuego a la biblioteca.
        const nuevoId = biblioteca.anadir(nuevoVideojuego);


        if (nuevoId === false) {

            mostrarMensaje(
                "Revisa el título (3-50 caracteres) y completa todos los campos.",
                "error"
            );

            return;
        }


        // Limpiamos el formulario.
        limpiarFormulario();

        mostrarMensaje(
            "Videojuego añadido correctamente.",
            "correcto"
        );

        // Actualizamos las tarjetas y las estadísticas.
        actualizar();
    });


    // Primera actualización al abrir la página.
    actualizar();
}


// Este módulo es el único que se carga desde index.html.
iniciarAplicacion();