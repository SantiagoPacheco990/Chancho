const miDialog = document.getElementById("miDialog");
const abrirModal = document.getElementById("abrirModal")
const cerrarModal = document.getElementById("cerrarModal")
const mensajeError = document.querySelector('.mensaje-error');
const input_jugadores = document.getElementById('cantidad-jugadores');

abrirModal.addEventListener("click", () =>{
    miDialog.showModal();
})

cerrarModal.addEventListener("click", () =>{
    miDialog.close();
    mensajeError.textContent = "";
    input_jugadores.value = "";
})

document.getElementById('envio-de-jugadores').addEventListener('submit', (e) => {
    e.preventDefault();
    const cantidad_jugadores = input_jugadores.value;
    if (cantidad_jugadores >= 2 && cantidad_jugadores <= 12) {
        window.location.href = `Comienzo_de_juego/jugando.html?cantidad=${cantidad_jugadores}`;
    } else if (cantidad_jugadores === '') {
        mensajeError.textContent = "No puede empezar la partida sin ingresar la cantidad de jugadores"
    } else {
        mensajeError.textContent = "Error, la cantidad de jugadores permitidos son entre 2 y 12"
    }
    }
)

