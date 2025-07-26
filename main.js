// Variables y referencias
const contenedorPrincipal = document.getElementById("contenedorPrincipal");
const entradaContador = document.getElementById("entradaContador");
const botonRestar = document.getElementById("botonRestar");
const botonSumar = document.getElementById("botonSumar");
const botonAgregar = document.getElementById("botonAgregar");
const infoUltimoPedido = document.getElementById("infoUltimoPedido");
const infoPromedio = document.getElementById("infoPromedio");

let contador = 0;
let horaUltimoPedido = null;
let horaInicioApp = Date.now();

const META_DIARIA = 80;
const HORAS_EN_DIA = 24;
const META_POR_HORA = META_DIARIA / HORAS_EN_DIA;

function tiempoTranscurrido(timestamp) {
  if (!timestamp) return "";
  const ahora = Date.now();
  const segundos = Math.floor((ahora - timestamp) / 1000);
  const minutos = Math.floor(segundos / 60);
  const segRestantes = segundos % 60;
  return `${minutos}:${segRestantes < 10 ? "0" : ""}${segRestantes} <span style="color: #fff">ago.</span>`;
}

function actualizarContador() {
  entradaContador.value = contador;

  entradaContador.classList.remove("texto-blanco", "texto-verde");
  entradaContador.classList.add(contador >= META_DIARIA ? "texto-verde" : "texto-blanco");

  botonAgregar.disabled = false;
  botonAgregar.classList.remove("opacity-50", "cursor-not-allowed");
  botonSumar.disabled = false;
  botonSumar.classList.remove("opacity-50", "cursor-not-allowed");

  if (contador === 0) {
    botonRestar.disabled = true;
    botonRestar.classList.add("opacity-50", "cursor-not-allowed");
  } else {
    botonRestar.disabled = false;
    botonRestar.classList.remove("opacity-50", "cursor-not-allowed");
  }

  if (contador > 0 && contador % 10 === 0) {
    contenedorPrincipal.classList.add("borde-neon");
  } else {
    contenedorPrincipal.classList.remove("borde-neon");
  }
}

function actualizarInfo() {
  if (horaUltimoPedido) {
    const transcurrido = tiempoTranscurrido(horaUltimoPedido);
    infoUltimoPedido.innerHTML = `<span style="color: #fff">Last order</span> <b>${contador}</b> <span style="color: #fff">was</span> <b>${transcurrido}</b>`;
    infoUltimoPedido.classList.remove("text-gray-400");
    infoUltimoPedido.style.color = "#0d0";
  } else {
    infoUltimoPedido.textContent = "Tap to add an order.";
    infoUltimoPedido.style.color = "#ccc";
  }

  const horasTranscurridas = (Date.now() - horaInicioApp) / 3600000;
  const promedio = horasTranscurridas > 0 ? contador / horasTranscurridas : 0;

  const ahora = new Date();
  const horaDelDia = ahora.getHours() + ahora.getMinutes() / 60;
  const pedidosEsperados = horaDelDia * META_POR_HORA;
  const porcentajeMeta = pedidosEsperados > 0 ? (contador / pedidosEsperados) * 100 : 0;
  const mensaje = porcentajeMeta > 0
    ? `Tu promedio es <b style="color: #481">${porcentajeMeta.toFixed(2)}%</b> de la meta diaria.`
    : "";

  infoPromedio.innerHTML = `Promedio por hora: <b style="color: #481">${promedio.toFixed(2)}</b> ${mensaje}`;
}

// Eventos
botonAgregar.addEventListener("click", () => {
  contador++;
  horaUltimoPedido = Date.now();
  actualizarContador();
  actualizarInfo();
});

botonSumar.addEventListener("click", () => {
  contador++;
  horaUltimoPedido = Date.now();
  actualizarContador();
  actualizarInfo();
});

botonRestar.addEventListener("click", () => {
  if (contador > 0) {
    contador--;
    horaUltimoPedido = Date.now();
    actualizarContador();
    actualizarInfo();
  }
});

entradaContador.addEventListener("input", () => {
  const nuevoValor = parseInt(entradaContador.value, 10);
  contador = isNaN(nuevoValor) || nuevoValor < 0 ? 0 : nuevoValor;
  horaUltimoPedido = Date.now();
  actualizarContador();
  actualizarInfo();
});

// Inicialización
actualizarContador();
actualizarInfo();
setInterval(actualizarInfo, 1000);
