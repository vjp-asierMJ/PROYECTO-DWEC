// Clase que representa cada videojuego de la biblioteca.

// Importamos la función que calcula los días transcurridos desde una fecha.
import { diasDesde } from "./logica.js";

export class Videojuego {

    /**
     * Crea un videojuego a partir de un objeto con sus datos.
     * @param {Object} datos - Datos del videojuego.
     */
    constructor(datos) {
        this.titulo = datos.titulo;
        this.genero = datos.genero;
        this.plataforma = datos.plataforma;
        this.fecha = datos.fecha;
        this.disponible = datos.disponible;
        // El id pasa por el setter: se valida al crear la instancia.
        // Va después del título para que el mensaje de error pueda usarlo.
        this.id = datos.id;
    }

    /**
     * Devuelve el identificador del videojuego.
     * @returns {number} Identificador del videojuego.
     */
    get id() {
        // La propiedad interna lleva _ delante para que el setter
        // no se llame a sí mismo sin fin.
        return this._id;
    }

    /**
     * Comprueba que el identificador sea un número mayor que cero y lo guarda.
     * @param {number} valor - Identificador que se quiere asignar.
     */
    set id(valor) {
        // Solo se admiten números mayores que 0.
        if (typeof valor !== "number" || valor <= 0) {
            throw new Error(`Id no válido en «${this.titulo}»: ${valor}`);
        }
        this._id = valor;
    }

    /**
     * Devuelve el estado del videojuego en forma de texto.
     * @returns {string} Estado de disponibilidad.
     */
    get estadoTexto() {
        if (this.disponible) {
            return "Disponible";
        }
        return "No disponible";
    }

    /**
     * Devuelve el género y la plataforma del videojuego.
     * @returns {string} Descripción del videojuego.
     */
    descripcion() {
        return `Género: ${this.genero} · Plataforma: ${this.plataforma}`;
    }

    /**
     * Comprueba si el videojuego se lanzó dentro del número de días indicado.
     * @param {number} dias - Número máximo de días transcurridos.
     * @returns {boolean} true si es reciente y false si no lo es.
     */
    esReciente(dias) {
        const transcurridos = diasDesde(this.fecha);

        return transcurridos >= 0 && transcurridos <= dias;
    }
}
