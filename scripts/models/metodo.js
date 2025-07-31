import { componente } from './componente.js'

class metodo extends componente {
    constructor(nombre = '', tipo = 'void', visibilidad = 'public', parametros = [], codigo = '') {
        super(nombre, tipo, visibilidad, true, codigo);
        this.parametros = parametros;
    }

    toString() {
        const params = this.parametros.map(p => `${p.tipo} ${p.nombre}`).join(', ');
        return `${this.visibilidad} ${this.tipo} ${this.nombre}(${params}) { ${this.codigo} }`;
    }
}

export { metodo }