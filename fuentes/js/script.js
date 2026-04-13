document.querySelector("form").addEventListener("submit", function(e) {
	e.preventDefault();
	
	let nombre = document.getElementById("nombre").value;
	let cantidad = document.getElementById("descripcion").value;
	
	console.log(nombre);
	console.log(descripcion);
});