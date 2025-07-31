'use strict';

import { newComponentFormHTML } from "./forms.js";
import { componenteFactory } from "../models/componenteFactory.js"
import { mapEnumToSelect, ModelTypes, PrimitiveDataTypes, VisibilityTypes } from "../constants.js";

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

function addNewComponentButton(actualModel) {
    let form = document.getElementById('newComponentForm')
    if(form) {
        return
    }
    form = document.createElement('div')
    form.id = "newComponentForm"
    form.innerHTML = newComponentFormHTML
    form.className = "form"
    document
        .getElementById('newModelForm')
        .insertAdjacentElement('afterend', form)

    mapEnumToSelect('tipoComponente', ModelTypes)
    mapEnumToSelect('primitiveTypes', PrimitiveDataTypes)
    mapEnumToSelect('visibilidadComponente', VisibilityTypes)
    // document
    //     .getElementById('eliminarComponente')
    //     .onclick = () => eliminarComponente(actualModel)

    document
        .getElementById("agregarComponente")
        .onclick = () => hidrateComponent(actualModel)
}

function hidrateComponent(actualModel) {
    const nombre = document.getElementById('nombreComponente').value
    const tipo = document.getElementById('tipoComponente').value
    const visibilidad = document.getElementById('visibilidadComponente').value
    const tipoDato = document.getElementById('tipoDato').value
    const valor = document.getElementById('valorComponente').value
    const codigo = document.getElementById('codigoComponente').value
    const codigoGet = document.getElementById('codigoGet').value
    const codigoSet = document.getElementById('codigoSet').value
    if (!nombre || !tipo || !visibilidad || !tipoDato) {
        alert("Debe completar todos los campos.")
        return
    }

    let componente = componenteFactory.create(nombre, tipo, visibilidad, tipoDato, valor, codigo, codigoGet, codigoSet)    
    actualModel.agregarComponente(componente)
    actualModel.onModeloChange()
}

function openNewComponentForm(actualModel) {
    addNewComponentButton(actualModel)
    // addEventListeners()
    return actualModel
}

function closeNewComponentForm() {
    let form = document.getElementById("newComponentForm")
    if(form) form.remove()
}

export { openNewComponentForm, closeNewComponentForm }