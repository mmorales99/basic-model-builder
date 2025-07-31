import { propiedad } from "./propiedad.js"

class model {
    constructor(nombre = '', tipo = 'class', padre = null, componentes = [], visibilidad = 'public', isStatic = false) {
        this.nombre = nombre
        this.tipo = tipo
        this.visibilidad = visibilidad
        this.padre = padre
        this.componentes = componentes
        this.isStatic = isStatic
    }
    // agregar un componente si este no existe
    agregarComponente(comp) {
        if (!this.componentes.some(c => c.nombre === comp.nombre && c.tipo === comp.tipo)) {
            this.componentes.push(comp)
            if(comp instanceof propiedad) {
                this.agregarComponente(comp.campoAsociado)
            }
        }
    }
    // eliminar un componente por nombre y tipo
    eliminarComponente(nombre, tipo) {
        this.componentes = this.componentes.filter(c => !(c.nombre === nombre && c.tipo === tipo))
    }

    // imprime por pantalla el código correspondiente al modelo
    toString() {
        let code = ''
        for (const componente of this.componentes) {
            code += "\t" + componente.toString();
            code += "\n";
        }
        let padreString = '';
        if(this.padre){
            padreString = `: ${this.padre}`;
        }
        let staticness = ' ';
        if(this.isStatic) {
            staticness += "static "
        }
        return `${this.visibilidad}` + staticness + `${this.tipo} ${this.nombre}${padreString}`
        +'\n{\n' + code + '\n}';
    }

    // cuando detecte un cambio en el modelo, se actualizará el editor
    onModeloChange() {
        if(this) {
            let codigo = this.toString();
            // Aquí se debe actualizar el contenido del editor con el nuevo código
            window.monacoEditor.setValue(codigo);
        } else {
            window.monacoEditor.setValue(
`public class MiClase {
    public void MiMetodo() {
        Console.WriteLine("¡Hola mundo!");
    }
}`
            );
        }
    }
}

export { model }