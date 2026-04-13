document.getElementById("formulario").addEventListener("submit", function(e) {
    e.preventDefault();

    // Obtener datos
    const registro = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        cantidad: document.getElementById("cantidad").value
    };

    // Obtener registros existentes
    let registros = JSON.parse(localStorage.getItem("registros")) || [];

    // Añadir nuevo
    registros.push(registro);

    // Guardar
    localStorage.setItem("registros", JSON.stringify(registros));

    // Redirigir a la vista
    window.location.href = "registros.html";
});