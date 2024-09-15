// Obtén las referencias a los botones
const botonIncremento = document.getElementById('boton-incremento');
const botonDecremento = document.getElementById('boton-decremento');

// Obtén los casilleros donde irá la palabra
const casilleros = document.querySelectorAll('.casillero-palabra');

// Define la palabra que deseas mostrar letra por letra
const palabraCompleta = 'CHANCHO';

// Inicializa el índice de la palabra
let indice = 0;

// Función para actualizar los casilleros
function actualizarCasilleros() {
  casilleros.forEach((casillero, ind) => {
    if (ind < indice) {
      casillero.value = palabraCompleta[ind];
    } else {
      casillero.value="";
    }
    //casillero.value = (ind < indice) ? palabraCompleta[ind] : "";
  });
}

// Event listener para el botón de incremento
botonIncremento.addEventListener('click', () => {
  if (indice < palabraCompleta.length) {
    indice++;
    actualizarCasilleros();
  }
});

// Event listener para el botón de decremento
botonDecremento.addEventListener('click', () => {
  if (indice > 0) {
    indice--;
    actualizarCasilleros();
  }
});

// Funcion para crear marcadores
function crearMarcadores(numMarcadores){
  for (let i = 0; i < numMarcadores; i++) {
    const container = document.querySelector('.container');

    // Creamos el div marcador
    const marcador_div = document.createElement('div')
    marcador_div.className = 'marcador'

    // Creamos el input ingresar_nombre_jugador
    const ingresar_nom_input = document.createElement('input');
    ingresar_nom_input.className = 'ingresar_nombre_jugador'
    ingresar_nom_input.type = 'text';
    ingresar_nom_input.setAttribute('maxlength','10');


    // Creamos el div boton_y_palabra
    const boton_palabra_div = document.createElement('div')
    boton_palabra_div.className = 'boton_y_palabra';

    // Creando el div container-botones
    const container_botones = document.createElement('div');
    container_botones.className = 'container-botones'

    //Creando el boton incremento
    const boton_incremento = document.createElement('button');
    boton_incremento.id = 'boton-incremento';
    boton_incremento.className = 'botones-inc-dec';
    boton_incremento.textContent = '+';

    // Creando el boton decremento
    const boton_decremento = document.createElement('button');
    boton_decremento.id = 'boton-decremento'
    boton_decremento.className = 'botones-inc-dec';
    boton_decremento.textContent = '-';

    // Creamos los casilleros para la palabra
    for (let i = 0; i < 7; i++) {
      const casillero = document.createElement('input');
      casillero.className = 'casillero-palabra';
      casillero.type = 'text';
      casillero.readOnly = true;
      boton_palabra_div.appendChild(casillero);
    }

    //Colocamos los hijos
    container.appendChild(marcador_div);
    marcador_div.appendChild(ingresar_nom_input);
    marcador_div.appendChild(boton_palabra_div);
    boton_palabra_div.appendChild(container_botones);
    container_botones.appendChild(boton_incremento);
    container_botones.appendChild(boton_decremento);
  }
}

// Actualiza los casilleros con la palabra
actualizarCasilleros();
crearMarcadores(6);
