const videojuegos = [
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


// ========== SESION 7 - PARTE B - RETO 2 ==========


 //1.- Listar todo

function listarTodos(videojuegos) {

    const LIMITE_ANIO = 2023;

    console.log("--- Todos los videojuegos ---");

    for (const videojuego of videojuegos) {

        // Extraemos el año de la fecha y lo convertimos en número.
        const anio = Number(videojuego.fecha.substring(0, 4));

        // Si el año es menor o igual a 2023, lo clasificamos como clásico.
        // Si es mayor, lo clasificamos como reciente.
        const etiqueta = anio <= LIMITE_ANIO
            ? "clásico"
            : "reciente";

        // Mostramos el ID, el título y la etiqueta del videojuego.
        console.log(
            `${videojuego.id}. ${videojuego.titulo} - ${etiqueta}`
        );
    }
}


//2.- Filtrar

function filtrar(videojuegos, limite) {//recibe el array y el limite del año

    let encontrados = 0; //contador de videojuegos encontrados

    console.log(`--- Videojuegos disponibles hasta ${limite} ---`);

    for (const videojuego of videojuegos) {//recorre el array

        // Extraemos el año de la fecha y lo convertimos en número.
        const anio = Number(videojuego.fecha.substring(0, 4));

        // Comprobamos que el videojuego esté disponible
        // y que su año sea menor o igual al límite indicado.
        if (videojuego.disponible && anio <= limite) {

            // Mostramos el ID, el título y el año del videojuego.
            console.log(
                `${videojuego.id}. ${videojuego.titulo} - ${anio}`
            );

            encontrados++; //actualiza el contador de encontrados
        }
    }

    // Devolvemos el número total de videojuegos encontrados.
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
//funcion para añadir un videojuego

function anadir(lista, elemento) {

    let maxId = 0;

    // Buscamos el id más alto de la lista.
    for (const videojuego of lista) {
        if (videojuego.id > maxId) {
            maxId = videojuego.id;
        }
    }

    // Asignamos al elemento el siguiente id.
    elemento.id = maxId + 1;

    // Añadimos el elemento a la lista.
    lista.push(elemento);

    // Devolvemos el id asignado.
    return elemento.id;
}
//funcion para eliminar un videojuego por el id
function eliminarPorId(lista, id) {

    // Recorremos la lista con un for clásico.
    for (let i = 0; i < lista.length; i++) {

        // Comprobamos si el id coincide.
        if (lista[i].id === id) {

            // Eliminamos el elemento encontrado.
            lista.splice(i, 1);

            // Devolvemos true porque se ha eliminado.
            return true;
        }
    }

    // Si no encontramos el id, devolvemos false.
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

//creamos un nuevo videojuego
const nuevoVideojuego = {
    titulo: "GTA VII",
    genero: "Acción",
    plataforma: "PlayStation 6",
    fecha: "2030-11-19",
    disponible: false
};

//llamamos a la funcion añadir
const nuevoId = anadir(videojuegos, nuevoVideojuego);

console.log("ID asignado:", nuevoId);

//mostramos el array en modo tabla
console.table(videojuegos);


console.table(buscarPorTexto(videojuegos, "m"));

anadir(videojuegos, {
    titulo: "Uncharted",
    genero: "Aventura",
    plataforma: "PlayStation 5",
    fecha: "2022-01-28",
    disponible: true
});
//llamada e eliminar por id
eliminarPorId(videojuegos, 3);  // true
eliminarPorId(videojuegos, 99); // false

//llamada a listar todo
listarTodos(videojuegos);

//llamada a la funcion de estadisticas
estadisticas(videojuegos);