// =========================
// CONTROLADOR DEL JUEGO
// =========================

window.ControladorJuego = {

    // Elementos del juego
    arenaJuego: null,
    productoMovil: null,
    botonEmpezarPartida: null,

    // Contenedores
    contenedores: {},

    // Posición del producto
    x: 0,
    y: 0,

    // Configuración
    velocidad: 7,
    colision: false,
    teclas: {},
    partidaActiva: false,

    // =========================
    // INICIAR JUEGO
    // =========================
    inicializar: function () {
        this.arenaJuego = document.getElementById("arena-juego");
        this.productoMovil = document.getElementById("producto-movil");
        this.botonEmpezarPartida = document.getElementById("empezar-partida");

        this.contenedores = {
            azul: document.getElementById("azul"),
            marron: document.getElementById("marron"),
            verde: document.getElementById("verde"),
            amarillo: document.getElementById("amarillo")
        };

        this.x = this.arenaJuego.offsetWidth / 2 - 40;
        this.y = this.arenaJuego.offsetHeight / 2 - 40;

        this.actualizarPosicion();
        this.configurarEventos();
        this.bucleJuego();
    },

    // =========================
    // ACTUALIZAR POSICIÓN
    // =========================
    actualizarPosicion: function () {
        this.x = Math.max(0, Math.min(this.x, this.arenaJuego.offsetWidth - this.productoMovil.offsetWidth));
        this.y = Math.max(0, Math.min(this.y, this.arenaJuego.offsetHeight - this.productoMovil.offsetHeight));

        this.productoMovil.style.left = this.x + "px";
        this.productoMovil.style.top = this.y + "px";
    },

    // =========================
    // DETECTAR COLISIÓN
    // =========================
    hayColision: function (a, b) {
        return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
    },

    // =========================
    // OBTENER LÍMITES
    // =========================
    obtenerLimites: function (elemento) {
        const rect = elemento.getBoundingClientRect();
        const arena = this.arenaJuego.getBoundingClientRect();

        return {
            left: rect.left - arena.left,
            top: rect.top - arena.top,
            right: rect.right - arena.left,
            bottom: rect.bottom - arena.top
        };
    },

    // =========================
    // COMPROBAR CHOQUES
    // =========================
    comprobarChoques: function () {
        // Solo procesar colisiones si una partida está activa
        if (!this.partidaActiva || this.colision) return;

        const producto = {
            left: this.x,
            top: this.y,
            right: this.x + this.productoMovil.offsetWidth,
            bottom: this.y + this.productoMovil.offsetHeight
        };

        for (const [nombre, contenedor] of Object.entries(this.contenedores)) {
            const caja = this.obtenerLimites(contenedor);

            if (this.hayColision(producto, caja)) {
                this.colision = true;
                contenedor.classList.add("colision");

                if (nombre === window.productoActual.contenedor) {
                    window.ControladorResultados.incrementarPuntuacionEnUno();
                    window.ControladorResultados.mostrarMensajeCorrecto(window.productoActual.nombre, nombre);
                } else {
                    window.ControladorResultados.mostrarMensajeErrorContenedor(window.productoActual.nombre, window.productoActual.contenedor);
                }

                setTimeout(() => {
                    contenedor.classList.remove("colision");
                    this.colision = false;
                    window.generarNuevoProductoAleatorio();
                    this.x = this.arenaJuego.offsetWidth / 2 - 40;
                    this.y = this.arenaJuego.offsetHeight / 2 - 40;
                    this.actualizarPosicion();
                    window.ControladorResultados.mostrarMensajeNuevoProductoGenerado();
                }, 1000);

                return;
            }
        }
    },

    // =========================
    // MOVIMIENTO
    // =========================
    actualizarMovimiento: function () {
        // Bloquear movimiento si la partida no está activa
        if (!this.partidaActiva) {
            requestAnimationFrame(() => {
                this.actualizarMovimiento();
            });
            return;
        }

        if (this.teclas["w"] || this.teclas["ArrowUp"] || this.teclas["W"]) {
            this.y -= this.velocidad;
        }
        if (this.teclas["s"] || this.teclas["ArrowDown"] || this.teclas["S"]) {
            this.y += this.velocidad;
        }
        if (this.teclas["a"] || this.teclas["ArrowLeft"] || this.teclas["A"]) {
            this.x -= this.velocidad;
        }
        if (this.teclas["d"] || this.teclas["ArrowRight"] || this.teclas["D"]) {
            this.x += this.velocidad;
        }

        this.actualizarPosicion();
        this.comprobarChoques();

        requestAnimationFrame(() => {
            this.actualizarMovimiento();
        });
    },

    // =========================
    // EVENTOS
    // =========================
    configurarEventos: function () {
        document.addEventListener("keydown", (e) => {
            // hacemos esta comprobación para evitar que al escribir
            // en el formulario nos detecte que hemos pulsado esas teclas 
            const elementoActivo = document.activeElement;
            if (
                elementoActivo.tagName === "INPUT" ||
                elementoActivo.tagName === "TEXTAREA" ||
                elementoActivo.tagName === "SELECT"
            ){
                return;
            }
                        
            const tecla = e.key;
            if (["w", "a", "s", "d", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(tecla)) {
                this.teclas[tecla] = true;
                e.preventDefault();
            }
        });

        document.addEventListener("keyup", (e) => {
            this.teclas[e.key] = false;
        });

        if (this.botonEmpezarPartida) {
            this.botonEmpezarPartida.addEventListener("click", () => {
                this.empezarPartida();
            });
        }
    },

    // =========================
    // BUCLE PRINCIPAL
    // =========================
    bucleJuego: function () {
        this.actualizarMovimiento();
    },

    // =========================
    // REINICIAR JUEGO
    // =========================
    empezarPartida: function () {
        this.partidaActiva = true;
        window.ControladorResultados.resetearPuntuacionACero();
        this.colision = false;

        Object.values(this.contenedores).forEach((c) => c.classList.remove("colision"));
        window.generarNuevoProductoAleatorio();

        this.x = this.arenaJuego.offsetWidth / 2 - 40;
        this.y = this.arenaJuego.offsetHeight / 2 - 40;
        this.actualizarPosicion();

        window.ControladorResultados.mostrarMensajeDeInicio();
    },

    terminarPartida: function () {
        this.partidaActiva = false;
        this.colision = false;

        Object.values(this.contenedores).forEach((c) => c.classList.remove("colision"));
    }
};
