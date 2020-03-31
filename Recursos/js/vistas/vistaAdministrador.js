/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  this.reconstruirLista();
  this.configuracionDeBotones();
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function () {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaEliminada.suscribir(function () { 
    contexto.reconstruirLista();
  });

  this.modelo.preguntaEditada.suscribir(function () {
    contexto.reconstruirLista();
  });

  this.modelo.borrarTodasPreguntas.suscribir(function () {
    contexto.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem;
    nuevoItem = document.createElement("li");
    $(nuevoItem).addClass('list-group-item');
    $(nuevoItem).attr('id', pregunta.id);
    $(nuevoItem).text(pregunta.textoPregunta);

    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');

    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    $(nuevoItem).html($('.d-flex').html());
    return nuevoItem;
  },


  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },


  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];
      var respuestaVacia = 0;

      $('[name="option[]"]').each(function() {
        if ($(this).val() === ''){
          respuestaVacia += 1;
          return;
        }else{
          respuestas.push({ 'textoRespuesta': $(this).val(), 'cantidad': 0 });
        }
        return respuestaVacia
      })

      if(respuestaVacia > 1){
        return
      }else{
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
      }
    });

    //asociar el resto de los botones a eventos
    e.botonBorrarPregunta.click(function () {
        var id = parseInt($('.list-group-item.active').attr('id'));
        if(id){
          contexto.controlador.borrarPregunta(id);
        }
    });


    e.botonEditarPregunta.click(function () {
      var id = parseInt($('.list-group-item.active').attr('id'));
      if (id) {
        var textoNuevo = prompt('Ingrese nuevo valor');
        contexto.controlador.editarPregunta(id, textoNuevo);
      }
    });

    e.borrarTodo.click(function () {
        contexto.controlador.borrarAllPreguntas();
    });
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
