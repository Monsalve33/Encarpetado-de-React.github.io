const form = document.getElementById("studentForm");
const studentIdInput = document.getElementById("studentId");
const nameInput = document.getElementById("name");
const docInput = document.getElementById("doc");
const emailInput = document.getElementById("email");
const btnAdd = document.getElementById("btnAdd");
const btnUpdate = document.getElementById("btnUpdate");
const btnExportar = document.getElementById("btnExportar");
const btnBorrarTodo = document.getElementById("btnBorrarTodo");
const tbody = document.querySelector("#tableData tbody");
const emptyState = document.getElementById("emptyState");
const recordsCounter = document.getElementById("recordsCounter");

function getListData() {
  return localStorage.getItem("listData")
    ? JSON.parse(localStorage.getItem("listData"))
    : [];
}

function setListData(listData) {
  localStorage.setItem("listData", JSON.stringify(listData));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function validateForm() {
  const email = emailInput.value.trim().toLowerCase();
  const name = nameInput.value.trim();
  const doc = docInput.value.trim();

  if (!email || !name || !doc) {
    alert("Por favor, completa todos los campos.");
    return false;
  }

  if (!email.includes("@")) {
    alert("Por favor, ingresa un correo electrónico válido.");
    return false;
  }

  return true;
}

function renderEmptyState() {
  emptyState.classList.remove("d-none");
  emptyState.innerHTML = `
    <div class="empty-icon">
      <i class="bi bi-inbox"></i>
    </div>
    <h3>No hay registros todavía</h3>
    <p>Agrega un aprendiz desde el formulario para verlo aquí.</p>
  `;
}

function updateCounter(total) {
  recordsCounter.textContent = `${total} registro${total === 1 ? "" : "s"} almacenado${total === 1 ? "" : "s"}`;
}

function showData() {
  const listData = getListData();

  if (!listData.length) {
    tbody.innerHTML = "";
    updateCounter(0);
    renderEmptyState();
    return;
  }

  emptyState.classList.add("d-none");
  updateCounter(listData.length);

  tbody.innerHTML = listData
    .map((element, index) => `
      <tr>
        <td>${escapeHtml(element.email)}</td>
        <td>${escapeHtml(element.name)}</td>
        <td>${escapeHtml(element.doc)}</td>
        <td>
          <div class="record-actions">
            <button onclick="updateData(${index})" class="btn btn-sm btn-soft" type="button">
              <i class="bi bi-pencil-square me-1"></i>Editar
            </button>
            <button onclick="deleteData(${index})" class="btn btn-sm btn-danger-soft" type="button">
              <i class="bi bi-trash3 me-1"></i>Eliminar
            </button>
          </div>
        </td>
      </tr>
    `)
    .join("");
}

function resetFormState() {
  form.reset();
  studentIdInput.value = "";
  btnAdd.style.display = "inline-block";
  btnUpdate.style.display = "none";
}

function addData() {
  if (!validateForm()) {
    return;
  }

  const email = emailInput.value.trim().toLowerCase();
  const name = nameInput.value.trim();
  const doc = docInput.value.trim();
  const studentId = studentIdInput.value;
  const listData = getListData();

  const exists = listData.some((item, index) => {
    if (studentId === "") {
      return item.email === email || item.doc === doc;
    }

    return index !== Number(studentId) && (item.email === email || item.doc === doc);
  });

  if (exists) {
    alert("El correo o documento ya existe.");
    return;
  }

  if (studentId !== "") {
    listData[studentId] = { email, name, doc };
  } else {
    listData.push({ email, name, doc });
  }

  setListData(listData);
  showData();
  resetFormState();
}

function deleteData(studentId) {
  const listData = getListData();
  listData.splice(studentId, 1);
  setListData(listData);
  showData();

  if (studentIdInput.value === String(studentId)) {
    resetFormState();
  }
}

function updateData(studentId) {
  const listData = getListData();
  const record = listData[studentId];

  if (!record) {
    return;
  }

  emailInput.value = record.email;
  nameInput.value = record.name;
  docInput.value = record.doc;
  studentIdInput.value = studentId;
  btnAdd.style.display = "none";
  btnUpdate.style.display = "inline-block";
}

function exportData() {
  const listData = getListData();

  if (!listData.length) {
    alert("No hay datos para exportar.");
    return;
  }

  const blob = new Blob([JSON.stringify(listData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "registros.json";
  link.click();
  URL.revokeObjectURL(url);
}

function clearAllData() {
  const listData = getListData();

  if (!listData.length) {
    alert("No hay registros para borrar.");
    return;
  }

  const shouldDelete = window.confirm("¿Seguro que quieres borrar todos los registros?");

  if (!shouldDelete) {
    return;
  }

  localStorage.removeItem("listData");
  showData();
  resetFormState();
}

btnExportar.addEventListener("click", exportData);
btnBorrarTodo.addEventListener("click", clearAllData);
window.addEventListener("load", showData);
