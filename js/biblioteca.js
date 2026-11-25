// Clase que gestiona la colección de videojuegos.

import { Videojuego } from "./videojuego.js";

import {
    anadir as anadirEnLista,
    eliminarPorId,
    buscarPorTexto
} from "./logica.js";

export class Biblioteca {

    /**
     * Crea una biblioteca a partir de una colección de videojuegos.
     * @param {Videojuego[]} videojuegos - Colección inicial de videojuegos.
     */
    constructor(videojuegos) {
        this._videojuegos = videojuegos;
    }

    /**
     * Devuelve el número total de videojuegos de la colección.
     * @returns {number} Cantidad de videojuegos.
     */
    get total() {
        return this._videojuegos.length;
    }

    /**
     * Devuelve una copia de la colección de videojuegos.
     * @returns {Videojuego[]} Copia de la colección.
     */
    listar() {
        return [...this._videojuegos];
    }

    /**
     * Añade un videojuego a la colección y le asigna el siguiente ID.
     * @param {Videojuego} elemento - Videojuego que se quiere añadir.
     * @returns {number|boolean} ID asignado o false si los datos no son válidos.
     */
    anadir(elemento) {
        return anadirEnLista(this._videojuegos, elemento);
    }

    /**
     * Elimina un videojuego de la colección por su identificador.
     * @param {number} id - Identificador del videojuego.
     * @returns {boolean} true si lo encuentra y lo elimina; false si no existe.
     */
    eliminar(id) {
        return eliminarPorId(this._videojuegos, id);
    }

    /**
     * Busca los videojuegos cuyo título contiene el texto indicado.
     * @param {string} texto - Texto que se busca en los títulos.
     * @returns {Videojuego[]} Videojuegos que contienen el texto.
     */
    buscar(texto) {
        return buscarPorTexto(this._videojuegos, texto);
    }

     /**
     * Calcula las estadísticas de la biblioteca.
     * Utiliza map, filter y reduce, sin utilizar for.
     */
    estadisticas() {

        // Si no hay videojuegos, devuelve null.
        if (this._videojuegos.length === 0) {
            return null;
        }

        const total = this._videojuegos.length;

        // FILTER: cuenta los videojuegos disponibles.
        const disponibles = this._videojuegos.filter(
            (videojuego) => videojuego.disponible
        ).length;

        // MAP: obtiene el año de lanzamiento de cada videojuego.
        const aniosLanzamiento = this._videojuegos.map(
            (videojuego) =>
                new Date(videojuego.fecha + "T00:00").getFullYear()
        );

        // REDUCE: suma todos los años de lanzamiento.
        const sumaAnios = aniosLanzamiento.reduce(
            (suma, anio) => suma + anio,
            0
        );

        // REDUCE: encuentra el videojuego más reciente.
        const masReciente = this._videojuegos.reduce(
            (mayor, videojuego) =>
                videojuego.fecha > mayor.fecha ? videojuego : mayor
        );

        // REDUCE: encuentra el videojuego más antiguo.
        const masAntiguo = this._videojuegos.reduce(
            (menor, videojuego) =>
                videojuego.fecha < menor.fecha ? videojuego : menor
        );

        return {
            totalVideojuegos: total,

            videojuegosDisponibles: disponibles,

            videojuegosNoDisponibles: total - disponibles,

            anioMedioLanzamiento: sumaAnios / total,

            videojuegoMasReciente: masReciente,

            videojuegoMasAntiguo: masAntiguo
        };

    /**
     * Crea una biblioteca a partir de los datos iniciales.
     * Convierte cada objeto en una instancia de Videojuego.
     * @param {Object[]} datos - Array de objetos con los datos iniciales.
     * @returns {Biblioteca} Biblioteca creada con los videojuegos.
     */
    }

    static desdeDatos(datos) {
        const videojuegos = [];

        for (const dato of datos) {
            videojuegos.push(new Videojuego(dato));
        }

        return new Biblioteca(videojuegos);
    }
}
