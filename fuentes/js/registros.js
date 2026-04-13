let registros = JSON.parse(localStorage.getItem("registros")) || [];

const lista = document.getElementById("lista");

registros.forEach(r => {
    const li = document.createElement("li");
    li.textContent = `${r.nombre} - ${r.descripcion} - ${r.cantidad}`;
    console.log(registros);
    lista.appendChild(li);
});