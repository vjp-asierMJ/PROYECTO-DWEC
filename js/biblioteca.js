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
     * Crea una biblioteca a partir de los datos iniciales.
     * Convierte cada objeto en una instancia de Videojuego.
     * @param {Object[]} datos - Array de objetos con los datos iniciales.
     * @returns {Biblioteca} Biblioteca creada con los videojuegos.
     */
    static desdeDatos(datos) {
        const videojuegos = [];

        for (const dato of datos) {
            videojuegos.push(new Videojuego(dato));
        }

        return new Biblioteca(videojuegos);
    }
}
