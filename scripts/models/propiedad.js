import { componente } from './componente.js'
import { campo } from './campo.js'
import { VisibilityTypes } from '../constants.js';

class propiedad extends componente {
    constructor(nombre = '', tipo = '', visibilidad = VisibilityTypes.PUBLIC, campoAsociado = null, codigoGet = '', codigoSet = '', valorInicial = null) {
        super(nombre, tipo, visibilidad);
        this.campoAsociado = campoAsociado;
        // si no se informa el campo asociado, se autogenera
        if (!this.campoAsociado) {
            this.campoAsociado = new campo(`_${nombre}`, tipo, VisibilityTypes.PRIVATE, valorInicial);
        }
        
        // si no se informa el código get y set, se autogenera
        if (!codigoGet) {
            this.codigoGet = `return ${this.campoAsociado.nombre};`;
        } else {
            this.codigoGet = codigoGet;
        }
        if (!codigoSet) {
            this.codigoSet = `${this.campoAsociado.nombre} = value;`;
        } else {
            this.codigoSet = codigoSet;
        }
    }

    // get campo asociado
    get campo() {
        return this.campoAsociado;
    }

    toString() {
        
        return `${this.visibilidad} ${this.tipo} ${this.nombre} { get { ${this.codigoGet} } set { ${this.codigoSet} } }`;
    }
}

export { propiedad }