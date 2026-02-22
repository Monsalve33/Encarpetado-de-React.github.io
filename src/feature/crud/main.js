function validateForm() {
  let email = document.getElementById("email").value.trim();
  let name = document.getElementById("name").value.trim();
  let doc = document.getElementById("doc").value.trim();

  if (email === "" || name === "" || doc === "") {
    alert("Por favor, complete todos los campos.");
    return false;
  }

  if (!email.includes("@")) {
    alert("Por favor, ingrese un correo electrónico válido.");
    return false;
  }

  return true;
}

function showData() {
  let listData = localStorage.getItem("listData")
    ? JSON.parse(localStorage.getItem("listData"))
    : [];

  let html = "";
  listData.forEach(function (element, studentId) {
    html += "<tr>";
    html += "<td>" + element.email + "</td>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.doc + "</td>";
    html += "<td>";
    html += "<button onclick='deleteData(" + studentId + ")' class='btn btn-danger me-2'>Eliminar</button>";
    html += "<button onclick='updateData(" + studentId + ")' class='btn btn-warning'>Editar</button>";
    html += "</td>";
    html += "</tr>";
  });

  document.querySelector("#tableData tbody").innerHTML = html;
}

window.onload = showData;

function addData() {
  if (validateForm() == true) {
    let email = document.getElementById("email").value.trim().toLowerCase();
    let name = document.getElementById("name").value.trim();
    let doc = document.getElementById("doc").value.trim();
    let studentId = document.getElementById("studentId").value;

    let listData = localStorage.getItem("listData")
      ? JSON.parse(localStorage.getItem("listData"))
      : [];

    // VALIDAR DUPLICADOS
    let exists = listData.some((item, i) => {
      if (studentId === "") {
        return item.email === email || item.doc === doc;
      } else {
        return i != studentId && (item.email === email || item.doc === doc);
      }
    });

    if (exists) {
      alert("❌ El correo o documento ya existe.");
      return;
    }

    // EDITAR
    if (studentId !== "") {
      listData[studentId] = { email, name, doc };
      document.getElementById("studentId").value = "";
    } 
    // CREAR
    else {
      listData.push({ email, name, doc });
    }

    localStorage.setItem("listData", JSON.stringify(listData));
    showData();

    document.getElementById("email").value = "";
    document.getElementById("name").value = "";
    document.getElementById("doc").value = "";
  }
}

function deleteData(studentId) {
  let listData = localStorage.getItem("listData")
    ? JSON.parse(localStorage.getItem("listData"))
    : [];

  listData.splice(studentId, 1);
  localStorage.setItem("listData", JSON.stringify(listData));
  showData();
}

function updateData(studentId) {
  let listData = JSON.parse(localStorage.getItem("listData"));

  document.getElementById("email").value = listData[studentId].email;
  document.getElementById("name").value = listData[studentId].name;
  document.getElementById("doc").value = listData[studentId].doc;
  document.getElementById("studentId").value = studentId;
}