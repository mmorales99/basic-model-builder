import { ModelTypes } from '../constants.js'
import { campo } from '../models/campo.js'
import { propiedad } from '../models/propiedad.js'
import { metodo } from '../models/metodo.js'
import { constructor } from '../models/constructor.js'
import { destructor} from '../models/destructor.js'

class componenteFactory {
// al apretar en el boton de nuevo componente mostrará un formulario para crear un nuevo componente
    static create(nombre, tipo, visibilidad, tipoDato, valor, codigo, codigoGet, codigoSet) {
        let componente;
        switch (tipo) {
            case ModelTypes.Field:
                componente = new campo(nombre, tipoDato, visibilidad, valor);
                break;
            case ModelTypes.Property:
                componente = new propiedad(nombre, tipoDato, visibilidad, null, codigoGet, codigoSet, valor);
                break;
            case ModelTypes.Method:
                componente = new metodo(nombre, tipoDato, visibilidad, [], codigo);
                break;
            case ModelTypes.Constructor:
                componente = new constructor(nombre, visibilidad, codigo);
                break;
            case ModelTypes.Destructor:
                componente = new destructor(nombre, visibilidad, codigo);
                break;
            default:
                return;
        }
        return componente;
    }
}

export { componenteFactory }