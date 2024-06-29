document.addEventListener("DOMContentLoaded", obtenerPalabraDeAPI);

const BOTON = document.getElementById("guess-button");
const INPUT = document.getElementById("guess-input");

let intentos = 6;
let palabra = "";

function obtenerPalabraDeAPI() {
  fetch("https://random-word-api.herokuapp.com/word?length=5&lang=es")
    .then((response) => response.json())
    .then((data) => {
      const palabraCincoLetras = data.find((p) => p.length === 5);
      if (palabraCincoLetras) {
            palabra = palabraCincoLetras.toUpperCase();
            console.log(palabra);
        } else {
        obtenerPalabraDeAPI();
      }
    })
    .catch((error) =>
      console.log("Error al obtener palabras de la API", error)
    );
}


BOTON.addEventListener("click", intentar);
INPUT.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    intentar();
    event.preventDefault();
  }
});

function intentar() {
  const INTENTO = leerIntento();
  if (INTENTO === palabra) {
    terminar("<h1>GANASTE!😀</h1>");
  }
  const GRID = document.getElementById("grid");
  const ROW = document.createElement("div");
  ROW.className = "row";
  for (let i in palabra) {
    const SPAN = document.createElement("span");
    SPAN.className = "letter bounce";
    if (INTENTO[i] === palabra[i]) {
      //VERDE
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = "#79b851";
    } else if (palabra.includes(INTENTO[i])) {
      //AMARILLO
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = "#f3c237";
    } else {
      //GRIS
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = "#a4aec4";
    }
    ROW.appendChild(SPAN);
  }
  GRID.appendChild(ROW);
  intentos--;
  if (intentos == 0) {
    terminar("<h1>PERDISTE!😖 La parabra era "+palabra+" </h1>");
  }
}

function leerIntento() {
  let intento = document.getElementById("guess-input");
  intento = intento.value;
  intento = intento.toUpperCase();
  if (validarIntento(intento)) {
    return intento; 
  }else {
    alert("⚠️ La palabra debe tener al menos 5 letras ⚠️");
  }
}

function validarIntento(intento) {
    if (intento.length === 5) {
      return true;
    } else {
      return false;
    }
}

function terminar(mensaje) {
  const INPUT = document.getElementById("guess-input");
  INPUT.disabled = true;
  BOTON.disabled = true;
  let contenedor = document.getElementById("guesses");
  contenedor.innerHTML = mensaje;
}