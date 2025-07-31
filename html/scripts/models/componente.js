class componente {
    constructor(nombre = '', tipo = '', visibilidad = 'private', esMetodo = false, codigo = '') {
        this.nombre = nombre;
        this.tipo = tipo;
        this.visibilidad = visibilidad;
        this.esMetodo = esMetodo;
        this.codigo = codigo;
    }

    // metodo que se debe implementar en las subclases para generar el código
    toString() { }
}

export {componente}