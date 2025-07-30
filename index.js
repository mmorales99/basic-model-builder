// quiero hacer un generador de clases C#
// que permita crear clases C# de forma visual
// y que genere el código automáticamente
// el modelo será un objeto con nombre, tipo de clase, visibilidad, padre y componentes
// los componentes pueden ser atributos, propiedades o métodos
// los tipos de visibilidad serán public, private, protected e internal
// los tipos de clase seran class, struct, interface, record, enum, delegate y abstract class
// un padre es una clase de la que hereda
// el modelo se guardará en un objeto JSON
// cada componente tendrá nombre, tipo, visibilidad y código (si es un método o un constructor o una propiedad o un destructor o un evento)
// el tipo de componente puede ser campo, propiedad, método, constructor, destructor o evento
// si es un campo, tendrá un tipo y un nombre, el tipo puede ser cualquier tipo de C# o un tipo complejo definido por el usuario
// si es una propiedad, tendrá un tipo, un nombre y un campo asociado (get y set)
// si es un método, tendrá un tipo de retorno, un nombre, una lista de parámetros y un código
// si es un constructor, tendrá un nombre (igual que la clase), una lista de parámetros
// si es un destructor, tendrá un nombre (igual que la clase), una lista de parámetros
// si es un evento, tendrá un tipo, un nombre y un código asociado
// el modelo y sus elementos podrán tener modificadores de acceso (public, private, protected, internal)
// tambien puede tener modificadores de clase (abstract, sealed, static, partial, unsafe) y modificadores propios (static, virtual, override, new, abstract, sealed, async, unsafe, extern, params, ref y out) 
// además de atributos personalizados como [Serializable], [Obsolete], [DebuggerDisplay], [DataContract], [DataMember], etc.
// el código generado será C#
// el formulario permitirá crear, editar y eliminar componentes
// el editor se acutalizará automáticamente al modificar el modelo
// el código generado se mostrará en el editor
// las ediciones hechas en el editor se reflejarán en el formulario y en el modelo

// reglas para los componentes:
// - los campos no pueden tener código, solo tipo y nombre y siempre seran privados
// - las propiedades deben tener un tipo, un nombre y un campo asociado [si no se informa, se autogenera] (get y set; puede modificarse la implementación del get y set); por defecto serán publicas
// - los métodos deben tener un tipo de retorno, un nombre, una lista de parámetros y un código; por defecto serán publicos
// - los constructores deben tener un nombre (igual que la clase) y una lista de parámetros; por defecto serán publicos
// - los destructores deben tener un nombre (igual que la clase) y una lista de parámetros; por defecto serán publicos
// - los eventos deben tener un tipo, un nombre y un código asociado; por defecto serán publicos

'use strict';

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

class constructor extends metodo {
    constructor(nombre = '', visibilidad = 'public', parametros = [], codigo = '') {
        super(nombre, 'void', visibilidad, parametros, codigo);
        this.nombre = nombre; // el nombre del constructor es el mismo que el de la clase
    }

    toString() {
        return `${this.visibilidad} ${this.nombre}(${this.parametros.map(p => `${p.tipo} ${p.nombre}`).join(', ')}) { ${this.codigo} }`;
    }
}

class destructor extends metodo {
    constructor(nombre = '', visibilidad = 'public', codigo = '') {
        super(nombre, 'void', visibilidad, [], codigo);
        this.nombre = nombre; // el nombre del destructor es el mismo que el de la clase
    }

    toString() {
        return `${this.visibilidad} ~${this.nombre}() { ${this.codigo} }`;
    }
}

class campo extends componente {
    constructor(nombre = '', tipo = '', visibilidad = 'private', valor = null) {
        super(nombre, tipo, visibilidad);
        this.valor = valor;
    }

    toString() {
        return `${this.visibilidad} ${this.tipo} ${this.nombre};`;
    }
}

