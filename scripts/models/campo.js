import { componente } from './componente.js'

class campo extends componente {
    constructor(nombre = '', tipo = '', visibilidad = 'private', valor = null) {
        super(nombre, tipo, visibilidad);
        this.valor = valor;
    }

    toString() {
        let code = `${this.visibilidad} ${this.tipo} ${this.nombre}`;
        if(this.valor != "")
        {
            code += ` = ${this.valor}`;
        }
        return code += ';';
    }
}

export { campo }