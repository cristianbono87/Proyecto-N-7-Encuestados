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
  console.log("desde modelo", this.Preguntas);
  
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.borrarTodasPreguntas = new Evento(this);
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
//! ver como hacerle
  agregarVoto: function (nombrePregunta, respuestaSeleccionada){
    var nuevaRespuesta = {'textoRespuesta': respuesta, 'cantidad': cantPorResp};
    console.log('se agrega voto');
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('Preguntas', JSON.stringify(this.preguntas));
    console.log("Estado actual guardado");
  },
};