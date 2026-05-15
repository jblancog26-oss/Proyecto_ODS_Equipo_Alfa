// =================================
// CONTROLADOR DE RESULTADOS
// Este objeto gestiona la puntuación del juego,
// el historial de partidas y los mensajes para el jugador.
// =================================

window.ControladorResultados = {
    // ----------
    // ESTADO
    // ----------
    puntuacion: 0,
    partidas: [],
    mejorRacha: 0,

    // ----------
    // ELEMENTOS DEL DOM
    // ----------
    elementoPuntuacion: null,
    elementoMensaje: null,
    elementoListadoPartidas: null,
    elementoMejorRacha: null,
    elementoPuntuacionMaxima: null,

    // ----------
    // INICIALIZACIÓN
    // ----------
    inicializar: function() {
        this.elementoPuntuacion = document.getElementById("puntuacion");
        this.elementoMensaje = document.getElementById("mensaje-juego");
        this.elementoListadoPartidas = document.getElementById("lista-partidas");
        this.elementoMejorRacha = document.getElementById("mejor-racha");
        this.elementoPuntuacionMaxima = document.getElementById("puntuacion-maxima");

        // Mostrar el estado inicial en la pantalla
        this.actualizarListadoPartidas();
        this.actualizarMejorRacha();
        this.actualizarPuntuacionMaxima();
    },

    // ----------
    // PUNTUACIÓN
    // ----------
    incrementarPuntuacionEnUno: function() {
        this.puntuacion++;
        this.actualizarPuntuacionEnPantalla();
    },

    actualizarPuntuacionEnPantalla: function() {
        if (!this.elementoPuntuacion) return;

        this.elementoPuntuacion.textContent = this.puntuacion;
        console.log("Puntuación actualizada:", this.puntuacion);
    },

    resetearPuntuacionACero: function() {
        this.puntuacion = 0;
        this.actualizarPuntuacionEnPantalla();
    },

    // ----------
    // PARTIDA
    // ----------
    terminarPartida: function() {
        // Guardar el resultado de la partida actual
        this.partidas.push(this.puntuacion);

        // Actualizar el mejor resultado si la partida actual es mayor
        if (this.puntuacion > this.mejorRacha) {
            this.mejorRacha = this.puntuacion;
        }

        // Refrescar la lista de partidas y el mejor resultado
        this.actualizarListadoPartidas();
        this.actualizarMejorRacha();
        this.actualizarPuntuacionMaxima();

        // Preparar el siguiente juego
        this.resetearPuntuacionACero();
    },

    actualizarListadoPartidas: function() {
        if (!this.elementoListadoPartidas) return;

        this.elementoListadoPartidas.innerHTML = "";

        if (this.partidas.length === 0) {
            const li = document.createElement("li");
            li.textContent = "No se han terminado partidas todavía.";
            this.elementoListadoPartidas.appendChild(li);
            return;
        }

        this.partidas.forEach((puntos, index) => {
            const li = document.createElement("li");
            li.textContent = `Partida ${index + 1}: ${puntos} punto${puntos === 1 ? '' : 's'}`;
            this.elementoListadoPartidas.appendChild(li);
        });
    },

    actualizarMejorRacha: function() {
        if (!this.elementoMejorRacha) return;

        this.elementoMejorRacha.textContent = `Mejor racha: ${this.mejorRacha} punto${this.mejorRacha === 1 ? '' : 's'}`;
    },

    actualizarPuntuacionMaxima: function() {
        if (!this.elementoPuntuacionMaxima) return;

        this.elementoPuntuacionMaxima.textContent = this.mejorRacha;
    },

    // ----------
    // MENSAJES EN PANTALLA
    // ----------
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
        this.mostrarMensajeEnPantalla(`❌ Incorrecto. ${nombreProducto} va al ${contenedorCorrecto}. ¡Puntuación final: ${this.puntuacion}! Haz clic en 'Empezar Partida' para jugar de nuevo.`, "error");
        this.terminarPartida();
        window.ControladorJuego.terminarPartida();
    },

    mostrarMensajeNuevoProductoGenerado: function() {
        this.mostrarMensajeEnPantalla("Nuevo producto. ¡Muévelo al contenedor correcto! pulse Empezar Partida para reiniciar el juego.", "info");
    },

    mostrarMensajeDeInicio: function() {
        this.mostrarMensajeEnPantalla("¡Comienza! Mueve el producto con WASD o Flechas. ¡Llévalo al contenedor correcto! pulse Empezar Partida para reiniciar el juego.", "info");
    },

    mostrarMensajeDeReinicio: function() {
        this.mostrarMensajeEnPantalla("Juego reiniciado. ¡Mueve el producto al contenedor correcto!", "info");
    }
};
