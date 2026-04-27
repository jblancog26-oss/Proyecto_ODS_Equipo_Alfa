document.addEventListener('DOMContentLoaded', function() {

    // -------------------------
    // VARIABLES GENERALES
    // -------------------------
    const form = document.querySelector('form');
    const lista = document.getElementById('lista');
    const ERROR = document.getElementById('error');
    const STATUS = document.getElementById('status');

    // Array 
    let registros = [];

    // -------------------------
    // SISTEMA DE VISTAS
    // -------------------------
    const MENU = document.querySelector('#Menu');
    const FORMULARIO = document.querySelector('#formulario');
    const LISTAS = document.querySelector('#listas');

    const MENU1 = document.getElementsByTagName('a')[0];
    const MENU2 = document.getElementsByTagName('a')[1];
    const MENU3 = document.getElementsByTagName('a')[2];

    MENU1.addEventListener('click', mostrarMenu);
    MENU2.addEventListener('click', mostrarFormulario);
    MENU3.addEventListener('click', mostrarListas);
    
    function mostrarMenu() {
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
        mostrarRegistros();
    }
    function ocultarVistas() {
        MENU.classList.remove('activo');
        FORMULARIO.classList.remove('activo');
        LISTAS.classList.remove('activo');
    }

    // -------------------------
    // tachar elementos
    // -------------------------
    const tachar = elemento => {
        elemento.addEventListener("click", () => {
            elemento.classList.toggle("tachado");
        });
    };

    // -------------------------
    // MOSTRAR REGISTROS
    // -------------------------
    function mostrarRegistros() {
        lista.innerHTML = "";

        if (registros.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No hay registros guardados.';
            lista.appendChild(li);
            return;
        }

        registros.forEach((registro, index) => {
            const elemento = document.createElement('li');
            elemento.dataset.index = index;

            elemento.innerHTML = `
                <strong>${registro.nombre}</strong> (${registro.tipo}) - ${registro.descripcion}
                <br>Cantidad: ${registro.cantidad} ${registro.unidad || ''} |
                Reciclable: ${registro.reciclable ? 'sí' : 'no'} |
                Tóxico: ${registro.toxico ? 'sí' : 'no'} |
                Fecha: ${registro.fecha}`
                ;

            lista.appendChild(elemento);
            tachar(elemento);
        });
    }

    // -------------------------
    // GUARDAR FORMULARIO
    // -------------------------
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

        // Guardar en memoria
        registros.push(datos);

        // Actualizar lista
        mostrarRegistros();

        form.reset();
        alert('Registro guardado.');
    });

    // -------------------------
    // BORRAR SELECCIONADOS
    // -------------------------
    const borrarSeleccionados = (evento) => {
        evento.preventDefault();

        const seleccionados = lista.querySelectorAll('li.tachado');

        if (seleccionados.length === 0) {
            ERROR.textContent = 'No hay elementos seleccionados';
            return;
        }

        const indicesABorrar = Array.from(seleccionados).map(li => Number(li.dataset.index));

        registros = registros.filter((_, index) => !indicesABorrar.includes(index));

        STATUS.textContent = `Borrados ${indicesABorrar.length} elemento(s)`;
        ERROR.textContent = '';

        mostrarRegistros();
    };

    document.getElementById('borrar').addEventListener('click', borrarSeleccionados);

});
