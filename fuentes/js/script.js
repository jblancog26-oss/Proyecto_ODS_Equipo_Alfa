document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        console.log('Formulario enviado');

        // Recopilar los datos
        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
        const cantidad = document.getElementById('cantidad').value;
        const reciclable = document.querySelector('input[name="reciclable"]:checked') ? 'Sí' : 'No';
        const toxico = document.querySelector('input[name="toxico"]:checked') ? 'Sí' : 'No';
        const unidad = document.querySelector('input[name="unidad"]:checked') ? document.querySelector('input[name="unidad"]:checked').value : '';
        const fecha = document.getElementById('fecha').value;
        const tipo = document.getElementById('tipo').value;

        // Crear objeto registro
        const registro = {
            nombre,
            descripcion,
            cantidad,
            reciclable,
            toxico,
            unidad,
            fecha,
            tipo
        };

        // Obtener registros existentes
        let registros = JSON.parse(localStorage.getItem("registros")) || [];
     
        registros.push(registro);

        localStorage.setItem("registros", JSON.stringify(registros));

        console.log('Datos guardados:', registros);

    });
});