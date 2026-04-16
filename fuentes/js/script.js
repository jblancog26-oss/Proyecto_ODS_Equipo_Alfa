document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    function obtenerRegistros() {
        const registros = sessionStorage.getItem('registros');
        return registros ? JSON.parse(registros) : [];
    }

    function guardarRegistros(registros) {
        sessionStorage.setItem('registros', JSON.stringify(registros));
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const descripcion = document.getElementById('descripcion').value.trim();
        const cantidad = document.getElementById('cantidad').value;
        const reciclable = document.querySelector('input[name="reciclable"]').checked;
        const toxico = document.querySelector('input[name="toxico"]').checked;
        const unidadSeleccionada = document.querySelector('input[name="unidad"]:checked');
        const unidad = unidadSeleccionada ? unidadSeleccionada.value : '';
        const fecha = document.getElementById('fecha').value;
        const tipo = document.getElementById('tipo').value;

        const datos = {
            nombre,
            descripcion,
            cantidad,
            reciclable,
            toxico,
            unidad,
            fecha,
            tipo
        };

        const registros = obtenerRegistros();
        registros.push(datos);
        guardarRegistros(registros);

        form.reset();
        alert('Registro guardado.');
    });
});