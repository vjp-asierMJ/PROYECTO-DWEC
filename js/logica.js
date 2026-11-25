/* =====================================================
   LÓGICA DE LA BIBLIOTECA DE VIDEOJUEGOS

   Este módulo contiene funciones que reciben datos y devuelven
   resultados. No utiliza document ni modifica elementos HTML.
   ===================================================== */

// -----------------------------------------------------
// 1. FUNCIONES PARA TRABAJAR CON FECHAS
// -----------------------------------------------------

/* Convierte una fecha AAAA-MM-DD en un objeto Date. */
export function crearFecha(texto) {
    return new Date(texto + "T00:00");
}

/* Devuelve una fecha con el formato habitual en español. */
export function fechaLegible(texto) {
    return crearFecha(texto).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

/* Calcula los días transcurridos desde una fecha hasta hoy. */
export function diasDesde(texto) {
    const MS_DIA = 24 * 60 * 60 * 1000;
    const milisegundos = Date.now() - crearFecha(texto).getTime();

    return Math.floor(milisegundos / MS_DIA);
}

// -----------------------------------------------------
// 2. FUNCIONES PARA CONSULTAR LOS VIDEOJUEGOS
// -----------------------------------------------------

/*
   Devuelve una lista nueva con cada videojuego y su clasificación:
   clásico si se lanzó hasta 2023 y reciente si se lanzó después.
*/
export function listarTodos(lista) {
    const LIMITE_ANIO = 2023;
    const resultado = [];

    for (const videojuego of lista) {
        const anio = crearFecha(videojuego.fecha).getFullYear();
        const etiqueta = anio <= LIMITE_ANIO ? "clásico" : "reciente";

        resultado.push({
            id: videojuego.id,
            titulo: videojuego.titulo,
            etiqueta: etiqueta
        });
    }

    return resultado;
}

/* Cuenta los videojuegos disponibles cuyo año no supera el límite. */
export function filtrar(lista, limite) {
    let encontrados = 0;

    for (const videojuego of lista) {
        const anio = crearFecha(videojuego.fecha).getFullYear();

        if (videojuego.disponible && anio <= limite) {
            encontrados++;
        }
    }

    return encontrados;
}

/* Cuenta los videojuegos de cada género y devuelve los resultados. */
export function contarPorCategoria(lista) {
    const generos = {};
    const nombresGeneros = [];

    for (const videojuego of lista) {
        const genero = videojuego.genero;

        if (generos[genero] === undefined) {
            generos[genero] = 0;
            nombresGeneros.push(genero);
        }

        generos[genero]++;
    }

    return {
        cantidades: generos,
        nombres: nombresGeneros
    };
}

/* Busca títulos que contienen el texto indicado. Distingue mayúsculas. */
export function buscarPorTexto(lista, texto) {
    const resultado = [];

    for (const videojuego of lista) {
        if (texto === "" || videojuego.titulo.split(texto).length > 1) {
            resultado.push(videojuego);
        }
    }

    return resultado;
}

// -----------------------------------------------------
// 3. VALIDACIÓN Y GESTIÓN DE VIDEOJUEGOS
// -----------------------------------------------------

/* Comprueba el patrón del título, su longitud y que contenga letras o números. */
export function validarTitulo(titulo) {
    const patron = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ0-9\s:'.,!?()\-]{3,50}$/;
    const contenido = /[A-Za-zÁÉÍÓÚáéíóúÜüÑñ0-9]/;

    return patron.test(titulo) && contenido.test(titulo);
}

/* Comprueba si un texto está vacío o solo contiene espacios o tabulaciones. */
export function estaVacio(texto) {
    let tieneContenido = false;

    for (let i = 0; i < texto.length; i++) {
        if (texto[i] !== " " && texto[i] !== "\t") {
            tieneContenido = true;
        }
    }

    return !tieneContenido;
}

/* Valida los datos, asigna el siguiente ID y añade el videojuego. */
export function anadir(lista, elemento) {
    if (!validarTitulo(elemento.titulo)) {
        return false;
    }

    if (
        estaVacio(elemento.genero) ||
        estaVacio(elemento.plataforma) ||
        estaVacio(elemento.fecha)
    ) {
        return false;
    }

    let maxId = 0;

    for (const videojuego of lista) {
        if (videojuego.id > maxId) {
            maxId = videojuego.id;
        }
    }

    elemento.id = maxId + 1;
    lista.push(elemento);

    return elemento.id;
}

/* Elimina un videojuego por su ID. Devuelve true o false. */
export function eliminarPorId(lista, id) {
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].id === id) {
            lista.splice(i, 1);
            return true;
        }
    }

    return false;
}

/*
   Calcula estadísticas de la colección y devuelve un objeto.
   Si la lista está vacía, las fechas extremas y la media quedan a null.
*/
/*export function estadisticas(lista) {
    let disponibles = 0;
    let sumaAnios = 0;
    let masReciente = null;
    let masAntiguo = null;

    for (const videojuego of lista) {
        const fecha = crearFecha(videojuego.fecha);
        const anio = fecha.getFullYear();

        sumaAnios += anio;

        if (videojuego.disponible) {
            disponibles++;
        }

        if (masReciente === null || fecha > crearFecha(masReciente.fecha)) {
            masReciente = videojuego;
        }

        if (masAntiguo === null || fecha < crearFecha(masAntiguo.fecha)) {
            masAntiguo = videojuego;
        }
    }

    let anioMedioLanzamiento = null;

    if (lista.length > 0) {
        anioMedioLanzamiento = sumaAnios / lista.length;
    }

    return {
        totalVideojuegos: lista.length,
        videojuegosDisponibles: disponibles,
        videojuegosNoDisponibles: lista.length - disponibles,
        anioMedioLanzamiento: anioMedioLanzamiento,
        videojuegoMasReciente: masReciente,
        videojuegoMasAntiguo: masAntiguo
    };
}/*

// -----------------------------------------------------
// 4. ORDENACIÓN
// -----------------------------------------------------

/* Ordena una copia de la lista para conservar el array original. */
export function ordenar(lista, criterio) {
    const copia = [...lista];

    if (criterio === "nombre") {
        copia.sort((a, b) => a.titulo.localeCompare(b.titulo));
    } else if (criterio === "numero") {
        copia.sort((a, b) => a.id - b.id);
    } else if (criterio === "fecha") {
        copia.sort((a, b) => crearFecha(b.fecha) - crearFecha(a.fecha));
    }

    return copia;
}
