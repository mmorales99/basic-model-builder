'use strict'

import { model } from '../models/modelo.js'
import { newModelFormHTML } from '../forms/forms.js'
import { openNewComponentForm, closeNewComponentForm } from './newComponent.js';
import { ClassTypes, mapEnumToSelect, VisibilityTypes } from "../constants.js";

const modelCreated = new Event('model-created');
function dispatchModelCreated() {
    document.dispatchEvent(modelCreated);
}
const modelRemoved = new Event('model-removed');
function dispatchModelRemoved() {
    document.dispatchEvent(modelRemoved);
}
function addEventListeners() {
    document.addEventListener('model-created', () => {
        document.getElementById('newModelButton').style.display = 'none';
    });
    document.addEventListener('model-removed', () => {
        document.getElementById('newModelButton').style.display = '';
    });
}

function addNewModelFrom(actualModel) {
    let form = document.getElementById('newModelForm')
    if(form) {
        let next = eliminarModelo(actualModel)
        if(!next) return
    }
    form = document.createElement('div')
    form.id = "newModelForm"
    form.innerHTML = newModelFormHTML
    form.className = "form"
    form.oninput = () => {
        hidrateModel(actualModel)
    }
    document
        .getElementById('newModelButton')
        .insertAdjacentElement('afterend', form)
    
    mapEnumToSelect('tipo', ClassTypes)
    mapEnumToSelect('visibilidad', VisibilityTypes)

    document
        .getElementById('eliminarModelo')
        .onclick = () => eliminarModelo(actualModel)
    
    openNewComponentForm(actualModel)
}

function addNewModelButton(actualModel) {
    let button = document.createElement('button')
    button.id = "newModelButton"
    button.innerText = "Nuevo modelo"
    button.className = "btn-success"
    button.onclick = () => {
        actualModel = new model()
        dispatchModelCreated();
        addNewModelFrom(actualModel)
    }
    document
        .getElementById('app')
        .insertAdjacentElement('afterend', button);
}


function hidrateModel(actualModel) {
    // debe actualizar el modelo con los datos del formulario
    const nombre = document.getElementById('nombre').value
    const tipo = document.getElementById('tipo').value
    const visibilidad = document.getElementById('visibilidad').value
    const padre = document.getElementById('padre').value
    const esStatic = document.getElementById('isStatic').checked

    if(actualModel == null) actualModel = new model();

    actualModel.nombre = nombre
    actualModel.tipo = tipo
    actualModel.visibilidad = visibilidad
    actualModel.padre = padre
    actualModel.isStatic = esStatic

    actualModel.onModeloChange()
}

function eliminarModelo(actualModel) {
    let eliminar = confirm("¿De verdad quieres borrar el modelo? No podrás volver atrás.");
    if(eliminar) {
        actualModel = null
        actualModel.onModeloChange()
        dispatchModelRemoved()
        document.getElementById('newModelForm').remove()
        closeNewComponentForm()
    }
}

function startNewModelForm(actualModel) {
    addNewModelButton(actualModel)
    addEventListeners()
    return actualModel
}

export { startNewModelForm }