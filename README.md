# Nombre del Proyecto

> Herramienta web para modelar clases y estructuras de C# de manera visual e intuitiva.  
> Permite crear y editar componentes como campos, propiedades, métodos y constructores, generando el código C# en tiempo real y aplicando validaciones y estilos modernos.

## Índice

- [Características principales](#características-principales)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura de archivos](#estructura-de-archivos)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Características principales

- Modelado visual de clases, structs, interfaces, records, enums y delegados tipo C#.
- Creación, edición y validación de componentes: campos, propiedades, métodos, constructores y destructores.
- Edición de código en vivo con resaltado de sintaxis integrado.
- Formularios responsivos y accesibles, con validaciones para evitar duplicados y estados incompletos.
- Estilización moderna: uso de bordes redondeados, sombras, flexbox y separación controlada entre elementos.
- Soporte para tablets y ordenadores.

## Instalación

1. Clona este repositorio: `git clone https://github.com/usuario/nombre-repo.git`
2. Abre `index.html` en tu navegador moderno favorito.
3. **Si usas módulos ES6**: abre el proyecto desde un servidor local (por ejemplo, con [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) en VSCode o ejecuta en terminal): `npx live-server`

## Uso

- Pulsa el botón **Nuevo Modelo** o **Nuevo Componente** para utilizar los formularios interactivos.
- Rellena los datos requeridos. El sistema valida nombres, tipos y evita duplicados.
- Modifica y copia el código generado desde el editor integrado.
- Personaliza y ajusta tus clases, propiedades y métodos según lo necesites.

## Estructura de archivos

```
    /index.html
    /index.css
    /index.js
    /scripts
    ├─ app.js
    ├─ constants.js
    ├─ editor.js
    ├─ resize.js
    ├─ /forms
    |   ├─ docs
    |   ├─ newComponent.js
    |   ├─ newModel.js
    |   └─ forms.js
    ├─ /models
    |   ├─ campo.js
    |   ├─ componente.js
    |   ├─ componenteFactory.js
    |   ├─ constructor.js
    |   ├─ destructor.js
    |   ├─ metodo.js
    |   ├─ modelo.js
    |   └─ propiedad.js
    /README.md
    /LICENSE.md
```

## Tecnologías utilizadas

- JavaScript ES6+
- HTML5 y CSS3 (Flexbox, gap, estilos modernos)
- Monaco Editor para edición y resaltado de código
- [Opcional] Herramientas externas según necesidades

## Contribución

1. Haz un fork del repositorio.
2. Crea una rama para tu feature o corrección: `git checkout -b nombre-feature`
3. Haz tus cambios y commitea.
4. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

> Si tienes sugerencias o encuentras algún error, ¡no dudes en abrir un issue o contribuir!
