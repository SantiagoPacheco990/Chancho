import {Marcador} from "./Marcador.js";

/****************MODALES****************/

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

// Función que sirve para obtener el nombre del jugador, si no tiene nombre, se le asigna un nombre por defecto
function obtenerNombreJugador(marcador, indice) {
    const nombre = marcador.nombreJugador?.value?.trim();

    if (nombre) {
        return nombre;
    }

    return `Jugador N°${indice + 1}`;
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

const estadoGuardado = JSON.parse(
    localStorage.getItem("estadoPartida")
);

if (estadoGuardado) {
    // Si existe una partida guardada,
    // creamos la cantidad de jugadores guardados
    crearMarcadores(estadoGuardado.length);

} else {
    // Si es una partida nueva,
    // usamos la cantidad de jugadores de la URL
    crearMarcadores(cantidadJugadores);
}

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
    const indiceGanador = jugadores.indexOf(ganador);
    const nombreGanador = obtenerNombreJugador(ganador, indiceGanador);
    
    const titulo_del_ganador = document.getElementById("titulo_ganador"); // Es el h2 del modal del ganador
    modal_jugador_ganador.showModal();
    guardarHistorial(jugadores);  // ES PARA EL HISTORIAL
    titulo_del_ganador.textContent = `🏆 ${nombreGanador} ganó la partida 🏆`;
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
  localStorage.removeItem("historialPartidas"); // SE BORRA EL HISTORIAL ACTUAL DE LA PARTIDA
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
  localStorage.removeItem("historialPartidas"); // SE ELIMINA EL HISTORIAL ACTUAL DE LA PARTIDA
})
/*********************************************/

// Limpia el localStorage si el usuario vuelve usando la flecha del navegador
window.addEventListener("pageshow", (event) => {
  if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
    localStorage.removeItem("estadoPartida");
    // Opcional: Forzamos recarga para evitar mostrar estado viejo en el DOM
    location.reload();
  }
});

/********* HISTORIAL *********/

const modalHistorial = document.getElementById("modal_historial");
const abrirHistorial = document.getElementById("abrirModalHistorial");
const cerrarHistorial = document.getElementById("cerrarHistorial");
const listaHistorial = document.querySelector(".lista_historial");

abrirHistorial.addEventListener("click", () => {
    mostrarHistorial();
    modalHistorial.showModal();
});

cerrarHistorial.addEventListener("click", () => {
    modalHistorial.close();
});

function guardarHistorial(jugadores) {
    const historial =
        JSON.parse(localStorage.getItem("historialPartidas")) || [];
    const fecha = new Date();
    
    // Buscar ganador
    const indiceGanador = jugadores.findIndex(
        jugador => jugador.cantidadLetras < jugador.maxLetras
    );
    const ganador = jugadores[indiceGanador];
    
    // Obtener nombre real o "Jugador N°X"
    const nombreGanador = obtenerNombreJugador(
        ganador,
        indiceGanador
    );

    // Buscar segundo
    const jugadoresEliminados = jugadores
        .map((jugador, indice) => ({
            jugador,
            indice
        }))
        .filter(
            item => item.jugador.cantidadLetras === item.jugador.maxLetras
        );

    const segundoJugador =
        jugadoresEliminados[jugadoresEliminados.length - 1];

    let nombreSegundo = "-";

    if (segundoJugador) {
        nombreSegundo = obtenerNombreJugador(
            segundoJugador.jugador,
            segundoJugador.indice
        );
    }

    const partida = {
        fecha: fecha.toLocaleDateString(),
        hora: fecha.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        }),
        jugadores: jugadores.length,
        ganador: nombreGanador,
        segundo: nombreSegundo
    };

    historial.unshift(partida);
    localStorage.setItem(
        "historialPartidas",
        JSON.stringify(historial)
    );
}

function mostrarHistorial(){

    const historial = JSON.parse(
        localStorage.getItem("historialPartidas")
    ) || [];

    listaHistorial.innerHTML = "";
    if(historial.length===0){
        listaHistorial.innerHTML=`
        <div class="historial_vacio">
            🐷<br>
            Todavía no hay partidas registradas.
        </div>
        `;
        return;
    }

    historial.forEach((partida,index)=>{
        listaHistorial.innerHTML +=`
        <div class="tarjeta_historial">
            <div class="historial_top">
                <span class="numero">
                    Partida N°${historial.length-index}
                </span>
                <span class="fecha">
                    ${partida.fecha}
                </span>
                <span class="fecha">
                    ${partida.hora}
                </span>
            </div>
            <div class="historial_body">
                <div>
                    🏆
                    <strong>${partida.ganador}</strong>
                </div>
                <div>
                    🥈
                    ${partida.segundo}
                </div>
            </div>
            <div class="historial_footer">
                👥 ${partida.jugadores} jugadores
            </div>
        </div>
        `;
    });
}


/********* AGREGAR JUGADOR *********/

const modalAgregarJugador =
    document.getElementById("modal_agregar_jugador");

const abrirModalAgregarJugador =
    document.getElementById("abrirModalAgregarJugador");

const cerrarModalAgregarJugador =
    document.getElementById("cerrarModalAgregar");

const confirmarAgregarJugador =
    document.getElementById("confirmarAgregarJugador");


/**************** ABRIR MODAL ****************/

abrirModalAgregarJugador.addEventListener("click", () => {
    // Máximo de jugadores
    if (marcadores.length >= 12) {
        mostrarMensajeLimite();
        return;
    }
    modalAgregarJugador.showModal();
});


/**************** CERRAR MODAL ****************/

cerrarModalAgregarJugador.addEventListener("click", () => {

    modalAgregarJugador.close();

});


/**************** CONFIRMAR AGREGAR ****************/

confirmarAgregarJugador.addEventListener("click", () => {

    agregarJugador();

    modalAgregarJugador.close();

});


/**************** FUNCIÓN AGREGAR JUGADOR ****************/

function agregarJugador() {

    // Verificar nuevamente el límite
    if (marcadores.length >= 12) {
        mostrarMensajeLimite();
        return;
    }

    const container = document.querySelector(".container");

    // Crear nuevo marcador
    const nuevoMarcador = new Marcador(
        container,

        // Guardar estado
        () => guardarEstadoPartida(marcadores),

        // Comprobar ganador
        () => jugadorGanador(marcadores)
    );

    // Agregarlo al array
    marcadores.push(nuevoMarcador);

    // Guardar la nueva cantidad de jugadores
    guardarEstadoPartida(marcadores);

}

//MOSTRAR MENSAJE DE LIMITE DE JUGADORES
const mensajeLimiteJugadores =
    document.getElementById("mensajeLimiteJugadores");

let timeoutMensajeLimite;

function mostrarMensajeLimite(){

    clearTimeout(timeoutMensajeLimite);

    mensajeLimiteJugadores.classList.add("mostrar");

    timeoutMensajeLimite = setTimeout(() => {
        mensajeLimiteJugadores.classList.remove("mostrar");
    }, 3000);
}