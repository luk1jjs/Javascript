
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"];
let ingresos = [];
let gastos = [];


function pedirDatosMensuales() {
  for (let i = 0; i < meses.length; i++) {
    let ingreso = parseFloat(prompt(`Ingresos en ${meses[i]}:`));
    let gasto = parseFloat(prompt(`Gastos en ${meses[i]}:`));

    if (isNaN(ingreso) || isNaN(gasto)) {
      alert("Ingresaste un valor no válido. Se cancelará el simulador.");
      return false;
    }

    ingresos.push(ingreso);
    gastos.push(gasto);
  }
  return true;
}


function calcularAhorros() {
  let ahorros = [];
  for (let i = 0; i < meses.length; i++) {
    let ahorro = ingresos[i] - gastos[i];
    ahorros.push(ahorro);
    console.log(`En ${meses[i]}, tu ahorro fue de $${ahorro}`);
  }
  return ahorros;
}


function mostrarResumen(ahorros) {
  let total = ahorros.reduce((acc, val) => acc + val, 0);
  let promedio = total / ahorros.length;
  alert(`Resumen de ahorro:\nTotal ahorrado: $${total}\nPromedio mensual: $${promedio.toFixed(2)}`);
  console.log("Resumen mostrado al usuario.");
}


if (confirm("¿Querés comenzar el simulador de ahorro?")) {
  if (pedirDatosMensuales()) {
    const resultadoAhorros = calcularAhorros();
    mostrarResumen(resultadoAhorros);
  } else {
    console.log("Simulador cancelado por datos inválidos.");
  }
} else {
  alert("Simulador cancelado.");
  console.log("El usuario canceló el inicio del simulador.");
}