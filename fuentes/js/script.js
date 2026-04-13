// script.js - Manejo del formulario de basuras

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío por defecto

        // Recopilar los datos
        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
        const cantidad = document.getElementById('cantidad').value;
        const reciclable = document.querySelector('input[name="reciclable"]:checked') ? 'Sí' : 'No';
        const toxico = document.querySelector('input[name="toxico"]:checked') ? 'Sí' : 'No';
        const unidad = document.querySelector('input[name="unidad"]:checked') ? document.querySelector('input[name="unidad"]:checked').value : '';
        const fecha = document.getElementById('fecha').value;
        const tipo = document.getElementById('tipo').value;

        // Mostrar los datos recopilados (por ejemplo, en consola)
        console.log('Datos recopilados:');
        console.log('Nombre:', nombre);
        console.log('Descripción:', descripcion);
        console.log('Cantidad:', cantidad);
        console.log('Reciclable:', reciclable);
        console.log('Tóxico:', toxico);
        console.log('Unidad:', unidad);
        console.log('Fecha:', fecha);
        console.log('Contenedor:', tipo);

        // Limpiar el formulario
        form.reset();

    });
});