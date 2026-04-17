document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    let registros = [];

    const MENU = document.querySelector('#Menu');
    const FORMULARIO = document.querySelector('#formulario');
    const LISTAS = document.querySelector('#listas');

    const MENU1 = document.getElementsByTagName('a')[0];
    const MENU2 = document.getElementsByTagName('a')[1];
    const MENU3 = document.getElementsByTagName('a')[2];

    MENU1.addEventListener( 'click', mostrarMenu );
    MENU2.addEventListener( 'click', mostrarFormulario );
    MENU3.addEventListener( 'click', mostrarListas );

    function mostrarMenu() {
            console.log("test");
            ocultarVistas();
            MENU.classList.add('activo');
        }

        function mostrarFormulario() {
            ocultarVistas();
            FORMULARIO.classList.add('activo');
        }

        function mostrarListas() {
            ocultarVistas();
            LISTAS.classList.add('activo');
        }

        function ocultarVistas() {
            MENU.classList.remove('activo');
            FORMULARIO.classList.remove('activo');
            LISTAS.classList.remove('activo');
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

        registros.push(datos);

        console.log(registros); // para comprobar que funciona

        form.reset();
        alert('Registro guardado.');
    });
}
);



