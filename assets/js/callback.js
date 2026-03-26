const baseDatos1 = ["Canada", "EUA", "Mexico", "Ecuador", "Brazil", "Argentina", "Uruguay", "Colombia"];
const baseDatos2 = ["Japon", "Iran", "Corea del Sur", "Alemania", "Croacia", "Espana", "Inglaterra"];

const inputPais = document.getElementById("name");
const tbody = document.querySelector("tbody");
const emptyState = document.getElementById("emptyState");
const form = document.getElementById("studentForm");

function encontrado(pais) {
  tbody.innerHTML = `
    <tr>
      <td class="fw-semibold text-success">${pais}</td>
    </tr>
  `;
  emptyState.classList.add("d-none");
}

function busquedaBaseDatos2(pais, callbackEncontrado) {
  if (baseDatos2.includes(pais)) {
    callbackEncontrado(pais);
  } else {
    mostrarNoEncontrado();
  }
}

function busquedaBaseDatos1(pais, callbackEncontrado, callbackBusqueda2) {
  if (baseDatos1.includes(pais)) {
    callbackEncontrado(pais);
  } else {
    callbackBusqueda2(pais, callbackEncontrado);
  }
}

function mostrarNoEncontrado() {
  tbody.innerHTML = "";
  emptyState.classList.remove("d-none");
  emptyState.innerHTML = `
    <div class="empty-icon">
      <i class="bi bi-search"></i>
    </div>
    <h3>País no encontrado</h3>
    <p>Prueba con un valor como Colombia, Canada, Alemania o Inglaterra.</p>
  `;
}

function addData() {
  const pais = inputPais.value.trim();

  if (!pais) {
    alert("Por favor ingresa un país.");
    return;
  }

  tbody.innerHTML = "";

  busquedaBaseDatos1(pais, encontrado, busquedaBaseDatos2);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addData();
});
