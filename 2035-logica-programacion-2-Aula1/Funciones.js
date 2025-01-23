// <!-- Desafíos:

// Crear una función que muestre "¡Hola, mundo!" en la consola.

function mostrarHolaMundo(){

    console.log("¡Hola, mundo!");
    return;
}

mostrarHolaMundo();

// Crear una función que reciba un nombre como parámetro y muestre "¡Hola, [nombre]!" en la consola.

let nombre ='Juan';  

function mostrarNombre(nombre){

    console.log(`¡Hola, ${nombre}!`);
    return;
} 
mostrarNombre(nombre);

// Crear una función que reciba un número como parámetro y devuelva el doble de ese número.

let numero = 5;
    function dobleNumero(numero){
        return numero * 2;
    }
    console.log(dobleNumero(numero));

// Crear una función que reciba tres números como parámetros y devuelva su promedio.

    let num1 = 5;
    let num2 = 100;
    let num3 = 15;
 function Numeros (num1, num2, num3){

    console.log((num1 + num2 + num3) / 3);
    return (num1 + num2 + num3) / 3;
 }

    Numeros(num1, num2, num3);
// Crear una función que reciba dos números como parámetros y devuelva el mayor de ellos.

let num4 = 5;
let num5 = 100;
 function numeroMayor (num4, num5){

    if(num1 > num2){
        console.log(num1);
        return num1;
    } else {
        console.log(num2);
        return num2;
    }
 } numeroMayor(num4, num5);
// Crear una función que reciba un número como parámetro y devuelva el resultado de multiplicar ese número por sí mismo. -->

let num6 = 5;
function multiplicarNumero (num6){
    console.log(num6 * num6);
    return num6 * num6;
} multiplicarNumero(num6);