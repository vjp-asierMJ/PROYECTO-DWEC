/* =====================================================
   CLASE VIDEOJUEGO

   Es el molde de cada videojuego de la biblioteca.
   Cada elemento de la colección es una instancia (new Videojuego(...)).
   ===================================================== */

export class Videojuego {
    // El constructor recibe un objeto de datos y copia cada campo con this.
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

    // Getter: se lee como una propiedad, sin paréntesis (videojuego.id).
    get id() {
        // La propiedad interna lleva _ delante para que el setter
        // no se llame a sí mismo sin fin.
        return this._id;
    }

    // Setter: se ejecuta al asignar (this.id = ... o videojuego.id = ...).
    set id(valor) {
        // Solo se admiten números mayores que 0.
        if (typeof valor !== "number" || valor <= 0) {
            throw new Error(`Id no válido en «${this.titulo}»: ${valor}`);
        }
        this._id = valor;
    }

    // Getter que calcula un texto: videojuego.estadoTexto (sin paréntesis).
    get estadoTexto() {
        if (this.disponible) {
            return "Disponible";
        }
        return "No disponible";
    }

    // Método que devuelve el texto de la tarjeta.
    descripcion() {
        return `Género: ${this.genero} · Plataforma: ${this.plataforma}`;
    }
}