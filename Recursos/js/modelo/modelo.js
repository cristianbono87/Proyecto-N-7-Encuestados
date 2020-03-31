/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos

  this.preguntas = localStorage.getItem("Preguntas")
    ? JSON.parse(localStorage.getItem('Preguntas'))
    : [];
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.borrarTodasPreguntas = new Evento(this);
  this.votoAgregado = new Evento(this);
};

Modelo.prototype = { 
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    for (var i = 0; i < this.preguntas.length; ++i) {
      if(this.preguntas[i].id > this.ultimoId){
        this.ultimoId = this.preguntas[i].id;
      }
    }
    return this.ultimoId;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function(borrarId){
    this.preguntas.forEach(element => {
      if(element.id === borrarId){
        this.preguntas.splice(this.preguntas.indexOf(element), 1)
      }
    });
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  editarPregunta: function(editarId, textoNuevo){
    this.preguntas.forEach(element => {
      if (element.id === editarId) {
        element.textoPregunta = textoNuevo;
      }
    });
    this.guardar();
    this.preguntaEditada.notificar();
  },

  borrarAllPreguntas: function () {
    this.preguntas.splice(0);
    this.guardar();
    this.borrarTodasPreguntas.notificar();
  },

  agregarVoto: function (nombrePregunta, respuestaSeleccionada){
    this.preguntas.forEach(element => {
      if (element.textoPregunta === nombrePregunta) {
        element.cantidadPorRespuesta.forEach(function(respuestaElegida){
          if(respuestaElegida.textoRespuesta === respuestaSeleccionada){
            respuestaElegida.cantidad += 1;
          };
        });
      };
    });
    this.guardar();
    this.votoAgregado.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('Preguntas', JSON.stringify(this.preguntas));
  },
};