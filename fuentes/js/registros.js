document.addEventListener('DOMContentLoaded', function() {

    const lista = document.getElementById('lista');
    const ERROR = document.getElementById('error');
    const STATUS = document.getElementById('status');


    function obtenerRegistros() {
        const registros = sessionStorage.getItem('registros');
        return registros ? JSON.parse(registros) : [];
    }

    let registros = obtenerRegistros();

    const añadirEvento = elemento => {
        elemento.addEventListener("click", () => {
            elemento.classList.toggle("tachado");
        });
    };

    function mostrarRegistros() {
        lista.innerHTML = "";

        if (registros.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No hay registros guardados.';
            lista.appendChild(li);
            return;
        }
registros.forEach(function(registro, index) { 
    const elemento = document.createElement('li'); 
    elemento.dataset.index = index;
    elemento.innerHTML = `<strong>${registro.nombre}</strong> (${registro.tipo}) - ${registro.descripcion}
     <br>Cantidad: ${registro.cantidad} ${registro.unidad || ''} |
     Reciclable: ${registro.reciclable ? 'sí' : 'no'} |
     Tóxico: ${registro.toxico ? 'sí' : 'no'} | 
     Fecha: ${registro.fecha}`; 
    lista.appendChild(elemento); 
    añadirEvento(elemento);
});
    }

    mostrarRegistros();

    const borrarSeleccionados = (evento) => {
        evento.preventDefault();

        const seleccionados = lista.querySelectorAll('li.tachado');

        if (seleccionados.length === 0) {
            ERROR.textContent = 'No hay elementos seleccionados';
            return;
        }

        // 🔥 eliminar del array usando índices
        const indicesABorrar = Array.from(seleccionados).map(li => Number(li.dataset.index));

        registros = registros.filter((_, index) => !indicesABorrar.includes(index));

        // 🔥 guardar cambios en sessionStorage
        sessionStorage.setItem("registros", JSON.stringify(registros));

        STATUS.textContent = `Borrados ${indicesABorrar.length} elemento(s)`;
        ERROR.textContent = '';

        // 🔄 volver a pintar sin recargar
        mostrarRegistros();
    };

    // 🔹 Evento botón borrar
    document.getElementById('borrar').addEventListener('click', borrarSeleccionados);

});