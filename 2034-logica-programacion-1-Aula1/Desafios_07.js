// Crea un contador que comience en 1 y vaya hasta 10 usando un bucle 'while'. Muestra cada número.

let numero=0
while (numero<11){
    numero ++;
    alert(`El numero es ${numero}`)
}

// Crea un contador que comience en 10 y vaya hasta 0 usando un bucle 'while'. Muestra cada número.
    let Numero=10
    while (Numero >= 0){
        Numero --;
        alert(`El numero es ${Numero}`)
    }

// Crea un programa de cuenta regresiva. Pide un número y cuenta desde 0 hasta ese número utilizando un bucle 'while' en la consola del navegador.


let cuentaRegresiva = prompt ('Ingrese un numero Mayor a cero')

if (cuentaRegresiva > 0 ){

while (cuentaRegresiva >= 0) {
       alert(`El numero es ${cuentaRegresiva}`)
       cuentaRegresiva --
    }
}else {alert ('Ingrese un numero mayor que Cero')   
}


// Crea un programa de cuenta progresiva. Pide un número y cuenta desde 0 hasta ese número utilizando un bucle 'while' en la consola del navegador.

let contador = 0;
let cuentaProgresiva = parseInt(prompt ('Ingrese un numero Mayor a cero'))

if (cuentaProgresiva > 0 ){

while (contador <= cuentaProgresiva) {
       alert(`El numero es ${contador}`)
       contador ++
    }
}else {alert ('Ingrese un numero mayor que Cero')   
}