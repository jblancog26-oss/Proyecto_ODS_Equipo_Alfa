'use strict'

const botonInsertar = document.querySelectorAll('#botonInsertar')[0]

const inputNombre = document.querySelectorAll('#nombre')[0]
const inputFecha = document.querySelectorAll('#fecha')[0]
const inputTipo = document.querySelectorAll('#tipo')[0]

botonInsertar.addEventListener( 'click', insertar )

function insertar() {
	console.log("Vamos a insertar los datos del Armagedón")
	const nombre = inputNombre.value
	const fecha = inputFecha.value
	const armagedon = new Armagedon(nombre, fecha, null)
	console.log(armagedon)
}