// Definimos la palabra CHANCHO la cual se mostrara por pantalla letra por letra
const palabraCompleta = 'CHANCHO';
const marcadorIndices = []; // Arreglo para guardar los índices de cada marcador
const titulo_imagen = document.querySelector(".container-tit-img");
const contenedor_marcadores = document.querySelector('.container');
const btn_reiniciar = document.querySelector("#reiniciar-partida");

//Metodo para mostar la ventana modal cuando cargue la pagina
window.onload = () => {
  const container_modal = document.querySelector('.container-modal');
  container_modal.classList.add('mostrar');
}

//Permite enviar el numero de jugadores y empezar el juego
document.getElementById('envio-de-jugadores').addEventListener('submit', (e) => {
  e.preventDefault();
  const cantidad_jugadores = document.getElementById('cantidad-jugadores').value;

  const mensajeDeError = document.querySelector('.mensaje-error');

  // Verifica el ancho de la ventana
  const anchoVentana = window.innerWidth;

  if (cantidad_jugadores >= 2 && cantidad_jugadores <= 12) {
    crearMarcadores(cantidad_jugadores);
    document.querySelector('.container-modal').style.display = 'none';
    document.body.style.backgroundImage = 'url("/imagenes/fondo-juego.png")';
    document.body.style.backgroundSize = 'cover'; // O 'contain' según lo que necesites
    document.body.style.backgroundPosition = 'center'; // Centra la imagen
    document.body.style.backgroundRepeat = 'no-repeat'; // Evita que la imagen se repita
    titulo_imagen.style.visibility = "visible";
    const botones_usuario = document.querySelector(".volver-al-inicio")
    botones_usuario.style.visibility = "visible"

    if (cantidad_jugadores <= 5 && anchoVentana >= 970) {
      contenedor_marcadores.style.display = 'grid';
      contenedor_marcadores.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))'; // Tamaño mínimo de columna ajustado
      contenedor_marcadores.style.alignItems = 'center'; // Centra verticalmente
      contenedor_marcadores.style.justifyItems = 'center'; // Centra horizontalmente
    }
  } else if (cantidad_jugadores == '') {
    mensajeDeError.textContent = "No puede empezar la partida sin ingresar la cantidad de jugadores"
  } else {
    mensajeDeError.textContent = "Error, la cantidad de jugadores permitidos son entre 2 y 12"
  }

})

document.getElementById('btn-volver-inicio').addEventListener("click", () => {
  window.location.href = '/index.html';
})

//Para guardar la partida cuando se refresque la pagina y no perder la info
function guardarPartida() {
  const partida = {
    marcadorIndices: marcadorIndices,
  };
  localStorage.setItem("chancho", JSON.stringify(partida));
}


// Función para actualizar los casilleros
function actualizarCasilleros(indice, casilleros) {
  casilleros.forEach((casillero, ind) => {
    if (ind < marcadorIndices[indice]) {
      casillero.value = palabraCompleta[ind];
      casillero.style.backgroundColor = '#b91d73'
      casillero.style.color = 'white'
      casillero.style.outlineColor = 'rgb(87, 16, 60)';
      if (marcadorIndices[indice] === palabraCompleta.length) {
        casillero.style.outlineColor = "rgb(143, 25, 16)";
        casillero.style.background = "rgb(201, 14, 14)";
      }
    } else {
      casillero.value = "";
      casillero.style.backgroundColor = ''
      casillero.style.outlineColor = '';
    }
  });
  // Desactivar los botones de incremento-decremento y hacer que aparezca el boton de volver cuando el jugador pierda
  if (marcadorIndices[indice] === palabraCompleta.length) {
    const marcador = document.querySelectorAll(".marcador")[indice + 1]; // Cambia a "querySelectorAll" para acceder al marcador correcto
    marcador.style.background = '#ED213A';
    marcador.style.background = '-webkit-linear-gradient(to right, #93291E, #ED213A)';
    marcador.style.background = 'linear-gradient(to right, #93291E, #ED213A)';
    marcador.style.outline = "3px solid rgb(143, 25, 16)";
    marcador.addEventListener("mouseenter", () => {
      marcador.style.boxShadow = "6px 6px 20px rgb(211, 15, 15)"
    });
    marcador.addEventListener("mouseleave", () => {
      marcador.style.boxShadow = ""
    });
    const ingresar_jugador = document.querySelectorAll(".ingresar_nombre_jugador")[indice + 1];
    ingresar_jugador.style.outline = "3px solid rgb(143, 25, 16)";
    //const chanchito_bloqueado = document.querySelectorAll(".chanchito-bloqueado")[indice+1];
    const botonVolver = document.querySelectorAll('.boton-volver')[indice + 1];
    botonVolver.style.display = 'block'; // Muestra el botón "Volver"
  } else {
    const botonVolver = document.querySelectorAll('.boton-volver')[indice + 1];
    botonVolver.style.display = 'none';
  }
  guardarPartida();
}

