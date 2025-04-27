let NumeroSecreto = 0;
let intentos = 0;
let numerosSorteados = [];
let numeroMaximo = 10;
   
function asignarTextElemento(elemento, texto){
    let elementoHtml = document.querySelector(elemento);  
    elementoHtml.innerHTML = texto;
    return;
}

function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    console.log(numeroGenerado);
    console.log(numerosSorteados);
    //Si ya sorteamos todos los numeros
    if (numerosSorteados.length === numeroMaximo){
        asignarTextElemento('p', 'No hay mas intentos');
        document.getElementById('reiniciar').removeAttribute('disabled');
    //si el numero generado esta en la lista
    } else {
      
    if (numerosSorteados.includes(numeroGenerado)){
        return generarNumeroSecreto();
    } else {
        numerosSorteados.push(numeroGenerado);
        return numeroGenerado;
        }
    }
}
function verificarIntento(){

    let numeroDelUsuario = parseInt(document.getElementById('ValorUsuario').value);

    if (numeroDelUsuario === NumeroSecreto){

        asignarTextElemento('p', `Felicidades, lo realizaste en ${intentos} ${intentos === 1 ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        
        if (numeroDelUsuario > NumeroSecreto){

        asignarTextElemento('p', 'El numero secreto es menor');
        
    } else{

        asignarTextElemento('p', 'El numero secreto es mayor');
    } 
    intentos ++;
    limpiarCajaTexto();
    }
}

function limpiarCajaTexto(){
    document.getElementById('ValorUsuario').value = '';
    return;

}
function condicionesIniciales(){
    asignarTextElemento('h1', 'Juego del mundo secreto!');
    asignarTextElemento('p', `indica un numero del 1 al ${numeroMaximo}`);
    NumeroSecreto = generarNumeroSecreto();
    intentos = 0;
    
}

function reiniciarJuego(){
        // limpiar el texto
        limpiarCajaTexto();
        //reiniciar juego
        condicionesIniciales();
        //desactivar boton reiniciar
        document.getElementById('reiniciar').setAttribute('disabled', true);
} condicionesIniciales();



