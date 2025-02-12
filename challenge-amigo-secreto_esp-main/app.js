// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

let nombres = [];

function agregarAmigo() {
  let nombre = String(document.getElementById("amigo").value.trim());  // Obtiene el valor del input y lo convierte a string
  if (nombre === "" || !isNaN(nombre) || nombre.length < 4 || nombre.match(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/)) {  // Verifica si está vacío o si es un número
    alert("Por favor, ingrese un nombre válido.");
  } else {
    nombres.push(nombre);
    document.getElementById("amigo").value = "";
  }
  console.log(nombres);
  console.log(nombres.length);
}


