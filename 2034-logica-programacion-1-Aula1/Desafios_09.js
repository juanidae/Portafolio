//Desafíos:

//Pregunta al usuario qué día de la semana es. Si la respuesta es "Sábado" o "Domingo", muestra "¡Buen fin de semana!". De lo contrario, muestra "¡Buena semana!".
let diaSemana = prompt('Por favor ingrese el dia de la semana actual');
console.log(diaSemana);
if (diaSemana ==='Sabado' || diaSemana === 'Domingo'){
    alert('¡Buen fin de semana!');
}
else alert('¡Buena semana!');
//Verifica si un número ingresado por el usuario es positivo o negativo. Muestra una alerta informativa.

const numeroUsuario = prompt('Por favir ingrese un numero');
console.log(numeroUsuario);
if (numeroUsuario > 0){
    alert('El numero es positivo');

}else alert('El numero es negativo')
// Crea un sistema de puntuación para un juego. Si la puntuación es mayor o igual a 100, muestra "¡Felicidades, has ganado!". En caso contrario, muestra "Intentalo nuevamente para ganar.".

let puntuacionUsuario = prompt ('Ingrese su puntuacion en el juego');
if (puntuacionUsuario >= 100){
    alert('¡Felicidades, has ganado!');
}else alert('Intentalo nuevamente para ganar.')

// Crea un mensaje que informe al usuario sobre el saldo de su cuenta, utilizando un template string para incluir el valor del saldo.

let saldoCuenta = 213123112
alert(`El saldo de su cuenta es: ${saldoCuenta}`);

// Pide al usuario que ingrese su nombre mediante un prompt. Luego, muestra una alerta de bienvenida usando ese nombre.

let usuarioNombre = prompt('Por favor ingrese su nombre');
console.log(usuarioNombre);
alert(`Bienvenido a la pagina web, ${usuarioNombre}`)