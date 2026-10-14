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

        const etiqueta = videojuego.anio <= LIMITE_ANIO
            ? "clásico"
            : "reciente";

        console.log(
            `${videojuego.id}. ${videojuego.titulo} - ${etiqueta}`
        );
    }
}
//2.- Filtrar

function filtrar(videojuegos, limite) {//recibe el array y el limite del año

    let encontrados = 0;

    console.log(`--- Videojuegos disponibles hasta ${limite} ---`);

    for (const videojuego of videojuegos) {//recorre el array

        if (videojuego.disponible && videojuego.anio <= limite) { //si esta disponible y el año es menor al limite

            console.log(
                `${videojuego.id}. ${videojuego.titulo} - ${videojuego.anio}` //lo muestra
            );

            encontrados++; //actualiza los encontrados
        }
    }

    return encontrados;
}


function contarPorCategoria(videojuegos) {

    let aventura = 0;
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
function buscarPorTexto(lista, texto) {

    const buscado = texto.toLowerCase();
    const resultado = [];

    for (const elemento of lista) {

        // Si el título contiene el texto buscado, lo añadimos al resultado.
        if (elemento.titulo.toLowerCase().includes(buscado)) {
            resultado.push(elemento);
        }
    }

    return resultado;
}

// LLAMADA DE FUNCIONES
console.log("========== RESULTADOS ==========");

listarTodos(videojuegos);

const resultado2021 = filtrar(videojuegos, 2021);
console.log(`Encontrados hasta 2021: ${resultado2021}`);

const resultado2023 = filtrar(videojuegos, 2023);
console.log(`Encontrados hasta 2023: ${resultado2023}`);

contarPorCategoria(videojuegos);

buscarPorTexto(videojuegos, "God of War");
buscarPorTexto(videojuegos, "mario");