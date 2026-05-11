// =================================
// INICIALIZADOR DEL JUEGO
// Orquesta todos los componentes
// =================================

document.addEventListener("DOMContentLoaded", function() {
    // Inicializar componentes en orden
    window.ControladorResultados.inicializar();
    window.ControladorJuego.inicializar();
    
    // Mensaje de inicio del juego
    window.ControladorResultados.mostrarMensajeDeInicio();
});