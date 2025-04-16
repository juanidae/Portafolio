// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

let amigos = []; // Array para guardar los nombres de los amigos  

function agregarAmigo() {
  let nombre = document.getElementById("amigo").value.trim();

  if (nombre === "" || !isNaN(nombre) || nombre.length < 4 || nombre.match(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/)) { 
    
    alert("Por favor, ingrese un nombre válido.");

  } else { if (amigos.includes(nombre)) {
    
    alert("El nombre ya se encuentra en la lista");
    document.getElementById("amigo").value = "";

  } else { if (amigos.length >= 6) {

        alert("Has alcanzado el límite de 5 amigos.");
        document.getElementById("amigo").value = "";
      } else {
        amigos.push(nombre); // Agrega el nombre al array
        document.getElementById("amigo").value = ""; // Limpia el input
      }
      console.log(amigos); // Muestra el array en consola
      console.log(amigos.length); // Muestra la cantidad de elementos en consola

      ListaAmigos(); // Llama a la función para mostrar la lista de amigos
      
    }

  }

}


function ListaAmigos() {

  let lista = document.getElementById("listaAmigos"); // Obtiene el elemento ul
  lista.innerHTML = ""; // Limpia el contenido de la lista

  for (let i = 0; i < amigos.length; i++) { // Recorre el array de amigos
    let li = document.createElement("li"); // Crea un elemento li
    li.textContent = amigos[i]; // Agrega el nombre del amigo al li
    lista.appendChild(li); // Agrega el li a la lista
  }
}

function sortearAmigo() {

  if (amigos.length < 2) {
    alert("Debes ingresar al menos 2 amigos para poder sortear.");
  } else { let indiceAmigos = Math.floor(Math.random() * amigos.length); // Genera un número aleatorio  
           let amigoSecreto = amigos[indiceAmigos]; // Obtiene el amigo secreto

           let AmigoResultado = document.getElementById("resultado"); // Obtiene el elemento ul
           AmigoResultado.innerHTML = `<li>su amigo secreto es: ${amigoSecreto}</li>`; // Limpia el contenido de la lista
         
     }  
}