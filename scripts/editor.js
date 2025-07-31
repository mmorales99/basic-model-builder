export function configureEditor(){
    require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.48.0/min/vs' }});
    require(['vs/editor/editor.main'], function () {
        window.monacoEditor = monaco.editor.create(document.getElementById('editor'), {
            value: [
            'public class MiClase {',
            '    public void MiMetodo() {',
            '        Console.WriteLine("¡Hola mundo!");',
            '    }',
            '}'
            ].join('\n'),
            language: 'csharp',  // Soporte básico para C#
            theme: 'vs-dark',    // Puedes cambiar a 'vs' para claro
            automaticLayout: true,
            fontSize: 16,
            minimap: { enabled: false },
            scrollbar: {
                vertical: 'visible',
                horizontal: 'visible'
            },
            padding: {
                top: 20,
                bottom: 20
            },
            roundedSelection: true,
            scrollBeyondLastLine: false,
        });
    });
}