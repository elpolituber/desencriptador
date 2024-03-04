const separador = " ";
const vocales = ["a", "e", "i", "o", "u"];
const vocalesEncriptadas = ["ai", "enter", "imes", "ober", "ufat"];
let mensajeEncriptado = "";
const totalVocales = vocales.length;
let index = 0;
let mensaje = document.getElementById("recibirMensaje");
let mensajeError = document.getElementById("mensaje_vacio");
let btnCopiar = document.getElementById("btn_copiar");
let btnLimpiar = document.getElementById("btn_limpiar");

const yearElement = document.getElementById("anio");
const currentYear = new Date().getFullYear();
yearElement.textContent = `© ${currentYear} Franco Zabala. Todos los derechos reservados.`;

const init = () => {
  const regex = /[áéíóúÁÉÍÓÚ]/g;
  const tildesEncontradas = mensaje.value.match(regex);
  if (tildesEncontradas === null) {
    if (mensaje.value.length > 0) {
      btnLimpiar.style.display = "block";
      return mensaje.value.trim().split(separador);
    } else {
      mensajeError.style.display = "block";
    }
  } else {
    alert("No se permiten acentos");
  }
};

const encriptarMensaje = () => {
  let separarPalabras = init();
  let msmRecibir = document.getElementById("darMensaje");
  for (let i = 0; i < separarPalabras.length; i++) {
    mensajeEncriptado += encriptar(separarPalabras[i].toLowerCase()) + " ";
  }
  msmRecibir.value = mensajeEncriptado.trim();
  msmRecibir.style.backgroundImage = "none";
  mensajeError.style.display = "none";
  btnCopiar.style.display = "block";
  mensajeEncriptado = "";
};

function encriptar(mensaje) {
  if (!mensaje || mensaje.length <= 0) return "";
  let mensajeRescrito = "";
  while (index < mensaje.length) {
    if (vocales.indexOf(mensaje[index]) != -1) {
      for (let contador = 0; contador < totalVocales; contador++) {
        if (mensaje[index] == vocales[contador])
          mensajeRescrito += mensaje[index].replaceAll(
            vocales[contador],
            vocalesEncriptadas[contador]
          );
      }
    } else {
      mensajeRescrito += mensaje[index];
    }
    index++;
  }
  index = 0;
  return mensajeRescrito;
}

const desencriptarMensaje = () => {
  let separarPalabras = init();
  for (let i = 0; i < separarPalabras.length; i++) {
    mensajeEncriptado += desencriptar(separarPalabras[i].toLowerCase()) + " ";
  }
  document.getElementById("darMensaje").value = mensajeEncriptado.trim();
  mensajeEncriptado = "";
};

function desencriptar(mensaje) {
  if (!mensaje || mensaje.length <= 0) return "";
  let mensajeRescrito = mensaje;
  for (let contador = 0; contador < totalVocales; contador++) {
    mensajeRescrito = mensajeRescrito.replaceAll(
      vocalesEncriptadas[contador],
      vocales[contador]
    );
  }
  return mensajeRescrito;
}

function copiarMensaje() {
  var textarea = document.getElementById("darMensaje").value;
  navigator.clipboard
    .writeText(textarea)
    .then(() => {
      alert("¡El mensaje se ha copiado al portapapeles!");
    })
    .catch((err) => {
      console.error("Error in copying text: ", err);
    });
}

function clearTextarea() {
  mensaje.value = "";
}

function showMessage() {
  var message = document.querySelector(".message");
  message.style.visibility = "visible";
  message.style.opacity = 1;
}

function hideMessage() {
  var message = document.querySelector(".message");
  message.style.visibility = "hidden";
  message.style.opacity = 0;
}
