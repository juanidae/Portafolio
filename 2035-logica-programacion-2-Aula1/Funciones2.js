// Desafíos:
// Crea una función que calcule el índice de masa corporal (IMC)
//  de una persona a partir de su altura en metros y peso en kilogramos, que se recibirán como parámetros.

let altura = 1.70;
let peso = 70;

function calcularIMC(altura, peso) {
    IMC = peso/ (altura * altura);
    console.log("El IMC es: " + IMC.toFixed(2));

  return IMC;
} calcularIMC(altura, peso);

// Crea una función que calcule el valor del factorial de un número pasado como parámetro.

function factorial(n) {
    if (n < 0) {
        return "El factorial no está definido para números negativos.";
    }
    let resultado = 1;
    for (let i = 1; i <= n; i++) {
        resultado *= i;
    }
    return resultado;
}

// Ejemplo de uso
console.log(factorial(2)); // 120

// Crea una función que convierta un valor en dólares, pasado como parámetro,
//  y devuelva el valor equivalente en reales(moneda brasileña,si deseas puedes hacerlo con el valor del dólar en tu país).
//  Para esto, considera la cotización del dólar igual a R$4,80.

function convertirDolaresAReales(dolares) {
    const tasaDeCambio = 4.80; // Cotización fija del dólar en reales
    if (dolares < 0) {
        return "El valor en dólares no puede ser negativo.";
    }
    let reales = dolares * tasaDeCambio;
    return reales.toFixed(2); // Redondear a dos decimales
}

// Ejemplo de uso
let dolares = 50; // Valor en dólares
let reales = convertirDolaresAReales(dolares);
console.log(`$${dolares} USD equivale a R$${reales} BRL.`);

// Crea una función que muestre en pantalla el área y el perímetro de una sala rectangular,
//  utilizando la altura y la anchura que se proporcionarán como parámetros.

altura = 5;
ancho = 10; 

function calcularAreaYPerimetroRectangulo(altura, ancho) {
    let area = altura * ancho;
    let perimetro = 2 * (altura + ancho);
    console.log(`El área del rectángulo es ${area} y el perímetro es ${perimetro}.`);
} calcularAreaYPerimetroRectangulo(altura, ancho);

// Crea una función que muestre en pantalla el área y el perímetro de una sala circular,
//  utilizando su radio que se proporcionará como parámetro. Considera Pi = 3,14.

radio = 5;
function calcularAreaYPerimetroCirculo(radio) {
    const PI = 3.14;
    let area = PI * radio * radio;
    let perimetro = 2 * PI * radio;
    console.log(`El área del círculo es ${area} y el perímetro es ${perimetro.toFixed(2)}.`);
} calcularAreaYPerimetroCirculo(radio);

// Crea una función que muestre en pantalla la tabla de multiplicar de un número dado como parámetro.

numero = 5;

function tablaMultiplicar(numero) {
    for (let i = 1; i <= 10; i++) {
        console.log(`${numero} x ${i} = ${numero * i}`);
    }
} tablaMultiplicar(numero);
