// =================================
// CONTROLADOR DE RESULTADOS
// Gestiona: puntuación y mensajes
// =================================

window.ControladorResultados = {
    puntuacion: 0,
    elementoPuntuacion: null,
    elementoMensaje: null,

    inicializar: function() {
        this.elementoPuntuacion = document.getElementById("puntuacion");
        this.elementoMensaje = document.getElementById("mensaje-juego");
    },

    incrementarPuntuacionEnUno: function() {
        this.puntuacion++;
        this.actualizarPuntuacionEnPantalla();
    },

    actualizarPuntuacionEnPantalla: function() {
        if (this.elementoPuntuacion) {
            this.elementoPuntuacion.textContent = this.puntuacion;
            console.log("Puntuación actualizada:", this.puntuacion);
        }
    },

    resetearPuntuacionACero: function() {
        this.puntuacion = 0;
        this.actualizarPuntuacionEnPantalla();
    },

    mostrarMensajeEnPantalla: function(texto, tipo = "info") {
        if (!this.elementoMensaje) return;

        this.elementoMensaje.textContent = texto;
        
        if (tipo === "correcto") {
            this.elementoMensaje.style.color = "#27ae60";
        } else if (tipo === "error") {
            this.elementoMensaje.style.color = "#c0392b";
        } else {
            this.elementoMensaje.style.color = "#2c3e50";
        }
    },

    mostrarMensajeCorrecto: function(nombreProducto, nombreContenedor) {
        this.mostrarMensajeEnPantalla(`¡CORRECTO! ${nombreProducto} en ${nombreContenedor}.`, "correcto");
    },

    mostrarMensajeErrorContenedor: function(nombreProducto, contenedorCorrecto) {
        this.mostrarMensajeEnPantalla(`Incorrecto. ${nombreProducto} va al ${contenedorCorrecto}.`, "error");
    },

    mostrarMensajeNuevoProductoGenerado: function() {
        this.mostrarMensajeEnPantalla("Nuevo producto. ¡Muévelo al contenedor correcto!");
    },

    mostrarMensajeDeInicio: function() {
        this.mostrarMensajeEnPantalla("¡Comienza! Mueve el producto con WASD o Flechas. ¡Llévalo al contenedor correcto!");
    },

    mostrarMensajeDeReinicio: function() {
        this.mostrarMensajeEnPantalla("Juego reiniciado. ¡Mueve el producto al contenedor correcto!");
    }
};
