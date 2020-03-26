/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
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

  //se guardan las preguntas
  guardar: function(){
  },
};

/*//!Ejemplo de pregunta {'texto': unTexto, 'id': id, 'cantidadPorRespuesta': respuestas}
Una respuesta es un diccionario que tiene un texto y una cantidad de votos.
Ejemplo de respuesta:

//!{'textoRespuesta': respuesta, 'cantidad': cantVotos}

//?vistaAdministrador: agregado de respuestas
El agregado de respuestas ya viene implementado por defecto. Podés probarlo abriendo vistaAdministrador.html y agregar respuestas a una pregunta. Esta funcionalidad viene dada por validacionFormulario() que se ejecuta en inicializar de vistaAdministrador.js.

vistaAdministrador: construir el elemento html de una pregunta
Completá el método construirElementoPregunta para que construya un elemento html a partir de una pregunta pasada por parámetro (recordá como está formada una pregunta releyendo Cómo están representadas las preguntas y respuestas). Este nuevo elemento deberá guardarse en la variable con nombre nuevoItem y tener clase list-group-item, id pregunta.id y texto pregunta.textoPregunta.

Tip: Podés probar si funciona correctamente la construcción del elemento ejecutando desde la consola la siguiente línea: this.modelo.preguntas = [{‘textoPregunta’: “Mi primer Pregunta”, ‘id’: 0, ‘cantidadPorRespuesta’: [{‘textoRespuesta’: “mi unica respuesta”, ‘cantidad’: 2}]}]

vistaAdministrador: completando el inicializador
Agregá los métodos

this.reconstruirLista();

this.configuracionDeBotones();

al inicializar de la vista del administrador. Estos serán necesarios para que funcione correctamente la interacción de los botones y la reconstrucción de la lista de preguntas cuando haya un update.

vistaAdministrador: tomar input de respuestas y llamar al controlador
Para agregar una pregunta se tiene que poder recorrer los elementos del html pertenecientes a las respuestas, tomar sus datos y llamar luego al controlador para que cree las preguntas junto a sus respuestas. En la función agregarPregunta tendrás que pushear al arreglo de respuestas cada respuesta existente. Recordá como estaba formado el elemento respuesta en Cómo están representadas las preguntas y respuestas. Este arreglo de respuestas será el que le pases al controlador.

Tip: respuesta = $(this).val(); contiene el texto de la respuesta. La cantidad de votos deberá ser seteada en 0.

modelo: asignando un id a las nuevas preguntas
Llegó la hora de completar el modelo. Lo único que tendremos que hacer acá es implementar la funcionalidad para obtener un nuevo id. con obtenerUltimoId. Lo que debe hacer esta función es buscar el id más alto y asignar ese id a la nueva pregunta. Para hacerlo vas a tener que recorrer la lista de preguntas del modelo.

Tip: cuidado con la primer pregunta que se agrega que no tendrá ningún id con el cual compararse. Por lo que deberá tener un valor por defecto.

Si probás hasta acá la funcionalidad debería ejecutarse correctamente el agregado de preguntas con sus respuestas desde la vista del administrador. Si todavía no funciona volvé a chequear que todos los pasos los hayas realizado correctamente. ¡No arrastres un error que se puede volver una bola de nieve!*/