document.querySelectorAll("button").addEventListener("click", () => {
  const guardarPartida = {
    [p1.casilleros]: p1.casilleros
  }
  localStorage.setItem("chancho", JSON.stringify(guardarPartida))
  console.log("guardado")
})

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
    ingresar_nom_input.placeholder = "Ingrese jugador"

    // Creamos el div boton_y_palabra
    const boton_palabra_div = document.createElement('div');
    boton_palabra_div.className = 'boton_y_palabra';



    //Crear boton de volver
    const botonVolver = document.createElement('button');
    botonVolver.textContent = 'Volver';
    botonVolver.className = 'boton-volver'

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
    marcador_div.appendChild(botonVolver);


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

    boton_incremento.disabled = false;
    boton_decremento.disabled = false;

    // Event listener para el botón de incremento
    boton_incremento.addEventListener('click', () => {
      if (marcadorIndices[i] < palabraCompleta.length) {
        marcadorIndices[i]++;
        actualizarCasilleros(i, casilleros);
      }
      if (marcadorIndices[i] === palabraCompleta.length) {
        boton_incremento.disabled = true;
        boton_decremento.disabled = true;
        boton_incremento.style.display = 'none'
        boton_decremento.style.display = 'none' // Se pone para los 2 botones porque el jugador pierden cuando aumentamos el marcador
        const botonDeVolver = document.querySelectorAll('.boton-volver')[i + 1];
        botonDeVolver.addEventListener("click", () => { //Metodo para que se vuelva a mostrar el marcador
          boton_incremento.style.display = 'flex'
          boton_decremento.style.display = 'flex'
          boton_incremento.disabled = false;
          boton_decremento.disabled = false;
          botonDeVolver.style.display = 'none';
          marcador_div.style.background = "";
          marcador_div.style.outline = "";
          marcador_div.addEventListener("mouseenter", () => {
            marcador_div.style.boxShadow = "6px 6px 20px rgb(219, 20, 143)";
          });
          marcador_div.addEventListener("mouseleave", () => {
            marcador_div.style.boxShadow = "";
          });
          ingresar_nom_input.style.outline = "";
          marcadorIndices[i] = 7; //Posicion de la ultima letra de la palabra CHANCHO
          marcadorIndices[i]--;
          actualizarCasilleros(i, casilleros);
        })
      }
    });

    // Event listener para el botón de decremento
    boton_decremento.addEventListener('click', () => {
      if (marcadorIndices[i] > 0) {
        marcadorIndices[i]--;
        actualizarCasilleros(i, casilleros);
      }
    });

    //Metodo que reiniciar en 0 la partida
    btn_reiniciar.addEventListener("click", () => {
      // Reiniciar cada marcador
      for (let i = 0; i < marcadorIndices.length; i++) {
        marcadorIndices[i] = 0; // Restablecer el índice del marcador
        const casilleros = document.querySelectorAll('.marcador')[i+1].querySelectorAll('.casillero-palabra');

        // Actualizar los casilleros a su estado original
        casilleros.forEach(casillero => {
          casillero.value = ""; // Limpiar el valor
          casillero.style.backgroundColor = ''; // Restaurar el color de fondo
          casillero.style.outlineColor = ''; // Restaurar el color del contorno
        });

        const marcadorDiv = document.querySelectorAll(".marcador")[i+1];
        marcadorDiv.style.background = ''; // Restaurar el fondo del marcador
        marcadorDiv.style.outline = ''; // Restaurar el contorno del marcador

        const ingresar_jugadores = document.querySelectorAll(".ingresar_nombre_jugador")[i+1];
        ingresar_jugadores.style.outline = "";

        // Restablecer la visibilidad de los botones de incremento y decremento
        const boton_incremento = marcadorDiv.querySelector('#boton-incremento');
        const boton_decremento = marcadorDiv.querySelector('#boton-decremento');
        boton_incremento.style.display = 'flex';
        boton_decremento.style.display = 'flex';
        boton_incremento.disabled = false;
        boton_decremento.disabled = false;

        //Para volver al hover original
        marcador_div.addEventListener("mouseenter", () => {
          marcador_div.style.boxShadow = "6px 6px 20px rgb(219, 20, 143)";
        });
        marcador_div.addEventListener("mouseleave", () => {
          marcador_div.style.boxShadow = "";
        });

        // Restablecer el botón de volver
        const botonVolver = marcadorDiv.querySelector('.boton-volver');
        botonVolver.style.display = 'none';
      }
    });
  }
}