class propiedad extends componente {
    constructor(nombre = '', tipo = '', visibilidad = 'public', campoAsociado = null, codigoGet = '', codigoSet = '', valorInicial = null) {
        super(nombre, tipo, visibilidad);
        this.campoAsociado = campoAsociado;
        // si no se informa el campo asociado, se autogenera
        if (!this.campoAsociado) {
            this.campoAsociado = new campo(nombre, tipo, visibilidad, valorInicial);
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

    // get/set para el código get y set
    get codigoGet() {
        return this.codigoGet;
    }
    set codigoGet(codigo) {
        this.codigoGet = codigo;
    }
    get codigoSet() {
        return this.codigoSet;
    }
    set codigoSet(codigo) {
        this.codigoSet = codigo;
    }

    // get campo asociado
    get campo() {
        return this.campoAsociado;
    }

    toString() {
        return `${this.visibilidad} ${this.tipo} ${this.nombre} { get { ${this.codigoGet} } set { ${this.codigoSet} } }`;
    }
}

class modelo {
    constructor(nombre = '', tipo = 'class', padre = null, componentes = [], visibilidad = 'public') {
        this.nombre = nombre;
        this.tipo = tipo;
        this.visibilidad = visibilidad;
        this.padre = padre;
        this.componentes = componentes;
    }
    // agregar un componente si este no existe
    agregarComponente(comp) {
        if (!this.componentes.some(c => c.nombre === comp.nombre && c.tipo === comp.tipo)) {
            this.componentes.push(comp);
        }
    }
    // eliminar un componente por nombre y tipo
    eliminarComponente(nombre, tipo) {
        this.componentes = this.componentes.filter(c => !(c.nombre === nombre && c.tipo === tipo));
    }

    // imprime por pantalla el código correspondiente al modelo
    toString() {

        let code = '';
        for (const componente of this.componentes) {
            code += "\t" + componente.toString();
            code += "\n";
        }


        let padreString = '';
        if(this.padre){
            padreString = `: ${this.padre}`;
        }

        return `${this.visibilidad} ${this.tipo} ${this.nombre}${padreString}`
        +'\n{\n' + code + '\n}';
    }
}

let modeloActual = null;

// al apretar en el boton de nuevo modelo mostrará un formulario para crear un nuevo modelo
function nuevoModelo() {
    modeloActual= new modelo();
}
// al apretar en el boton de nuevo componente mostrará un formulario para crear un nuevo componente
function nuevoComponente(modelo, nombre, tipo, visibilidad, tipoDato, valor, codigo, codigoGet, codigoSet) {
    let componente;
    switch (tipo) {
        case "campo":
            componente = new campo(nombre, tipo, visibilidad, tipoDato, valor);
            break;
        case "propiedad":
            componente = new propiedad(nombre, tipo, visibilidad, null, codigoGet, codigoSet, valor);
            break;
        case "metodo":
            componente = new metodo(nombre, tipo, visibilidad, [], codigo);
            break;
        case "constructor":
            componente = new constructor(nombre, visibilidad, codigo);
            break;
        case "destructor":
            componente = new destructor(nombre, visibilidad, codigo);
            break;
        default:
            alert("Tipo de componente no válido.");
            return;
    }

    modelo.agregarComponente(componente);
}

// al apretar en el boton de eliminar componente mostrará un formulario para eliminar un componente
function eliminarComponente(modelo) {
    const nombre = prompt("Ingrese el nombre del componente a eliminar:");
    const tipo = prompt("Ingrese el tipo de componente (campo, propiedad, metodo, constructor, destructor):");

    modelo.eliminarComponente(nombre, tipo);
}

// despues de cada acción, se actualizará el código generado y se mostrará en el editor
function actualizarCodigo(modelo) {
    let codigo = modelo.toString();
    // Aquí se debe actualizar el contenido del editor con el nuevo código
    window.monacoEditor.setValue(codigo);
}

// cuando detecte un cambio en el modelo, se actualizará el editor
function onModeloChange(modelo) {
    actualizarCodigo(modelo);
}

// asocia el evento de click para crear un nuevo modelo al boton nuevoModelo, que creará el formulario dentro del div "formulario"
document.getElementById('nuevoModelo').addEventListener('click', () => {

    nuevoModelo();

    // dentro del div "formulario" se mostrará el formulario para crear un nuevo modelo
    // debe mostrar un text input para el nombre del modelo, un select para el tipo de clase, un select para la visibilidad y un text input para el padre
    document.getElementById('formulario').innerHTML = `
        <h2>Nuevo Modelo</h2>
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" />
        <label for="tipo">Tipo:</label>
        <select id="tipo">
            <option value="class">Class</option>
            <option value="struct">Struct</option>
            <option value="interface">Interface</option>
            <option value="record">Record</option>
            <option value="enum">Enum</option>
            <option value="delegate">Delegate</option>
            <option value="abstract class">Abstract Class</option>
        </select>
        <label for="visibilidad">Visibilidad:</label>
        <select id="visibilidad">
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="protected">Protected</option>
            <option value="internal">Internal</option>
        </select>
        <label for="padre">Clase Padre:</label>
        <input type="text" id="padre" />
    `;

    // cada vez que acabe de escribir en el formulario, se debe actualizar el modelo
    document.getElementById('formulario').addEventListener('input', () => {
        // debe actualizar el modelo con los datos del formulario
        const nombre = document.getElementById('nombre').value;
        const tipo = document.getElementById('tipo').value;
        const visibilidad = document.getElementById('visibilidad').value;
        const padre = document.getElementById('padre').value;

        modeloActual.nombre = nombre;
        modeloActual.tipo = tipo;
        modeloActual.visibilidad = visibilidad;
        modeloActual.padre = padre;

        onModeloChange(modeloActual);
    });

    // debe agregar un boton para añadir componentes, que al hacer click mostrará un formulario para crear un nuevo componente pidiendo:
    // el nombre, tipo de componente, visibilidad, el tipo de valor que tendrá el componente y el valor inicial
    // independientemente del tipo de componente, mostrará un checkbox que indica si será static o no
    // si es es un campo debe mostrar un checkbox para indicar si va a tener una propiedad asociada
    // si es una propiedad debe mostrar un checkbox para indicar si va a tener un campo asociado, si lo tiene debe pedir el nombre del campo asociado
    // si es un campo o una propiedad, debe tener un checkbox para indicar si va a incluirse en el constructor, por defecto a false
    // si es un método debe pedir el codigo del metodo
    // si es un constructor muestra la lista de parametros de entrada y un textbox para asociarles un valor por defecto, lo mismo para los destructores
    // no debe permitir crear un componente con el mismo nombre y tipo que otro ya existente
    // no debe permitir crear un componente sin nombre
    // no debe permitir crear un componente sin tipo
    // no debe permitir crear un componente sin visibilidad
    // no debe modificar el layaout de la página
    const botonNuevoComponente = document.createElement('button');
    botonNuevoComponente.innerText = 'Nuevo Componente';
    botonNuevoComponente.id = 'nuevoComponenteButton';
    botonNuevoComponente.addEventListener('click', () => {
        // mostrar formulario para crear nuevo componente
        // si ya se ha creado un formulario, no lo vuelve a crear
        if (document.getElementById('formularioComponente')) {
            return;
        }
        const formularioComponente = document.createElement('div');
        formularioComponente.id = 'formularioComponente';
        formularioComponente.innerHTML = `
            <h2>Nuevo Componente</h2>
            <label for="nombreComponente">Nombre:</label>
            <input type="text" id="nombreComponente" />
            <label for="tipoComponente">Tipo de Componente:</label>
            <select id="tipoComponente">
                <option value="campo">Campo</option>
                <option value="propiedad">Propiedad</option>
                <option value="metodo">Método</option>
                <option value="constructor">Constructor</option>
                <option value="destructor">Destructor</option>
            </select>
            <label for="visibilidadComponente">Visibilidad:</label>
            <select id="visibilidadComponente">
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="protected">Protected</option>
                <option value="internal">Internal</option>
            </select>
            <label for="tipoDato">Tipo de dato:</label>
            <input type="text" id="tipoDato" />
            <label for="valorComponente">Valor Inicial:</label>
            <input type="text" id="valorComponente" />
            <label for="codigoComponente">Código Necesario:</label>
            <textarea id="codigoComponente"></textarea>
            <label for="codigoGet">Código Get:</label>
            <textarea id="codigoGet"></textarea>
            <label for="codigoSet">Código Set:</label>
            <textarea id="codigoSet"></textarea>
            <button id="agregarComponente">Agregar Componente</button>
        `;
        // debe agregar el formulario al body después del boton nuevoComponenteButton
        document.getElementById('nuevoComponenteButton').insertAdjacentElement('afterend', formularioComponente);

        document.getElementById('agregarComponente').addEventListener('click', () => {
            const nombre = document.getElementById('nombreComponente').value;
            const tipo = document.getElementById('tipoComponente').value;
            const visibilidad = document.getElementById('visibilidadComponente').value;
            const tipoDato = document.getElementById('tipoDato').value;
            const valor = document.getElementById('valorComponente').value;
            const codigo = document.getElementById('codigoComponente').value;
            const codigoGet = document.getElementById('codigoGet').value;
            const codigoSet = document.getElementById('codigoSet').value;
            if (!nombre || !tipo || !visibilidad) {
                alert("Debe completar todos los campos.");
                return;
            }

            nuevoComponente(modeloActual, nombre, tipo, visibilidad, tipoDato, valor, codigo, codigoGet, codigoSet);
            onModeloChange(modeloActual);
            // si todo va bien, se elimina el formulario de componente
            document.getElementById('formularioComponente').remove();
        });
    });
    document.getElementById('formulario').appendChild(botonNuevoComponente);
});