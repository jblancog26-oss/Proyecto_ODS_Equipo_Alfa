
let registros = JSON.parse(localStorage.getItem("registros")) || [];

console.log('Registros cargados:', registros);

const lista = document.getElementById("lista");

registros.forEach(r => {
    const li = document.createElement("li");
    li.innerHTML = `
        <strong>Nombre:</strong> ${r.nombre}<br>
        <strong>Descripción:</strong> ${r.descripcion}<br>
        <strong>Cantidad:</strong> ${r.cantidad}<br>
        <strong>Reciclable:</strong> ${r.reciclable}<br>
        <strong>Tóxico:</strong> ${r.toxico}<br>
        <strong>Unidad:</strong> ${r.unidad}<br>
        <strong>Fecha:</strong> ${r.fecha}<br>
        <strong>Tipo:</strong> ${r.tipo} `;
    console.log(registros);
    lista.appendChild(li);
});