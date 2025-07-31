export function addResizableWorkspaces()
{
    const separator = document.getElementById('separator');
    const left = document.getElementById('modeler');
    const right = document.getElementById('model');
    const container = document.getElementById('container');

    let isDragging = false;

    // al clickear el separador, iniciar el arrastre
    separator.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        isDragging = true;
        document.body.style.cursor = 'col-resize';
    });

    // al hacer doble click en el separador, ajustar automáticamente el tamaño de los paneles
    separator.addEventListener('dblclick', (e) => {
        e.preventDefault();
        e.stopPropagation();
        left.style.width = '50%';
        right.style.width = '50%';
    });

    // al mover el ratón, ajustar el tamaño de los paneles
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const containerRect = container.getBoundingClientRect();
            const newWidth = e.clientX - containerRect.left;
            // limitar el ancho mínimo y máximo de los paneles
            // mínimo de un 25% para cada panel
            const minWidth = containerRect.width * 0.25;
            if (newWidth < minWidth || newWidth > containerRect.width - minWidth) {
                return;
            }
            const maxWidth = containerRect.width - 50; // mínimo 50px para el separador
            left.style.width = Math.max(100, Math.min(newWidth, maxWidth)) + 'px';
            right.style.width = Math.max(100, Math.min(containerRect.width - newWidth - 50, maxWidth)) + 'px';
        }
    });

    // al soltar el ratón, detener el arrastre
    document.addEventListener('mouseup', (e) => {
        e.preventDefault();
        e.stopPropagation();
        isDragging = false;
        document.body.style.cursor = '';
    });
}