import { metodo } from './metodo.js'

class destructor extends metodo {
    constructor(nombre = '', visibilidad = 'public', codigo = '') {
        super(nombre, 'void', visibilidad, [], codigo);
        this.nombre = nombre; // el nombre del destructor es el mismo que el de la clase
    }

    toString() {
        return `${this.visibilidad} ~${this.nombre}() { ${this.codigo} }`;
    }
}

export { destructor }