/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },
  borrarPregunta: function (id) {
    this.modelo.borrarPregunta(id);
  },
  editarPregunta: function (id, textoNuevo) {
    this.modelo.editarPregunta(id, textoNuevo);
  },
  borrarAllPreguntas: function () {
    this.modelo.borrarAllPreguntas();
  },
  agregarVoto: function (nombrePregunta, respuestaSeleccionada) {
    this.modelo.agregarVoto(nombrePregunta, respuestaSeleccionada);
  },
};
