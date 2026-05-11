window.productosJuego = [
    {
        nombre: "Botella de plástico",
        imagen: "img/botella-plastico.png",
        contenedor: "amarillo"
    },
    {
        nombre: "Periodico",
        imagen: "img/papel.png",
        contenedor: "azul"
    },
    {
        nombre: "Cáscara de plátano",
        imagen: "img/banana.png",
        contenedor: "marron"
    },
    {
        nombre: "Botella de vidrio",
        imagen: "img/vidrio.png",
        contenedor: "verde"
    },
    {
        nombre: "Lata de aluminio",
        imagen: "img/lata.png",
        contenedor: "amarillo"
    },
    {
        nombre: "Cartón",
        imagen: "img/carton.png",
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
