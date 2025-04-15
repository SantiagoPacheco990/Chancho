export class Marcador {
    cantidadLetras = 0;
    maxLetras;
    palabra = "CHANCHO";

    constructor(container) {
        this.maxLetras = this.palabra.length;

        this.container = container;
        this.template = document.querySelector("#marcador-template");

        // Verifica si el template está correctamente seleccionado
        if (!this.template) {
            console.error("No se encontró el template.");
            return;
        }

        // Clona el contenido del template
        this.elemento = this.template.content.cloneNode(true).querySelector(".marcador");

        // Verifica si se ha clonado correctamente
        if (!this.elemento) {
            console.error("No se pudo clonar el contenido del template.");
            return;
        }

        // Añade el marcador al contenedor
        this.container.appendChild(this.elemento);

        // Verifica si los botones están correctamente seleccionados
        this.boton_incremento = this.elemento.querySelector(".boton-incremento");
        this.boton_decremento = this.elemento.querySelector(".boton-decremento");

        if (!this.boton_incremento || !this.boton_decremento) {
            console.error("No se encontraron los botones de incremento o decremento.");
            return;
        }

        // Selecciona los casilleros para las letras
        this.casilleros = this.elemento.querySelectorAll(".casillero-palabra");

        // Verifica si se han seleccionado correctamente los casilleros
        if (!this.casilleros || this.casilleros.length !== this.maxLetras) {
            console.error("No se encontraron los casilleros o no son suficientes.");
            return;
        }

        // Añade los eventos a los botones
        this.boton_incremento.addEventListener("click", () => {
            this.agregarLetra();
        });

        this.boton_decremento.addEventListener("click", () => {
            this.quitarLetra();
        });

        this.volverJugador();
        
    }

    agregarLetra(){
        if (this.cantidadLetras < this.maxLetras) {
            const letraActual = this.palabra[this.cantidadLetras];
            const casillero = this.casilleros[this.cantidadLetras];
            casillero.value = letraActual;
            casillero.classList.add("activo"); 
            this.cantidadLetras++; 
            if (this.cantidadLetras === this.maxLetras) {
                this.mostrarBtnVolver();
                this.marcadorJugadorEliminado();
            }  
        }
    }
    
    quitarLetra(){
        if (this.cantidadLetras > 0) {
            this.cantidadLetras--;
            const casillero = this.casilleros[this.cantidadLetras];
            casillero.value = "";
            casillero.classList.remove("activo"); 
        }
    }
    
    reiniciarMarcador(){
        if (this.cantidadLetras > 0) {
            this.casilleros.forEach(casillero => {
                casillero.value = "";
                casillero.classList.remove("activo"); 
            });
            this.cantidadLetras = 0;
        }
    }

    mostrarBtnVolver(){
        const btnVolver = this.elemento.querySelector(".boton-volver");
        btnVolver.classList.add("mostrar")  
    }

    ocultarBtnVolver(){
        const btnVolver = this.elemento.querySelector(".boton-volver");
        btnVolver.classList.remove("mostrar")
    }

    marcadorJugadorEliminado(){
        this.elemento.classList.add("eliminado");
        //Inhabilitamos los botones de inc y dec
        this.boton_incremento.disabled = true;
        this.boton_decremento.disabled = true;
    }

    quitarMarcadorEliminado() {
        this.elemento.classList.remove("eliminado");
        //Habilitamos los botones de inc y dec
        this.boton_incremento.disabled = false;
        this.boton_decremento.disabled = false;
    }

    volverJugador(){
        const btnVolver = this.elemento.querySelector(".boton-volver");
        if (!btnVolver.dataset.listenerAdded) { //Evita listeners duplicados, solo se dispara una vez (Mas optimo) (No es necesario agregarlo)
            btnVolver.addEventListener("click", () =>{
                this.ocultarBtnVolver();
                this.quitarLetra();
                this.quitarMarcadorEliminado();
            });
            btnVolver.dataset.listenerAdded = "true";
        }
    }

}
