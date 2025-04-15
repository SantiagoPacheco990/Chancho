import {Marcador} from "./Marcador.js";

/****************Modales de Reiniciar y Volver****************/
const modalReiniciar = document.getElementById("modal_reiniciar");
const abrirModalReiniciar = document.getElementById("abrirModalReiniciar");
const cerrarModalReiniciar = document.getElementById("cerrarModalReiniciar")


abrirModalReiniciar.addEventListener("click", () =>{
  modalReiniciar.showModal();
})

cerrarModalReiniciar.addEventListener("click", () =>{
  modalReiniciar.close();
})

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

//Crear Marcadores
const crearMarcadores = (jugadores) =>{
  const container = document.querySelector(".container"); /*Hace referencia al container de los marcadores*/ 
  for (let i = 0; i < jugadores; i++) {
    console.log(`Creando marcador ${i + 1}`)
    new Marcador(container);
    
  }
}

crearMarcadores(5);
