const newModelFormHTML = 
`
    <h2>Nuevo Modelo</h2>
    <label for="nombre">
        <span>Nombre:</span>
        <input type="text" id="nombre" />
    </label>
    <label for="tipo">
        <span>Tipo:</span>
        <select id="tipo"></select>
    </label>
    <label for="visibilidad">
        <span>Visibilidad:</span>
        <select id="visibilidad"></select>
    </label>
    <label for="padre">
        <span>Clase Padre:</span>
        <input type="text" id="padre" />
    </label>
    <label for="isStatic">
        <span>Marcar como Static:</span>
        <input type="checkbox" id="isStatic" name="isStatic" /> 
    </label>
    <button id="eliminarModelo" class="btn-danger">Eliminar modelo</button>
`

const newComponentFormHTML = 
`
    <h2>Nuevo Componente</h2>
    <label for="nombreComponente">
        <span>Nombre:</span>
        <input type="text" id="nombreComponente" />
    </label>
    <label for="tipoComponente">
        <span>Tipo de Componente:</span>
        <select id="tipoComponente"></select>
    </label>
    <label for="visibilidadComponente">
        <span>Visibilidad:</span>
        <select id="visibilidadComponente"></select>
    </label>
    <label for="tipoDato">
        <span>Tipo de dato:</span>
        <input list="primitiveTypes" id="tipoDato" name="inputTipo" placeholder="Selecciona o escribe un tipo...">
        <datalist id="primitiveTypes"></datalist>
    </label>
    <label for="valorComponente">
        <span>Valor Inicial:</span>
        <input type="text" id="valorComponente" />
    </label>
    <label for="codigoComponente">
        <span>Código Necesario:</span>
        <textarea id="codigoComponente"></textarea>
    </label>
    <label for="codigoGet">
        <span>Código Get:</span>
        <textarea id="codigoGet"></textarea>
    </label>
    <label for="codigoSet">
        <span>Código Set:</span>
        <textarea id="codigoSet"></textarea>
    </label>
    <button id="agregarComponente" class="btn-success">Agregar Componente</button>
`;

export { newModelFormHTML, newComponentFormHTML}