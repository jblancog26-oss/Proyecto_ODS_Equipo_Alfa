window.productosJuego = [
    {
        nombre: "Botella de plástico",
        imagen: "../documentacion/imagenes/productos/botella_plastico.png",
        contenedor: "amarillo"
    },
    {
        nombre: "Periodico",
        imagen: "../documentacion/imagenes/productos/periodico.png",
        contenedor: "azul"
    },
    {
        nombre: "Cáscara de plátano",
        imagen: "../documentacion/imagenes/productos/cascara_platano.png",
        contenedor: "marron"
    },
    {
        nombre: "Botella de vidrio",
        imagen: "../documentacion/imagenes/productos/botella_cristal.png",
        contenedor: "verde"
    },
    {
        nombre: "Lata de aluminio",
        imagen: "../documentacion/imagenes/productos/lata.png",
        contenedor: "amarillo"
    },
    {
        nombre: "Cartón",
        imagen: "../documentacion/imagenes/productos/carton.png",
        contenedor: "azul"
    }
];

window.productoActual = null;

window.actualizarVistaDelProductoEnPantalla = function() {
    const imagenProducto = document.getElementById("producto");
    const nombreProducto = document.getElementById("nombre-producto");

    if (!imagenProducto || !nombreProducto) {
        return;
    }

    if (!window.productoActual) {
        window.productoActual = window.productosJuego[0];
    }

    imagenProducto.src = window.productoActual.imagen || "img/producto.png";
    imagenProducto.alt = window.productoActual.nombre;
    nombreProducto.textContent = window.productoActual.nombre;
};

window.generarNuevoProductoAleatorio = function() {
    const indice = Math.floor(Math.random() * window.productosJuego.length);
    window.productoActual = window.productosJuego[indice];
    window.actualizarVistaDelProductoEnPantalla();
};

document.addEventListener("DOMContentLoaded", function() {
    window.generarNuevoProductoAleatorio();
});

