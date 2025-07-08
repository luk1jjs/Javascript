
// crear objetos de mes con ingreso y gasto
function MesFinanciero(nombre, ingreso, gasto) {
  this.nombre = nombre;
  this.ingreso = ingreso;
  this.gasto = gasto;
  this.ahorro = function () {
    return this.ingreso - this.gasto;
  };
}

// Constantes y datos
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"];
let registros = []; // array de objetos MesFinanciero

const form = document.getElementById("form-ingresos");
const mesesContainer = document.getElementById("meses-container");
const resultadoDiv = document.getElementById("resultado");

// crear inputs
meses.forEach((mes, index) => {
  const ingresoInput = document.createElement("input");
  ingresoInput.type = "number";
  ingresoInput.placeholder = `Ingresos en ${mes}`;
  ingresoInput.id = `ingreso-${index}`;
  ingresoInput.required = true;

  const gastoInput = document.createElement("input");
  gastoInput.type = "number";
  gastoInput.placeholder = `Gastos en ${mes}`;
  gastoInput.id = `gasto-${index}`;
  gastoInput.required = true;

  mesesContainer.appendChild(ingresoInput);
  mesesContainer.appendChild(gastoInput);
  mesesContainer.appendChild(document.createElement("br"));
});

// Evento al enviar el formulario
form.addEventListener("submit", (e) => {
  e.preventDefault();

  registros = [];

  for (let i = 0; i < meses.length; i++) {
    const ingreso = parseFloat(document.getElementById(`ingreso-${i}`).value);
    const gasto = parseFloat(document.getElementById(`gasto-${i}`).value);
    registros.push(new MesFinanciero(meses[i], ingreso, gasto));
  }

  mostrarResumen(registros);
  guardarDatosLocalStorage();
});

function mostrarResumen(array) {
  resultadoDiv.innerHTML = "";

  array.forEach((registro) => {
    const p = document.createElement("p");
    p.textContent = `En ${registro.nombre} ahorraste $${registro.ahorro()}`;
    resultadoDiv.appendChild(p);
  });

  const total = array.reduce((acc, obj) => acc + obj.ahorro(), 0);
  const promedio = total / array.length;

  const resumen = document.createElement("p");
  resumen.innerHTML = `<strong>Total Ahorrado:</strong> $${total} <br><strong>Promedio Mensual:</strong> $${promedio.toFixed(2)}`;
  resultadoDiv.appendChild(resumen);
}

function guardarDatosLocalStorage() {
  localStorage.setItem("datosAhorro", JSON.stringify(registros));
  console.log("Datos guardados en LocalStorage:", registros);
}

window.addEventListener("DOMContentLoaded", () => {
  const datosGuardados = localStorage.getItem("datosAhorro");
  if (datosGuardados) {
    const datos = JSON.parse(datosGuardados);
    registros = datos.map((item) => new MesFinanciero(item.nombre, item.ingreso, item.gasto));

    registros.forEach((registro, i) => {
      document.getElementById(`ingreso-${i}`).value = registro.ingreso;
      document.getElementById(`gasto-${i}`).value = registro.gasto;
    });

    mostrarResumen(registros);
  }
});