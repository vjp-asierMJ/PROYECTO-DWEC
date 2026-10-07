const videojuegos = [
  {
    id: 1,
    titulo: "The Legend of Zelda: Echoes of Time",
    genero: "Aventura",
    plataforma: "Nintendo Switch",
    anio: 2024,
    disponible: true
  },
  {
    id: 2,
    titulo: "Cyberpunk 2077",
    genero: "RPG",
    plataforma: "PC",
    anio: 2020,
    disponible: true
  },
  {
    id: 3,
    titulo: "EA Sports FC 26",
    genero: "Deportes",
    plataforma: "PlayStation 5",
    anio: 2025,
    disponible: false
  },
  {
    id: 4,
    titulo: "Minecraft",
    genero: "Sandbox",
    plataforma: "Xbox Series X",
    anio: 2011,
    disponible: true
  },
  {
    id: 5,
    titulo: "Hades II",
    genero: "Acción",
    plataforma: "PC",
    anio: 2025,
    disponible: true
  },
  {
    id: 6,
    titulo: "Baldur's Gate 3",
    genero: "RPG",
    plataforma: "PlayStation 5",
    anio: 2023,
    disponible: false
  },
  {
    id: 7,
    titulo: "Forza Horizon 5",
    genero: "Carreras",
    plataforma: "Xbox Series X",
    anio: 2021,
    disponible: true
  },
  {
    id: 8,
    titulo: "Super Mario Bros. Wonder",
    genero: "Plataformas",
    plataforma: "Nintendo Switch",
    anio: 2023,
    disponible: true
  },
  {
    id: 9,
    titulo: "Red Dead Redemption 2",
    genero: "Acción",
    plataforma: "PC",
    anio: 2018,
    disponible: false
  },
  {
    id: 10,
    titulo: "Marvel's Spider-Man 2",
    genero: "Acción",
    plataforma: "PlayStation 5",
    anio: 2023,
    disponible: true
  }
];

console.table(videojuegos);

// Reto 3 Listado 1 - Todos los elementos

const LIMITE_ANIO = 2023; //constante para el año

console.log("--- Todos los videojuegos ---");

for (const videojuego of videojuegos) {// for of
  const etiqueta = videojuego.anio <= LIMITE_ANIO ? "clásico" : "reciente"; // si el año es menor a 2023 clasico, sino reciente
  console.log(
    `${videojuego.id}. ${videojuego.titulo} - ${etiqueta}` //mostramos
  );

}



// Listado 2 - Los que cumplen una condicion

let cumplenCondicion = 0;

console.log("========== FILTRO ==========");

for(let videojuego of videojuegos){ //For of 

    if(videojuego.disponible == true && videojuego.anio <= 2021) { //si el esta disponible y el año es 2021 o menor
                console.log(`${videojuego.id}. ${videojuego.titulo} - ${videojuego.anio}`); //mostramos
                  cumplenCondicion++;//actualizamos el contador

    }
}

console.log("Cumplen la condicion: "+ cumplenCondicion); //mostramos el numero de juegos que cumplen la condicion
