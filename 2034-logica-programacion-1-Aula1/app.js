// Variables

let aleatorio = parseInt(prompt('Por favor ingrese el rango de numeros a jugar'));
let numeroSecreto = Math.floor(Math.random()* aleatorio) + 1;
let numeroUsuario = 0;
let intentos = 1;
let maxIntentos = 3

console.log(numeroSecreto)

while(numeroUsuario != numeroSecreto)
{
    numeroUsuario = parseInt(prompt(`Me indicas un numero entre 1 a ${aleatorio} por favor:`));

    console.log(typeof(numeroUsuario));

    if (numeroUsuario == numeroSecreto) {
        //Acertamos, fue verdader la condicion
        alert(`Acertaste, el numero es: ${numeroUsuario} lo hiciste en ${intentos} ${intentos == 1 ? 'vez' : 'veces'}`);

    } else {
        if (numeroUsuario > numeroSecreto ) {
            alert('El numero secreto es Menor');
        } else 
            {alert('El numero secreto es Mayor');
        }// incrementamos el contador cuando no acierta
        intentos ++;
        // palabraVeces = 'Veces';
        if (intentos > maxIntentos){

            alert(`Llegaste al número máximo de intentos que son ${maxIntentos}`);
            break;
        }
    }
    // la condicion no se cumplio
}  
