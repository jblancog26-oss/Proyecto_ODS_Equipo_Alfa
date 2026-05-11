// =================================
// CONTROLADOR DE JUEGO
// Gestiona: movimiento y colisiones
// =================================

window.ControladorJuego = {
    arenaJuego: null,
    productoMovil: null,
    botonReiniciarJuego: null,
    contenedoresDelJuego: {},

    posicionXDelProducto: 0,
    posicionYDelProducto: 0,
    velocidadDelProducto: 7,
    colisionYaDetectada: false,
    teclasPresionadas: {},

    inicializar: function() {
        this.arenaJuego = document.getElementById("arena-juego");
        this.productoMovil = document.getElementById("producto-movil");
        this.botonReiniciarJuego = document.getElementById("reiniciar-juego");
        
        this.contenedoresDelJuego = {
            azul: document.getElementById("azul"),
            marron: document.getElementById("marron"),
            verde: document.getElementById("verde"),
            amarillo: document.getElementById("amarillo")
        };

        this.posicionXDelProducto = this.arenaJuego.offsetWidth / 2 - 40;
        this.posicionYDelProducto = this.arenaJuego.offsetHeight / 2 - 40;
        this.actualizarPosicionDelProductoEnPantalla();
        
        this.configurarEventosDeTeclasYRaton();
        this.bucleDelJuego();
    },

    actualizarPosicionDelProductoEnPantalla: function() {
        this.posicionXDelProducto = Math.max(0, Math.min(this.posicionXDelProducto, this.arenaJuego.offsetWidth - this.productoMovil.offsetWidth));
        this.posicionYDelProducto = Math.max(0, Math.min(this.posicionYDelProducto, this.arenaJuego.offsetHeight - this.productoMovil.offsetHeight));
        this.productoMovil.style.left = this.posicionXDelProducto + "px";
        this.productoMovil.style.top = this.posicionYDelProducto + "px";
    },

    obtenerLimitesDelElementoEnLaPantalla: function(elemento) {
        const rectangulo = elemento.getBoundingClientRect();
        const rectanguloArena = this.arenaJuego.getBoundingClientRect();
        return {
            left: rectangulo.left - rectanguloArena.left,
            top: rectangulo.top - rectanguloArena.top,
            right: rectangulo.right - rectanguloArena.left,
            bottom: rectangulo.bottom - rectanguloArena.top,
            width: rectangulo.width,
            height: rectangulo.height
        };
    },

    detectarChoqueEntreDosRectangulos: function(rectangulo1, rectangulo2) {
        return !(rectangulo1.right < rectangulo2.left ||
                 rectangulo1.left > rectangulo2.right ||
                 rectangulo1.bottom < rectangulo2.top ||
                 rectangulo1.top > rectangulo2.bottom);
    },

    verificarChoquesDeTodosLosContenedores: function() {
        if (this.colisionYaDetectada) {
            return;
        }

        const limitesDelProducto = {
            left: this.posicionXDelProducto,
            top: this.posicionYDelProducto,
            right: this.posicionXDelProducto + this.productoMovil.offsetWidth,
            bottom: this.posicionYDelProducto + this.productoMovil.offsetHeight
        };

        for (const [nombreContenedor, elementoContenedor] of Object.entries(this.contenedoresDelJuego)) {
            const limitesDelContenedor = this.obtenerLimitesDelElementoEnLaPantalla(elementoContenedor);

            if (this.detectarChoqueEntreDosRectangulos(limitesDelProducto, limitesDelContenedor)) {
                this.colisionYaDetectada = true;
                elementoContenedor.classList.add("colision");

                if (nombreContenedor === window.productoActual.contenedor) {
                    window.ControladorResultados.incrementarPuntuacionEnUno();
                    window.ControladorResultados.mostrarMensajeCorrecto(window.productoActual.nombre, nombreContenedor);
                } else {
                    window.ControladorResultados.mostrarMensajeErrorContenedor(window.productoActual.nombre, window.productoActual.contenedor);
                }

                setTimeout(() => {
                    elementoContenedor.classList.remove("colision");
                    this.colisionYaDetectada = false;
                    window.generarNuevoProductoAleatorio();
                    this.posicionXDelProducto = this.arenaJuego.offsetWidth / 2 - 40;
                    this.posicionYDelProducto = this.arenaJuego.offsetHeight / 2 - 40;
                    this.actualizarPosicionDelProductoEnPantalla();
                    window.ControladorResultados.mostrarMensajeNuevoProductoGenerado();
                }, 1000);
                return;
            }
        }
    },

    bucleDelJuegoActualizandoMovimiento: function() {
        if (this.teclasPresionadas["w"] || this.teclasPresionadas["W"] || this.teclasPresionadas["ArrowUp"]) {
            this.posicionYDelProducto -= this.velocidadDelProducto;
        }
        if (this.teclasPresionadas["s"] || this.teclasPresionadas["S"] || this.teclasPresionadas["ArrowDown"]) {
            this.posicionYDelProducto += this.velocidadDelProducto;
        }
        if (this.teclasPresionadas["a"] || this.teclasPresionadas["A"] || this.teclasPresionadas["ArrowLeft"]) {
            this.posicionXDelProducto -= this.velocidadDelProducto;
        }
        if (this.teclasPresionadas["d"] || this.teclasPresionadas["D"] || this.teclasPresionadas["ArrowRight"]) {
            this.posicionXDelProducto += this.velocidadDelProducto;
        }

        this.actualizarPosicionDelProductoEnPantalla();
        this.verificarChoquesDeTodosLosContenedores();
        requestAnimationFrame(() => this.bucleDelJuegoActualizandoMovimiento());
    },

    configurarEventosDeTeclasYRaton: function() {
        // Evento de tecla presionada
        document.addEventListener("keydown", (evento) => {
            const juegoEstaActivo = document.getElementById("juego").classList.contains("activo");
            if (!juegoEstaActivo) {
                return;
            }
            
            const teclaPresionada = evento.key.toLowerCase();
            if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(teclaPresionada)) {
                this.teclasPresionadas[evento.key] = true;
                evento.preventDefault();
            }
        });

        // Evento de tecla soltada
        document.addEventListener("keyup", (evento) => {
            this.teclasPresionadas[evento.key] = false;
        });

        // Evento de ratón arrastrado
        this.productoMovil.addEventListener("mousedown", (evento) => {
            const juegoEstaActivo = document.getElementById("juego").classList.contains("activo");
            if (!juegoEstaActivo || this.colisionYaDetectada) {
                return;
            }
            
            evento.preventDefault();
            const rectanguloArena = this.arenaJuego.getBoundingClientRect();
            let estaArrastrandoConRaton = true;

            const alMoverRaton = (eventoMovimiento) => {
                if (!estaArrastrandoConRaton) return;
                
                this.posicionXDelProducto = eventoMovimiento.clientX - rectanguloArena.left - this.productoMovil.offsetWidth / 2;
                this.posicionYDelProducto = eventoMovimiento.clientY - rectanguloArena.top - this.productoMovil.offsetHeight / 2;
                
                this.actualizarPosicionDelProductoEnPantalla();
                this.verificarChoquesDeTodosLosContenedores();
            };

            const alSoltarRaton = () => {
                estaArrastrandoConRaton = false;
                Object.keys(this.teclasPresionadas).forEach(tecla => delete this.teclasPresionadas[tecla]);
                document.removeEventListener("mousemove", alMoverRaton);
                document.removeEventListener("mouseup", alSoltarRaton);
            };

            document.addEventListener("mousemove", alMoverRaton);
            document.addEventListener("mouseup", alSoltarRaton);
        });

        // Evento del botón reiniciar
        if (this.botonReiniciarJuego) {
            this.botonReiniciarJuego.addEventListener("click", () => {
                this.reiniciarJuegoCompletamente();
            });
        }
    },

    bucleDelJuego: function() {
        this.bucleDelJuegoActualizandoMovimiento();
    },

    reiniciarJuegoCompletamente: function() {
        window.ControladorResultados.resetearPuntuacionACero();
        this.colisionYaDetectada = false;
        Object.values(this.contenedoresDelJuego).forEach(c => c.classList.remove("colision"));
        window.generarNuevoProductoAleatorio();
        this.posicionXDelProducto = this.arenaJuego.offsetWidth / 2 - 40;
        this.posicionYDelProducto = this.arenaJuego.offsetHeight / 2 - 40;
        this.actualizarPosicionDelProductoEnPantalla();
        window.ControladorResultados.mostrarMensajeDeReinicio();
    }
};
