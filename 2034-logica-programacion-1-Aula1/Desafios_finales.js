// Desafíos finales:

// Crea un programa que utilice console.log para mostrar un mensaje de bienvenida.

let mensaje = 'Bienvenido a nuestro juego web';
    console.log (mensaje);

// Crea una variable llamada "nombre" y asígnale tu nombre. Luego, utiliza console.log para mostrar el mensaje "¡Hola, [tu nombre]!" en la consola del navegador.

let nombre = 'Juan Gonzalez';
    console.log (nombre);

// Crea una variable llamada "nombre" y asígnale tu nombre. Luego, utiliza alert para mostrar el mensaje "¡Hola, [tu nombre]!".

let Nombre = 'Juan Gonzalez';
    alert(Nombre);

// Utiliza prompt y haz la siguiente pregunta: ¿Cuál es el lenguaje de programación que más te gusta?. Luego, almacena la respuesta en una variable y muestra la respuesta en la consola del navegador.

let lenguaje = prompt('¿Cuál es el lenguaje de programación que más te gusta?');
    console.log(lenguaje);

// Crea una variable llamada "valor1" y otra llamada "valor2", asignándoles valores numéricos de tu elección. Luego,
//  realiza la suma de estos dos valores y almacena el resultado en una tercera variable llamada "resultado". Utiliza console.log para mostrar el mensaje "La suma de [valor1] y [valor2] es igual a [resultado]." en la consola.

valor1 = 3;
valor2 = 6;

resultado = valor1 + valor2;
    console.log(resultado);
    console.log(`la suma de ${valor1} y ${valor2} es igual a ${resultado}`);

// Crea una variable llamada "valor1" y otra llamada "valor2",
//  asignándoles valores numéricos de tu elección. Luego, realiza la resta de estos dos valores y almacena el resultado en una tercera variable llamada "resultado".
//  Utiliza console.log para mostrar el mensaje "La diferencia entre [valor1] y [valor2] es igual a [resultado]." en la consola.


valor3 = 8;
valor4 = 15;

resultado = valor1 - valor2;
    console.log(resultado);
    console.log(`la resta de ${valor1} y ${valor2} es igual a ${resultado}`);

// Pide al usuario que ingrese su edad con prompt. Con base en la edad ingresada,
//  utiliza un if para verificar si la persona es mayor o menor de edad y muestra un mensaje apropiado en la consola.

let edadUsuario = parseInt(prompt('Por favor ingrese su Edad'));

if (edadUsuario > 0 || edadUsuario <= 100 ){

    if (edadUsuario > 18) {

        console.log ('la persona es mayor de edad');
    }if (edadUsuario <= 0 || edadUsuario >= 100 ) {

        console.log('por favor ingrese una edad valida');
    }

} else {

    console.log('la persona es menor de edad');

}


// Crea una variable "numero" y solicita un valor con prompt. Luego, verifica si es positivo, negativo o cero utilizando un if-else y muestra el mensaje correspondiente.

let numero = parseInt(prompt ('Por favor ingresa un Numero'))

if (numero > 0 ){

    alert('el numero es positivo')

} else if (numero < 0 ) {

    alert('el numero es negativo')
}else {alert('el numero es cero')}


// Utiliza un bucle while para mostrar los números del 1 al 10 en la consola.

let contador=0
while (contador < 11){
    console.log(contador)
    contador++
}

// Crea una variable "nota" y asígnale un valor numérico. Utiliza un if-else para determinar si la nota es mayor o igual
//  a 7 y muestra "Aprobado" o "Reprobado" en la consola.

let nota = 6

if (nota >= 7) {

    alert('Aprobado')

}else {

    alert('Reprobado')
}

// Utiliza Math.random para generar cualquier número aleatorio y muestra ese número en la consola.

let numeroAleatorio = Math.random()
    console.log(numeroAleatorio)

// Utiliza Math.random para generar un número entero entre 1 y 10 y muestra ese número en la consola.

let aleatorio = Math.floor(Math.random() * 10 + 1);
    console.log(aleatorio)

// Utiliza Math.random para generar un número entero entre 1 y 1000 y muestra ese número en la consola.

let Aleatorio = Math.floor(Math.random() * 1000 + 1);
    console.log(Aleatorio)