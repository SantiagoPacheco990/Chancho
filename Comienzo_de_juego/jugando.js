import {Marcador} from "./Marcador.js";

/****************Modales de Reiniciar y Volver****************/

/****************Modal Reiniciar****************/
const modalReiniciar = document.getElementById("modal_reiniciar");
const abrirModalReiniciar = document.getElementById("abrirModalReiniciar");
const cerrarModalReiniciar = document.getElementById("cerrarModalReiniciar")


abrirModalReiniciar.addEventListener("click", () =>{
  modalReiniciar.showModal();
})

cerrarModalReiniciar.addEventListener("click", () =>{
  modalReiniciar.close();
})

/****************Modal Volver al Inicio****************/
const modalVolverInicio = document.getElementById("volverAlInicio");
const abrirModalVolverInicio = document.getElementById("abrirModalVolverInicio");
const cerrarModalVolverInicio = document.getElementById("cerrarModalVolverInicio")

abrirModalVolverInicio.addEventListener("click", () =>{
  modalVolverInicio.showModal();
})

cerrarModalVolverInicio.addEventListener("click", () =>{
  modalVolverInicio.close();
})

/****************************************************************/

/*****************Con respecto a los Marcadores******************/

const marcadores = [];


//Crear Marcadores

const crearMarcadores = (jugadores) =>{
  const container = document.querySelector(".container"); /*Hace referencia al container de los marcadores*/ 
  for (let i = 0; i < jugadores; i++) {
    marcadores.push(new Marcador(container, () => guardarEstadoPartida(marcadores), () => jugadorGanador(marcadores)));
  }
}

/*********Para guardar el estado de la partida************/

function guardarEstadoPartida(marcadoresPartida) {
  const estadoPartida = marcadoresPartida.map(marcador => ({
    nombreJugador: marcador.nombreJugador.value,
    cantidadLetras: marcador.cantidadLetras
  }));

  localStorage.setItem("estadoPartida", JSON.stringify(estadoPartida)) // Pasa a formato String
}


// Función para restaurar el estado de la partida
function restaurarEstadoPartida() {
  const estadoGuardado = JSON.parse(localStorage.getItem("estadoPartida"));
  if (!estadoGuardado) return;

  // Asegurarse de que los marcadores están creados
  if (marcadores.length === 0) return;

  estadoGuardado.forEach((estado, i) => {
    // Comprobamos si el marcador existe en la lista de marcadores
    const marcador = marcadores[i];
    if (!marcador) return; // Si no existe, no intentamos restaurarlo

    // Restaurar nombre del jugador
    if (marcador.nombreJugador) {
      marcador.nombreJugador.value = estado.nombreJugador;
    }

    // Restaurar cantidad de letras
    marcador.cantidadLetras = estado.cantidadLetras;

    // Mostrar las letras en los casilleros
    for (let j = 0; j < marcador.maxLetras; j++) {
      const casillero = marcador.casilleros[j];
      if (j < estado.cantidadLetras) {
        casillero.value = marcador.palabra[j];
        casillero.classList.add("activo");
      } else {
        casillero.value = "";
        casillero.classList.remove("activo");
      }
    }

    // Si la cantidad de letras es igual al máximo, mostrar el botón de volver y el Marcador en Rojo
    if (estado.cantidadLetras === marcador.maxLetras) {
      marcador.mostrarBtnVolver();
      marcador.marcadorJugadorEliminado();
    }
  });
}

//Creamos los marcadores y en caso de recarga de pagina, que no se pierda la informacion (Se restaura todo)

const params = new URLSearchParams(window.location.search);
const cantidadJugadores = parseInt(params.get("cantidad"));

crearMarcadores(cantidadJugadores);
restaurarEstadoPartida();


/*********************************************/

/******************BUSCAR AL JUGADOR GANADOR************************/
const modal_jugador_ganador = document.getElementById("modal_jugador_ganador");

function jugadorGanador(jugadores) {
  // Filtra los jugadores que no están eliminados (es decir, los que no han completado la palabra)
  const jugadoresActivos = jugadores.filter(jugador => jugador.cantidadLetras < jugador.maxLetras);

  // Si solo queda un jugador activo, es el ganador
  if (jugadoresActivos.length === 1) {
    const ganador = jugadoresActivos[0];
    const titulo_del_ganador = document.getElementById("titulo_ganador"); // Es el h2 del modal del ganador
    modal_jugador_ganador.showModal();
    titulo_del_ganador.textContent = `🏆 ¡${ganador.nombreJugador.value} ganó la partida! 🎉`;
  }
}


const btn_volver_a_jugar = document.getElementById("btn_volver_a_jugar");
const btn_volver_al_inicio = document.getElementById("btn_volver_al_inicio");

btn_volver_a_jugar.addEventListener("click",() =>{
  modal_jugador_ganador.close();
  reiniciarMarcadores(marcadores);
  guardarEstadoPartida(marcadores);
})

btn_volver_al_inicio.addEventListener("click", () =>{
  modal_jugador_ganador.close();
  localStorage.removeItem("estadoPartida");
})

/*********************************************/
/*********Para reiniciar los marcadores************/
function reiniciarMarcadores (vecMarc) {
  vecMarc.map(marcador =>{
    marcador.reiniciarMarcador();
    marcador.quitarMarcadorEliminado();
    marcador.ocultarBtnVolver();
  })
}



/*********************************************/

// Cuando Reiniciamos la partida, los marcadores vuelven a cero, pero se mantienen los nombres
const btnReiniciar = document.getElementById("reiniciar");
btnReiniciar.addEventListener("click", ()=>{
  reiniciarMarcadores(marcadores);
  guardarEstadoPartida(marcadores);
  modalReiniciar.close();
})

// Cuando volvemos al Inicio se pierde todo el estado de la partida
const btnVolverInicio = document.getElementById("btn_volver")
btnVolverInicio.addEventListener("click", () =>{
  localStorage.removeItem("estadoPartida");
})
/*********************************************/

