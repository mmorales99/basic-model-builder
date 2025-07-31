import { metodo } from './metodo.js'

class constructor extends metodo {
    constructor(nombre = '', visibilidad = 'public', parametros = [], codigo = '') {
        super(nombre, 'void', visibilidad, parametros, codigo);
        this.nombre = nombre; // el nombre del constructor es el mismo que el de la clase
    }

    toString() {
        return `${this.visibilidad} ${this.nombre}(${this.parametros.map(p => `${p.tipo} ${p.nombre}`).join(', ')}) { ${this.codigo} }`;
    }
}

export { constructor }