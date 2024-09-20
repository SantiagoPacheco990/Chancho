// Definimos la palabra CHANCHO la cual se mostrara por pantalla letra por letra
const palabraCompleta = 'CHANCHO';
const marcadorIndices = []; // Arreglo para guardar los índices de cada marcador


//Metodo para mostar la ventana modal cuando cargue la pagina
window.onload = () => {
  const container_modal = document.querySelector('.container-modal');
  container_modal.classList.add('mostrar');
}

//Permite enviar el numero de jugadores y empezar el juego
document.getElementById('envio-de-jugadores').addEventListener('submit',(e)=>{
  e.preventDefault();
  const cantidad_jugadores = document.getElementById('cantidad-jugadores').value;

  const mensajeDeError = document.querySelector('p');

  if (cantidad_jugadores >= 2 && cantidad_jugadores <= 12) {
    crearMarcadores(cantidad_jugadores);
    document.querySelector('.container-modal').style.display = 'none'; 
  } else{
    mensajeDeError.textContent = "Error, la cantidad de jugadores son entre 2 y 12"
  }

})



// Función para actualizar los casilleros
function actualizarCasilleros(indice, casilleros) {
  casilleros.forEach((casillero, ind) => {
    if (ind < marcadorIndices[indice]) {
      casillero.value = palabraCompleta[ind];
    } else {
      casillero.value = "";
    }
  });
}

// Funcion para crear marcadores
function crearMarcadores(numMarcadores) {
  for (let i = 0; i < numMarcadores; i++) {
    const container = document.querySelector('.container');

    // Creamos el div marcador
    const marcador_div = document.createElement('div');
    marcador_div.className = 'marcador';

    // Inicializamos el índice del marcador
    marcadorIndices[i] = 0;

    // Creamos el input ingresar_nombre_jugador
    const ingresar_nom_input = document.createElement('input');
    ingresar_nom_input.className = 'ingresar_nombre_jugador';
    ingresar_nom_input.type = 'text';
    ingresar_nom_input.setAttribute('maxlength', '10');

    // Creamos el div boton_y_palabra
    const boton_palabra_div = document.createElement('div');
    boton_palabra_div.className = 'boton_y_palabra';

    // Creamos un array para los casilleros
    const casilleros = [];

    // Creamos los casilleros para la palabra
    for (let j = 0; j < palabraCompleta.length; j++) {
      const casillero = document.createElement('input');
      casillero.className = 'casillero-palabra';
      casillero.type = 'text';
      casillero.readOnly = true;
      boton_palabra_div.appendChild(casillero);
      casilleros.push(casillero); // Guardamos el casillero en el array
    }

    // Colocamos los hijos
    container.appendChild(marcador_div);
    marcador_div.appendChild(ingresar_nom_input);
    marcador_div.appendChild(boton_palabra_div);

    // Creando el div container-botones
    const container_botones = document.createElement('div');
    container_botones.className = 'container-botones';

    // Creando el botón incremento
    const boton_incremento = document.createElement('button');
    boton_incremento.className = 'botones-inc-dec';
    boton_incremento.textContent = '+';
    boton_incremento.id = "boton-incremento";

    // Creando el botón decremento
    const boton_decremento = document.createElement('button');
    boton_decremento.className = 'botones-inc-dec';
    boton_decremento.textContent = '-';
    boton_decremento.id = "boton-decremento";


    // Colocamos los botones en el contenedor
    boton_palabra_div.appendChild(container_botones);
    container_botones.appendChild(boton_incremento);
    container_botones.appendChild(boton_decremento);

    // Event listener para el botón de incremento
    boton_incremento.addEventListener('click', () => {
      if (marcadorIndices[i] < palabraCompleta.length) {
        marcadorIndices[i]++;
        actualizarCasilleros(i, casilleros);
      }
    });

    // Event listener para el botón de decremento
    boton_decremento.addEventListener('click', () => {
      if (marcadorIndices[i] > 0) {
        marcadorIndices[i]--;
        actualizarCasilleros(i, casilleros);
      }
    });
  }
}


